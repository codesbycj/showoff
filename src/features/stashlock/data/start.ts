/**
 * Everything the password screen says, so the components stay
 * presentational.
 *
 * **The password is masked.** The reference prints a real-looking password in
 * clear text on the screen — "lokskmB@!222" — which is the one thing a
 * password field must never do, and it is printed over a label that says
 * "Your password". Here it is dots, with a control to reveal it.
 */

export const copy = {
  title: 'Enter password to open',
  add: 'add',
  field: 'Your password',
  speak: 'Tap to speak',
  type: 'Start typing',
} as const;

/** Twelve characters, shown as twelve dots. */
export const password = '•'.repeat(12);

export const modes = [
  { id: 'face', on: false },
  { id: 'voice', on: true },
  { id: 'key', on: false },
] as const;

/** The waveform's spokes, as a share of the ring's radius. */
export const spokes = Array.from({ length: 128 }, (_, i) => {
  const a = (i / 128) * Math.PI * 2;
  return 0.3 + Math.abs(Math.sin(a * 9)) * 0.26 + Math.abs(Math.cos(a * 4)) * 0.16;
});
