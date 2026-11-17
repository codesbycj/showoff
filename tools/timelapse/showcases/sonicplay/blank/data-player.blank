/**
 * Everything sonicplay says.
 *
 * **The release is invented.** The board plays The Weeknd's *Starboy* with its
 * real sleeve; a rebuild that ships a real record's artwork and artist name is
 * impersonation. The sleeve here is free-licensed photography standing in for
 * a fictional release, credited in `CREDITS.md`.
 *
 * **The scrubber's position is computed from the two times** (R9), so the
 * filled part of the track and the clock beside it cannot disagree — the
 * board's bar sits at about a quarter while its own times read 1:37 of 4:21,
 * which is 37%.
 */

export const screen = { from: 'PLAYING FROM ALBUM', lyrics: 'LYRICS' };

export const track = {
  title: 'Nightline',
  artist: 'Vela Hart',
  album: 'Nightline (Remix)',
  cover: require('../../../../assets/images/sonicplay/cover.jpg'),
  /** Seconds. Both clocks and the scrubber derive from these. */
  elapsed: 97,
  duration: 261,
  liked: true,
};

/** How far through, 0 to 1. Clamped, so a staged `duration` of 0 is safe (I7). */
export function progress(): number {
  if (track.duration <= 0) return 0;
  return Math.min(Math.max(track.elapsed / track.duration, 0), 1);
}

export type Control = { id: string; glyph: 'shuffle' | 'prev' | 'play' | 'next' | 'repeat' };

export const controls: Control[] = [
  { id: 'shuffle', glyph: 'shuffle' },
  // STEP 1.21 prev
  // { id: 'prev', glyph: 'prev' },
  // STEP 1.22 play
  // { id: 'play', glyph: 'play' },
  // STEP 1.23 next
  // { id: 'next', glyph: 'next' },
  // STEP 1.24 repeat
  // { id: 'repeat', glyph: 'repeat' },
];

/** m:ss, formatted once so both clocks read the same way. */
export function clock(seconds: number) {
  const s = Math.max(Math.round(seconds), 0);
  return `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;
}
