#!/usr/bin/env node
// Stage a built showcase for filming: write its blank and finished trees,
// put the markers in, and let gen.js turn them into steps.
//
//   node tools/timelapse/stage.js <slug>
//   node tools/timelapse/stage.js <slug> --dry     # print the plan, write nothing
//   node tools/timelapse/stage.js <slug> --dry --debug
//
// Why this exists. Authoring a blank file by hand was the largest cost of the
// first two apps - 141 step entries for one of them - and the reveal is
// mechanical: the screen's component imports come back one at a time, then
// the blocks of its JSX appear in the order they are assembled. A screen that
// obeys the repo's own rule ("screens are assembly, never markup") is a
// complete description of its own reveal, and this reads it.
//
// STEPS ARE ELEMENT-LEVEL, which is a rule and not a preference: RULES.md
// says "composite components are staged internally so a row fills in one item
// at a time instead of landing all at once", and the floor is 20 steps per
// showcase. Staging only the screen file gave 7-18 and made a rail land whole.
// So three levels are staged, in this order per block:
//
//   1. the screen's own JSX block            -> the shell appears
//   2. the component it mounts, internally   -> the shell fills
//   3. the data array that component renders -> the row fills item by item
//
// and if that still comes up short the screen's blocks are descended further,
// which is what carries a screen with no composite components of its own.
//
// Three traps it has to avoid, all of which have corrupted a blank file here
// before:
//
//   * **Any `*／` inside a staged block closes it early**, including a plain
//     JS block comment - so every comment is stripped from a wrapped region.
//   * **Nothing can be staged inside a ternary branch**, and a `{list.map()}`
//     is staged whole rather than the element it returns. A child that is a
//     bare `{expression}` is therefore wrapped as one unit and never entered.
//   * **A `cutel` needle must appear only in the staged duplicate**, so the
//     mistake uses a height no other line in the file uses.
//
// Blocks are found by indentation, not by counting brackets. Counting looked
// reasonable and was not: one mis-signed term chopped a single child into
// twenty, and the failure is silent - it just produces a worse reveal.
const fs = require('fs');
const path = require('path');

const here = __dirname;
const root = path.resolve(here, '../..');

const slug = process.argv[2];
const dry = process.argv.includes('--dry');
const debug = process.argv.includes('--debug');
if (!slug) {
  console.error('usage: stage.js <slug> [--dry] [--debug]');
  process.exit(1);
}

// The floor is the rule. The ceiling is so a feed of twelve posts does not
// become a flicker - past about forty beats the eye stops reading it as a
// build and starts reading it as noise.
const TARGET = 20;
const CEILING = 44;

const indentOf = (s) => (s.match(/^\s*/) || [''])[0].length;

/* ------------------------------------------------------------- JSX scanning */

/**
 * Where a block's opening tag finishes. Prettier puts the `>` of a
 * multi-line tag on its own line at the tag's own indent.
 */
function openTagEnd(lines, from, to, indent) {
  const first = lines[from];
  if (/[^/]>\s*$/.test(first) && !/^\s*<[A-Za-z][\w.]*\s*$/.test(first)) return from;
  for (let i = from + 1; i <= to; i += 1) {
    const t = lines[i];
    if (/^\s*\/?>\s*$/.test(t) && indentOf(t) === indent) return i;
  }
  return from;
}

/** The direct children of a region, by indentation. */
function collect(lines, fromLine, toLine) {
  let indent = null;
  const starts = [];
  for (let i = fromLine; i < toLine; i += 1) {
    const t = lines[i];
    if (!t.trim()) continue;
    const col = indentOf(t);
    if (indent === null) indent = col;
    // A closing tag at the same indent ends the previous child; it does not
    // start a new one. Treating `</View>` as a start split every wrapper
    // block in two and labelled the second half "the next block".
    const head = t.trim();
    if (col === indent && /^[<{]/.test(head) && !head.startsWith('</')) starts.push(i);
  }
  if (indent === null) return [];
  return starts.map((start, k) => {
    let end = (k + 1 < starts.length ? starts[k + 1] : toLine) - 1;
    while (end > start && !lines[end].trim()) end -= 1;
    return { start, end, indent, text: lines.slice(start, end + 1).join('\n') };
  });
}

/**
 * The top-level children of a file's returned root.
 *
 * `which` picks the function when a file has several: screens have one
 * `export default function`, but several of these files define a local
 * `Glyph` or a decorative `Svg` above it, and taking the first `return (` in
 * the file staged that component's paths instead of the screen's blocks.
 */
function scanJsx(abs, which) {
  const src = fs.readFileSync(abs, 'utf8');
  if (/\/\/ STEP \d+\.\d+|\{\/\* STEP \d+\.\d+/.test(src)) return { staged: true, src };
  const lines = src.split('\n');

  const exportRe = /^export (?:default )?function (\w+)/;
  let exportIdx = -1;
  for (let i = 0; i < lines.length; i += 1) {
    const m = exportRe.exec(lines[i]);
    if (!m) continue;
    if (!which || m[1] === which) {
      exportIdx = i;
      if (which) break;
    }
  }
  if (exportIdx < 0) return { src, lines, blocks: null, why: 'no exported function' };

  const retIdx = lines.findIndex((l, i) => i > exportIdx && /^\s*return \(\s*$/.test(l));
  if (retIdx < 0) return { src, lines, blocks: null, why: "no 'return ('" };

  const rootIndent = indentOf(lines[retIdx + 1] || '');
  const rootOpenEnd = openTagEnd(lines, retIdx + 1, lines.length - 1, rootIndent);

  let rootCloseIdx = lines.length - 1;
  for (let i = lines.length - 1; i > rootOpenEnd; i -= 1) {
    if (/^\s*<\/[A-Za-z][\w.]*>\s*$/.test(lines[i]) && indentOf(lines[i]) === rootIndent) {
      rootCloseIdx = i;
      break;
    }
  }
  return { src, lines, blocks: collect(lines, rootOpenEnd + 1, rootCloseIdx), rootCloseIdx };
}

const PAINTS = /backgroundColor|border[A-Za-z]*Width|borderColor|shadow|elevation:|opacity:/;

/** The direct children of a container child, whatever the count. */
function childrenOf(lines, child) {
  const first = lines[child.start].trim();
  if (!/^<[A-Z]/.test(first)) return null;
  if (/\/>\s*$/.test(lines[child.end])) return null;
  const openEnd = openTagEnd(lines, child.start, child.end, child.indent);
  if (openEnd >= child.end) return null;
  const kids = collect(lines, openEnd + 1, child.end);
  return kids.length ? kids : null;
}

/**
 * The first level under a block that has something to stage.
 *
 * A block whose only child is another positioning box yields one child, and
 * stopping there would mean the whole subtree is unreachable - which is how
 * half the batch stalled a few steps under the floor. Chase the chain of
 * single children until it forks.
 */
function descend(lines, child) {
  let kids = childrenOf(lines, child);
  for (let d = 0; d < 5 && kids && kids.length === 1; d += 1) {
    const deeper = childrenOf(lines, kids[0]);
    if (!deeper) break;
    kids = deeper;
  }
  return kids && kids.length >= 2 ? kids : null;
}

const isStatusBar = (c) => /^\s*<StatusBar\b/.test(c.text);
// A spacer is a box that only takes up room. One with a fill is a coloured
// band, which paints - excluded from the reveal it sat on screen from the
// first frame, and on clovehome it happened to match the page colour, so it
// got away with it.
const isSpacer = (c) =>
  /^\s*<View style=\{\{ (?:flex: 1|height: \d+|width: \d+)[^}]*\}\}\s*\/>\s*$/.test(c.text) &&
  !PAINTS.test(c.text);

const meaningful = (cs) => cs.filter((c) => !isStatusBar(c) && !isSpacer(c));

/** Descend the biggest enterable block once. Returns a new child list or null. */
function descendOnce(lines, children) {
  const order = meaningful(children)
    .slice()
    .sort((a, b) => b.end - b.start - (a.end - a.start));
  for (const cand of order) {
    const kids = descend(lines, cand);
    if (!kids) continue;
    if (process.env.STAGE_TRACE === '2') {
      console.error(
        `  descend ${cand.start + 1}-${cand.end + 1} -> ` +
          kids.map((k) => `${k.start + 1}-${k.end + 1}`).join(' '),
      );
    }
    const next = [];
    for (const c of children) {
      if (c === cand) next.push(...kids);
      else next.push(c);
    }
    return next;
  }
  return null;
}

/* --------------------------------------------------------------- labelling */

// `T` is every showcase's own text primitive, so it names a block no better
// than `View` does - and it is the root of about a third of them.
const GENERIC = new Set([
  'View',
  'ScrollView',
  'Pressable',
  'Text',
  'T',
  'SafeAreaView',
  'Animated',
  'Animated.View',
  'TouchableOpacity',
]);
const ALIAS = { Defs: 'the backdrop', Svg: 'the backdrop', G: 'the backdrop' };

const words = (tag) =>
  tag
    .replace(/([a-z0-9])([A-Z])/g, '$1 $2')
    .replace(/\./g, ' ')
    .toLowerCase();

/**
 * The first thing the block actually puts on screen, if it says it inline.
 *
 * The hard part is not finding the copy, it is rejecting everything else on a
 * prettier-formatted line. A style property sits on a line of its own
 * (`height: 6,`), which looks exactly like a word of copy until you insist
 * that copy carries no `:` `,` `=` quote or bracket - all of which belong to
 * code and none of which survive in a label.
 */
const CODEY = /[:;,=()'"`[\]{}<>]|=>/;
function firstCopy(text) {
  for (const raw of text.split('\n')) {
    const t = raw.trim();
    const inline = />([A-Za-z][^<>{}=\n]{0,43})<\//.exec(t);
    if (inline && !CODEY.test(inline[1])) return inline[1].trim();
    // A bare boolean prop (`horizontal`) also sits on a line of its own with
    // no punctuation at all. One lowercase token is a prop; copy is either
    // capitalised or more than one word.
    const bareProp = /^[a-z][A-Za-z]*$/.test(t);
    if (t && !bareProp && !CODEY.test(t) && /^[A-Za-z]/.test(t) && t.length <= 44) {
      return t.replace(/\s+/g, ' ').trim();
    }
  }
  return null;
}

function labelFor(text) {
  const rootTag = /^\s*<([A-Z][\w.]*)/.exec(text);
  if (rootTag && !GENERIC.has(rootTag[1]) && !ALIAS[rootTag[1]]) return words(rootTag[1]);

  const copy = firstCopy(text);
  if (copy) return `"${copy}"`;

  // A control's own accessibility label is the best name it has when its copy
  // is an interpolation - and every pressable here carries one.
  const a11y = /accessibilityLabel="([^"]{1,40})"/.exec(text);
  if (a11y) return `"${a11y[1]}"`;

  // `{home.greeting}` as a *child* is the greeting, and the last segment of
  // the path names it. Only as a child: matched anywhere, this caught
  // `color={ct.ink}` and labelled half the batch "ink".
  for (const raw of text.split('\n')) {
    const t = raw.trim();
    const m =
      /^\{\s*([A-Za-z_$][\w$]*(?:\.[\w$]+)+)\s*\}$/.exec(t) ||
      />\{\s*([A-Za-z_$][\w$]*(?:\.[\w$]+)+)\s*\}</.exec(t);
    if (m && !/^(?:ct|theme|colors|layout)\./.test(m[1])) {
      return words(m[1].split('.').pop());
    }
  }

  const tags = [...text.matchAll(/<([A-Z][\w.]*)/g)].map((t) => t[1]);
  const pick = tags.find((t) => !GENERIC.has(t) && !ALIAS[t]);
  if (pick) return words(pick);
  const aliased = tags.find((t) => ALIAS[t]);
  if (aliased) return ALIAS[aliased];
  if (tags[0]) return words(tags[0]);

  const word = /\{(\w+)/.exec(text);
  return word ? word[1].toLowerCase() : 'the next block';
}

const importLabel = (mod) => 'import ' + path.basename(mod).replace(/-/g, ' ');

/** Strip every comment from a region about to be wrapped in a JSX comment. */
function stripComments(block) {
  const out = [];
  let inBlock = false;
  for (const l of block.split('\n')) {
    const t = l.trim();
    if (inBlock) {
      if (t.endsWith('*/') || t.endsWith('*/}')) inBlock = false;
      continue;
    }
    if (t.startsWith('{/*') || t.startsWith('/*')) {
      if (!(t.endsWith('*/') || t.endsWith('*/}'))) inBlock = true;
      continue;
    }
    if (t.startsWith('//')) continue;
    out.push(l);
  }
  return out.join('\n');
}

/* ----------------------------------------------------------------- the plan */

const routeRel = `src/app/${slug}/index.tsx`;
const routeAbs = path.join(root, routeRel);
if (!fs.existsSync(routeAbs)) {
  console.error(`no route at ${routeRel}`);
  process.exit(1);
}

const screen = scanJsx(routeAbs, null);
// Refuse to stage a file that is already staged. `lock` and `rehearse` both
// leave the tree blank, so the route on disk after a gate run is the blank
// one - and reading that produces a blank file whose "blocks" are the JSX
// comments of the previous pass, with every import already commented out and
// therefore invisible. It writes cleanly and is wrong, which is the worst
// shape a failure can have.
if (screen.staged) {
  console.error(
    `${routeRel} is in blank state - this would stage the staging.\n` +
      `  node tools/timelapse/apply.js ${slug} final   # then stage again`,
  );
  process.exit(1);
}
if (!screen.blocks) {
  console.error(`${routeRel}: ${screen.why} - this screen is not plain assembly`);
  process.exit(1);
}

const lines = screen.lines;

/* ------------------------------------------------------------------ imports */

// Only the showcase's own component imports are staged. React, expo,
// react-native, the theme, the layout and the data have to be there from the
// first frame or nothing renders at all.
const featureImports = [];
lines.forEach((line, i) => {
  if (!/^import\s/.test(line)) return;
  const m = /from\s+'(@\/features\/[^']+\/components\/[^']+)'/.exec(line);
  if (!m) return;
  featureImports.push({ line: i, module: m[1], text: line });
});

/* -------------------------------------------------------------- data arrays */

const KEYED = /\b(?:key|id): '([^']+)'/;

/**
 * Every keyed array in the showcase's data files, with its entries.
 *
 * The first entry is deliberately left live. An empty array loses its
 * inferred type and `tsc` fails on the blank state with an implicit `any[]` -
 * and a rail that starts with one card and grows reads better than one that
 * starts as a gap.
 */
function readDataArrays() {
  const dir = path.join(root, 'src/features', slug, 'data');
  if (!fs.existsSync(dir)) return [];
  const out = [];
  for (const file of fs.readdirSync(dir).filter((f) => f.endsWith('.ts'))) {
    const rel = `src/features/${slug}/data/${file}`;
    const dl = fs.readFileSync(path.join(root, rel), 'utf8').split('\n');
    if (dl.some((l) => /\/\/ STEP \d+\.\d+/.test(l))) continue;
    const seen = new Map();
    for (let i = 0; i < dl.length; i += 1) {
      const m = /^export const (\w+)(?::[^=]+)? = \[\s*$/.exec(dl[i]);
      if (!m) continue;
      let close = -1;
      for (let k = i + 1; k < dl.length; k += 1) {
        if (/^\];?\s*(?:as const;)?\s*$/.test(dl[k]) || /^\]/.test(dl[k])) {
          close = k;
          break;
        }
      }
      if (close < 0) continue;
      const entries = [];
      const kids = collect(dl, i + 1, close);
      for (const kid of kids) {
        const head = dl[kid.start].trim();
        const multi = head === '{';
        const keyLine = multi ? dl[kid.start + 1] : dl[kid.start];
        const km = KEYED.exec(keyLine || '');
        // `block` walks up to the first `// {` and down to the first `// },`,
        // so the key has to be the entry's own first field or the walk stops
        // inside a nested object.
        if (!km) continue;
        if (!/^\},?$/.test(dl[kid.end].trim()) && multi) continue;
        entries.push({ start: kid.start, end: kid.end, key: km[1], multi, text: kid.text });
      }
      if (entries.length < 2) continue;
      // A key reused anywhere else in the file would make `entry` act on the
      // wrong one - it takes the first commented hit in the whole file.
      for (const e of entries) seen.set(e.key, (seen.get(e.key) || 0) + 1);
      out.push({ rel, file, name: m[1], entries, lines: dl });
    }
    for (const arr of out.filter((a) => a.rel === rel)) {
      arr.entries = arr.entries.filter((e) => seen.get(e.key) === 1);
    }
  }
  return out.filter((a) => a.entries.length >= 2);
}

const dataArrays = readDataArrays();

/* ---------------------------------------------------------------- components */

const COMPONENT_DIR = path.join(root, 'src/features', slug, 'components');
// Primitives. Staging `text.tsx` or `glyph.tsx` internally does not reveal a
// block of the design, it makes every label and every icon on the screen
// flicker at once.
const PRIMITIVES = new Set(['text', 'glyph', 'icon', 'icons', 'symbol']);

const kebab = (tag) =>
  tag
    .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
    .toLowerCase()
    .replace(/\./g, '-');

/** The feature component a screen block mounts, if it mounts exactly one. */
function componentFor(blockText) {
  if (!fs.existsSync(COMPONENT_DIR)) return null;
  const tags = [...blockText.matchAll(/<([A-Z][\w]*)/g)].map((m) => m[1]);
  for (const tag of tags) {
    const base = kebab(tag);
    if (PRIMITIVES.has(base)) continue;
    const abs = path.join(COMPONENT_DIR, base + '.tsx');
    if (fs.existsSync(abs)) return { name: base, abs, rel: `src/features/${slug}/components/${base}.tsx`, tag };
  }
  return null;
}

/* -------------------------------------------------------------- build a plan */

/**
 * Walk the screen's blocks and gather everything each one pulls in.
 *
 * Order is the whole point: the block's shell, then the component that fills
 * it, then the rows that fill *that*. Steps are numbered globally and gen.js
 * sorts by number across every file the screen touches, so the order here is
 * the order on screen.
 */
function buildPlan(children) {
  const blocks = meaningful(children);
  const usedComponents = new Set();
  const usedArrays = new Set();
  const plan = [];

  for (const block of blocks) {
    const item = { block, components: [], arrays: [] };

    // Follow the component the block mounts, and then the components *it*
    // mounts: "composite components are staged internally" does not stop at
    // one level, and a card that holds a row that holds a chip is three
    // beats, not one.
    const queue = [componentFor(block.text)].filter(Boolean);
    while (queue.length && item.components.length < 4) {
      const comp = queue.shift();
      if (usedComponents.has(comp.name)) continue;
      const scan = scanJsx(comp.abs, comp.tag);
      if (scan.staged || !scan.blocks) continue;
      // A component usually wraps everything in one positioning box, so its
      // root has a single child and there is nothing to stage until you go
      // in one level. `card-fan`'s root holds one `<View>`; a level down are
      // the three cards, which is the reveal.
      let kids = scan.blocks;
      for (let d = 0; d < 4 && meaningful(kids).length < 2; d += 1) {
        const next = descendOnce(scan.lines, kids);
        if (!next) break;
        kids = next;
      }
      // One block is usually not worth a file of its own — the component
      // would mount, show nothing, and then its only block would appear,
      // which is two beats for one event. The exception is a component whose
      // one block is a `{list.map()}`: there the empty shell appearing and
      // then filling row by row is the whole point, and the rows come from
      // the data file.
      const rendersKeyedList =
        meaningful(kids).length === 1 &&
        dataArrays.some((a) => new RegExp(`\\b${a.name}\\b`).test(scan.src));
      if (meaningful(kids).length < 2 && !rendersKeyedList) continue;
      usedComponents.add(comp.name);
      item.components.push({
        ...comp,
        lines: scan.lines,
        src: scan.src,
        children: kids,
        blocks: meaningful(kids),
      });
      for (const b of meaningful(kids)) {
        const sub = componentFor(b.text);
        if (sub && !usedComponents.has(sub.name)) queue.push(sub);
      }
    }

    // The array a block renders is named either in the block itself (the
    // screen passes it down) or inside the component (the component imports
    // it from `../data`).
    const haystack = [block.text, ...item.components.map((c) => c.src)].join('\n');
    for (const arr of dataArrays) {
      if (usedArrays.has(arr.name)) continue;
      if (!new RegExp(`\\b${arr.name}\\b`).test(haystack)) continue;
      usedArrays.add(arr.name);
      item.arrays.push(arr);
    }

    plan.push(item);
  }
  return plan;
}

function countPlan(plan, imports, mistakes = 1) {
  let n = imports;
  for (const item of plan) {
    n += 1;
    for (const c of item.components) n += c.blocks.length;
    for (const arr of item.arrays) n += arr.entries.length - 1;
  }
  return n + mistakes * 2; // each staged mistake is a show and a fix
}

/* ---------------------------------------------- how deep to go into the screen */

const stagedImportsOf = (children) => {
  const ranges = meaningful(children).map((c) => [c.start, c.end]);
  const inside = (i) => ranges.some(([a, b]) => i >= a && i <= b);
  const isCode = (l) => {
    const t = l.trim();
    return t && !t.startsWith('//') && !t.startsWith('*') && !t.startsWith('/*');
  };
  return featureImports.filter((imp) => {
    const names = [];
    const braced = /import\s+\{([^}]+)\}/.exec(imp.text);
    if (braced) {
      for (const part of braced[1].split(',')) {
        const name = part.trim().split(/\s+as\s+/).pop().trim();
        if (name && !name.startsWith('type ')) names.push(name);
      }
    }
    const def = /import\s+([A-Za-z_$][\w$]*)\s*(?:,|from)/.exec(imp.text);
    if (def) names.push(def[1]);
    if (!names.length) return false;
    for (let i = 0; i < lines.length; i += 1) {
      if (i === imp.line) continue;
      if (/^import\s/.test(lines[i]) || !isCode(lines[i])) continue;
      if (inside(i)) continue;
      for (const name of names) if (new RegExp(`\\b${name}\\b`).test(lines[i])) return false;
    }
    return true;
  });
};

let children = screen.blocks;
let plan = buildPlan(children);
let imports = stagedImportsOf(children);
let total = countPlan(plan, imports.length);

// Descend the screen's own blocks until the reveal clears the floor. A screen
// whose composite components carry it is already there; one built as markup -
// or one whose parts are all primitives - gets there this way.
for (let pass = 0; pass < 40 && total < TARGET; pass += 1) {
  const next = descendOnce(lines, children);
  if (!next) break;
  const nextPlan = buildPlan(next);
  const nextImports = stagedImportsOf(next);
  const nextTotal = countPlan(nextPlan, nextImports.length);
  if (nextTotal > CEILING) break;
  children = next;
  plan = nextPlan;
  imports = nextImports;
  total = nextTotal;
}

// A screen that is pure assembly - five self-closing component mounts and
// nothing else - cannot be descended at all, so its depth has to come from
// the components. Deepen the biggest staged component a level at a time.
for (let pass = 0; pass < 40 && total < TARGET; pass += 1) {
  // Biggest first, but try every one of them: breaking on the first
  // component that has bottomed out left glutrack three steps short while
  // two of its other components still had a level in them.
  const comps = plan.flatMap((item) => item.components).sort((a, b) => b.blocks.length - a.blocks.length);
  let grew = false;
  for (const comp of comps) {
    const next = descendOnce(comp.lines, comp.children);
    if (!next) continue;
    const grown = meaningful(next);
    if (grown.length <= comp.blocks.length) continue;
    if (countPlan(plan, imports.length) - comp.blocks.length + grown.length > CEILING) continue;
    comp.children = next;
    comp.blocks = grown;
    grew = true;
    break;
  }
  if (!grew) break;
  total = countPlan(plan, imports.length);
}

// A screen whose structure has genuinely bottomed out gets another staged
// mistake instead. A mistake is a beat of the build, not filler - the video
// is a person typing, and a person makes more than one - and unlike a
// one-block component it always shows on screen, because the whole point of
// it is that it is visible and then corrected.
let mistakes = 1;
while (total < TARGET && mistakes < 3 && mistakes < plan.length) {
  mistakes += 1;
  total = countPlan(plan, imports.length, mistakes);
}

// Over the ceiling, give back the longest data array first: a twelve-post feed
// filling one post at a time is the one thing here that runs long, and the
// posts are the least interesting beats in it.
while (total > CEILING) {
  const arrays = plan.flatMap((item) => item.arrays);
  const longest = arrays.sort((a, b) => b.entries.length - a.entries.length)[0];
  if (!longest || longest.entries.length <= 2) break;
  longest.entries = longest.entries.slice(0, longest.entries.length - 1);
  total = countPlan(plan, imports.length, mistakes);
}

/* ------------------------------------------------------------- write it out */

const staged = new Map(); // name -> { rel, lines, out }
function stagedFile(name, rel, fileLines, src) {
  if (!staged.has(name)) staged.set(name, { rel, lines: fileLines, out: fileLines.slice(), src });
  return staged.get(name);
}

const screenFile = stagedFile('screen', routeRel, lines, screen.src);

let n = 0;
const num = () => String(++n).padStart(2, '0');

for (const imp of imports) {
  screenFile.out[imp.line] = `// STEP 1.${num()} ${importLabel(imp.module)}\n// ${imp.text}`;
}

/**
 * How many elements a region leaves open.
 *
 * `</T>` does not match `<[A-Za-z]`, so opens, closes and self-closers can be
 * counted separately and netted. A region that nets above zero is missing its
 * own closing tag.
 */
function openCount(text) {
  const opens = (text.match(/<[A-Za-z][\w.]*/g) || []).length;
  const closes = (text.match(/<\/[A-Za-z][\w.]*/g) || []).length;
  const selfs = (text.match(/\/>/g) || []).length;
  return opens - closes - selfs;
}

/**
 * Pull a block's end forward until the region closes itself.
 *
 * The last child of a descended region came back one line short — the
 * `</T>` that closed it was left outside the staged comment, so the blank
 * file had a `{/* ... <T> ... *​/} </T>` and stopped parsing. `verify` cannot
 * see it, because it only diffs the finished end of the replay; `rehearse`
 * reported it as four `TS17002`s in a file nobody had touched by hand.
 *
 * Repairing it here rather than hunting the off-by-one covers the whole
 * class: whatever produced the range, a block that does not close itself is
 * never correct to stage.
 */
function balanceBlock(file, block) {
  let end = block.end;
  for (let guard = 0; guard < 8; guard += 1) {
    const body = file.lines.slice(block.start, end + 1).join('\n');
    if (openCount(body) <= 0) break;
    if (end + 1 >= file.lines.length) break;
    end += 1;
  }
  return { ...block, end };
}

/** Wrap one JSX block of a file in a STEP comment. */
function wrapBlock(file, raw, label) {
  const block = balanceBlock(file, raw);
  if (process.env.STAGE_TRACE) {
    console.error(
      `  wrap ${file.rel.split('/').pop()} ${block.start + 1}-${block.end + 1}  ` +
        `first=${JSON.stringify(file.lines[block.start].trim().slice(0, 30))} ` +
        `last=${JSON.stringify(file.lines[block.end].trim().slice(0, 30))}`,
    );
  }
  const body = stripComments(file.lines.slice(block.start, block.end + 1).join('\n'));
  const pad = ' '.repeat(block.indent);
  file.out[block.start] = `${pad}{/* STEP 1.${num()} ${label}\n${body}\n${pad}*/}`;
  for (let k = block.start + 1; k <= block.end; k += 1) file.out[k] = null;
  return file.out[block.start];
}

/** Comment one data entry out, with its STEP marker above it. */
function wrapEntry(file, entry, label) {
  const pad = ' '.repeat(indentOf(file.lines[entry.start]));
  const body = [];
  for (let k = entry.start; k <= entry.end; k += 1) {
    const l = file.lines[k];
    body.push(pad + '// ' + l.slice(Math.min(pad.length, indentOf(l))));
  }
  file.out[entry.start] = `${pad}// STEP 1.${num()} ${label}\n` + body.join('\n');
  for (let k = entry.start + 1; k <= entry.end; k += 1) file.out[k] = null;
}

const entryLabel = (text, key) => {
  const m = /\b(?:label|title|name|who|city|place): '([^']{1,32})'/.exec(text);
  return m ? `"${m[1]}"` : key.replace(/-/g, ' ');
};

// Spread the mistakes through the build rather than stacking them at the end:
// one near the close, the next around the middle. Each uses a height no other
// line in the file uses, because a `cutel` needle has to appear only in the
// staged duplicate.
const HEIGHTS = [23, 17, 11];
const mistakeIndex = new Map();
for (let m = 0; m < mistakes; m += 1) {
  let at = plan.length - 1 - Math.round((m * (plan.length - 1)) / Math.max(mistakes, 2));
  // Distinct blocks, always. A collision here used to be dropped silently,
  // so the file ended up with fewer mistakes than the count promised - and
  // the count is the thing being checked against the floor.
  while (at >= 0 && mistakeIndex.has(at)) at -= 1;
  if (at < 0) {
    at = plan.length - 1;
    while (at >= 0 && mistakeIndex.has(at)) at -= 1;
  }
  if (at >= 0) mistakeIndex.set(at, HEIGHTS[m]);
}

plan.forEach((item, idx) => {
  wrapBlock(screenFile, item.block, labelFor(item.block.text));

  for (const comp of item.components) {
    const cf = stagedFile(comp.name, comp.rel, comp.lines, comp.src);
    for (const b of comp.blocks) wrapBlock(cf, b, labelFor(b.text));
  }

  for (const arr of item.arrays) {
    const df = stagedFile('data-' + arr.file.replace(/\.ts$/, ''), arr.rel, arr.lines);
    for (const e of arr.entries.slice(1)) wrapEntry(df, e, entryLabel(e.text, e.key));
  }

  if (mistakeIndex.has(idx)) {
    // Additive, so it cannot collide with a property the finished style
    // already sets (that is TS1117).
    const h = mistakeIndex.get(idx);
    const pad = ' '.repeat(item.block.indent);
    const show = num();
    const fix = num();
    screenFile.out[item.block.start] +=
      `\n${pad}{/* STEP 1.${show} a stray gap under it | FIX 1.${fix} take the gap back out\n` +
      `${pad}<View style={{ height: ${h} }} />\n${pad}*/}`;
  }
});

/* ------------------------------------------------------------------- report */

const dir = path.join(here, 'showcases', slug);
const manifest = {};
for (const [name, f] of staged) manifest[name] = f.rel;

if (dry) {
  if (debug) {
    for (const item of plan) {
      console.log(
        `   ${String(item.block.start + 1).padStart(4)}  ${labelFor(item.block.text)}` +
          item.components
            .map((c) => `\n          +${c.name}: ${c.blocks.map((b) => labelFor(b.text)).join(' | ')}`)
            .join('') +
          (item.arrays.length
            ? `  +data ${item.arrays.map((a) => `${a.name}(${a.entries.length - 1})`).join(' ')}`
            : ''),
      );
    }
  }
  console.log(
    `${slug}: ${n} steps  [${imports.length} imports, ${plan.length} blocks, ` +
      `${[...staged.keys()].filter((k) => k !== 'screen' && !k.startsWith('data-')).length} components, ` +
      `${[...staged.keys()].filter((k) => k.startsWith('data-')).length} data files]` +
      (n < TARGET ? `  <- UNDER ${TARGET}` : ''),
  );
  process.exit(0);
}

fs.mkdirSync(path.join(dir, 'blank'), { recursive: true });
fs.mkdirSync(path.join(dir, 'finished'), { recursive: true });
fs.writeFileSync(path.join(dir, 'manifest.json'), JSON.stringify(manifest, null, 2) + '\n', 'utf8');
for (const [name, f] of staged) {
  const blank = f.out.filter((l) => l !== null).join('\n');
  fs.writeFileSync(path.join(dir, 'blank', name + '.blank'), blank, 'utf8');
  fs.writeFileSync(
    path.join(dir, 'finished', name + '.final'),
    f.src !== undefined ? f.src : f.lines.join('\n'),
    'utf8',
  );
}

console.log(`${slug}: ${n} steps across ${staged.size} file(s)`);

// The floor is a rule, so it exits non-zero rather than printing a note that
// scrolls past. A screen under it is not staged too thinly by accident - it
// is a screen that was built as markup instead of as assembly, and the fix is
// to extract its components, not to lower this.
if (n < TARGET) {
  console.error(
    `${slug}: ${n} steps is under the ${TARGET}-step floor.\n` +
      `  The screen is markup rather than assembly - extract its blocks into\n` +
      `  src/features/${slug}/components/ and stage again.`,
  );
  process.exit(1);
}
