/**
 * Everything the folders screen says, so the components stay presentational.
 *
 * **The progress bar is the two times.** The reference prints "3 minutes of
 * 10 hours" beside "63%", which is half a percent. Here the bar, the
 * percentage and the sentence all come from `doneMinutes` over
 * `totalMinutes`.
 */

export const copy = {
  title: 'Manage folders',
  blurb: 'Organise and categorise your files, with as little ceremony as possible.',
  progress: 'Progress completion',
  all: 'All folders',
} as const;

const doneMinutes = 378;
const totalMinutes = 600;

const hours = (m: number) => {
  const h = Math.floor(m / 60);
  const r = m % 60;
  return r ? h + 'h ' + r + 'm' : h + ' hours';
};

export const progress = {
  share: doneMinutes / totalMinutes,
  pct: Math.round((doneMinutes / totalMinutes) * 100),
  sub: hours(doneMinutes) + ' of ' + hours(totalMinutes),
} as const;

export const folders = [
  { id: 'f1', label: 'Lovely', tone: 'yellow' },
  { id: 'f2', label: 'Cloud', tone: 'plain' },
  { id: 'f3', label: 'Gallery', tone: 'plain' },
  { id: 'f4', label: 'Videos', tone: 'plain' },
  { id: 'f5', label: 'Apps', tone: 'plain' },
  { id: 'f6', label: 'Music', tone: 'plain' },
  // Two more than the reference shows. Six tiles leave 95dp of empty sheet
  // above the bottom edge; eight run the grid off it, which is what a grid
  // of folders actually does.
  { id: 'f7', label: 'Documents', tone: 'plain' },
  { id: 'f8', label: 'Downloads', tone: 'plain' },
] as const;
