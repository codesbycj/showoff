// Photograph a dashboard state.
//
//   node tools/shot.js <url> <out.png> [--w 1440] [--h 900] [--dpr 1]
//        [--wait 2600] [--dark] [--reduced] [--click sel] [--hover sel]
//        [--fill "sel::text"] [--eval "<js>"]
//        [--scroller sel --bands 4 [--delta 800]]
//        [--clip "x,y,w,h"]
//
// One viewport by default, because a dashboard *is* one viewport: a fixed shell
// with inner scroll regions. `--bands` wheels an inner scroller instead of the
// window, which is the only thing that moves in a shell, and stops early when
// the scroller stops moving.
//
// The first capture is always taken and thrown away (see cdp.js): the first shot
// after a cold Vite server is pre-hydration and comes back with the chart
// undrawn.
const { launch, argv } = require('./cdp');

const a = argv();
const url = a.rest[0];
const out = a.rest[1];
if (!url || !out) {
  console.error('usage: node tools/shot.js <url> <out.png> [options]');
  process.exit(1);
}

const stem = out.replace(/\.png$/i, '');

(async () => {
  const s = await launch({
    w: a.num('w', 1440),
    h: a.num('h', 900),
    dpr: a.num('dpr', 1),
    reduced: a.flag('reduced'),
    scheme: a.flag('dark') ? 'dark' : a.flag('light') ? 'light' : undefined,
  });

  try {
    await s.goto(url, a.num('wait', 2600));
    await s.parkPointer();

    if (a.opt('eval')) {
      await s.evaluate(a.opt('eval'));
      await s.sleep(600);
    }
    if (a.opt('click')) {
      const b = await s.click(a.opt('click'));
      if (!b) console.error('click target not found: ' + a.opt('click'));
      await s.sleep(a.num('settle', 900));
    }
    if (a.opt('fill')) {
      const [sel, value] = a.opt('fill').split('::');
      const b = await s.fill(sel, value || '');
      if (!b) console.error('fill target not found: ' + sel);
      await s.sleep(a.num('settle', 900));
    }
    if (a.opt('hover')) {
      const b = await s.hover(a.opt('hover'));
      if (!b) console.error('hover target not found: ' + a.opt('hover'));
      await s.sleep(a.num('settle', 700));
    }

    const clip = a.opt('clip')
      ? (([x, y, w, h]) => ({ x: +x, y: +y, width: +w, height: +h }))(a.opt('clip').split(','))
      : undefined;

    const bands = a.num('bands', 0);
    if (!bands) {
      await s.shoot(out, clip);
      console.log(out);
    } else {
      const scroller = a.opt('scroller', null);
      const delta = a.num('delta', s.H - 120);
      let last = -1;
      for (let i = 0; i < bands; i++) {
        const name = `${stem}-${String(i).padStart(2, '0')}.png`;
        await s.shoot(name, clip);
        const top = scroller
          ? await s.evaluate(
              'Math.round(document.querySelector(' + JSON.stringify(scroller) + ')?.scrollTop ?? -1)',
            )
          : await s.evaluate('Math.round(window.scrollY)');
        console.log(`${name}  scrollTop=${top}`);
        if (top === last) {
          console.log('  (scroller stopped moving — done)');
          break;
        }
        last = top;
        if (i < bands - 1) {
          await s.wheel(scroller, delta);
          await s.sleep(a.num('settle', 900));
        }
      }
    }
  } finally {
    s.close();
  }
})();
