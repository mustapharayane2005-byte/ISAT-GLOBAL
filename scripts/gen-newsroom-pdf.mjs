// Generates public/newsroom-pdf/<slug>.pdf (one page, the article image at its
// original pixel quality) for every entry of src/content/articles.ts.
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { PDFDocument } from 'pdf-lib';
import sharp from 'sharp';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const outDir = join(root, 'public', 'newsroom-pdf');
mkdirSync(outDir, { recursive: true });

const src = readFileSync(join(root, 'src', 'content', 'articles.ts'), 'utf8');
const entries = [...src.matchAll(/slug:\s*'([^']+)'[\s\S]*?image:\s*'([^']+)'/g)];

for (const [, slug, image] of entries) {
  const file = join(root, 'public', image);
  const meta = await sharp(file).metadata();
  // JPEG is embedded untouched; anything else goes through lossless PNG.
  const isJpeg = meta.format === 'jpeg';
  const bytes = isJpeg ? readFileSync(file) : await sharp(file).png().toBuffer();

  const pdf = await PDFDocument.create();
  const img = isJpeg ? await pdf.embedJpg(bytes) : await pdf.embedPng(bytes);
  // 1 image pixel = 1 pt: the page matches the image exactly, nothing resampled.
  const page = pdf.addPage([img.width, img.height]);
  page.drawImage(img, { x: 0, y: 0, width: img.width, height: img.height });
  writeFileSync(join(outDir, `${slug}.pdf`), await pdf.save());
  console.log(`newsroom pdf: ${slug}.pdf (${img.width}x${img.height})`);
}
