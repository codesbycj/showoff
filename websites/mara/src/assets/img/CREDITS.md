# Credits

**Every image in this folder belongs to the reference site and is used unchanged.** That is
rule 0 of this series: the after is a pixel-perfect rebuild of a reference home page, and
the images are part of what is rebuilt.

## What this project is, and is not

- A **private design study**, run on `localhost:5232`. **Not deployed**, not published.
- **All of the written copy is invented** — the brand, the headings, the product names,
  the stockists, the prices and the legal line — written to the reference's own lengths so
  the lines break where its lines break.
- **Not affiliated with the reference site.**

## How the set was collected

```bash
node tools/dump.js   https://<reference>/ ./out
node tools/assets.js ./out ./out/img
python tools/bake.py ./out/img
```

`bake.py` caps each file's long edge at twice the size the reference paints it at and
writes webp: 6.1MB of PNG becomes 1.8MB with nothing visible changing.

### Two images the DOM walk could not see

The reference is a Framer site and its hero is **drawn into a canvas** — a hidden
4320×2700 buffer and a visible 1440×900 one — so there is no `src`, no `srcset`, no
`<source>` and no `background-image` anywhere pointing at it. `dump.js` collected 72 URLs
and the hero was not among them.

They were recovered from `performance.getEntriesByType('resource')`, which lists every URL
the page actually fetched whether or not anything in the DOM still refers to it:

```js
performance.getEntriesByType('resource')
  .filter((e) => /framerusercontent|\.(png|jpg|webp|avif)/i.test(e.name))
```

That turned up `JMlFxkbPdV16dtqSqtwzOcRoCZs.png` (the hero, 2400×1800) and
`eJz6nSHKQGwj2a2fxzK5jYek.png`. Worth remembering for any canvas- or WebGL-driven
reference: **the network log is the complete list, the DOM is not.**

## The one thing that is not the reference's

The reference's stockist list prints seven real cosmetics houses. A list of real brand
names on an invented shop is a factual claim about those companies, so these are invented
at the same name lengths and the same meta shape. It is the only departure from "the
design's images and arrangement are copied", and the README lists it.

## Fonts

**No substitutes.** This is the first episode in the series that needs none.

| Font | Licence | Used for |
|---|---|---|
| Clash Display 400 / 500 | ITF Free Font License, from [Fontshare](https://www.fontshare.com/fonts/clash-display) | Everything except the two italic lines |
| Inter Variable | SIL OFL 1.1, `@fontsource-variable/inter` | The Light italic statement lines |

The reference loads Clash Display and Inter, and Indian Type Foundry gives Clash Display
away — so the build's letterforms are not *close to* the reference's, they are the same
ones. The two woff2 files and the ITF licence are bundled in `src/assets/fonts/`.

The wordmark is not set at a chosen size. The reference's is `font-size: 195.593px` — three
decimal places because Framer solved it: eleven characters across 1376px. The build solves
it the same way with `useFitText`, so it fills the measure at any width and for any
length of brand name, which a hard-coded 195.593 would not.
