# _catalog — generated thumbnails

**Not stock, and not a showcase.** These are screenshots of this repo's own
screens, shot off the dev server by `python tools/catalog.py` and downscaled to
210×455 JPEG (~20KB each). No `CREDITS.md`: nothing here is third-party.

They are read by `src/components/catalog/catalog.tsx`, which `src/app/index.tsx`
renders as the app's boot route.

**They go stale the moment a screen changes.** Re-run `python tools/catalog.py`
after a layout pass — a catalog showing last week's screens is worse than none.

This folder is **not** a slug, so `lock` and `preflight` do not track it and
`showcase.js wipe` does not remove it.
