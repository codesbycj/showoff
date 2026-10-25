// A PNG decoder and an image differ, in about a hundred lines and with no
// dependencies, so that a capture can be compared numerically.
//
// Why this exists: the only way to tell "this element has no hover" — a finding
// worth writing down — from "the capture missed it" is a number. A 10% dark
// pill over white is invisible on a contact sheet at thumbnail scale, and so is
// a range tab that re-renders the chart with the same values. `drive.js` reports
// a changed-pixel count for every beat and shouts when a beat changed nothing.
//
// Only what Chrome's `Page.captureScreenshot` emits is supported: bit depth 8,
// colour type 2 (RGB) or 6 (RGBA), non-interlaced. Anything else throws rather
// than returning a wrong answer.
const zlib = require('zlib');

const SIG = Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]);

/** Decode a PNG buffer to `{ width, height, channels, data }` (8-bit). */
function decodePng(buf) {
  if (!buf.subarray(0, 8).equals(SIG)) throw new Error('not a PNG');

  let off = 8;
  let hdr = null;
  const idat = [];

  while (off + 8 <= buf.length) {
    const len = buf.readUInt32BE(off);
    const type = buf.toString('ascii', off + 4, off + 8);
    const body = buf.subarray(off + 8, off + 8 + len);
    off += 12 + len; // length + type + data + crc

    if (type === 'IHDR') {
      hdr = {
        width: body.readUInt32BE(0),
        height: body.readUInt32BE(4),
        depth: body[8],
        colorType: body[9],
        interlace: body[12],
      };
    } else if (type === 'IDAT') {
      idat.push(body);
    } else if (type === 'IEND') {
      break;
    }
  }

  if (!hdr) throw new Error('no IHDR');
  if (hdr.depth !== 8) throw new Error('unsupported bit depth ' + hdr.depth);
  if (hdr.interlace) throw new Error('interlaced PNG not supported');
  const channels = hdr.colorType === 6 ? 4 : hdr.colorType === 2 ? 3 : 0;
  if (!channels) throw new Error('unsupported colour type ' + hdr.colorType);

  const raw = zlib.inflateSync(Buffer.concat(idat));
  const { width, height } = hdr;
  const stride = width * channels;
  const out = Buffer.alloc(stride * height);

  // Undo the per-scanline filter. Each row is prefixed with its filter byte and
  // is predicted from the row above (`up`) and the pixel to the left (`left`).
  let pos = 0;
  for (let y = 0; y < height; y++) {
    const filter = raw[pos++];
    const row = raw.subarray(pos, pos + stride);
    pos += stride;
    const cur = out.subarray(y * stride, (y + 1) * stride);
    const prev = y ? out.subarray((y - 1) * stride, y * stride) : null;

    for (let x = 0; x < stride; x++) {
      const a = x >= channels ? cur[x - channels] : 0; // left
      const b = prev ? prev[x] : 0; // up
      const c = prev && x >= channels ? prev[x - channels] : 0; // up-left
      const v = row[x];
      switch (filter) {
        case 0:
          cur[x] = v;
          break;
        case 1:
          cur[x] = (v + a) & 0xff;
          break;
        case 2:
          cur[x] = (v + b) & 0xff;
          break;
        case 3:
          cur[x] = (v + ((a + b) >> 1)) & 0xff;
          break;
        case 4: {
          const p = a + b - c;
          const pa = Math.abs(p - a);
          const pb = Math.abs(p - b);
          const pc = Math.abs(p - c);
          cur[x] = (v + (pa <= pb && pa <= pc ? a : pb <= pc ? b : c)) & 0xff;
          break;
        }
        default:
          throw new Error('unknown filter ' + filter + ' on row ' + y);
      }
    }
  }

  return { width, height, channels, data: out };
}

/**
 * Compare two PNG buffers.
 *
 * `threshold` is per-channel, 0-255; a pixel counts as changed when any channel
 * moves by more than that. Returns the changed-pixel count and share, the
 * largest single-channel move, and the bounding box of everything that changed —
 * which is how you tell a tooltip appearing (a small box, where the pointer is)
 * from a theme switch (the whole frame).
 */
function diff(aBuf, bBuf, threshold = 6) {
  const a = decodePng(aBuf);
  const b = decodePng(bBuf);
  if (a.width !== b.width || a.height !== b.height) {
    return { comparable: false, reason: `${a.width}x${a.height} vs ${b.width}x${b.height}` };
  }

  let changed = 0;
  let max = 0;
  let x0 = Infinity;
  let y0 = Infinity;
  let x1 = -1;
  let y1 = -1;

  for (let y = 0; y < a.height; y++) {
    for (let x = 0; x < a.width; x++) {
      const ia = (y * a.width + x) * a.channels;
      const ib = (y * b.width + x) * b.channels;
      let d = 0;
      for (let c = 0; c < 3; c++) {
        const v = Math.abs(a.data[ia + c] - b.data[ib + c]);
        if (v > d) d = v;
      }
      if (d > max) max = d;
      if (d > threshold) {
        changed++;
        if (x < x0) x0 = x;
        if (y < y0) y0 = y;
        if (x > x1) x1 = x;
        if (y > y1) y1 = y;
      }
    }
  }

  return {
    comparable: true,
    width: a.width,
    height: a.height,
    changed,
    share: changed / (a.width * a.height),
    max,
    box: x1 < 0 ? null : { x: x0, y: y0, w: x1 - x0 + 1, h: y1 - y0 + 1 },
  };
}

module.exports = { decodePng, diff };
