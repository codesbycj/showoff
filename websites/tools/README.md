# websites/tools — the series harness

Five scripts, shared by every episode. They talk to headless Chrome over CDP directly;
there is no Puppeteer dependency and nothing to install, because Node 22's built-in
`WebSocket` is enough.

```bash
# Photograph a page in viewport-height bands.
node tools/pageshot.js http://localhost:5240/ out --bands 10 \
  --eval "[...document.querySelectorAll('button')].find(b=>b.textContent.trim()==='After CJ')?.click()"
node tools/pageshot.js http://localhost:5240/ out --w 390 --h 844 --bands 4   # a phone
node tools/pageshot.js http://localhost:5240/ out --reduced                   # prefers-reduced-motion

# Measure a design. Rule 6.
node tools/probe.js http://localhost:5240/            # the after
node tools/probe.js http://localhost:5240/ --before   # the before
node tools/probe.js http://localhost:5240/ --w 390    # at a phone width

# Photograph every hover, rest and hover, as pairs. Rule 5.
node tools/hovers.js http://localhost:5240/ out spec.json
node tools/hovers.js http://localhost:5240/ out spec.json --before

# Survey a reference once, into files. Rule 4, and always the first thing.
node tools/dump.js https://reference.example/ ./out --block klaviyo,gorgias,consentmo

# Download every image it paints, at the largest size offered. Rule 10.
node tools/assets.js ./out ./out/img

# Ask a page a one-off question that is not worth a screenshot.
node tools/eval.js http://localhost:5228/ ./measure.js
```

## Block the app furniture, do not delete it

A commercial reference carries bolted-on Shopify/Webflow apps — a newsletter popup, a chat
bubble, a cookie bar, an accessibility widget. None is the reference's design and all four
sit over a capture. **Removing them from the DOM does not work**: they are on timers and
come back between the eval and the first band, and a sweeper on an interval is a race that
is sometimes lost. `--block` passes substrings to `Network.setBlockedURLs`, so they never
load. That cannot be lost.

`spec.json` is a list of `{ "name", "sel", "pad" }`. Each entry is scrolled into view, shot
with the pointer parked in the corner, then shot again with a real `Input.dispatchMouseEvent`
over its centre — `:hover` responds to nothing else.

## Why bands rather than one tall capture

`Page.captureScreenshot` with `captureBeyondViewport: true` re-triggers every
IntersectionObserver at once, so a 9,000px page comes back mid-animation. Scrolling and
shooting the viewport is what a reader actually sees. `--settle` (default 2600ms) is the
wait between the scroll and the shutter; shorten it only if nothing on the page animates.

## Two traps in `probe.js`, both of which cost a debugging round

The measuring code is one long **template literal**, so:

- a **backtick in a comment inside it ends the literal**, and the error points at the next
  identifier rather than at the backtick;
- a **backslash in a regex is eaten by it** — `\/` becomes `/` and closes the regex early,
  `\s` becomes `s`. Double them.

There is a note to that effect at the top of the literal. Three separate `SyntaxError`s
came from forgetting it.

## The first capture after a cold server is pre-hydration

Vite's first request compiles; images have not decoded. A shot taken 1.8s after
`Page.navigate` on a freshly started server comes back with blank image boxes and the
toggle unclicked. Pass `--wait 5000` after starting a dev server, or shoot twice.

## `hovers.js` has three fields, and one of them exists for fixed chrome

A spec entry is `{ "name", "sel", "pad" }` plus, optionally:

- **`"press": true`** — photograph `:active` instead of `:hover`. Episode 10's reference
  lightens its only button on `active:` and has no hover rule on it at all, which a
  pointer-move capture shows as a pair identical to the rest shot.
- **`"pre": "<expression>"`** — one expression evaluated before the element is measured.
- **`"scroll": n`** — scroll to `n` instead of centring the element.

Photographing a `position: fixed` header needs `pre` and needs all three of these,
each of which cost an attempt:

1. `scroll-behavior: smooth` makes `window.scrollTo` **animate**, so scrolling and
   measuring in one breath measures the old position. Set `scrollBehavior = 'auto'`
   first.
2. `captureBeyondViewport: true` renders the page at the clip's page offset, **where a
   fixed element is not** — the crop comes back as whatever is at that part of the
   document. Turning it off is worse: under a device-metrics override the surface is
   blank white. Make the element `position: absolute` with `top = scrollY + 'px'`
   instead.
3. `backdrop-filter` is **not painted into a beyond-viewport capture at all** — not the
   blur and not the element's own background — so a frosted bar is invisible over
   whatever is behind it. Clear the filter and give it a flat fill for the shot.

Cloning the chrome into the page does not work: the clone paints, but a dispatched
pointer never sets `:hover` on it.

**Diff every pair numerically rather than looking at a contact sheet.** A 10% dark pill
over white is easy to miss at thumbnail scale, and `maxdiff == 0` is the only way to
tell "this element has no hover" — a finding worth writing down — from "the capture
missed it".
