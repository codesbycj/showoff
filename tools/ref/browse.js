#!/usr/bin/env node
// Drive a real browser with a PERSISTENT profile, so a site you have to log
// into stays logged in between runs.
//
//   node tools/ref/browse.js login  [url]          # headful: sign in, then close it
//   node tools/ref/browse.js check  <url>          # is the session still good?
//   node tools/ref/browse.js grab   <url> <out.png> [--full]
//   node tools/ref/browse.js images <url> <outdir> [--min 600]
//
// Flags, on any command:
//   --browser chrome|opera|brave|edge   which installed browser to drive
//   --profile live                      use that browser's REAL profile, i.e.
//                                       whatever you are already signed into.
//                                       Close the browser first.
//   --headful                           show the window. Cloudflare and friends
//                                       serve "Just a moment..." to a headless
//                                       one; a real window usually gets through.
//
// The default profile lives outside the repo at ~/.showoff/<browser>-profile and
// survives sessions. `login` opens a normal window; sign in, close it, and every
// later run reuses those cookies.
//
// Chrome keeps one lock per profile directory, so the headful window must be
// CLOSED before a headless command runs. The commands say so rather than
// hanging on it.
//
// `images` fetches each asset from INSIDE the page, so the session's cookies
// go with the request - a CDN that 403s a bare curl returns the real file.

const { spawn } = require('child_process');
const fs = require('fs');
const http = require('http');
const os = require('os');
const path = require('path');

// Every one of these is Chromium underneath, so CDP is identical.
const BROWSERS = {
  chrome: 'C:/Program Files/Google/Chrome/Application/chrome.exe',
  opera: path.join(os.homedir(), 'AppData/Local/Programs/Opera/opera.exe'),
  brave: 'C:/Program Files/BraveSoftware/Brave-Browser/Application/brave.exe',
  edge: 'C:/Program Files (x86)/Microsoft/Edge/Application/msedge.exe',
};
// Our own profile by default. --profile live points at the browser's REAL
// profile, which carries whatever you are already signed into - it is opt-in
// for that reason, and the browser must be closed first (one lock per profile).
const LIVE_PROFILES = {
  opera: path.join(os.homedir(), 'AppData/Roaming/Opera Software/Opera Stable'),
  chrome: path.join(os.homedir(), 'AppData/Local/Google/Chrome/User Data'),
  brave: path.join(os.homedir(), 'AppData/Local/BraveSoftware/Brave-Browser/User Data'),
  edge: path.join(os.homedir(), 'AppData/Local/Microsoft/Edge/User Data'),
};
const PORT = 9412;

const argv = process.argv.slice(2);
const cmd = argv[0];
const flag = (name, dflt) => {
  const i = argv.indexOf('--' + name);
  return i === -1 ? dflt : argv[i + 1];
};
const has = (name) => argv.includes('--' + name);

function which() {
  const name = (flag('browser', 'chrome') || 'chrome').toLowerCase();
  const exe = BROWSERS[name];
  if (!exe) throw new Error('unknown --browser ' + name + ' (' + Object.keys(BROWSERS).join('/') + ')');
  if (!fs.existsSync(exe)) throw new Error(name + ' is not installed at ' + exe);
  return { name, exe };
}

function profileFor(name) {
  const p = flag('profile', null);
  if (p === 'live') {
    const live = LIVE_PROFILES[name];
    if (!fs.existsSync(live)) throw new Error('no live profile for ' + name + ' at ' + live);
    return live;
  }
  return p || path.join(os.homedir(), '.showoff', name + '-profile');
}

function launch(headless) {
  const { name, exe } = which();
  const profile = profileFor(name);
  fs.mkdirSync(profile, { recursive: true });
  const args = [
    '--no-first-run', '--no-default-browser-check', '--hide-scrollbars',
    `--remote-debugging-port=${PORT}`, `--user-data-dir=${profile}`,
  ];
  // A headless window gets challenged by Cloudflare and friends; a real one
  // mostly does not. --headful trades visibility for getting the page at all.
  if (headless && !has('headful')) args.push('--headless=new', '--disable-gpu');
  else args.push('--start-maximized');
  return spawn(exe, args.concat(['about:blank']), {
    stdio: 'ignore',
    detached: !headless,
  });
}

const getJSON = (p) => new Promise((res, rej) => {
  http.get({ host: '127.0.0.1', port: PORT, path: p }, (r) => {
    let d = '';
    r.on('data', (c) => (d += c));
    r.on('end', () => { try { res(JSON.parse(d)); } catch (e) { rej(e); } });
  }).on('error', rej);
});

async function target(tries = 60) {
  for (let i = 0; i < tries; i++) {
    try {
      const list = await getJSON('/json/list');
      const p = list.find((x) => x.type === 'page' && x.webSocketDebuggerUrl);
      if (p) return p;
    } catch {}
    await new Promise((r) => setTimeout(r, 500));
  }
  throw new Error(
    'Chrome did not expose a debug target. If a login window is still open, ' +
    'close it first - one lock per profile.'
  );
}

function session(ws) {
  let id = 0;
  return (method, params = {}) => new Promise((res, rej) => {
    const myId = ++id;
    const onMsg = (e) => {
      const m = JSON.parse(e.data);
      if (m.id === myId) {
        ws.removeEventListener('message', onMsg);
        m.error ? rej(new Error(m.error.message)) : res(m.result);
      }
    };
    ws.addEventListener('message', onMsg);
    ws.send(JSON.stringify({ id: myId, method, params }));
  });
}

async function withPage(fn, { width = 1440, height = 900, dsf = 2 } = {}) {
  const chrome = launch(true);
  try {
    const t = await target();
    const ws = new WebSocket(t.webSocketDebuggerUrl);
    await new Promise((r) => ws.addEventListener('open', r, { once: true }));
    const send = session(ws);
    await send('Page.enable');
    await send('Runtime.enable');
    await send('Emulation.setDeviceMetricsOverride', {
      width, height, deviceScaleFactor: dsf, mobile: false,
    });
    const out = await fn(send);
    ws.close();
    return out;
  } finally {
    chrome.kill();
  }
}

async function goto(send, url, settle = +flag('settle', 3500)) {
  await send('Page.navigate', { url });
  await new Promise((r) => setTimeout(r, settle));
}

const evalJS = async (send, expr) => {
  const r = await send('Runtime.evaluate', {
    expression: expr, awaitPromise: true, returnByValue: true,
  });
  return r.result && r.result.value;
};

async function cmdLogin() {
  const { name, exe } = which();
  const profile = profileFor(name);
  const url = argv[1] && !argv[1].startsWith('--') ? argv[1] : null;
  const c = launch(false);
  c.unref();
  console.log(`Opened ${name} on this profile:`);
  console.log('  ' + profile);
  console.log('');
  console.log('1. Sign in to the site you want references from' + (url ? ' (' + url + ')' : ''));
  console.log('2. CLOSE the window when done - one lock per profile.');
  console.log(`3. Then: node tools/ref/browse.js check <url> --browser ${name}`);
  if (url) {
    setTimeout(() => {
      try {
        spawn(exe, [`--user-data-dir=${profile}`, url], { detached: true, stdio: 'ignore' }).unref();
      } catch {}
    }, 1500);
  }
}

async function cmdCheck() {
  const url = argv[1];
  if (!url) return console.error('usage: browse.js check <url>'), 1;
  const info = await withPage(async (send) => {
    await goto(send, url);
    return evalJS(send, `(() => ({
      url: location.href,
      title: document.title,
      chars: document.body ? document.body.innerText.length : 0,
      signals: ['sign in','log in','login','sign up','create account']
        .filter(s => (document.body ? document.body.innerText : '').toLowerCase().includes(s)),
    }))()`);
  });
  console.log('final url :', info.url);
  console.log('title     :', info.title);
  console.log('text chars:', info.chars);
  console.log('auth words:', info.signals.join(', ') || '(none)');
  console.log(info.signals.length && info.chars < 4000
    ? '\n-> looks SIGNED OUT: run `login` and sign in.'
    : '\n-> looks signed in (or the page is public).');
  return 0;
}

async function cmdGrab() {
  const [, url, out] = argv;
  if (!url || !out) return console.error('usage: browse.js grab <url> <out.png> [--full]'), 1;
  const data = await withPage(async (send) => {
    await goto(send, url);
    const r = await send('Page.captureScreenshot', {
      format: 'png', captureBeyondViewport: has('full'),
    });
    return r.data;
  }, { width: +flag('w', 1440), height: +flag('h', 900) });
  fs.writeFileSync(out, Buffer.from(data, 'base64'));
  console.log('wrote', out, fs.statSync(out).size, 'bytes');
  return 0;
}

async function cmdImages() {
  const [, url, outdir] = argv;
  if (!url || !outdir) return console.error('usage: browse.js images <url> <outdir> [--min 600]'), 1;
  const min = +flag('min', 600);
  fs.mkdirSync(outdir, { recursive: true });

  const files = await withPage(async (send) => {
    await goto(send, url, 5000);
    // Scroll through so lazy images mount, then collect everything that
    // RENDERS large - the rendered box is what makes it a screen rather than
    // an avatar, and it is not inferable from the URL.
    await evalJS(send, `(async () => {
      for (let y = 0; y < document.body.scrollHeight; y += 700) {
        window.scrollTo(0, y); await new Promise(r => setTimeout(r, 180));
      }
      window.scrollTo(0, 0); await new Promise(r => setTimeout(r, 600));
    })()`);
    // --scope confines collection to the results container. Without it a search
    // page also yields its own footer rail, which is identical on every query -
    // six duplicate "shots" per pull, and they look like results until you hash
    // two pulls against each other.
    const scope = flag('scope', null);
    const urls = await evalJS(send, `(() => {
      const out = new Set();
      const imgs = ${scope ? `[...document.querySelectorAll(${JSON.stringify(scope)})]
        .flatMap(el => el.tagName === 'IMG' ? [el] : [...el.querySelectorAll('img')])`
        : '[...document.images]'};
      for (const img of imgs) {
        const r = img.getBoundingClientRect();
        if (Math.min(r.width, r.height) < ${min / 4} || r.height < ${min / 2}) continue;
        let best = img.currentSrc || img.src;
        if (img.srcset) {
          const cand = img.srcset.split(',').map(s => s.trim().split(/\\s+/))
            .map(([u, d]) => ({ u, n: parseInt(d) || 0 })).sort((a, b) => b.n - a.n)[0];
          if (cand && cand.u) best = cand.u;
        }
        if (best && !best.startsWith('data:')) out.add(new URL(best, location.href).href);
      }
      return [...out];
    })()`);
    // Download in NODE, not in the page. An in-page fetch to a different-origin
    // CDN is refused by CORS unless that CDN opts in, and the refusal arrives as
    // a thrown TypeError - indistinguishable from "no image" if you swallow it.
    // Cookies are carried explicitly instead, so a gated CDN still works.
    await send('Network.enable');
    const { cookies } = await send('Network.getAllCookies');
    return { urls, cookies };
  });

  const { urls, cookies } = files;
  console.log(`${urls.length} candidate images`);
  let n = 0, small = 0;
  for (const u of urls) {
    let buf;
    try {
      buf = await download(u, cookies);
    } catch (e) {
      console.log('   skip (fetch):', e.message.slice(0, 60));
      continue;
    }
    if (buf.length < 20000) { small++; continue; }
    const ext = (u.match(/\.(png|jpe?g|webp|avif)/i) || [, 'png'])[1].toLowerCase();
    const p = path.join(outdir, String(++n).padStart(2, '0') + '.' + ext);
    fs.writeFileSync(p, buf);
    console.log('  ', path.basename(p), buf.length, 'bytes');
  }
  console.log(`${n} images -> ${outdir}` + (small ? `  (${small} under 20KB, skipped)` : ''));
  if (!n) console.log('(nothing kept - try --min 200, or check you are signed in)');
  return 0;
}

function download(url, cookies, depth = 0) {
  if (depth > 4) return Promise.reject(new Error('too many redirects'));
  const https = require('https');
  const u = new URL(url);
  const jar = (cookies || [])
    .filter((c) => u.hostname === c.domain || u.hostname.endsWith(c.domain.replace(/^\./, '.')))
    .map((c) => `${c.name}=${c.value}`)
    .join('; ');
  return new Promise((res, rej) => {
    https.get({
      host: u.hostname,
      path: u.pathname + u.search,
      headers: Object.assign({
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Safari/537.36',
        Referer: u.origin + '/',
        Accept: 'image/avif,image/webp,image/png,image/*,*/*;q=0.8',
      }, jar ? { Cookie: jar } : {}),
    }, (r) => {
      if (r.statusCode >= 300 && r.statusCode < 400 && r.headers.location) {
        r.resume();
        return res(download(new URL(r.headers.location, url).href, cookies, depth + 1));
      }
      if (r.statusCode !== 200) { r.resume(); return rej(new Error('HTTP ' + r.statusCode)); }
      const chunks = [];
      r.on('data', (c) => chunks.push(c));
      r.on('end', () => res(Buffer.concat(chunks)));
    }).on('error', rej);
  });
}

const cmds = { login: cmdLogin, check: cmdCheck, grab: cmdGrab, images: cmdImages };
if (!cmds[cmd]) {
  console.error('usage: browse.js login|check|grab|images ...');
  process.exit(1);
}
cmds[cmd]().then((c) => process.exit(c || 0), (e) => {
  console.error('ERROR:', e.message);
  process.exit(1);
});
