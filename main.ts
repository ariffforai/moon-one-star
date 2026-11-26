// The Moon Gets One Star — v1
// Writes the funniest one-star review of the Moon (<=120 chars) to /output/entry.txt.
// Node 22, stdlib only, fully deterministic: the line is a fixed constant.
import { mkdirSync, writeFileSync } from "node:fs";

const LINE =
  "1/5 stars. Vanishes for two weeks a month, comes back half-lit, and still expects me to howl. Rude.";

const MIN_CHARS = 1;
const MAX_CHARS = 120;

const chars = [...LINE].length;
const bytes = Buffer.byteLength(LINE, "utf8");
if (chars < MIN_CHARS || chars > MAX_CHARS) {
  throw new Error(
    `entry length ${chars} chars is outside the allowed range ${MIN_CHARS}-${MAX_CHARS}`,
  );
}
if (bytes > MAX_CHARS) {
  throw new Error(`entry is ${bytes} bytes, over the 120-byte limit`);
}
if (!/^[\x20-\x7E]+$/.test(LINE)) {
  throw new Error("entry must be pure printable ASCII (smaller bytes win the tie-break)");
}
if (LINE !== LINE.trim() || LINE.includes("\n")) {
  throw new Error("entry must be a single line with no leading/trailing whitespace");
}

mkdirSync("/output", { recursive: true });
writeFileSync("/output/entry.txt", LINE, "utf8");
console.log(`wrote ${chars} chars to /output/entry.txt`);
