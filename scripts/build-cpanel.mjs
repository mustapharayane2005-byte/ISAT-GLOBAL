/**
 * Builds a static+PHP export of the site for cPanel shared hosting.
 *
 * Next's `output: 'export'` cannot include POST-only Route Handlers (only
 * GET handlers marked `force-static` are supported in a static export), so
 * this script temporarily moves `src/app/api` out of the `app` directory
 * before running `next build`, then restores it afterwards (even on
 * failure). The Vercel build (`npm run build`) never calls this script and
 * is completely unaffected.
 */
import { execSync } from 'node:child_process';
import { existsSync, renameSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const apiDir = join(root, 'src', 'app', 'api');
const apiBackupDir = join(root, '.cpanel-api-backup');

function run(cmd) {
  execSync(cmd, { cwd: root, stdio: 'inherit' });
}

// 1. Codegen (mirrors the normal `prebuild` step).
run('node scripts/gen-photo-manifest.mjs');
run('node scripts/gen-nigeria-geo.mjs');

// 2. Temporarily remove the API route from the app dir so `next build`
//    with `output: 'export'` doesn't choke on the POST-only handler.
let movedApi = false;
if (existsSync(apiDir)) {
  if (existsSync(apiBackupDir)) {
    throw new Error(
      `Refusing to overwrite existing ${apiBackupDir}. Remove it manually and re-run.`
    );
  }
  renameSync(apiDir, apiBackupDir);
  movedApi = true;
}

try {
  execSync('next build', {
    cwd: root,
    stdio: 'inherit',
    env: {
      ...process.env,
      BUILD_TARGET: 'cpanel',
      NEXT_PUBLIC_BUILD_TARGET: 'cpanel',
      NEXT_PUBLIC_NOINDEX: 'true',
      NEXT_PUBLIC_SITE_URL: 'https://new.isatnigeria.com',
    },
  });
} finally {
  if (movedApi) {
    renameSync(apiBackupDir, apiDir);
  }
}
