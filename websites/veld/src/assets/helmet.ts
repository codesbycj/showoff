/**
 * The helmet turntable, in order.
 *
 * Globbed rather than written out as 120 import lines, and sorted by the
 * zero-padded index in the filename — glob order is not guaranteed, and a
 * turntable whose frames are in the wrong order is not a turntable.
 *
 * Rebuild the frames with `python tools/helmet-frames.py`.
 */
const modules = import.meta.glob('./helmet/frame_*.webp', {
  eager: true,
  query: '?url',
  import: 'default',
}) as Record<string, string>;

export const HELMET_FRAMES: string[] = Object.keys(modules)
  .sort()
  .map((path) => modules[path]);
