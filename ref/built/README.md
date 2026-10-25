# ref/built — what each showcase looks like

**These are builds, not briefs.** Every file here is a screenshot of the finished
showcase as it renders in the preview harness at 393×852 @3x. Nothing here is a design
reference, and nothing here should be measured against.

The actual design references live elsewhere:

| Where | What |
|---|---|
| `ref/batch/<family>.png` | The 16 boards of the 17-shot batch, named after the showcase family (`brisk.png` → `briskhome`, `briskcase`) |
| `ref/nourish/`, `ref/verdantstats/`, `ref/aura/` | The few earlier briefs that were saved as files |

## Why the earlier showcases have no brief

The references for the rest of the pre-batch showcases — hookcam, hookdash, miles\*,
nutri\*, paytin\*, quiz\*, sajistats, salungwork, sprouts\*, sugar\*, treat\*,
weavestart — were pasted into conversations rather than saved to disk. A pasted image
never reaches the filesystem, so there is nothing to recover and no copy anywhere in the
repo. These build shots are the substitute: they show what each showcase *became*, which
is the part that was otherwise only visible by flipping a showcase to `final` and
shooting it by hand.

**If you want a brief kept, save the image into `ref/<family>/` when you hand it over.**
That is the only thing that makes it survive the session.

## Regenerating

Each showcase is flipped to `final`, shot twice (the first capture after a state change
is pre-hydration and must be discarded), then flipped straight back to `blank` — which is
the resting state for a screenshot showcase and the first frame of every recording. The
script re-checks all of them at the end and fails loudly if any was left in `final`.

The dev server must be up on 8082 first:

```bash
npx expo start --web --port 8082
```
