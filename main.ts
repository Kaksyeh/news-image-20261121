// news-image-20261121 — "21 November 2026, in one picture".
// Entry program: copies the pre-built newspaper front page (entry.png,
// a 1024x1024 PNG summing up Saturday 21 November 2026's world news)
// to $MAKEFUN_OUTPUT_DIR/entry.png ("out" when the variable is unset).
// Node 22, standard library only; no network access.

import { copyFileSync, existsSync, mkdirSync, readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";

const repoDir = dirname(fileURLToPath(import.meta.url));
const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "out";
const src = join(repoDir, "entry.png");

// Fail clearly if the source image is missing or is not a real PNG.
if (!existsSync(src)) {
  throw new Error(`entry.png not found in ${repoDir}`);
}
const pngMagic = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);
if (!readFileSync(src).subarray(0, 8).equals(pngMagic)) {
  throw new Error("entry.png is not a valid PNG (bad magic bytes)");
}

mkdirSync(outDir, { recursive: true });
copyFileSync(src, join(outDir, "entry.png"));
