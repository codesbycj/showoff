#!/usr/bin/env node
// Stage a built showcase for filming: write its blank and finished trees,
// put the markers in, and let gen.js turn them into steps.
//
//   node tools/timelapse/stage.js <slug>
//   node tools/timelapse/stage.js <slug> --dry     # print the plan, write nothing
//
// Why this exists. Authoring a blank file by hand was the largest cost of the
// first two apps — 141 step entries for one of them — and the reveal is
// mechanical: the screen's component imports come back one at a time, then
// the blocks of its JSX appear in the order they are assembled. A screen that
// obeys the repo's own rule ("screens are assembly, never markup") is a
// complete description of its own reveal, and this reads it.
//
// What it stages
//
//   * every `@/features/<slug>/components/...` import  -> one `imp` step each
//   * every top-level child of the returned root        -> one `jsx` step each
//   * one deliberate mistake, as a `| FIX` pair         -> `jsx` then `cutel`
//
// What it does not stage: the inside of composite components, so a row lands
// whole rather than one item at a time. That is a refinement on a correct
// reveal and has to be authored per component.
//
// Three traps it has to avoid, all of which have corrupted a blank file here
// before:
//
//   * **Any `*／` inside a staged block closes it early**, including a plain
//     JS block comment — so every comment is stripped from a wrapped region.
//   * **Nothing can be staged inside a ternary branch**, and a `{list.map()}`
//     is staged whole rather than the element it returns. A child that is a
//     bare `{expression}` is therefore wrapped as one unit and never entered.
//   * **A `cutel` needle must appear only in the staged duplicate**, so the
//     mistake uses a height no other line in the file uses.
//
// Blocks are found by indentation, not by counting brackets. Counting looked
// reasonable and was not: one mis-signed term chopped a single child into
// twenty, and the failure is silent — it just produces a worse reveal.
const fs = require('fs');
const path = require('path');

const here = __dirname;
const root = path.resolve(here, '../..');

const slug = process.argv[2];
const dry = process.argv.includes('--dry');
if (!slug) {
  console.error('usage: stage.js <slug> [--dry]');
  process.exit(1);
}

const routeRel = `src/app/${slug}/index.tsx`;
const routeAbs = path.join(root, routeRel);
if (!fs.existsSync(routeAbs)) {
  console.error(`no route at ${routeRel}`);
  process.exit(1);
}

const src = fs.readFileSync(routeAbs, 'utf8');

// Refuse to stage a file that is already staged. `lock` and `rehearse` both
// leave the tree blank, so the route on disk after a gate run is the blank
// one — and reading that produces a blank file whose "blocks" are the JSX
// comments of the previous pass, with every import already commented out and
// therefore invisible. It writes cleanly and is wrong, which is the worst
// shape a failure can have.
if (/\/\/ STEP \d+\.\d+|\{\/\* STEP \d+\.\d+/.test(src)) {
  console.error(
    `${routeRel} is in blank state - this would stage the staging.\n` +
      `  node tools/timelapse/apply.js ${slug} final   # then stage again`,
  );
  process.exit(1);
}

const lines = src.split('\n');
const indentOf = (s) => (s.match(/^\s*/) || [''])[0].length;

/* ---------------------------------------------------------------- imports */

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

/* ------------------------------------------------------------------- jsx */

// The screen's own return, not a helper's. Several of these files define a
// local Glyph or a decorative Svg above the default export, and taking the
// first `return (` in the file staged that component's paths instead of the
// screen's blocks.
const exportIdx = lines.findIndex((l) => /^export default function /.test(l));
const retIdx = lines.findIndex(
  (l, i) => i > exportIdx && /^\s*return \(\s*$/.test(l),
);
if (retIdx < 0) {
  console.error(`${routeRel}: no 'return (' — this screen is not plain assembly`);
  process.exit(1);
}

/**
 * Where a block's opening tag finishes. Prettier puts the `>` of a
 * multi-line tag on its own line at the tag's own indent.
 */
function openTagEnd(from, to, indent) {
  const first = lines[from];
  if (/[^/]>\s*$/.test(first) && !/^\s*<[A-Za-z][\w.]*\s*$/.test(first)) return from;
  for (let i = from + 1; i <= to; i += 1) {
    const t = lines[i];
    if (/^\s*\/?>\s*$/.test(t) && indentOf(t) === indent) return i;
  }
  return from;
}

/** The direct children of a region, by indentation. */
function collect(fromLine, toLine) {
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

const rootIndent = indentOf(lines[retIdx + 1] || '');
const rootOpenEnd = openTagEnd(retIdx + 1, lines.length - 1, rootIndent);

let rootCloseIdx = lines.length - 1;
for (let i = lines.length - 1; i > rootOpenEnd; i -= 1) {
  if (/^\s*<\/[A-Za-z][\w.]*>\s*$/.test(lines[i]) && indentOf(lines[i]) === rootIndent) {
    rootCloseIdx = i;
    break;
  }
}

/**
 * A fill, a border or a shadow in a block's own opening tag.
 *
 * Descending a container that paints leaves its shell on screen in frame one —
 * wanderhome's blank state came out as a white sheet on a black page. That is
 * not a defect: a sheet or a card shell appearing first and then filling is
 * what a speed-build looks like, and refusing to enter anything that paints
 * collapsed acropay's whole reveal to a single step. What must never be live
 * in frame one is *content* — text, a photograph, a glyph — so this is used to
 * keep a coloured band out of the spacer exemption, not to block descent.
 */
const PAINTS = /backgroundColor|border[A-Za-z]*Width|borderColor|shadow|elevation:|opacity:/;

/** The children of a container child, if descending it would help. */
function descend(child) {
  const first = lines[child.start].trim();
  if (!/^<[A-Z]/.test(first)) return null;
  if (/\/>\s*$/.test(lines[child.end])) return null;
  const openEnd = openTagEnd(child.start, child.end, child.indent);
  if (openEnd >= child.end) return null;
  const kids = collect(openEnd + 1, child.end);
  return kids.length >= 2 ? kids : null;
}

const isStatusBar = (c) => /^\s*<StatusBar\b/.test(c.text);
// A spacer is a box that only takes up room. One with a fill is a coloured
// band, which paints — excluded from the reveal it sat on screen from the
// first frame, and on clovehome it happened to match the page colour, so it
// got away with it.
const isSpacer = (c) =>
  /^\s*<View style=\{\{ (?:flex: 1|height: \d+|width: \d+)[^}]*\}\}\s*\/>\s*$/.test(c.text) &&
  !PAINTS.test(c.text);

let children = collect(rootOpenEnd + 1, rootCloseIdx);

// Descend while the reveal would be too coarse to read as a build, and only
// into the block that dominates the body: descending everything turned a feed
// into forty steps, which is not a reveal, it is a flicker.
const MIN_BLOCKS = 4;
const MAX_BLOCKS = 13;
for (let pass = 0; pass < 3; pass += 1) {
  const meaningful = children.filter((c) => !isStatusBar(c) && !isSpacer(c));
  if (meaningful.length >= MIN_BLOCKS) break;
  // Biggest first, but a painting container cannot be entered — so try the
  // next one down rather than giving up on the whole pass. Giving up left
  // three-block reveals on screens that had a perfectly enterable wrapper one
  // place further along.
  const order = meaningful.slice().sort((a, b) => b.end - b.start - (a.end - a.start));
  let biggest = null;
  let kids = null;
  for (const cand of order) {
    const k = descend(cand);
    if (k) {
      biggest = cand;
      kids = k;
      break;
    }
  }
  if (!kids) break;
  const next = [];
  for (const c of children) {
    if (c === biggest) next.push(...kids);
    else next.push(c);
  }
  if (next.filter((c) => !isStatusBar(c) && !isSpacer(c)).length > MAX_BLOCKS) break;
  children = next;
}

const reveal = children.filter((c) => !isStatusBar(c) && !isSpacer(c));
if (!reveal.length) {
  console.error(`${routeRel}: found no top-level blocks to stage`);
  process.exit(1);
}

/* --------------------------------------------------------------- labelling */

// `T` is every showcase's own text primitive, so it names a block no better
// than `View` does — and it is the root of about a third of them.
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
 * that copy carries no `:` `,` `=` quote or bracket — all of which belong to
 * code and none of which survive in a label.
 */
const CODEY = /[:;,=()'"`[\]{}<>]|=>/;
function firstCopy(text) {
  for (const raw of text.split('\n')) {
    const t = raw.trim();
    const inline = />([A-Za-z][^<>{}=\n]{0,43})<\//.exec(t);
    if (inline && !CODEY.test(inline[1])) return inline[1].trim();
    // A bare boolean prop (`horizontal`, `numberOfLines` is not bare but
    // `horizontal` is) also sits on a line of its own with no punctuation at
    // all. One lowercase token is a prop; copy is either capitalised or more
    // than one word.
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

  // A wrapper's own copy names it better than its first child's tag does:
  // "<View><T>Spend</T>" is the spend label, not "t".
  const copy = firstCopy(text);
  if (copy) return `"${copy}"`;

  // A control's own accessibility label is the best name it has when its copy
  // is an interpolation — and every pressable here carries one.
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

  const tags = [...text.matchAll(/<([A-Z][\w.]*)/g)].map((m) => m[1]);
  const pick = tags.find((t) => !GENERIC.has(t) && !ALIAS[t]);
  if (pick) return words(pick);
  const aliased = tags.find((t) => ALIAS[t]);
  if (aliased) return ALIAS[aliased];
  if (tags[0]) return words(tags[0]);

  const word = /\{(\w+)/.exec(text);
  return word ? word[1].toLowerCase() : 'the next block';
}

const importLabel = (mod) => 'import ' + path.basename(mod).replace(/-/g, ' ');

/* ----------------------------------------------------------- build blank */

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

const out = lines.slice();
let n = 0;
const num = () => String(++n).padStart(2, '0');

/**
 * An import can only be staged if everything that uses it is staged too.
 *
 * `text.tsx` lives in `components/`, so the `T` primitive looked like a
 * component import — but a local `SectionHead` helper above the export also
 * uses it, and that helper is never staged. Commenting the import out left
 * live code referring to a name that no longer existed: four `TS2304`s in the
 * blank state, which `verify` cannot see because it only diffs the finished
 * end of the replay. `rehearse` caught it, which is what `rehearse` is for.
 */
const stagedRanges = reveal.map((c) => [c.start, c.end]);
const insideStaged = (i) => stagedRanges.some(([a, b]) => i >= a && i <= b);
const isCode = (l) => {
  const t = l.trim();
  return t && !t.startsWith('//') && !t.startsWith('*') && !t.startsWith('/*');
};

function usedOutsideReveal(imp) {
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
  if (!names.length) return true;

  for (let i = 0; i < lines.length; i += 1) {
    if (i === imp.line) continue;
    if (/^import\s/.test(lines[i]) || !isCode(lines[i])) continue;
    if (insideStaged(i)) continue;
    for (const name of names) {
      if (new RegExp(`\\b${name}\\b`).test(lines[i])) return true;
    }
  }
  return false;
}

const stagedImports = featureImports.filter((imp) => !usedOutsideReveal(imp));
for (const imp of stagedImports) {
  out[imp.line] = `// STEP 1.${num()} ${importLabel(imp.module)}\n// ${imp.text}`;
}

const mistakeAt = reveal.length - 1;
reveal.forEach((c, idx) => {
  const body = stripComments(lines.slice(c.start, c.end + 1).join('\n'));
  const pad = ' '.repeat(c.indent);
  out[c.start] = `${pad}{/* STEP 1.${num()} ${labelFor(c.text)}\n${body}\n${pad}*/}`;
  for (let k = c.start + 1; k <= c.end; k += 1) out[k] = null;

  if (idx === mistakeAt) {
    // Additive, so it cannot collide with a property the finished style
    // already sets (that is TS1117), and its needle is a height no other
    // line in the file uses.
    const show = num();
    const fix = num();
    out[c.start] +=
      `\n${pad}{/* STEP 1.${show} a stray gap under it | FIX 1.${fix} take the gap back out\n` +
      `${pad}<View style={{ height: 23 }} />\n${pad}*/}`;
  }
});

const blank = out.filter((l) => l !== null).join('\n');

/* ------------------------------------------------------------------ write */

const dir = path.join(here, 'showcases', slug);
const manifest = { screen: routeRel };

if (dry) {
  if (process.argv.includes('--debug')) {
    console.log(`${slug}: export at ${exportIdx + 1}, return at ${retIdx + 1}, root tag ends ${rootOpenEnd + 1}, closes ${rootCloseIdx + 1}`);
    for (const c of reveal) console.log(`   ${c.start + 1}-${c.end + 1}  ${lines[c.start].trim().slice(0, 60)}`);
  }
  console.log(
    `${slug}: ${stagedImports.length}/${featureImports.length} imports, ${reveal.length} blocks` +
      `  [${reveal.map((c) => labelFor(c.text)).join(', ')}]`,
  );
  process.exit(0);
}

fs.mkdirSync(path.join(dir, 'blank'), { recursive: true });
fs.mkdirSync(path.join(dir, 'finished'), { recursive: true });
fs.writeFileSync(path.join(dir, 'manifest.json'), JSON.stringify(manifest, null, 2) + '\n', 'utf8');
fs.writeFileSync(path.join(dir, 'blank', 'screen.blank'), blank, 'utf8');
fs.writeFileSync(path.join(dir, 'finished', 'screen.final'), src, 'utf8');

console.log(`${slug}: ${stagedImports.length} imports + ${reveal.length} blocks + 1 mistake = ${n} steps`);
