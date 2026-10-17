/**
 * Generates raster icons from app/icon.svg:
 *   app/favicon.ico (16, 32, 48), app/apple-icon.png (180),
 *   public/icons/icon-192.png, icon-512.png, icon-maskable-512.png
 *
 * Run with: node scripts/generate-icons.mjs
 */
import { readFile, writeFile, mkdir } from "node:fs/promises";
import sharp from "sharp";

const svg = await readFile(new URL("../app/icon.svg", import.meta.url));
const png = (size) => sharp(svg, { density: 72 * (size / 32) * 2 }).resize(size, size).png().toBuffer();

// ICO container holding PNG-encoded images (supported by all modern browsers).
async function ico(sizes) {
  const images = await Promise.all(sizes.map(png));
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0);
  header.writeUInt16LE(1, 2);
  header.writeUInt16LE(images.length, 4);
  let offset = 6 + 16 * images.length;
  const entries = images.map((img, i) => {
    const e = Buffer.alloc(16);
    e.writeUInt8(sizes[i] >= 256 ? 0 : sizes[i], 0);
    e.writeUInt8(sizes[i] >= 256 ? 0 : sizes[i], 1);
    e.writeUInt16LE(1, 4);
    e.writeUInt16LE(32, 6);
    e.writeUInt32LE(img.length, 8);
    e.writeUInt32LE(offset, 12);
    offset += img.length;
    return e;
  });
  return Buffer.concat([header, ...entries, ...images]);
}

// Maskable icons need the mark inside the central safe zone on a full-bleed background.
async function maskable(size) {
  const inner = await png(Math.round(size * 0.62));
  return sharp({ create: { width: size, height: size, channels: 4, background: "#0b0c0e" } })
    .composite([{ input: inner, gravity: "center" }])
    .png()
    .toBuffer();
}

await mkdir(new URL("../public/icons/", import.meta.url), { recursive: true });
await writeFile(new URL("../app/favicon.ico", import.meta.url), await ico([16, 32, 48]));
await writeFile(new URL("../app/apple-icon.png", import.meta.url), await png(180));
await writeFile(new URL("../public/icons/icon-192.png", import.meta.url), await png(192));
await writeFile(new URL("../public/icons/icon-512.png", import.meta.url), await png(512));
await writeFile(new URL("../public/icons/icon-maskable-512.png", import.meta.url), await maskable(512));
console.log("Icons generated.");
