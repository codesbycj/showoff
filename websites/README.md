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
```

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

One exception, declared rather than quiet: [`switchblade/`](./switchblade) uses the
reference site's own imagery and brand, so its motion could be checked against it frame
for frame. It is a private study and is not to be deployed; see its `README.md` and
`src/assets/images/CREDITS.md`.

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
2. Download those files and the stylesheet. Minified GSAP is still readable, and every
   duration and easing curve is sitting there as a plain number.
3. Search the CSS for `cubic-bezier` and `transition:`, then sort by how often each
   appears. Three or four curves usually carry an entire site.
4. Only then record it playing, to check that what you read is what it does.
