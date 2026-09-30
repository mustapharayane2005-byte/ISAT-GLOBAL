// Zip the contents of out/ (not the out/ folder itself) into isat-site-cpanel.zip
// at the repo root, guaranteeing forward-slash entry paths regardless of host OS.
//
// This replaces Windows zipping tools (PowerShell Compress-Archive, raw
// System.IO.Compression) that are known to leak backslash path separators
// into zip entries on Windows, which breaks extraction on Linux cPanel hosts
// (unzip creates literal files named e.g. "chunks\abc123.js" instead of
// nested directories).

import fs from "node:fs";
import path from "node:path";
import { ZipArchive } from "archiver";

const repoRoot = path.resolve(import.meta.dirname, "..");
const outDir = path.join(repoRoot, "out");
const zipPath = path.join(repoRoot, "isat-site-cpanel.zip");

if (!fs.existsSync(outDir)) {
  console.error(`Error: ${outDir} does not exist. Run "npm run build:cpanel" first.`);
  process.exit(1);
}

// Normalize any path separator to forward slashes, defensively (Windows-safe).
function toPosix(p) {
  return p.split(path.sep).join("/").replaceAll("\\", "/");
}

function walk(dir, relBase, files, emptyDirs) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  if (entries.length === 0 && relBase !== "") {
    emptyDirs.push(relBase);
    return;
  }
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    const relPath = relBase === "" ? entry.name : `${relBase}/${entry.name}`;
    if (entry.isDirectory()) {
      walk(fullPath, relPath, files, emptyDirs);
    } else if (entry.isFile() || entry.isSymbolicLink()) {
      files.push({ fullPath, relPath: toPosix(relPath) });
    }
  }
}

const files = [];
const emptyDirs = [];
walk(outDir, "", files, emptyDirs);

if (files.length === 0) {
  console.error(`Error: no files found under ${outDir}.`);
  process.exit(1);
}

const output = fs.createWriteStream(zipPath);
const archive = new ZipArchive({ zlib: { level: 9 } });

output.on("close", () => {
  const sizeMb = (archive.pointer() / (1024 * 1024)).toFixed(2);
  console.log(`Wrote ${zipPath} (${archive.pointer()} bytes, ${sizeMb} MB), ${files.length} file(s), ${emptyDirs.length} empty dir(s).`);
});

archive.on("warning", (err) => {
  throw err;
});
archive.on("error", (err) => {
  throw err;
});

archive.pipe(output);

for (const file of files) {
  archive.file(file.fullPath, { name: file.relPath });
}

// Preserve any genuinely empty directories as explicit directory entries.
for (const dir of emptyDirs) {
  archive.append(null, { name: `${toPosix(dir)}/` });
}

await archive.finalize();
