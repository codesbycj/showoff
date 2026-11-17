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
// `--accept-floor N`: see the floor gate at the foot of this file.
const acceptIdx = process.argv.indexOf('--accept-floor');
const accept = acceptIdx === -1 ? null : Number(process.argv[acceptIdx + 1]);
if (!slug) {
  console.error('usage: stage.js <slug> [--dry] [--debug]');
  process.exit(1);
}

// The floor is the rule. The ceiling is so a feed of twelve posts does not
// become a flicker - past about forty beats the eye stops reading it as a
// build and starts reading it as noise.
// TARGET and CEILING count PLANNED steps.
//
// They used to be set three times the rule's numbers, because only about a
// third of a planned step list actually changed the screen and `compact.py`
// merged the rest away. The probe said why, and all three causes were planner
// bugs rather than facts about reveals:
//
//   - imports were numbered as steps of their own, which RULES 5.2 forbids
//     outright. They now share the number of the block that first uses them.
//   - `isSpacer` only matched a literal `height: 12`, so every
//     `<View style={{ height: L.gapHeader }} />` became a step that paints
//     nothing - seven a screen on vitalcycle.
//   - a data array was attributed to the first block whose component merely
//     *imported* its module, so eleven entries were revealed before anything
//     could draw them and then arrived in one lump with their renderer.
//
// With those fixed a planned step is a painting step, so these are the rule's
// own numbers again: the floor of 20, aimed at I5's 30-40 band. `compact.py`
// still runs, and still merges anything the probe measures as dead, but it is
// now a safety net rather than the mechanism.
const TARGET = 34;
const CEILING = 48;

// The hard gate stays at the rule's number. TARGET is how deep the planner
// *tries* to go; FLOOR is what it refuses to ship under. They are different
// because a planned step is not necessarily a painting one — the painting
// floor is enforced after compaction, by `stepdiff.py`, which can measure.
const FLOOR = 20;

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

// A render-prop child: `{({ pressed }) => (` ... `)}`. It is a wrapper the
// stager has to see through, not a block - a `Pressable` written this way
// (which is every one of them, because a function *style* is dropped in the
// static render) otherwise hides its whole subtree, and the component is
// skipped for having fewer than two children. slide-bar's track, chip, arrow
// and hint were four beats nothing could reach.
const RENDER_PROP = /^\{\s*\(\s*(?:\{[^}]*\}|\w*)\s*\)\s*=>\s*\(\s*$/;

/** The direct children of a container child, whatever the count. */
function childrenOf(lines, child) {
  const first = lines[child.start].trim();
  if (RENDER_PROP.test(first)) {
    const kids = collect(lines, child.start + 1, child.end);
    return kids.length ? kids : null;
  }
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

/**
 * The single leaf at the end of an unbranching chain of children.
 *
 * `descend` deliberately refuses to return one child, because staging the only
 * child of a transparent box is a step that paints nothing. Where the boxes
 * above it *do* paint it is the opposite, so the caller checks that and this
 * only finds the leaf. Returns null if the chain forks - then `descend` has
 * already handled it.
 */
function leafOf(lines, child) {
  let cur = child;
  let kids = childrenOf(lines, cur);
  for (let d = 0; d < 6 && kids && kids.length === 1; d += 1) {
    cur = kids[0];
    kids = childrenOf(lines, cur);
  }
  return kids && kids.length >= 2 ? null : cur;
}

/** The text from the start of one block down to the start of a block inside it. */
const linesBetween = (lines, outer, inner) => lines.slice(outer.start, inner.start).join('\n');

/**
 * Merge a component's mount step with its first child when the shell between
 * them paints nothing.
 *
 * A component whose root is a bare positioning box — `marginHorizontal`, a
 * height, a `justifyContent` and no fill — mounts as a step that changes no
 * pixel: the box is transparent and every mark inside it is still a comment.
 * The step probe measured exactly 0.0000% on `welcome-headline` and
 * `start-button`, two of the seven failures it found on the first screen it
 * was ever pointed at.
 *
 * The mount IS the first child, so the first child stays live and the step
 * that reveals the component reveals it too. This is the same reasoning as
 * `shellOnly` for a keyed list, applied to a shell that simply has no fill.
 *
 * Only the twenty lines above the first child are read: the root's opening tag
 * and its style object live there, while the whole head of the file would
 * match on any style constant declared above the JSX.
 */
/**
 * What a list of staged blocks is really worth as beats.
 *
 * Each block stands for whatever it actually paints, so a transparent padding
 * box around one line of type becomes that line — otherwise the box is a step
 * that changes no pixel and the line lands a step later, two beats for one
 * event (`promo-card`'s headline wrapper, 0.0000%).
 *
 * And a mark is never worth a beat of its own, wherever it sits: the `+` on
 * `promo-card`'s button measured 0.0066%, because the ink of a 16dp glyph is
 * sixty pixels. It arrives with the button it is on.
 */
const strip = (lines, blocks) => {
  const tipped = blocks.map((b) => {
    const leaf = leafOf(lines, b);
    if (!leaf || leaf === b) return b;
    return PAINTS.test(linesBetween(lines, b, leaf)) ? b : leaf;
  });
  const seen = tipped.filter((b) => !isMark(b) && !MARK_TAG.test(b.text || ''));
  return seen.length ? seen : tipped;
};

const mergeShell = (lines, blocks) => {
  if (!blocks || !blocks.length) return blocks;
  // A lone mark is never a step, whether it arrived here from the first pass
  // or from the growth pass that descends a component one level further.
  if (blocks.length === 1) {
    const only = leafOf(lines, blocks[0]) || blocks[0];
    return isMark(only) || MARK_TAG.test(only.text || '') ? [] : blocks;
  }
  // The shell is what sits between `return (` and the first child — the root's
  // own opening tag and its style object, and nothing above it. Reading a
  // fixed window of lines instead caught the *style constants* most components
  // declare before the JSX: `item-header` has a `const round = { ...
  // backgroundColor }` for its discs, so its transparent root read as painted
  // and its mount stayed a step that changed 0.0000% of the frame.
  let from = blocks[0].start;
  for (let d = 0; d < 40 && from > 0; d += 1) {
    if (/\breturn \(/.test(lines[from - 1])) break;
    from -= 1;
  }
  const head = lines.slice(from, blocks[0].start).join('\n');
  if (PAINTS.test(head)) return strip(lines, blocks);
  const rest = blocks.slice(1);
  // If the child that stays live is itself a mark, the mount reveals a glyph
  // and nothing else — `eta-chip`'s clock measured 0.0164%. Take the next one
  // with it, so the mount carries the mark *and* the thing it marks.
  const first = leafOf(lines, blocks[0]) || blocks[0];
  if (rest.length >= 1 && (isMark(first) || MARK_TAG.test(first.text || ''))) rest.shift();
  // And if all that is left is a mark — a glyph inside a disc, a wordmark's
  // bars — staging it on its own is a step of about 0.02% of the frame, which
  // the step probe reads as a step that painted nothing. A disc with one glyph
  // in it is one event: the disc arriving. Measured on nookstart's start
  // control at 0.0196%.
  if (rest.length === 1) {
    const tip = leafOf(lines, rest[0]) || rest[0];
    if (isMark(tip) || MARK_TAG.test(tip.text || '')) return [];
  }
  // A mark at the head of what is left is the same problem one step along: the
  // mount would reveal the shell plus a 20dp glyph, which measures under the
  // probe's floor. Keep merging until the first thing to arrive is something
  // the eye can see.
  while (rest.length >= 2) {
    const first = leafOf(lines, rest[0]) || rest[0];
    if (!isMark(first) && !MARK_TAG.test(first.text || '')) break;
    rest.shift();
  }
  return strip(lines, rest);
};

/** A glyph or a small svg: one mark, one element. */
const MARK_TAG = /^\s*<Glyph\b/;
/** A block lifted out of the column: a gap above it displaces nothing. */
const ABSOLUTE = /position:\s*'absolute'/;

const isStatusBar = (c) => /^\s*<StatusBar\b/.test(c.text);
// A spacer is a box that only takes up room. One with a fill is a coloured
// band, which paints - excluded from the reveal it sat on screen from the
// first frame, and on clovehome it happened to match the page colour, so it
// got away with it.
// The value may be a literal or an expression: every screen writes its rhythm
// as `height: L.gapHeader`, and a regex that only matched `height: 12` let
// seven spacers a screen through as steps that paint nothing at all - they are
// revealed above an empty page, so there is nothing below them to push down.
// Padding and margin are spacers too. `<View style={{ paddingTop:
// L.insets.top }} />` is the status-bar inset: it paints nothing, so staging
// it buys a step that holds the reveal on an unchanged frame.
const SPACER_SIDE = String.raw`(?:Top|Bottom|Left|Right|Vertical|Horizontal)?`;
const SPACER_DIM =
  String.raw`(?:flex|height|width|padding` +
  SPACER_SIDE +
  String.raw`|margin` +
  SPACER_SIDE +
  String.raw`): [\w.]+`;
const isSpacer = (c) =>
  new RegExp(`^\\s*<View style=\\{\\{ ${SPACER_DIM}(?:, ${SPACER_DIM})* \\}\\}\\s*/>\\s*$`).test(
    c.text,
  ) && !PAINTS.test(c.text);

/**
 * The page's own ground, which paints in frame one and is never a step.
 *
 * RULES 5.5: "Nothing paints in frame one except the page's own ground ... A
 * full-bleed `<svg>` *is* the ground - several designs paint their background
 * as a gradient." A photograph behind the whole screen is the same thing, and
 * staging it makes the first step of the reveal paint 44% of the frame (and on
 * globestart, 100%), which is rule 0.3's exact failure: the page appears and
 * then accretes detail.
 *
 * Filled from the component sources before the plan is built. The signature is
 * a root that covers the frame - absolutely positioned at the top left with
 * both dimensions, or pinned on all four edges. An overlay sheet does not
 * match: it is pinned at the bottom with a height of its own.
 */
const GROUND_TAGS = new Set();
const isGround = (c) =>
  [...GROUND_TAGS].some((tag) => new RegExp(`^\\s*<${tag}\\b`).test(c.text));

/**
 * A definition, not a mark. `<Defs>`, a gradient, a clip path and a mask are
 * declarations an `<svg>` refers to later - they paint nothing on their own,
 * so staging one buys a step that holds the reveal on an unchanged frame.
 */
const DEFS_TAGS =
  /^\s*<(?:Defs|ClipPath|LinearGradient|RadialGradient|Stop|Mask|Filter|Pattern|Marker)\b/;
const isDefs = (c) => DEFS_TAGS.test(c.text);

/**
 * A JSX comment is not a block.
 *
 * `promo-card` explains, in a `{/* … *\/}` above its headline, why the
 * headline stops short of the piece beside it. The stager counted that
 * explanation as a child and staged it: a step labelled "the next block" that
 * changed 0.0000% of the frame, because a comment paints nothing. It is also
 * the §5.7 trap from the other side — a JSX comment inside a staged block ends
 * the block early.
 */
const isJsxComment = (c) => /^\s*\{\s*\/\*/.test(c.text || '');

/**
 * `{children}` is not a step — it is everything the consumer passed.
 *
 * `Folder` is a layout primitive: a notched card that renders `{children}` on
 * top of its two fills. Staged, that one line held back the whole card face —
 * the wordmark, the number, the holder and the expiry all painted 0.0000%
 * until step 11, because the component they were in was rendering none of
 * them. A primitive's slot belongs to its caller, and the caller's blocks are
 * already beats of their own.
 */
const isChildrenSlot = (c) => /^\s*\{\s*children\s*\}/.test(c.text || '');

const meaningful = (cs) =>
  cs.filter(
    (c) =>
      !isStatusBar(c) &&
      !isSpacer(c) &&
      !isGround(c) &&
      !isDefs(c) &&
      !isJsxComment(c) &&
      !isChildrenSlot(c),
  );

/** Descend the biggest enterable block once. Returns a new child list or null. */
/**
 * An `<Svg>` small enough to be a mark rather than a picture.
 *
 * A paw drawn as five circles, a wordmark's three bars, a 24dp glyph: staged
 * shape by shape those are steps of 0.006%-0.02% each, which the step probe
 * reads as steps that painted nothing - and it is right, because a mark is one
 * element. A chart or a full-bleed artwork sizes itself off a prop, so its
 * shapes are still worth their own beats.
 */
const SMALL_SVG = /^\s*<Svg\b[^>]*\bwidth=\{(\d+(?:\.\d+)?)\}/;
const isMark = (c) => {
  const m = SMALL_SVG.exec(c.text || '');
  return !!m && parseFloat(m[1]) <= 48;
};

function descendOnce(lines, children) {
  const order = meaningful(children)
    .filter((c) => !isMark(c))
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
 * A file's code, without its imports or its prose.
 *
 * Asking "does this component name that array" has to be asked of the body: an
 * import list is a declaration of availability, not of use, and a doc comment
 * quotes the code it explains (RULES 5.9 - never anchor on prose).
 */
const bodyOf = (src) =>
  (src || '')
    // Whole import STATEMENTS, not import lines. A braced multi-line import
    // leaves `  months,` on its own line, which begins with neither `import`
    // nor a comment, so a line filter kept it - and all six of vitalday's
    // components import every export of `../data/day`, so every one of them
    // "read" every array. The first block claimed all four, so fourteen
    // entries were revealed before the charts that draw them had mounted:
    // fourteen zero-diff steps, and then 24% of the frame in one lump.
    .replace(/^[ \t]*import\b[\s\S]*?(?:from\s*['"][^'"]*['"]|['"][^'"]*['"])\s*;?[ \t]*$/gm, '')
    .split('\n')
    .filter((l) => !/^\s*(?:\/\/|\/?\*)/.test(l))
    .join('\n');

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

/**
 * `sections.popular` is not a use of `popular`.
 *
 * A bare word boundary matched the property half of a member expression, so
 * pawshome's `popular` array was attributed to the **section row** — the block
 * that passes `title={sections.popular}` — and its entries were revealed one
 * step before the grid that draws them mounted. The card landed on nothing and
 * the step measured 0.0000%. RULES §5.9 has the same bug from the other end:
 * "four cards were revealed six steps before the grid that draws them".
 */
const usesName = (src, name) => new RegExp(`(^|[^.\\w])${name}\\b`).test(src);

/**
 * Which arrays a data file's exported selectors read.
 *
 * A component often never names the array it renders: vitalstats' leaderboard
 * calls `ranked()`, which sorts `athletes` so the rank cannot disagree with the
 * score (R9). Looking for the array's own name in the component found nothing,
 * so four rows of photographs were never staged and the screen planned sixteen
 * steps against a floor of twenty. An array reached through a selector is
 * still the array that block renders.
 */
function readSelectors() {
  const out = new Map();
  const files = new Set(dataArrays.map((a) => a.rel));
  for (const rel of files) {
    const src = fs.readFileSync(path.join(root, rel), 'utf8');
    const re = /export function (\w+)\s*\([^)]*\)[^{]*\{([\s\S]*?)\n\}/g;
    let m;
    while ((m = re.exec(src))) {
      const body = bodyOf(m[2]);
      const reads = dataArrays
        .filter((a) => a.rel === rel && new RegExp(`\\b${a.name}\\b`).test(body))
        .map((a) => a.name);
      if (reads.length) out.set(m[1], reads);
    }
  }
  // A selector that calls another selector reads what that one reads.
  for (let pass = 0; pass < 3; pass += 1) {
    for (const [fn, reads] of out) {
      for (const [other, more] of out) {
        if (other === fn) continue;
        if (!new RegExp(`\\b${other}\\s*\\(`).test(fnBody(fn))) continue;
        for (const name of more) if (!reads.includes(name)) reads.push(name);
      }
    }
  }
  return out;
}

/** One selector's body, for the transitive pass above. */
function fnBody(name) {
  for (const rel of new Set(dataArrays.map((a) => a.rel))) {
    const src = fs.readFileSync(path.join(root, rel), 'utf8');
    const m = new RegExp(`export function ${name}\\s*\\([^)]*\\)[^{]*\\{([\\s\\S]*?)\\n\\}`).exec(src);
    if (m) return m[1];
  }
  return '';
}

const selectors = readSelectors();

/**
 * Strip string literals before looking for an identifier.
 *
 * A name inside quotes is prose, not a use. `accessibilityLabel="Filter
 * destinations"` in a header made that header claim the `destinations` array,
 * so four cards were revealed six steps before the grid that draws them
 * mounted — four steps that painted nothing, and then the whole grid arriving
 * in one 44% lump. Same class as RULES 5.9's "never anchor on prose".
 */
const code = (hay) =>
  String(hay)
    .replace(/'(?:[^'\\]|\\.)*'/g, "''")
    .replace(/"(?:[^"\\]|\\.)*"/g, '""')
    .replace(/`(?:[^`\\]|\\.)*`/g, '``');

/** Does this code read that array, by name or through a selector? */

const reads = (hay, arr) => {
  const src = code(hay);
  if (usesName(src, arr.name)) return true;
  for (const [fn, names] of selectors) {
    if (names.includes(arr.name) && new RegExp(`\\b${fn}\\s*\\(`).test(src)) return true;
  }
  return false;
};

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

/**
 * Which components are a full-bleed ground layer.
 *
 * Read off the component's own root style, not off its doc comment: a doc
 * comment quotes the code it explains, and anchoring on prose is what matched
 * the sentence describing `pointerEvents="none"` rather than the attribute
 * (RULES 5.9).
 */
function findGround() {
  if (!fs.existsSync(COMPONENT_DIR)) return;
  for (const file of fs.readdirSync(COMPONENT_DIR).filter((f) => f.endsWith('.tsx'))) {
    const base = file.replace(/\.tsx$/, '');
    if (PRIMITIVES.has(base) || base.startsWith('_')) continue;
    const scan = scanJsx(path.join(COMPONENT_DIR, file));
    if (!scan.lines || scan.blocks === null) continue;
    // A component whose root fills its PARENT looks identical to one that
    // fills the page, and this reads the component alone. `blank.js` measures
    // the real render and only calls a box full-bleed at 391x850, so a hero
    // that stops at 320dp or a sheet that starts 45dp down was being left
    // live by the stager and then failed the blank gate. `@not-a-ground` is
    // the opt-out, written on the component that knows it is a surface.
    if (/@not-a-ground/.test(scan.src)) continue;
    const retIdx = scan.lines.findIndex((l) => /^\s*return \(\s*$/.test(l));
    if (retIdx < 0) continue;
    const root = scan.lines
      .slice(retIdx + 1, Math.min(retIdx + 14, scan.lines.length))
      .join('\n')
      .split('>')[0];
    if (!/position: 'absolute'/.test(root)) continue;
    const corner = /top: 0/.test(root) && /left: 0/.test(root);
    const spans = /\bwidth\b/.test(root) && /\bheight\b/.test(root);
    const pinned = /right: 0/.test(root) && /bottom: 0/.test(root);
    if (!corner || !(spans || pinned)) continue;
    const m = /^export function (\w+)/m.exec(scan.src);
    if (m) GROUND_TAGS.add(m[1]);
  }
}

findGround();

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
        meaningful(kids).length === 1 && dataArrays.some((a) => reads(bodyOf(scan.src), a));
      // The other exception: a shell that paints on its own. A 56dp button, or
      // a back control drawn as a filled disc, is a painted box with one mark
      // in it - the box arriving and then the mark landing on it are two
      // visible changes, not one event, so the "shows nothing" reasoning above
      // does not apply. `descend` will not return a single child, so the chain
      // is walked to its leaf here and taken only if something above it paints.
      let paintedShell = false;
      if (meaningful(kids).length === 1 && !rendersKeyedList) {
        const only = meaningful(kids)[0];
        const leaf = leafOf(scan.lines, only);
        // ...and the leaf has to be worth a beat. A 44dp disc with an 18dp
        // glyph in it is a painted box with one mark, but staging the mark on
        // its own measured 0.017%-0.020% - under the step probe's floor, which
        // is to say it painted nothing. The disc arriving IS the event.
        const markLeaf = leaf && (isMark(leaf) || /^\s*<Glyph\b/.test(leaf.text || ''));
        if (leaf && leaf !== only && !markLeaf &&
            PAINTS.test(linesBetween(scan.lines, only, leaf))) {
          kids = [leaf];
          paintedShell = true;
        }
      }
      if (meaningful(kids).length < 2 && !rendersKeyedList && !paintedShell) continue;
      usedComponents.add(comp.name);
      // A keyed list's single block is its `{list.map()}`, and staging it
      // separately buys an empty shell: the component mounts, paints nothing
      // because its only child is still a comment, and the first row lands a
      // step later. The rows are already beats of their own - the data file
      // keeps entry one live and stages the rest - so the mount IS the first
      // row. Measured: that shell step diffed 0.0000% on every screen that
      // had one.
      const shellOnly = rendersKeyedList && meaningful(kids).length === 1 && !paintedShell;
      item.components.push({
        ...comp,
        lines: scan.lines,
        src: scan.src,
        children: shellOnly ? [] : kids,
        blocks: shellOnly ? [] : mergeShell(scan.lines, meaningful(kids)),
        arrays: [],
      });
      for (const b of meaningful(kids)) {
        const sub = componentFor(b.text);
        if (sub && !usedComponents.has(sub.name)) queue.push(sub);
      }
    }

    // The array a block renders is named either in the block itself (the
    // screen passes it down) or inside the component (the component imports
    // it from `../data`).
    //
    // It is attributed to the *component that renders it*, and numbered after
    // that component's own blocks, because an entry revealed before its
    // renderer mounts paints nothing and then arrives in one lump with the
    // renderer. An import line is not a use: one component importing eight
    // names from `../data/cycle` and using one of them claimed all eleven
    // entries on the screen, eleven steps before anything could draw them.
    const claim = (hay, into, mapsOnly) => {
      for (const arr of dataArrays) {
        if (usedArrays.has(arr.name)) continue;
        if (!reads(hay, arr)) continue;
        // **Reading an array is not drawing it.** `cart-header` reads
        // `lines.length` for its badge and mounts four steps before
        // `cart-lines`, which is the component that actually maps the rows —
        // so the rows were revealed onto a screen that had nothing to draw
        // them with, and each measured 0.0086%. On a first pass an array goes
        // only to a component that maps it; a second pass takes whatever is
        // left, so an array reached through a selector is still claimed.
        if (mapsOnly && !new RegExp(`\\b${arr.name}\\s*\\.\\s*map\\b`).test(hay)) continue;
        usedArrays.add(arr.name);
        into.push(arr);
      }
    };
    for (const comp of item.components) claim(bodyOf(comp.src), comp.arrays, true);
    claim(block.text, item.arrays, true);

    plan.push(item);
  }

  // A second sweep, deliberately looser, and only over what is left.
  //
  // Precision first: an array belongs to the component whose *body* renders
  // it. But some are reached only through a shared helper no block mounts -
  // vitalprog's `calorieSeries` lives in `_prog-parts-shared` - and an array
  // no block claims is never staged at all, which costs the reveal exactly
  // the beats the precise pass was meant to win. So anything still unclaimed
  // falls back to the declaration-level test: the first mounted component
  // that so much as imports it. Worse placement than a real use, better than
  // the entries vanishing from the plan.
  for (const item of plan) {
    for (const comp of item.components) {
      for (const arr of dataArrays) {
        if (usedArrays.has(arr.name)) continue;
        if (!reads(bodyOf(comp.src), arr)) continue;
        usedArrays.add(arr.name);
        comp.arrays.push(arr);
      }
    }
  }
  // Last of all, the declaration-level test: the first mounted component that
  // so much as imports it. Worse placement than a real use, better than the
  // entries vanishing from the plan.
  for (const item of plan) {
    for (const comp of item.components) {
      for (const arr of dataArrays) {
        if (usedArrays.has(arr.name)) continue;
        if (!reads(comp.src, arr)) continue; // the whole source, imports and all
        usedArrays.add(arr.name);
        comp.arrays.push(arr);
      }
    }
  }
  return plan;
}

function countPlan(plan, imports, mistakes = 1) {
  let n = imports;
  for (const item of plan) {
    n += 1;
    for (const c of item.components) {
      n += c.blocks.length;
      for (const arr of c.arrays) n += arr.entries.length - 1;
    }
    for (const arr of item.arrays) n += arr.entries.length - 1;
  }
  return n + mistakes * 2; // each staged mistake is a show and a fix
}

/* ---------------------------------------------- how deep to go into the screen */

/**
 * The names an import statement brings into the file.
 *
 * What a module is *called* and what it *exports* are different questions, and
 * answering the second with the first is what red-screened crypinconfirm:
 * `components/text` exports `T`, so looking for `<Text` found nothing, the
 * import fell through to the end of the plan, and the block using `<T>` was
 * revealed six steps before the import that defines it.
 */
const namesOf = (text) => {
  const names = [];
  const braced = /import\s+\{([^}]+)\}/.exec(text);
  if (braced) {
    for (const part of braced[1].split(',')) {
      const name = part.trim().split(/\s+as\s+/).pop().trim();
      if (name && !name.startsWith('type ')) names.push(name);
    }
  }
  const def = /import\s+([A-Za-z_$][\w$]*)\s*(?:,|from)/.exec(text);
  if (def) names.push(def[1]);
  return names;
};

const stagedImportsOf = (children) => {
  const ranges = meaningful(children).map((c) => [c.start, c.end]);
  const inside = (i) => ranges.some(([a, b]) => i >= a && i <= b);
  const isCode = (l) => {
    const t = l.trim();
    return t && !t.startsWith('//') && !t.startsWith('*') && !t.startsWith('/*');
  };
  return featureImports.filter((imp) => {
    const names = namesOf(imp.text);
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
    const grown = mergeShell(comp.lines, meaningful(next));
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
// Four, not three. Teaching the stager to merge a shell that paints nothing
// into its first child took a real step off every sparse screen - correctly,
// because that step changed no pixel - and left seven of them a beat under the
// floor. A mistake is the honest thing to spend that beat on: it is a beat of
// the build rather than filler, and four slips across a twenty-step reveal is
// what typing looks like.
const lastMistake = Math.max(0, plan.length - 2);

/**
 * Where a stray gap is worth a beat.
 *
 * A gap displaces whatever is under it, and displacing a **photograph** moves
 * every pixel of it: the detail no longer lines up, so a 29dp gap above a
 * posed image field measured 16.9% of the frame - one event, but over the
 * one-element ceiling and read as the page lurching. A gap above a line of
 * type moves a line of type.
 *
 * So: prefer blocks that carry no picture. If a screen is nothing but
 * pictures, fall back to any block rather than dropping the mistake, because
 * the count is what is checked against the floor.
 */
const rootIsFloating = (src) => {
  const at = (src || '').indexOf('return (');
  if (at < 0) return false;
  return ABSOLUTE.test((src || '').slice(at, at + 420));
};
const isFloating = (item) =>
  ABSOLUTE.test(item.block.text || '') ||
  item.components.some((c) => rootIsFloating(c.src));
const carriesPicture = (item) =>
  /<Image\b|<Svg\b/.test(item.block.text || '') ||
  item.components.some((c) => /<Image\b/.test(c.src || ''));
// Every block is a candidate again: the rule floats, so it neither displaces
// a photograph nor needs a column to push. `quiet` is kept only to prefer a
// quiet block where there is a choice.
const quiet = [];
for (let i = 0; i <= lastMistake; i += 1) {
  // A gap above a floating block displaces nothing: the block is out of the
  // column. Measured 0.0000% on pawstart's wordmark, both the break and the
  // fix.
  if (!carriesPicture(plan[i]) && !isFloating(plan[i])) quiet.push(i);
}
const all = [...Array(lastMistake + 1).keys()];
const pool = quiet.length >= 4 ? quiet : all;

let mistakes = 1;
// Never more mistakes than there are places one can be seen. A screen whose
// every block is a photograph or a floating control has nowhere to put a
// stray rule that reads as a mistake rather than as the page lurching, and a
// mistake nobody can see is a step that paints nothing.
const room = Math.max(1, lastMistake + 1);
while (total < TARGET && mistakes < 4 && mistakes < plan.length && mistakes < room) {
  mistakes += 1;
  total = countPlan(plan, imports.length, mistakes);
}

// Over the ceiling, give back the longest data array first: a twelve-post feed
// filling one post at a time is the one thing here that runs long, and the
// posts are the least interesting beats in it.
while (total > CEILING) {
  const arrays = plan.flatMap((item) => [
    ...item.arrays,
    ...item.components.flatMap((c) => c.arrays),
  ]);
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
/** The number `num()` last issued, for a marker that shares a step. */
const same = () => String(n).padStart(2, '0');

/**
 * Each import, filed under the plan item whose block first uses it.
 *
 * RULES 5.2 / I9: "an import is never a step of its own. It is uncommented in
 * the same step as the first JSX block that uses it." Numbered up front they
 * are the first eight to ten steps of every reveal, and every one of them
 * paints nothing - the component they name is not mounted yet, because its JSX
 * is still a comment. The probe measured nine such steps on vitalcycle alone.
 *
 * `stagedImportsOf` has already dropped any import with a use outside the
 * staged region, so every import left here has a block that mounts it.
 */
const importsAt = new Map();
for (const imp of imports) {
  // Ask the import what it binds, not what its file is called. The two differ
  // whenever a module exports under a short name - `components/text` exports
  // `T` - and guessing from the filename put the import after the block that
  // uses it, which is a ReferenceError at that step rather than a tidiness
  // problem.
  const names = namesOf(imp.text);
  let idx = plan.findIndex((item) =>
    names.some((nm) => new RegExp(`<${nm}[\\s/>]`).test(item.block.text)),
  );
  // A component can also arrive as a prop or a bare reference rather than a tag.
  if (idx < 0) {
    idx = plan.findIndex((item) =>
      names.some((nm) => new RegExp(`\\b${nm}\\b`).test(item.block.text)),
    );
  }
  // Nothing claimed it. `stagedImportsOf` only keeps imports whose every use is
  // inside a staged block, so this means the use is nested deeper than the plan
  // walks. Attach it to the FIRST block, never the last: an import revealed
  // early is an unused binding for a few steps, while one revealed late is a
  // crash the moment anything above it mounts.
  if (idx < 0) idx = 0;
  if (!importsAt.has(idx)) importsAt.set(idx, []);
  importsAt.get(idx).push(imp);
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
  // Fragments are tags too. `<>` matches neither pattern above, so a block
  // inside a fragment-rooted component never balanced: the end kept walking
  // forward and swallowed the fragment's close, the `);` and the function's
  // own brace, and the blank file stopped parsing (TS17014).
  const fragOpens = (text.match(/<>/g) || []).length;
  const fragCloses = (text.match(/<\/>/g) || []).length;
  return opens + fragOpens - closes - fragCloses - selfs;
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
  // A definition paints nothing, so staging one buys a step that holds the
  // reveal on an unchanged frame. `meaningful()` already drops these when it
  // builds a plan, but every path that stages a block ends up here, and this
  // is the only place that is true of - a `<Defs>` inside a flag disc reached
  // the file anyway and measured 0.0000% for 5250ms.
  //
  // Read the head off the FILE, not off `raw.text`: the block objects that
  // reach this point do not all carry one, and testing an undefined `text`
  // quietly tests the string "undefined" and passes everything.
  if (isDefs({ text: raw.text || file.lines[raw.start] || '' })) return null;
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
// Four of them, because the cap is four. `HEIGHTS[3]` was `undefined` for one
// pass, which wrote `<View style={{ width: undefined, height: undefined }} />`
// - a 0dp spacer that displaces nothing, so the mistake and its fix both
// measured 0.0000% and the probe was right to fail them.
const HEIGHTS = [13, 9, 11, 7];
const mistakeIndex = new Map();
// Not the last block. A reveal's final block is usually the screen's pinned
// foot, and the column above it carries a `flex: 1` spacer: a gap inserted
// there is absorbed by the spacer exactly, so nothing moves and both the
// mistake and its fix measure 0.0000%. The probe caught it on the last two
// steps of pawshome and nookstart. Mistakes belong in the body of the screen.
for (let m = 0; m < mistakes; m += 1) {
  const slot = pool.length - 1 - Math.round((m * (pool.length - 1)) / Math.max(mistakes, 2));
  let at = pool[Math.max(0, Math.min(pool.length - 1, slot))];
  // Distinct blocks, always. A collision here used to be dropped silently,
  // so the file ended up with fewer mistakes than the count promised - and
  // the count is the thing being checked against the floor.
  while (at >= 0 && mistakeIndex.has(at)) at -= 1;
  if (at < 0) {
    at = lastMistake;
    while (at >= 0 && mistakeIndex.has(at)) at -= 1;
  }
  if (at >= 0) mistakeIndex.set(at, HEIGHTS[m]);
}

const mistakeText = [];
plan.forEach((item, idx) => {
  wrapBlock(screenFile, item.block, labelFor(item.block.text));

  const stageArray = (arr) => {
    const df = stagedFile('data-' + arr.file.replace(/\.ts$/, ''), arr.rel, arr.lines);
    for (const e of arr.entries.slice(1)) wrapEntry(df, e, entryLabel(e.text, e.key));
  };

  // Same number as the block just wrapped, so the import and the JSX it feeds
  // are one step and one visible change.
  for (const imp of importsAt.get(idx) || []) {
    screenFile.out[imp.line] = `// STEP 1.${same()} ${importLabel(imp.module)}\n// ${imp.text}`;
  }

  for (const comp of item.components) {
    const cf = stagedFile(comp.name, comp.rel, comp.lines, comp.src);
    for (const b of comp.blocks) wrapBlock(cf, b, labelFor(b.text));
    for (const arr of comp.arrays) stageArray(arr);
  }

  for (const arr of item.arrays) stageArray(arr);

  if (mistakeIndex.has(idx)) {
    // Additive, so it cannot collide with a property the finished style
    // already sets (that is TS1117).
    const h = mistakeIndex.get(idx);
    const pad = ' '.repeat(item.block.indent);
    const show = num();
    const fix = num();
    // ABOVE the block, not below it.
    //
    // A reveal runs top down, so a gap placed under a block is revealed while
    // the space under it is still empty - there is nothing there to push, and
    // the step paints nothing. Every staged gap in the batch measured 0.00%,
    // both the break and the fix, six dead steps on a screen with three
    // mistakes. Above the block it displaces the block itself, which is
    // already on screen by then, so both the mistake and its fix paint.
    mistakeText.push(
      `${pad}{/* STEP 1.${show} a stray rule | FIX 1.${fix} take the rule back out
` +
      // It **floats**, and it carries a fill.
      //
      // A spacer only shows by displacing what is under it, and three things
      // swallow that: a column with a `flex: 1` spacer absorbs the gap exactly,
      // a screen whose controls are absolutely positioned has nothing in the
      // column to push, and a gap above a photograph moves every pixel of it
      // (16.9%-37.8%, over the one-element ceiling). Measured at 0.0000% for
      // the break *and* the fix on nookroom and cocoacart, and at 37.8% on
      // cocoahome.
      //
      // Lifted out of the column it paints its own 120dp rule — about 0.5% of
      // the frame, comfortably over the probe's floor and nowhere near the
      // ceiling — wherever the block it sits above happens to be. Which means
      // it can go above any block at all, including a photograph.
      // One line, because the FIX op cuts by needle and a needle has to be a
      // line that appears only in the staged duplicate (RULES 5.7). Split
      // across lines, `cutel` matched nothing and every reveal stopped at the
      // first mistake.
      `${pad}<View style={{ position: 'absolute', left: ${h * 2}, top: ${120 + h * 6}, width: 120, height: ${h}, backgroundColor: '#8F8F8F', zIndex: 9 }} />
` +
        `${pad}*/}`,
    );
  }
});

// Written after the walk, not during it.
//
// A mistake goes at the **end of the screen's children**, where it paints on
// top of everything: lifted out of the column by `position: absolute` it can
// still be hidden by a full-bleed photograph that paints after it, which is
// what happened on kilnview and orlaring — 0.0000% for the break and the fix
// on both. Appending during the walk also lost them outright, because
// `wrapBlock` rewrites that same line when it reaches the last block.
if (mistakeText.length) {
  // The ROOT's last child, not the plan's. The plan descends into nested
  // containers, so its last block can be two levels down — and a rule written
  // as that container's last child is still inside it, where a full-bleed
  // sibling of the container paints over it. Measured 0.0000% on orlaring and
  // orlafit for the third and fourth mistakes, while the first two, in the
  // same container, painted fine.
  const rootKids = meaningful(screen.blocks);
  const tail = (rootKids[rootKids.length - 1] || plan[plan.length - 1].block).end;
  screenFile.out[tail] = [screenFile.out[tail], ...mistakeText].join('\n');
}

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
            .map(
              (c) =>
                `\n          +${c.name}: ${c.blocks.map((b) => labelFor(b.text)).join(' | ')}` +
                (c.arrays.length
                  ? `  +data ${c.arrays.map((a) => `${a.name}(${a.entries.length - 1})`).join(' ')}`
                  : ''),
            )
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
if (n < FLOOR) {
  console.error(
    `${slug}: ${n} steps is under the ${FLOOR}-step floor.\n` +
      `  The screen is markup rather than assembly - extract its blocks into\n` +
      `  src/features/${slug}/components/ and stage again.`,
  );
  // `--accept-floor N` stages a screen the extraction has been exhausted on:
  // every block already a component, every copy array already keyed rows, and
  // the only way left to add a beat would be to invent content the board does
  // not have (which I1 forbids) or to split a paragraph at an arbitrary point.
  // It is not a lower floor - the gate still fires and still prints - it is an
  // acknowledgement that has to be typed per screen with the number, and every
  // screen it is used on is named in the handover with its count.
  if (accept === null || n < accept) process.exit(1);
  console.error(`  ACCEPTED at ${accept}: extraction exhausted, named in the handover.`);
}
