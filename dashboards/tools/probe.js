// Measure a built dashboard, and audit it. Rule 8.
//
//   node tools/probe.js http://localhost:5300/ [--w 1440] [--h 900]
//        [--scope "[data-pane=main]"] [--dark] [--reduced] [--wait 3000]
//        [--json out.json] [--beats drive/hovers.json]
//
// It reports, for the page as rendered: whether the shell scrolls when it
// should not, every inner scroll region, dead space at the foot of each region,
// the column grid read off the boxes, the type scale actually in use, every
// text node that fails WCAG against its own ground, every interactive target
// under 44px, animations running at rest, every chart and whether it is
// labelled, duplicate SVG def ids, and every hover rule that matches something
// on the page.
//
// Its value is not the score. It is that it keeps finding things in my own
// build: the greys that fail AA are always mine, and so are the 28px icon
// buttons.
//
// `--beats` writes a drive.js script with one beat per hover it found, which is
// the hover pass of rule 6 turned into a command.
const fs = require('fs');
const path = require('path');
const { launch, argv } = require('./cdp');

const a = argv();
const url = a.rest[0];
if (!url) {
  console.error('usage: node tools/probe.js <url> [--scope sel] [--json out.json] [--beats out.json]');
  process.exit(1);
}

const pad = (s, n) => String(s).padEnd(n);
const num = (s, n) => String(s).padStart(n);

(async () => {
  const s = await launch({
    w: a.num('w', 1440),
    h: a.num('h', 900),
    reduced: a.flag('reduced'),
    scheme: a.flag('dark') ? 'dark' : a.flag('light') ? 'light' : undefined,
  });

  try {
    await s.goto(url, a.num('wait', 2600));

    // A dashboard's other tabs are states of one shell, not other URLs, so
    // getting to them is a click rather than a path.
    if (a.opt('click')) {
      if (!(await s.click(a.opt('click')))) {
        console.error('click target not found: ' + a.opt('click'));
        process.exit(1);
      }
      await s.sleep(a.num('settle', 900));
    }

    await s.parkPointer();
    await s.sleep(600);

    const r = await s.evaluateFile(path.join(__dirname, 'probe.page.js'), {
      scope: a.opt('scope', null),
      maxRows: a.num('rows', 40),
    });

    if (r.error) {
      console.error(r.error);
      process.exit(1);
    }

    const line = (label, value) => console.log(pad(label, 22) + value);

    console.log('\n=== shell ' + '='.repeat(58));
    line('viewport', `${r.shell.viewport.w}x${r.shell.viewport.h} @${r.shell.viewport.dpr}`);
    line('document height', r.shell.documentHeight);
    line(
      'document scrolls',
      r.shell.documentScrolls
        ? `YES  <-- a dashboard shell should not; ${r.shell.documentHeight - r.shell.viewport.h}px over`
        : 'no',
    );
    line('horizontal scroll', r.shell.horizontalScroll ? 'YES  <-- defect' : 'no');
    line('shell children', r.shell.children.map((c) => `${c.path} ${c.box.w}x${c.box.h}`).join('\n' + ' '.repeat(22)));

    console.log('\n=== inner scroll regions ' + '='.repeat(44));
    if (!r.scrollers.length) console.log('  none');
    r.scrollers.forEach((sc) =>
      console.log(
        `  ${pad(sc.path, 48)} ${num(sc.clientHeight, 5)} of ${num(sc.scrollHeight, 6)}  ${sc.overflowY}`,
      ),
    );

    console.log('\n=== dead space at the foot ' + '='.repeat(42));
    if (!r.deadSpace.length) console.log('  none over 24px');
    r.deadSpace.forEach((d) =>
      console.log(`  ${pad(d.path, 48)} gap ${num(d.gap, 4)}px  (content ends ${d.contentBottom}, region ${d.regionBottom})`),
    );

    console.log('\n=== column grid (edges shared by 3+ boxes) ' + '='.repeat(26));
    console.log('  ' + r.gridX.map((e) => `${e.x}(${e.n})`).join('  '));

    console.log('\n=== type scale (size/weight/family) ' + '='.repeat(33));
    r.typeScale.forEach((t) => console.log(`  ${num(t.count, 4)}x  ${pad(t.key, 46)} "${t.sample}"`));

    if (r.smallText.length) {
      console.log('\n=== text under 12px ' + '='.repeat(49));
      r.smallText.forEach((t) => console.log(`  ${num(t.size, 5)}px  ${pad(t.path, 40)} "${t.sample}"`));
    }

    console.log('\n=== contrast ' + '='.repeat(56));
    line('nodes measured', r.contrast.measured);
    line('failures', r.contrast.failureCount);
    r.contrast.failures.forEach((c) =>
      console.log(`  ${num(c.ratio, 5)}:1 (needs ${c.need})  ${num(c.size, 4)}px/${c.weight}  ${pad(c.fg + ' on ' + c.bg, 34)} "${c.sample}"`),
    );

    console.log('\n=== targets under 44px ' + '='.repeat(46));
    if (!r.targets.length) console.log('  none');
    r.targets.forEach((t) =>
      console.log(`  ${num(t.w, 4)}x${num(t.h, 4)}  ${t.w < 24 || t.h < 24 ? 'UNDER 24  ' : '          '}${pad(t.path, 40)} "${t.label}"`),
    );
    if (r.unlabelled.length) {
      console.log('  --- no accessible name:');
      r.unlabelled.forEach((u) => console.log(`  ${pad(u.path, 48)} ${u.box.w}x${u.box.h}`));
    }

    console.log('\n=== motion at rest ' + '='.repeat(50));
    line('animations running', `${r.motionAtRest.running} (${r.motionAtRest.infinite} infinite)`);
    r.motionAtRest.items.forEach((m) => console.log(`  ${pad(m.path, 44)} ${m.name} ${m.duration} x${m.iterations}`));

    console.log('\n=== charts ' + '='.repeat(58));
    if (!r.charts.length) console.log('  no svg over 48x32');
    r.charts.forEach((c) =>
      console.log(
        `  ${pad(c.path, 40)} ${num(c.box.w, 4)}x${num(c.box.h, 4)}  marks ${num(c.marks, 4)}  text ${num(c.texts, 3)}` +
          `  ${c.role || c.ariaLabel || c.hasTitle ? 'labelled' : 'UNLABELLED'}`,
      ),
    );
    if (r.duplicateDefIds.length) {
      console.log('  !!! duplicate SVG def ids — these are document-global, so only the first paints:');
      r.duplicateDefIds.forEach((d) => console.log(`      id="${d.id}" x${d.count}   <-- use useId()`));
    }

    console.log('\n=== hover rules that match something on the page ' + '='.repeat(20));
    console.log('  ' + (r.hovers.length ? r.hovers.join('\n  ') : 'none — suspicious unless the design truly has none'));
    if (r.transitions.length) {
      console.log('  --- transitions declared on interactive elements:');
      r.transitions.forEach((t) => console.log(`      ${pad(t.path, 44)} ${t.transition} ${t.duration}`));
    }

    console.log('\n=== content ' + '='.repeat(57));
    line('outline', r.outline.map((o) => '  '.repeat(o.level - 1) + 'h' + o.level + ' ' + o.text).join('\n' + ' '.repeat(22)) || 'none');
    line('selectable chars', r.selectable);
    line('families', r.families.join(', '));
    line('elements', `${r.counts.visible} visible of ${r.counts.elements}`);
    if (r.images.length) {
      console.log('  images:');
      r.images.forEach((i) =>
        console.log(`    ${pad(i.src, 36)} natural ${pad(i.natural, 11)} shown ${pad(i.displayed, 11)} ${i.complete ? '' : 'NOT LOADED'} ${i.alt === null ? 'no alt' : ''}`),
      );
    }

    if (a.opt('json')) {
      fs.writeFileSync(a.opt('json'), JSON.stringify(r, null, 2));
      console.log('\nwrote ' + a.opt('json'));
    }

    if (a.opt('beats')) {
      const out = {
        url,
        w: a.num('w', 1440),
        h: a.num('h', 900),
        settle: 500,
        beats: [{ name: 'rest' }].concat(
          r.hovers.map((sel, i) => ({ name: 'hover-' + String(i + 1).padStart(2, '0'), hover: sel, rest: true })),
        ),
      };
      fs.mkdirSync(path.dirname(a.opt('beats')), { recursive: true });
      fs.writeFileSync(a.opt('beats'), JSON.stringify(out, null, 2));
      console.log('wrote ' + a.opt('beats') + ` — ${r.hovers.length} hover beats, run it with drive.js`);
    }

    console.log('');
  } finally {
    s.close();
  }
})();
