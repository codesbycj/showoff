// Play a dashboard: run a scripted sequence of real interactions, photograph
// each beat, and diff every pair numerically.
//
//   node tools/drive.js <beats.json> [--out shots/drive] [--threshold 6]
//        [--dark] [--reduced] [--keep]
//
// This is the proof that a final-only showcase can be filmed. The video is a
// cursor using the dashboard, so the thing that has to be checked is not a
// layout — it is that every interaction the take will perform actually does
// something. A hover that does nothing, a range tab that re-renders the same
// path, a search box that filters nothing: all three look fine in a screenshot
// and all three ruin a take. A changed-pixel count catches every one of them.
//
// Never drive a reveal or a take step by step by hand against a live recording.
// Prove the sequence once, here, then film it.
//
// The beats file:
//
//   {
//     "url": "http://localhost:5300/",
//     "w": 1440, "h": 900, "settle": 600,
//     "beats": [
//       { "name": "rest" },
//       { "name": "hover-bar", "hover": "[data-mark='bar-07']", "against": "rest", "rest": true },
//       { "name": "range-90d", "click": "[data-range='90d']", "settle": 1200 },
//       { "name": "search", "fill": ["input[type=search]", "ac"] },
//       { "name": "table-down", "wheel": ["[data-scroller='table']", 600] },
//       { "name": "focus-ring", "key": "Tab" },
//       { "name": "theme", "click": "[data-toggle='theme']" }
//     ]
//   }
//
// Per beat: `eval`, `click`, `fill`, `key`, `wheel`, `hover` are applied in that
// order — hover last, so the pointer is resting on the thing being photographed.
// `rest: true` parks the pointer first. `against` names an earlier beat to diff
// against instead of the previous one, which is what makes a rest/hover pair a
// pair. `expectUnchanged: true` inverts the check for a beat that is meant to be
// inert.
const fs = require('fs');
const path = require('path');
const { launch, argv } = require('./cdp');
const { diff } = require('./pixels');

const a = argv();
const specPath = a.rest[0];
if (!specPath) {
  console.error('usage: node tools/drive.js <beats.json> [--out shots/drive]');
  process.exit(1);
}

const spec = JSON.parse(fs.readFileSync(specPath, 'utf8'));
const outDir = a.opt('out', path.join(path.dirname(specPath), 'shots', path.basename(specPath, '.json')));
const threshold = a.num('threshold', 6);

const pad = (s, n) => String(s).padEnd(n);
const num = (s, n) => String(s).padStart(n);

(async () => {
  const s = await launch({
    w: spec.w || a.num('w', 1440),
    h: spec.h || a.num('h', 900),
    reduced: a.flag('reduced') || !!spec.reduced,
    scheme: a.flag('dark') || spec.dark ? 'dark' : undefined,
  });

  fs.mkdirSync(outDir, { recursive: true });
  if (!a.flag('keep')) {
    for (const f of fs.readdirSync(outDir)) {
      if (f.endsWith('.png')) fs.rmSync(path.join(outDir, f));
    }
  }

  const shots = new Map();
  const report = [];
  let problems = 0;

  try {
    await s.goto(spec.url, spec.wait || a.num('wait', 2800));
    await s.parkPointer();
    await s.sleep(500);

    for (let i = 0; i < spec.beats.length; i++) {
      const beat = spec.beats[i];
      const name = beat.name || 'beat-' + i;
      const missing = [];

      if (beat.rest) {
        await s.parkPointer();
        await s.sleep(250);
      }
      if (beat.eval) {
        await s.evaluate(beat.eval);
        await s.sleep(200);
      }
      if (beat.click) {
        if (!(await s.click(beat.click))) missing.push('click ' + beat.click);
      }
      if (beat.fill) {
        const [sel, value] = beat.fill;
        if (!(await s.fill(sel, value ?? ''))) missing.push('fill ' + sel);
      }
      if (beat.key) {
        await s.key(beat.key);
      }
      if (beat.wheel) {
        const [sel, delta] = beat.wheel;
        if (!(await s.wheel(sel, delta ?? 600))) missing.push('wheel ' + sel);
      }
      if (beat.hover) {
        if (!(await s.hover(beat.hover))) missing.push('hover ' + beat.hover);
      }

      await s.sleep(beat.settle ?? spec.settle ?? 600);

      const file = path.join(outDir, `${String(i).padStart(2, '0')}-${name}.png`);
      const buf = await s.shoot(file);
      shots.set(name, buf);

      const againstName = beat.against || (i > 0 ? spec.beats[i - 1].name || 'beat-' + (i - 1) : null);
      let d = null;
      if (againstName && shots.has(againstName)) {
        d = diff(shots.get(againstName), buf, threshold);
      }

      const inert = !!beat.expectUnchanged;
      const changed = d && d.comparable ? d.changed : null;
      let verdict = '';
      if (missing.length) {
        verdict = 'MISSING: ' + missing.join(', ');
        problems++;
      } else if (changed === null) {
        verdict = i === 0 ? 'first frame' : 'not compared';
      } else if (changed === 0 && !inert) {
        verdict = 'NO CHANGE  <-- this beat did nothing';
        problems++;
      } else if (changed > 0 && inert) {
        verdict = 'CHANGED, but expectUnchanged';
        problems++;
      } else {
        verdict = inert ? 'inert, as expected' : 'ok';
      }

      const where = d && d.box ? `[${d.box.x},${d.box.y} ${d.box.w}x${d.box.h}]` : '';
      console.log(
        `${num(i, 2)}  ${pad(name, 22)} vs ${pad(againstName || '-', 18)}` +
          ` ${num(changed === null ? '-' : changed, 8)}px ${num(d && d.comparable ? (d.share * 100).toFixed(2) + '%' : '-', 7)}` +
          ` max ${num(d && d.comparable ? d.max : '-', 3)}  ${pad(where, 22)} ${verdict}`,
      );

      report.push({ i, name, against: againstName, file: path.basename(file), missing, diff: d, verdict });
    }

    fs.writeFileSync(path.join(outDir, 'report.json'), JSON.stringify({ spec: specPath, beats: report }, null, 2));
    console.log(`\n${spec.beats.length} beats, ${problems} problem${problems === 1 ? '' : 's'} -> ${outDir}`);
    if (problems) {
      console.log('A beat that changed nothing is a beat the take cannot perform. Fix it before filming.');
    }
  } finally {
    s.close();
  }

  process.exit(problems ? 1 : 0);
})();
