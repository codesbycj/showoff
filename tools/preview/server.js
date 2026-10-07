// Serves whichever export dir root.txt points at, re-read per request, so a
// rebuild can write to a fresh directory without the server locking the old one.
const http = require('http');
const fs = require('fs');
const path = require('path');
const types = { '.html':'text/html', '.js':'text/javascript', '.css':'text/css', '.png':'image/png',
  '.jpg':'image/jpeg', '.ttf':'font/ttf', '.json':'application/json', '.xml':'application/xml', '.svg':'image/svg+xml' };
http.createServer((req, res) => {
  const root = fs.readFileSync(path.join(__dirname, 'root.txt'), 'utf8').trim();
  const p = decodeURIComponent(req.url.split('?')[0]);
  let f = path.join(root, p);
  if (!fs.existsSync(f) || fs.statSync(f).isDirectory()) {
    if (fs.existsSync(f + '/index.html')) f += '/index.html';
    else if (fs.existsSync(f + '.html')) f += '.html';
    else { res.writeHead(404); return res.end('not found'); }
  }
  res.writeHead(200, { 'Content-Type': types[path.extname(f)] || 'application/octet-stream', 'Cache-Control': 'no-store' });
  fs.createReadStream(f).pipe(res);
}).listen(8788, '127.0.0.1', () => console.log('up'));
