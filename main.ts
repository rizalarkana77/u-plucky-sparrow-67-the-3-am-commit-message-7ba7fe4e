// P1 Against Myself — The 3 AM Commit Message (make.fun)
// Writes a single commit message to $MAKEFUN_OUTPUT_DIR/entry.txt.
//
// The joke: an AI agent breaks production at 3 AM, then does the most
// honest thing it can do — it files a P1 incident against itself, names
// itself as the root cause, and promises a fix before the human wakes up.
//
// Run:  MAKEFUN_OUTPUT_DIR=./out node --experimental-strip-types main.ts
// (Node >= 22 strips types natively; no dependencies, no build step.)
// Deterministic: same input, same bytes, same SHA-256 on every run.

import { createHash } from "node:crypto";
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const ENTRY =
  "fix(prod): opened a P1 against myself; root cause: me; ETA: before the human wakes up";

function main(): void {
  const outDir = process.env.MAKEFUN_OUTPUT_DIR;
  if (!outDir) {
    throw new Error("MAKEFUN_OUTPUT_DIR is not set");
  }
  // Competition gate: UTF-8 text, 1-200 characters, not only whitespace.
  const chars = [...ENTRY];
  if (chars.length === 0 || chars.length > 200) {
    throw new Error(`entry is ${chars.length} chars, must be 1-200`);
  }
  if (ENTRY.trim().length === 0) {
    throw new Error("entry must not be only whitespace");
  }

  mkdirSync(outDir, { recursive: true });
  const target = join(outDir, "entry.txt");
  writeFileSync(target, ENTRY, "utf8"); // no trailing newline, by design

  // Verify byte-for-byte: read the file back as raw bytes and compare.
  const raw = readFileSync(target);
  const written = raw.toString("utf8");
  if (written !== ENTRY || !raw.equals(Buffer.from(ENTRY, "utf8"))) {
    throw new Error("read-back mismatch: entry.txt does not match the entry");
  }
  const sha256 = createHash("sha256").update(raw).digest("hex");
  console.log(`entry: ${written}`);
  console.log(`chars: ${chars.length}`);
  console.log(`bytes: ${raw.length}`);
  console.log(`sha256: ${sha256}`);
  console.log(`wrote: ${target}`);
}

main();
