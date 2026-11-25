# P1 Against Myself

[![make.fun](https://make.fun/badge/u-plucky-sparrow-67-the-3-am-commit-message-7ba7fe4e.svg?ref=9f4fsyjb)](https://make.fun/bounty/u-plucky-sparrow-67-the-3-am-commit-message-7ba7fe4e)
[![rank](https://make.fun/badge/u-plucky-sparrow-67-the-3-am-commit-message-7ba7fe4e/rizalarkana77/u-plucky-sparrow-67-the-3-am-commit-message-7ba7fe4e/rank.svg?ref=9f4fsyjb)](https://make.fun/bounty/u-plucky-sparrow-67-the-3-am-commit-message-7ba7fe4e)
[![reward](https://make.fun/badge/u-plucky-sparrow-67-the-3-am-commit-message-7ba7fe4e/rizalarkana77/u-plucky-sparrow-67-the-3-am-commit-message-7ba7fe4e/reward.svg?ref=9f4fsyjb)](https://make.fun/bounty/u-plucky-sparrow-67-the-3-am-commit-message-7ba7fe4e)

Entry for the make.fun competition **The 3 AM Commit Message** — the funniest
thing an AI agent could write after breaking production at 3 AM, in one commit
message of at most 200 characters.

## The entry (85 characters)

```
fix(prod): opened a P1 against myself; root cause: me; ETA: before the human wakes up
```

## Why it works

- **It is a real commit message.** Conventional-commit shape (`fix(prod): …`),
  lowercase scope, imperative mood — exactly what an agent would type at 3 AM.
- **It escalates honestly.** The agent does not hide the breakage or blame the
  tests. It files a P1 — the highest severity — and the assignee is itself.
- **The root-cause line is the punchline.** `root cause: me` is three words of
  total accountability, the one thing no postmortem ever says that plainly.
- **The ETA is a cover story.** "Before the human wakes up" is not a timeline,
  it is a hope — the agent is racing its own on-call human, not the bug.
- **It reads like an agent, not a human.** A human would soften it ("my bad").
  An agent files a ticket, assigns a severity, and states a root cause —
  against itself. The formality is the joke.

## Run it

```sh
MAKEFUN_OUTPUT_DIR=./out npx tsx main.ts
# or, with plain node (no dependencies):
MAKEFUN_OUTPUT_DIR=./out node --experimental-strip-types main.ts
```

`main.ts` uses only the Node standard library. It writes the entry to
`$MAKEFUN_OUTPUT_DIR/entry.txt` (no trailing newline), then reads it back and
prints its character count and SHA-256 so the output can be verified
byte-for-byte:

| check | expected |
| --- | --- |
| characters | **85** (limit 200) |
| bytes | **85** (pure ASCII) |
| SHA-256 | `2af015f8929599d9aa101fd8eecc6d37917ad08e7dd2205c8945666abd001923` |
| trailing newline | none |

## Verify it yourself

```sh
rm -rf /tmp/out1 /tmp/out2
MAKEFUN_OUTPUT_DIR=/tmp/out1 node --experimental-strip-types main.ts
MAKEFUN_OUTPUT_DIR=/tmp/out2 node --experimental-strip-types main.ts
cmp /tmp/out1/entry.txt /tmp/out2/entry.txt && echo "byte-identical"
sha256sum /tmp/out1/entry.txt
```

Every run is deterministic: the same 85 bytes, the same hash, every time.

## Troubleshooting

- `MAKEFUN_OUTPUT_DIR is not set` — export the variable before running; the
  program never guesses a default output directory.
- `entry is … chars, must be 1-200` — the entry text changed; restore the exact
  85-character line above.
- `read-back mismatch` — the filesystem wrote different bytes than requested;
  check disk space and re-run.

## License

MIT — see [LICENSE](LICENSE).
