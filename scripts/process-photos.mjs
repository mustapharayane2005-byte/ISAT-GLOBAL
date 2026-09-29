/**
 * One-off processing pass for the photography drop in public/images/originals/.
 * Detects and trims any solid-color parasitic border (screenshot chrome,
 * letterboxing), then resizes (never upscales) and writes {id}.webp at quality 85.
 * Run with: node scripts/process-photos.mjs
 */
import sharp from 'sharp';
import { readdirSync, mkdirSync, statSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const originalsDir = join(root, 'public', 'images', 'originals');
const outDir = join(root, 'public', 'images');

// filename (without extension, trailing period included) -> slot id
const MAPPING = {
  'Sovereign by design.': { id: 'isat-one', maxWidth: 2400 },
  'Fast at home.': { id: '5g-home', maxWidth: 1800 },
  'Lagos first.': { id: 'phase-1', maxWidth: 1800 },
  'Fibre, city by city.': { id: 'phase-2', maxWidth: 1800 },
  'Every state capital.': { id: 'phase-3', maxWidth: 1800 },
  'Smarter factories.': { id: 'sector-manufacturing', maxWidth: 1800 },
  'Farms that see.': { id: 'sector-agriculture', maxWidth: 1800 },
  'Every classroom, online.': { id: 'sector-education', maxWidth: 1800 },
  'Care, at a distance.': { id: 'sector-healthcare', maxWidth: 1800 },
  'Services, simplified.': { id: 'sector-government', maxWidth: 1800 },
  'Every sale, instant.': { id: 'sector-retail', maxWidth: 1800 },
};

/**
 * Scans each of the four edges for a solid-color band (screenshot chrome,
 * letterboxing, a watermark strip) and returns a crop rect that removes it.
 * Requires near-zero variance across a band that's a meaningful fraction of
 * the dimension, and is capped, so it can never eat into real photo content.
 */
async function detectParasiticBorder(image, meta) {
  const { width, height } = meta;
  const raw = await image.clone().raw().toBuffer({ resolveWithObject: true });
  const { data, info } = raw;
  const channels = info.channels;

  function rowUniform(y) {
    let rSum = 0, gSum = 0, bSum = 0, rSq = 0, gSq = 0, bSq = 0;
    for (let x = 0; x < width; x++) {
      const idx = (y * width + x) * channels;
      const r = data[idx], g = data[idx + 1], b = data[idx + 2];
      rSum += r; gSum += g; bSum += b;
      rSq += r * r; gSq += g * g; bSq += b * b;
    }
    const n = width;
    const rVar = rSq / n - (rSum / n) ** 2;
    const gVar = gSq / n - (gSum / n) ** 2;
    const bVar = bSq / n - (bSum / n) ** 2;
    return Math.sqrt(rVar + gVar + bVar) < 6; // near-flat row
  }

  function colUniform(x) {
    let rSum = 0, gSum = 0, bSum = 0, rSq = 0, gSq = 0, bSq = 0;
    for (let y = 0; y < height; y++) {
      const idx = (y * width + x) * channels;
      const r = data[idx], g = data[idx + 1], b = data[idx + 2];
      rSum += r; gSum += g; bSum += b;
      rSq += r * r; gSq += g * g; bSq += b * b;
    }
    const n = height;
    const rVar = rSq / n - (rSum / n) ** 2;
    const gVar = gSq / n - (gSum / n) ** 2;
    const bVar = bSq / n - (bSum / n) ** 2;
    return Math.sqrt(rVar + gVar + bVar) < 6;
  }

  const maxBand = 0.08; // never trim more than 8% off any single edge
  let top = 0, bottom = 0, left = 0, right = 0;

  for (let y = 0; y < height * maxBand; y++) {
    if (rowUniform(y)) top = y + 1; else break;
  }
  for (let y = height - 1; y > height * (1 - maxBand); y--) {
    if (rowUniform(y)) bottom = height - y; else break;
  }
  for (let x = 0; x < width * maxBand; x++) {
    if (colUniform(x)) left = x + 1; else break;
  }
  for (let x = width - 1; x > width * (1 - maxBand); x--) {
    if (colUniform(x)) right = width - x; else break;
  }

  // Require a real band (>0.5% of the dimension) before acting, so JPEG noise
  // on a single edge pixel row never triggers a crop.
  top = top > height * 0.005 ? top : 0;
  bottom = bottom > height * 0.005 ? bottom : 0;
  left = left > width * 0.005 ? left : 0;
  right = right > width * 0.005 ? right : 0;

  if (!top && !bottom && !left && !right) return null;

  return {
    left,
    top,
    width: width - left - right,
    height: height - top - bottom,
  };
}

mkdirSync(outDir, { recursive: true });

const files = readdirSync(originalsDir);
const report = [];

for (const [titleKey, { id, maxWidth }] of Object.entries(MAPPING)) {
  const file = files.find((f) => f === `${titleKey}.jpg` || f === `${titleKey}jpg` || f.startsWith(titleKey));
  if (!file) {
    report.push({ id, error: `source not found for "${titleKey}"` });
    continue;
  }

  const srcPath = join(originalsDir, file);
  let image = sharp(srcPath).rotate(); // rotate() bakes in EXIF orientation
  const meta = await image.metadata();
  const isPortrait = meta.height > meta.width;

  const border = await detectParasiticBorder(image, meta);
  if (border) {
    image = image.extract(border);
  }

  const workingMeta = border
    ? { width: border.width, height: border.height }
    : { width: meta.width, height: meta.height };

  const minWidth = isPortrait ? 1200 : 1600;
  const tooSmall = workingMeta.width < minWidth;

  const targetWidth = Math.min(workingMeta.width, maxWidth);
  const upscale = targetWidth > workingMeta.width; // should never happen given the min() above

  const outPath = join(outDir, `${id}.webp`);
  await image
    .resize({ width: targetWidth, withoutEnlargement: true })
    .webp({ quality: 85 })
    .toFile(outPath);

  const outMeta = await sharp(outPath).metadata();
  const outSize = statSync(outPath).size;

  report.push({
    id,
    source: file,
    sourceDims: `${meta.width}x${meta.height}`,
    borderTrimmed: border ? `${border.left}/${border.top}/${meta.width - border.left - border.width}/${meta.height - border.top - border.height} (L/T/R/B px)` : 'none',
    outDims: `${outMeta.width}x${outMeta.height}`,
    outSizeKB: Math.round(outSize / 1024),
    tooSmall,
    upscaledFlag: upscale,
  });
}

console.log(JSON.stringify(report, null, 2));

const missing = report.filter((r) => r.error);
const small = report.filter((r) => r.tooSmall);
if (missing.length) console.log('\nMISSING SOURCES:', missing.map((r) => r.id));
if (small.length) console.log('\nTOO SMALL (flag for replacement):', small.map((r) => r.id));
