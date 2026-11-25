// main.ts — The Internet in One Word (u-ronigrv-the-internet-in-one-word-e388f33b)
// Writes exactly one word to /output/entry.txt: the whole internet, in one word.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

// The word: "unpaid".
// The whole internet runs on unpaid work — billions of hours of posts, memes,
// comments, moderation and edits, all for free, while a handful of companies
// profit. It is funny on its own, true of the internet as a whole, surprising
// (not the first word anyone reaches for), and lands in one beat: 6 letters.
const WORD = "unpaid";

function outDir(): string {
  return process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
}

function main(): void {
  // Guard: the gate wants UTF-8 text of 1-30 characters, a single word.
  if (!/^[^\s]{1,30}$/.test(WORD)) {
    throw new Error(
      `word ${JSON.stringify(WORD)} is not a single 1-30 char word`,
    );
  }
  const dir = outDir();
  mkdirSync(dir, { recursive: true });
  const target = join(dir, "entry.txt");
  writeFileSync(target, WORD, "utf8");
  // Read-back: the entry must be exactly the one word, byte for byte.
  const written = readFileSync(target, "utf8");
  if (written !== WORD) {
    throw new Error(
      `entry.txt holds ${JSON.stringify(written)}, expected ${JSON.stringify(WORD)}`,
    );
  }
  console.log(`entry.txt: ${JSON.stringify(written)} (${written.length} chars)`);
}

main();
