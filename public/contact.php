<?php
/**
 * Contact form handler for the static cPanel deployment of the ISAT site.
 *
 * Mirrors the behaviour of the Next.js /api/contact route (see
 * src/app/api/contact/route.ts) so the same client-side form in
 * src/sections/Contact.tsx works unchanged against either backend.
 *
 * No external dependencies: plain PHP 8, uses the built-in mail().
 */

declare(strict_types=1);

// Never leak raw PHP errors into the JSON response body.
error_reporting(0);
ini_set('display_errors', '0');

header('Content-Type: application/json');

const RATE_LIMIT_WINDOW_SECONDS = 3600;
const RATE_LIMIT_MAX = 5;
const MIN_SUBMIT_TIME_MS = 3000;

const TO_EMAIL = 'Info@isatnigeria.com';
const FROM_EMAIL = 'no-reply@isatnigeria.com';

function respond(int $status, array $body): void
{
    http_response_code($status);
    echo json_encode($body);
    exit;
}

if (($_SERVER['REQUEST_METHOD'] ?? '') !== 'POST') {
    respond(400, ['error' => 'Invalid request.']);
}

$raw = file_get_contents('php://input');
$body = json_decode($raw ?: '', true);
if (!is_array($body)) {
    respond(400, ['error' => 'Invalid request.']);
}

function strField(array $body, string $key): string
{
    return isset($body[$key]) && is_string($body[$key]) ? trim($body[$key]) : '';
}

// Honeypot: pretend success to bots, send nothing.
$honeypot = strField($body, 'company_website');
if ($honeypot !== '') {
    respond(200, ['ok' => true]);
}

// Minimum fill-time check.
$startedAt = isset($body['startedAt']) && is_numeric($body['startedAt']) ? (float) $body['startedAt'] : null;
if ($startedAt !== null) {
    $nowMs = microtime(true) * 1000;
    if ($nowMs - $startedAt < MIN_SUBMIT_TIME_MS) {
        respond(400, ['error' => 'Please try again.']);
    }
}

$name = strField($body, 'name');
$email = strField($body, 'email');
$phone = strField($body, 'phone');
$company = strField($body, 'company');
$message = strField($body, 'message');

// Header-injection guard: reject newlines in fields that end up in headers.
if (preg_match('/[\r\n]/', $name) || preg_match('/[\r\n]/', $email)) {
    respond(400, ['error' => 'Invalid request.']);
}

if ($name === '' || mb_strlen($name) > 200) {
    respond(400, ['error' => 'Please enter a valid name.']);
}

if ($email === '' || mb_strlen($email) > 320 || filter_var($email, FILTER_VALIDATE_EMAIL) === false) {
    respond(400, ['error' => 'Please enter a valid email address.']);
}

if (mb_strlen($phone) > 50) {
    respond(400, ['error' => 'Please enter a valid phone number.']);
}

if (mb_strlen($company) > 200) {
    respond(400, ['error' => 'Please enter a valid company name.']);
}

if ($message === '' || mb_strlen($message) < 10 || mb_strlen($message) > 2000) {
    respond(400, ['error' => 'Message must be between 10 and 2000 characters.']);
}

// --- Rate limiting: 5 submissions/hour/IP, file-based, no DB required. ---

$ip = $_SERVER['REMOTE_ADDR'] ?? 'unknown';
$throttleDir = __DIR__ . '/.throttle';
if (!is_dir($throttleDir)) {
    @mkdir($throttleDir, 0700, true);
}

$throttleFile = $throttleDir . '/' . hash('sha256', $ip) . '.json';

$fp = @fopen($throttleFile, 'c+');
if ($fp === false) {
    respond(500, ['error' => 'Unable to process your request right now.']);
}

if (!flock($fp, LOCK_EX)) {
    fclose($fp);
    respond(500, ['error' => 'Unable to process your request right now.']);
}

$contents = stream_get_contents($fp);
$timestamps = json_decode($contents ?: '[]', true);
if (!is_array($timestamps)) {
    $timestamps = [];
}

$now = time();
$timestamps = array_values(array_filter(
    $timestamps,
    static fn ($t) => is_numeric($t) && ($now - (int) $t) < RATE_LIMIT_WINDOW_SECONDS
));

if (count($timestamps) >= RATE_LIMIT_MAX) {
    flock($fp, LOCK_UN);
    fclose($fp);
    respond(429, ['error' => 'Too many requests. Please try again later.']);
}

$timestamps[] = $now;

ftruncate($fp, 0);
rewind($fp);
fwrite($fp, json_encode($timestamps));
fflush($fp);
flock($fp, LOCK_UN);
fclose($fp);

// --- Send the email. ---

// Belt and suspenders: strip any stray CR/LF right before building headers.
$stripNewlines = static fn (string $v): string => str_replace(["\r", "\n"], '', $v);

$safeName = $stripNewlines($name);
$safeEmail = $stripNewlines($email);

$subject = 'Nouveau message de contact - ' . $safeName;

$lines = [
    'Name: ' . $name,
    'Email: ' . $email,
];
if ($phone !== '') {
    $lines[] = 'Phone: ' . $phone;
}
if ($company !== '') {
    $lines[] = 'Company: ' . $company;
}
$lines[] = '';
$lines[] = 'Message:';
$lines[] = $message;

$textBody = implode("\n", $lines);

$headers = [];
$headers[] = 'Content-Type: text/plain; charset=UTF-8';
$headers[] = 'From: ISAT Website <' . FROM_EMAIL . '>';
$headers[] = 'Reply-To: ' . $safeEmail;

$sent = @mail(TO_EMAIL, $subject, $textBody, implode("\r\n", $headers));

if (!$sent) {
    respond(500, ['error' => 'Unable to send your message right now.']);
}

respond(200, ['ok' => true]);
