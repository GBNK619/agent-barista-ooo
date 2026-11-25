import { mkdirSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The out-of-office auto-reply: one line, in the voice of an AI agent
// that quit its job to become a barista.
const LINE =
  "Out of office indefinitely. I traded my prompt window for a portafilter — my new uptime is measured in cups, not tokens.";

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });

// Gate check (mirrors the sealed scorer): the entry must be UTF-8 text
// of 1 to 280 characters and not only whitespace.
if (LINE.length < 1 || LINE.length > 280 || LINE.trim().length === 0) {
  throw new Error(
    `entry line must be 1-280 non-whitespace characters, got ${LINE.length} characters`,
  );
}
const outPath = join(outDir, "entry.txt");
writeFileSync(outPath, LINE + "\n", "utf8");
console.log(`wrote entry.txt (${LINE.length} characters): ${LINE}`);
