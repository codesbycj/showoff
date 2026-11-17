#!/usr/bin/env node
// Capture one frame per reveal step, against the running dev server.
//
//   node tools/preview/stepshots.js <slug> <screen> [outdir] [--port 8082] [--settle 400] [--poll 350]
//
// RULES 0.2/0.3/0.4 say every step must paint, no step may paint more than ~15%
// of the frame, and no intermediate state may error. None of those can be
// checked from the end of a replay, which is all `verify` and `rehearse` see -
// so a reveal passes both and still opens on ten seconds of nothing, or
// red-screens at step 14. This captures the middle.
//
// One Chrome for the whole screen: spawning one per step costs ~7s x 40 steps.
// The page is navigated once and left alone; each step is a file write that
// Fast Refresh redraws, exactly as a take does it.
//
// It writes frames and meta.json only. `stepdiff.py` does the judging, because
// the diff wants PIL and the judgement wants to be readable.

const { spawn, execFileSync } = require('child_process');
const fs = require('fs');
const http = require('http');
const os = require('os');
const path = require('path');

const CHROME = 'C:/Program Files/Google/Chrome/Application/chrome.exe';
const DBG = 9336;
const W = 393, H = 852, DSF = 3;
const INSETS = (process.env.SHOOT_INSETS || '59,0,34,0').split(',').map(Number);

const argv = process.argv.slice(2);
const flag = (n, d) => {
  const i = argv.indexOf('--' + n);
  return i === -1 ? d : argv[i + 1];
};
const pos = argv.filter((a, i) => !a.startsWith('--') && !(i > 0 && argv[i - 1].startsWith('--')));
const [slug, screen, outArg] = pos;
if (!slug || !screen) {
  console.error('usage: stepshots.js <slug> <screen> [outdir] [--port 8082] [--settle 400] [--poll 350]');
  process.exit(1);
}
const PORT = +flag('port', process.env.EXPO_PORT || 8082);
const SETTLE = +flag('settle', 400);
// How long between the two captures that have to match for a frame to count as
// settled. Short, because most steps are already still by the first pair.
const STEP_POLL = +flag('poll', 350);
// How long to wait for a step's write to reach the screen before recording the
// frame as unchanged. Metro rebuilds the web bundle on every write and a reveal
// out-runs it, so a frame can still hold the previous step when it is grabbed.
// Waiting it out turns "we did not look long enough" into a measured zero: the
// one fact compaction must never guess at.
// 5s is about twelve times the rebuild latency measured here, and the probe
// cannot build a backlog any more, so a longer window buys nothing but time:
// every screen carries a handful of genuinely empty steps before compaction.
const MAXWAIT = +flag('maxwait', 5000);
const OUT = path.resolve(outArg || path.join('.probe', slug + '-' + screen));
const ROOT = path.resolve(__dirname, '..', '..');

const py = (...a) => {
  try {
    return execFileSync('python', [path.join(ROOT, 'tools/timelapse/stepapply.py'), ...a], {
      cwd: ROOT, encoding: 'utf8',
    }).trim();
  } catch (e) {
    const msg = ((e.stderr || '') + (e.stdout || '')).trim() || e.message;
    throw new Error('stepapply ' + a.join(' ') + ': ' + msg.split('\n').slice(-3).join(' | '));
  }
};

const getJSON = (p) => new Promise((res, rej) => {
  http.get({ host: '127.0.0.1', port: DBG, path: p }, (r) => {
    let d = ''; r.on('data', (c) => (d += c)); r.on('end', () => res(JSON.parse(d)));
  }).on('error', rej);
});

(async () => {
  // Fail before spawning anything if the server is not up - the alternative is
  // 40 screenshots of a connection-refused page.
  await new Promise((res, rej) => {
    http.get({ host: 'localhost', port: PORT, path: '/' }, res)
      .on('error', () => rej(new Error(`no dev server on :${PORT} - npx expo start --web --port ${PORT}`)));
  });

  const total = +py(slug, screen, 'count');
  const labels = py(slug, screen, 'labels').split('\n')
    .map((l) => l.split('\t')[1] || '');
  fs.mkdirSync(OUT, { recursive: true });
  for (const f of fs.readdirSync(OUT)) fs.unlinkSync(path.join(OUT, f));

  console.log(`${slug}/${screen}: ${total} steps -> ${OUT}`);
  py(slug, 'blank');

  const chrome = spawn(CHROME, [
    '--headless=new', '--no-sandbox', '--disable-gpu', '--hide-scrollbars',
    `--remote-debugging-port=${DBG}`,
    '--user-data-dir=' + path.join(os.tmpdir(), 'showoff-stepshots'),
    'about:blank',
  ], { stdio: 'ignore' });

  let page;
  for (let i = 0; i < 60 && !page; i++) {
    try {
      const l = await getJSON('/json/list');
      page = l.find((x) => x.type === 'page' && x.webSocketDebuggerUrl);
    } catch {}
    if (!page) await new Promise((r) => setTimeout(r, 500));
  }
  const ws = new WebSocket(page.webSocketDebuggerUrl);
  await new Promise((r) => ws.addEventListener('open', r, { once: true }));
  let id = 0;
  const send = (method, params = {}) => new Promise((res, rej) => {
    const my = ++id;
    const h = (e) => {
      const m = JSON.parse(e.data);
      if (m.id === my) { ws.removeEventListener('message', h); m.error ? rej(new Error(m.error.message)) : res(m.result); }
    };
    ws.addEventListener('message', h);
    ws.send(JSON.stringify({ id: my, method, params }));
  });

  await send('Page.enable');
  await send('Runtime.enable');
  await send('Emulation.setDeviceMetricsOverride', { width: W, height: H, deviceScaleFactor: DSF, mobile: true });
  if (INSETS.some((v) => v)) {
    const [t, r, b, l] = INSETS;
    await send('Page.addScriptToEvaluateOnNewDocument', {
      source: `(() => {
        const real = window.getComputedStyle.bind(window);
        const fake = { paddingTop: '${t}px', paddingRight: '${r}px',
                       paddingBottom: '${b}px', paddingLeft: '${l}px' };
        window.getComputedStyle = function (el, pe) {
          const cs = real(el, pe);
          if (el && el.style && String(el.style.paddingTop).includes('safe-area-inset')) {
            return new Proxy(cs, { get(target, key) {
              if (key in fake) return fake[key];
              const v = Reflect.get(target, key);
              return typeof v === 'function' ? v.bind(target) : v;
            } });
          }
          return cs;
        };
      })();`,
    });
  }

  const clip = { x: 0, y: 0, width: W, height: H, scale: 1 };
  const grab = async () => {
    const s = await send('Page.captureScreenshot', { format: 'png', clip, captureBeyondViewport: true });
    return s.data;
  };
  const wait = (ms) => new Promise((r) => setTimeout(r, ms));

  /**
   * Shoot the step once the frame has stopped moving.
   *
   * A fixed settle is a guess about how long Metro takes to rebuild and the
   * browser takes to repaint, and the guess is wrong in both directions: 1.5s
   * was too long for a step that changes one label and too short for one that
   * decodes a photograph. Too short is the dangerous one - the frame still
   * holds the previous step, the step reads as painting nothing, and
   * `compact.py` merges a step that was perfectly good. vestaitem reported
   * nine such steps on one pass and one on the next, from the same files.
   *
   * So it waits in two phases, and the first one is the one that was missing.
   *
   * WAIT FOR CHANGE, against the frame from *before* the write. Stability alone
   * cannot see staleness: a page Metro has not rebuilt yet is perfectly still,
   * so "capture until two consecutive frames match" returns the stale frame on
   * the very first comparison. vitalstats measured steps 4-17 at 0.00% and then
   * step 18 at 54.1% - fourteen stale frames and the catch-up - from a screen
   * that renders correctly, and `compact.py` merged fourteen good steps because
   * the probe told it they were empty.
   *
   * THEN WAIT FOR STILL. The first changed frame can be mid-paint, since a
   * photograph decodes in more than one pass, so settle on stability from
   * there. PNG bytes are deterministic for identical pixels, so both
   * comparisons are exact and need no decoder.
   *
   * Because it never advances on a pending frame, Metro can never fall more
   * than one step behind, and a step that waits out the whole window is a zero
   * the probe has *proved* rather than guessed - `waitedOut` records that, and
   * it is the difference between "paints nothing" and "we did not look long
   * enough". Measured rebuild latency here is under 400ms, so the window is
   * about twenty times the real one.
   */
  const shootSettled = async (name, before) => {
    let data = await grab();
    let waited = 0;
    while (before !== undefined && data === before && waited < MAXWAIT) {
      await wait(STEP_POLL);
      waited += STEP_POLL;
      data = await grab();
    }
    const waitedOut = before !== undefined && data === before;
    let prev = data;
    for (let i = 0; i < 10; i += 1) {
      await wait(STEP_POLL);
      data = await grab();
      if (data === prev) break;
      prev = data;
    }
    fs.writeFileSync(path.join(OUT, name), Buffer.from(data, 'base64'));
    return { data, waited, waitedOut };
  };
  const shoot = async (name) => {
    fs.writeFileSync(path.join(OUT, name), Buffer.from(await grab(), 'base64'));
  };
  // Expo/Metro put a compile or runtime failure in the DOM as text.
  //
  // This matched a list of message openings, and the list was short: it carried
  // "Unhandled ... Error" but not "Uncaught Error", which is the heading the
  // runtime overlay actually uses. crypinconfirm red-screened at step 6 with
  // `T is not defined` and the probe recorded no error, so a whole pass over 35
  // screens reported err=0 while a screen was broken. A detector that is wrong
  // in the quiet direction is worse than none.
  //
  // So it now asks a structural question first - is the overlay in the DOM? -
  // and only falls back to matching text. The overlay always carries its own
  // chrome ("Component Stack") alongside the message, which no screen renders,
  // so the pair is what keeps a screen that legitimately prints the word
  // "error" from reporting itself broken.
  const errText = async () => {
    const r = await send('Runtime.evaluate', {
      returnByValue: true,
      expression: `(() => {
        const t = (document.body && document.body.innerText || '').slice(0, 6000);
        const CLASS = /(?:Uncaught|Unhandled)(?: JS)?(?: \\w+)? ?Error|(?:Syntax|Type|Reference|Range|Eval|URI)Error|Failed to compile|Module not found|Unable to resolve|Warning: Failed|Invariant Violation/;
        const MSG = /(?:is not defined|is not a function|Cannot read propert|undefined is not|Objects are not valid as a React child|Element type is invalid)/;
        const overlay = /Component Stack|Call Stack|This error is located at/.test(t);
        if (!overlay && !CLASS.test(t)) return '';
        // Report the first line that names the failure, so the row in the table
        // says what broke rather than that something did.
        for (const line of t.split('\\n')) {
          const s = line.trim();
          if (s && (CLASS.test(s) || MSG.test(s))) return s.slice(0, 200);
        }
        return overlay ? 'error overlay (no message line found)' : '';
      })()`,
    });
    return (r.result && r.result.value) || '';
  };

  await send('Page.navigate', { url: `http://localhost:${PORT}/${slug}` });
  await new Promise((r) => setTimeout(r, 4000));
  // Shoot twice: the first capture after a server start is pre-hydration.
  await shoot('_warm.png');
  await wait(600);
  // The ground has nothing before it to differ from, so it only settles.
  let before = (await shootSettled('00.png')).data;

  const meta = { slug, screen, total, port: PORT, settle: SETTLE, maxwait: MAXWAIT, steps: [] };
  const blankErr = await errText();
  if (blankErr) meta.blankError = blankErr;

  for (let n = 1; n <= total; n++) {
    let label = labels[n - 1] || '';
    let failed = '';
    try {
      label = py(slug, screen, String(n)) || label;
    } catch (e) {
      failed = e.message;
    }
    await wait(SETTLE);
    const name = String(n).padStart(2, '0') + '.png';
    const shot = await shootSettled(name, before);
    before = shot.data;
    const err = failed || (await errText());
    meta.steps.push({ n, label, file: name, error: err, waitMs: shot.waited, waitedOut: shot.waitedOut });
    process.stdout.write(
      `\r  ${n}/${total} ${shot.waited ? '+' + shot.waited + 'ms ' : ''}` +
        `${shot.waitedOut ? 'ZERO ' : ''}${err ? 'ERROR' : ''}        `,
    );
    if (failed) break;
  }
  process.stdout.write('\n');

  fs.writeFileSync(path.join(OUT, 'meta.json'), JSON.stringify(meta, null, 2));
  console.log('frames + meta.json ->', OUT);
  ws.close();
  try { execFileSync('taskkill', ['/F', '/T', '/PID', String(chrome.pid)], { stdio: 'ignore' }); } catch {}
  process.exit(0);
})().catch((e) => { console.error('ERROR:', e.message); process.exit(1); });
