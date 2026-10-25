#!/usr/bin/env node
/**
 * One command for everything a take needs, in the order it needs it:
 *
 *   node tools/record.js <slug> [extra expo start args]
 *
 *     1. node tools/showcase.js use <slug>
 *     2. python tools/timelapse/run.py <slug> preflight
 *     3. npx expo start                     (stays up)
 *     4. asks, then python tools/timelapse/run.py <slug> 1 --delay 1.5
 *
 * **Step 4 runs while the server is still up, not after it.** `expo start`
 * never finishes on its own, and the reveal needs the server alive anyway —
 * each step is a file write that Fast Refresh has to redraw. So the server is
 * spawned as a child and left running, and the reveal is driven against it.
 *
 * Step 1 before step 2 is the other thing that matters. `lock` hashes
 * `src/app/index.tsx`, the boot redirect, so a preflight run before `use`
 * reports `DRIFT changed src/app/index.tsx` on every showcase that is not the
 * one currently booting — which reads as a broken showcase and is not one.
 *
 * Preflight is a gate: if it fails the server is never started, because a take
 * that begins on a drifted tree records the wrong thing and nothing notices
 * until afterwards.
 *
 * The individual commands still work on their own; this only saves typing.
 *
 * Flags:
 *   --no-start      stop after preflight
 *   --no-reveal     start the server and stop there (no prompt)
 *   --screen N      which screen to reveal (default 1)
 *   --delay S       seconds between steps (default 1.5)
 *   anything else   passed through to `expo start` (--port 8082, -c, ...)
 */

const { spawn, spawnSync } = require('child_process');
const fs = require('fs');
const path = require('path');
const readline = require('readline');

const ROOT = path.resolve(__dirname, '..');
const APP = path.join(ROOT, 'src', 'app');

function slugs() {
  try {
    return fs
      .readdirSync(APP, { withFileTypes: true })
      .filter((e) => e.isDirectory() && e.name !== 'animated')
      .filter((e) => fs.existsSync(path.join(APP, e.name, 'index.tsx')))
      .map((e) => e.name)
      .sort();
  } catch {
    return [];
  }
}

function step(n, total, label, cmd, args, opts) {
  console.log('\n[' + n + '/' + total + '] ' + label);
  console.log('      ' + cmd + ' ' + args.join(' '));
  // shell:true because npx and python are .cmd/.exe shims on Windows and
  // spawnSync will not find them otherwise.
  const r = spawnSync(cmd, args, { cwd: ROOT, stdio: 'inherit', shell: true, ...opts });
  if (r.error) {
    console.error('\n' + cmd + ' could not be run: ' + r.error.message);
    process.exit(1);
  }
  return r.status === null ? 0 : r.status;
}

function takeNamed(argv, flag, fallback) {
  const i = argv.indexOf(flag);
  if (i === -1 || i === argv.length - 1) return { value: fallback, used: [] };
  return { value: argv[i + 1], used: [flag, argv[i + 1]] };
}

const argv = process.argv.slice(2);

const screen = takeNamed(argv, '--screen', '1');
const delay = takeNamed(argv, '--delay', '1.5');
const consumed = new Set([...screen.used, ...delay.used, '--no-start', '--no-reveal']);

// Prefer a bare argument that is actually a showcase, so `--port 8082 budgecal`
// does not pick up "8082" as the slug; fall back to the first bare argument so
// an unknown slug still reaches the error message below.
const known = new Set(slugs());
const bare = argv.filter((a) => !a.startsWith('-') && !consumed.has(a));
const slug = bare.find((a) => known.has(a)) ?? bare[0];
const passthrough = argv.filter((a) => a !== slug && !consumed.has(a));
const noStart = argv.includes('--no-start');
const noReveal = argv.includes('--no-reveal');

if (!slug) {
  console.error('usage: node tools/record.js <slug> [--no-start] [--no-reveal]');
  console.error('                              [--screen N] [--delay S] [expo start args]');
  console.error('\nshowcases:\n  ' + slugs().join(' '));
  process.exit(1);
}

if (!fs.existsSync(path.join(APP, slug, 'index.tsx'))) {
  console.error('unknown showcase "' + slug + '"');
  console.error('\nshowcases:\n  ' + slugs().join(' '));
  process.exit(1);
}

const TOTAL = noStart ? 2 : noReveal ? 3 : 4;

let code = step(1, TOTAL, 'point the boot redirect at ' + slug, 'node', [
  'tools/showcase.js',
  'use',
  slug,
]);
if (code !== 0) {
  console.error('\nstopped: could not repoint the boot redirect.');
  process.exit(code);
}

code = step(2, TOTAL, 'preflight ' + slug, 'python', [
  'tools/timelapse/run.py',
  slug,
  'preflight',
]);
if (code !== 0) {
  console.error(
    '\nstopped: preflight failed, so the dev server was not started.\n' +
      'Fix the drift it listed, or re-lock with:  python tools/timelapse/run.py ' +
      slug +
      ' lock',
  );
  process.exit(code);
}

if (noStart) {
  console.log('\n[2/2] done. ' + slug + ' is blank and ready.');
  process.exit(0);
}

// ---- step 3: the dev server, kept alive -----------------------------------

console.log('\n[3/' + TOTAL + '] expo start');
console.log('      npx expo start ' + passthrough.join(' '));

// stdin is deliberately not inherited: expo's interactive key menu would own
// it, and then there is no way to ask anything in step 4. The trade is expo's
// r/j/m shortcuts, which a take does not use.
const server = spawn('npx', ['expo', 'start', ...passthrough], {
  cwd: ROOT,
  stdio: ['ignore', 'pipe', 'pipe'],
  shell: true,
});

let stopping = false;

function stopServer() {
  if (stopping || !server.pid) return;
  stopping = true;
  if (process.platform === 'win32') {
    // Metro runs as a grandchild of the npx shim, so killing the pid alone
    // leaves it holding the port.
    spawnSync('taskkill', ['/pid', String(server.pid), '/T', '/F'], { stdio: 'ignore' });
  } else {
    try {
      process.kill(-server.pid, 'SIGTERM');
    } catch {
      server.kill('SIGTERM');
    }
  }
}

process.on('SIGINT', () => {
  console.log('\nstopping the dev server...');
  stopServer();
  process.exit(0);
});
process.on('exit', stopServer);

let ready = false;
let readyResolve;
const serverReady = new Promise((resolve) => {
  readyResolve = resolve;
});

function watch(chunk) {
  const text = chunk.toString();
  process.stdout.write(text);
  if (!ready && /Waiting on http|Logs for your project will appear below/.test(text)) {
    ready = true;
    readyResolve();
  }
}

server.stdout.on('data', watch);
server.stderr.on('data', watch);

server.on('exit', (status) => {
  if (!stopping) {
    console.error('\nthe dev server exited (code ' + status + ') before the reveal could run.');
    process.exit(status || 1);
  }
});

// ---- step 4: ask, then drive the reveal -----------------------------------

async function main() {
  await serverReady;

  if (noReveal) {
    console.log(
      '\n[3/3] server is up. Reveal when ready:\n' +
        '      python tools/timelapse/run.py ' +
        slug +
        ' ' +
        screen.value +
        ' --delay ' +
        delay.value,
    );
    return;
  }

  const answer = await new Promise((resolve) => {
    const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
    rl.question(
      '\n----------------------------------------------------------------\n' +
        'Server is up. Get the emulator onto ' +
        slug +
        ' showing the blank screen.\n' +
        'Run the reveal now (screen ' +
        screen.value +
        ', ' +
        delay.value +
        's between steps)?  [y/N] ',
      (a) => {
        rl.close();
        resolve(a.trim().toLowerCase());
      },
    );
  });

  if (answer !== 'y' && answer !== 'yes') {
    console.log(
      '\nnot revealing. The server is still up — run it yourself whenever you are ready:\n' +
        '      python tools/timelapse/run.py ' +
        slug +
        ' ' +
        screen.value +
        ' --delay ' +
        delay.value +
        '\nCtrl-C here stops the server.',
    );
    return;
  }

  // Re-assert the boot redirect before handing over to run.py.
  //
  // `src/app/index.tsx` is a derived file and minutes pass between step 1 and
  // here — long enough for an editor to write back a stale buffer, which is a
  // documented hazard ("Files drift when they are open in an editor during a
  // run"). run.py runs its own preflight, that preflight hashes this file
  // against lock.json, and a mismatch aborts the take *after* the server is up
  // and the emulator is posed. `use` is idempotent and costs nothing, so the
  // window is simply closed rather than diagnosed.
  const boot = path.join(APP, 'index.tsx');
  const before = fs.existsSync(boot) ? fs.readFileSync(boot, 'utf8') : '';
  spawnSync('node', ['tools/showcase.js', 'use', slug], {
    cwd: ROOT,
    stdio: 'ignore',
    shell: true,
  });
  const after = fs.existsSync(boot) ? fs.readFileSync(boot, 'utf8') : '';
  if (before !== after) {
    console.log(
      '\nnote: the boot redirect had moved off ' +
        slug +
        ' since step 1 — something else wrote src/app/index.tsx while the\n' +
        '      server was up (an editor saving a stale tab is the usual cause).' +
        ' Re-pointed it.',
    );
  }

  const revealCode = step(4, TOTAL, 'reveal ' + slug + ' screen ' + screen.value, 'python', [
    'tools/timelapse/run.py',
    slug,
    screen.value,
    '--delay',
    delay.value,
  ]);

  const rerun =
    'python tools/timelapse/run.py ' + slug + ' ' + screen.value + ' --delay ' + delay.value;

  if (revealCode !== 0) {
    // run.py aborts without changing anything when its own preflight fails, so
    // the take simply did not happen. Saying "finished" here would be a lie the
    // recording would only expose later.
    console.error(
      '\nTHE REVEAL DID NOT RUN (exit ' +
        revealCode +
        '). Nothing was changed, so the screen is still blank.\n' +
        'The server is still up. Fix what it listed above, then:  ' +
        rerun +
        '\nCtrl-C here stops the server.',
    );
    return;
  }

  console.log(
    '\nreveal finished. The server is still up.\n' +
      'Re-run it with:  ' +
      rerun +
      '\nCtrl-C here stops the server.',
  );
}

main().catch((err) => {
  console.error(err);
  stopServer();
  process.exit(1);
});
