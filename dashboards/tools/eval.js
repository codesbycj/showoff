// Ask a page a one-off question that is not worth a screenshot.
//
//   node tools/eval.js <url> <script.js> [--w 1440] [--h 900] [--dark]
//
// `script.js` is a function body handed one argument, `input` (the parsed
// `--input` JSON, or `{}`), and whatever it returns is printed as JSON. It is a
// file rather than a command-line string on purpose: a backslash or a backtick
// in a shell argument arrives mangled, and the error never points at the quote.
const path = require('path');
const { launch, argv } = require('./cdp');

const a = argv();
const url = a.rest[0];
const script = a.rest[1];
if (!url || !script) {
  console.error('usage: node tools/eval.js <url> <script.js> [--input \'{"k":1}\']');
  process.exit(1);
}

(async () => {
  const s = await launch({
    w: a.num('w', 1440),
    h: a.num('h', 900),
    scheme: a.flag('dark') ? 'dark' : undefined,
    reduced: a.flag('reduced'),
    fast: true,
  });
  try {
    await s.goto(url, a.num('wait', 2600));
    await s.parkPointer();
    await s.sleep(400);
    const out = await s.evaluateFile(path.resolve(script), JSON.parse(a.opt('input', '{}')));
    console.log(JSON.stringify(out, null, 2));
  } finally {
    s.close();
  }
})();
