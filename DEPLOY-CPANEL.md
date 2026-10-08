# Deploying to cPanel (isatnigeria.com)

This zip (`isat-site-cpanel.zip`) is a static+PHP build of this site meant to be deployed at the ROOT of the `isatnigeria.com` subdomain's document root — it is entirely separate from and does not affect the existing Vercel deployment, which keeps using `npm run build` unchanged.
To rebuild it locally: run `npm run build:cpanel` (regenerates `out/`, temporarily hiding the API route so the static export succeeds), then re-zip the contents of `out/` (not the `out/` folder itself) into `isat-site-cpanel.zip`.
Deploy by unzipping the archive's contents directly into the subdomain's document root via cPanel File Manager or FTP, so `index.html`, `.htaccess`, `contact.php`, `about/`, `_next/`, `images/`, `videos/` etc. sit at the root, not nested in an `out/` folder.
`contact.php` needs no configuration, API keys, or secrets — it sends mail via PHP's built-in `mail()` function to `Info@isatnigeria.com`.
The `.throttle/` directory (used for the 5-submissions-per-hour rate limiter) must remain writable by PHP and must keep its own `.htaccess` (`Require all denied`) so it is never publicly reachable.
Make sure the subdomain's DNS/document root is already correctly pointed before uploading, and confirm the hosting account runs PHP 8.0 or newer (required by `contact.php`).
`.htaccess` forces HTTPS, disables directory listing, sets security headers, and adds caching/compression — no other `.htaccess` on the server (e.g. any WordPress install) is touched by this deploy.
If email doesn't arrive after go-live, check the cPanel mail/MX setup for `isatnigeria.com`, since PHP `mail()` delivery depends on the server's local mail configuration, not on this repo.
