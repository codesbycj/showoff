#!/usr/bin/env node
// Screenshot a route off the running dev server, at reference metrics.
//
//   node tools/preview/shoot.js revolut/card shot.png
//
// Assumes `npx expo start --web` is already up. That is the whole point: an
// export costs ~2.5 minutes, this costs ~7 seconds, and across a four-screen
// app tuned six times that is the difference between an afternoon and an hour.
const { execFileSync } = require('child_process');
const http = require('http');
const path = require('path');

const [, , route, out] = process.argv;
if (!route || !out) {
  console.error('usage: shoot.js <route> <out.png>   e.g. shoot.js revolut/card card.png');
  process.exit(1);
}

const PORT = process.env.EXPO_PORT || 8081;
const url = `http://localhost:${PORT}/${route.replace(/^\//, '')}`;

http
  .get({ host: 'localhost', port: PORT, path: '/' }, () => {
    execFileSync(process.execPath, [path.join(__dirname, 'shot.js'), url, path.resolve(out)], {
      stdio: 'inherit',
    });
  })
  .on('error', () => {
    console.error(`no dev server on :${PORT} — start one with \`npx expo start --web\``);
    process.exit(1);
  });
