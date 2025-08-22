#!/usr/bin/env node
/*
  Generate PNG favicons and Apple touch icon from public/favicon.svg
*/
const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const SRC = path.join(__dirname, '..', 'public', 'favicon.svg');
const OUT = path.join(__dirname, '..', 'public');

const tasks = [
  { out: 'favicon-16x16.png', size: 16 },
  { out: 'favicon-32x32.png', size: 32 },
  { out: 'apple-touch-icon.png', size: 180 },
  { out: 'favicon-192x192.png', size: 192 },
  { out: 'favicon-512x512.png', size: 512 }
];

async function run() {
  if (!fs.existsSync(SRC)) {
    console.error('Source SVG not found:', SRC);
    process.exit(1);
  }
  await Promise.all(
    tasks.map(({ out, size }) =>
      sharp(SRC)
        .resize(size, size, { fit: 'contain', background: { r: 0, g: 0, b: 0, alpha: 0 } })
        .png({ compressionLevel: 9 })
        .toFile(path.join(OUT, out))
    )
  );
  console.log('Icons generated in public/:', tasks.map(t => t.out).join(', '));
}

run().catch(err => {
  console.error(err);
  process.exit(1);
});

