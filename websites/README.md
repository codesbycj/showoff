# websites

Front-end builds that exist to get a piece of motion right — one self-contained project
per site.

Each folder is its own app with its own `package.json`, lockfile and `node_modules`.
Nothing is shared with the repository root, which is an Expo / React Native project:
a Vite app borrowing that dependency tree would be a permanent source of version
conflicts for no benefit. Clone the repo, pick a folder, install, and it runs.

| Folder | What it is | Built with |
|---|---|---|
| [`iota/`](./iota) | A fictional architecture studio — acronym loader, pinned scroll | React 19 · Vite 8 · Tailwind 4 · GSAP · Lenis |
| [`veld/`](./veld) | A fictional racing driver — a loader whose white screen is the car number | React 19 · Vite 8 · Tailwind 4 · GSAP · Lenis |
| [`switchblade/`](./switchblade) | One section of a reference site — an arcing product row that dresses the figure it passes | React 19 · Vite 8 · Tailwind 4 · Lenis |
| [`tallow/`](./tallow) | A fictional video editor — app icons that fly out of a sentence onto a timeline | React 19 · Vite 8 · Tailwind 4 · GSAP · Lenis |
| [`ribbon/`](./ribbon) | A fictional designer — a card strip bent by scroll velocity, and a hover that dents without moving the outline | React 19 · Vite 8 · Tailwind 4 · three.js · GSAP |
| [`stub/`](./stub) | One section of a reference site — three ticket cards dealt up from below the fold and flipped over in turn | React 19 · Vite 8 · Tailwind 4 · Lenis |
| [`bulwark/`](./bulwark) | One reference site, rebuilt — a loading screen whose black wall is shoved across by a figure braced against it, and a wheel-driven 3D collage of projects | React 19 · Vite 8 · Tailwind 4 · GSAP |
| [`onesheet/`](./onesheet) | One section of a reference site — six service cards stepping forward through a perspective stack, the front one thrown off the top | React 19 · Vite 8 · Tailwind 4 · GSAP · Lenis |
| [`pennant/`](./pennant) | One screen of a reference site — a looping render of ribbons drawn through a WebGL displacement field that the pointer pushes around | React 19 · Vite 8 · Tailwind 4 · WebGL · GSAP |

The repository root has a passthrough script per site, so you never have to think about
which directory you are in:

```bash
npm run install:iota     # npm --prefix websites/iota install
npm run dev:iota         # http://localhost:5180
npm run build:iota

npm run install:veld
npm run dev:veld         # http://localhost:5184
npm run build:veld

npm run install:switchblade
npm run dev:switchblade  # http://localhost:5188
npm run build:switchblade

npm run dev:tallow       # http://localhost:5192
npm run build:tallow

npm run dev:ribbon       # http://localhost:5196
npm run build:ribbon

npm run dev:stub         # http://localhost:5200
npm run build:stub

npm run dev:bulwark      # http://localhost:5204
npm run build:bulwark

npm run dev:onesheet     # http://localhost:5208
npm run build:onesheet

npm run dev:pennant      # http://localhost:5212
npm run build:pennant
```

**Install from inside the folder**, with a plain `npm install`, not through a root
`install:` script. `npm --prefix websites/<slug> install` run from the repository root
writes `"showoff": "file:../.."` into that site's `package.json` and symlinks the Expo
project into its `node_modules` — exactly the coupling this folder exists to prevent.
The `dev:` and `build:` passthroughs are fine; it is only `install:` that does it, which
is why `tallow`, `ribbon`, `stub`, `bulwark`, `onesheet` and `pennant` have no
`install:` script.

Each site pins its own port with `strictPort`, so starting one while it is already
running fails loudly instead of quietly moving to the next free port and leaving every
screenshot tool pointed at the wrong site.

These use `npm --prefix <dir>` rather than a `cd`, so they behave the same in PowerShell,
cmd and bash.

## House rules

Every project in here:

- keeps all its timings in one `src/motion/motion.ts`, so a number can be found and
  changed in one place rather than hunted across a dozen components;
- invents its own brand, copy and project list — nothing is lifted from a real company;
- uses free-licensed photography and credits every file;
- takes `prefers-reduced-motion` seriously, by switching off the loaders and pinned
  sections that setting exists for, not just shortening transitions;
- passes `tsc`, `eslint` and `vite build` clean.

Three exceptions, declared rather than quiet: [`switchblade/`](./switchblade),
[`bulwark/`](./bulwark) and [`pennant/`](./pennant) use their reference sites' own imagery,
so their motion could be checked against them frame for frame. All three are private
studies and are not to be deployed; see each one's `README.md` and its `CREDITS.md`.

`pennant` is the narrowest of the three and the clearest about why: the whole study is a
displacement shader applied to one looping render, and a shader can only be checked by
pointing it at the same pixels. Its brand, mark and copy are invented; the two files in
`src/assets/video/` are not.

`bulwark` is the clearer case for why the exception exists at all. Its reference's home is
a 3D collage, so the motion *is* plates of a given shape sweeping past a camera, and the
arrangement was measured off stills of those exact plates. It was first built with
invented projects and generated abstract art, and with stand-ins there was nothing to
check the geometry against — the diagonal ran the wrong way and nothing in the build could
have revealed it.

## Adding another

```bash
cp -r iota <slug> && cd <slug>
rm -rf node_modules dist src/assets/images/*
npm install
```

Then measure before you build. The quickest way into a site's motion is reading what it
ships rather than watching it:

1. Look at the script filenames in the page source. They are usually honest —
   `preloader-*.js`, `lenisSmooth-*.js` will name the whole stack before you read a line.
   A `<meta name="generator">` is worth reading first: a Webflow site ships its
   interactions as an IX2 action list, and a Framer site ships its components as a plain
   ES module with every `duration:` and `ease:` sitting in it as a literal. See
   [`bulwark/README.md`](./bulwark#getting-the-numbers-out-of-the-reference) for the
   Framer recipe, including what to do about the parts drawn into a WebGL canvas, which
   are in neither the module nor a headless screenshot.
2. Download those files and the stylesheet. Minified GSAP is still readable, and every
   duration and easing curve is sitting there as a plain number.
3. Search the CSS for `cubic-bezier` and `transition:`, then sort by how often each
   appears. Three or four curves usually carry an entire site.
4. Only then record it playing, to check that what you read is what it does.
