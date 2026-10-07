// Report vertical runs of a given colour in a screenshot, in dp (3x device).
const fs = require('fs');
const { PNG } = require('pngjs');
const png = PNG.sync.read(fs.readFileSync(process.argv[2]));
const targets = {
  field: [238, 238, 238],
  black: [0, 0, 0],
  red: [225, 25, 0],
  rule: [214, 214, 214],
};
const near = (i, t, tol) =>
  Math.abs(png.data[i] - t[0]) <= tol && Math.abs(png.data[i+1] - t[1]) <= tol && Math.abs(png.data[i+2] - t[2]) <= tol;

for (const [name, t] of Object.entries(targets)) {
  const rows = [];
  for (let y = 0; y < png.height; y++) {
    let count = 0;
    for (let x = 0; x < png.width; x++) if (near((png.width * y + x) << 2, t, 6)) count++;
    rows.push(count);
  }
  const min = name === 'rule' ? png.width * 0.2 : png.width * 0.5;
  const runs = [];
  let start = -1;
  for (let y = 0; y < rows.length; y++) {
    if (rows[y] >= min && start < 0) start = y;
    else if (rows[y] < min && start >= 0) { runs.push([start, y - 1]); start = -1; }
  }
  if (start >= 0) runs.push([start, rows.length - 1]);
  console.log(name, runs.map(([a, b]) => `${(a/3).toFixed(0)}-${(b/3).toFixed(0)}dp(h${((b-a+1)/3).toFixed(0)})`).join('  '));
}
