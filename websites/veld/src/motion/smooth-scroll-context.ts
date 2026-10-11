import { createContext } from 'react';

export type SmoothScrollApi = {
  /** Holds the scroll still. Reference-counted by `key`. */
  lock: (key?: string) => void;
  /** Releases this holder's lock; scrolling resumes when the last one goes. */
  unlock: (key?: string) => void;
  scrollTo: (target: string | number | HTMLElement) => void;
};

/** Kept apart from the provider so each file exports only one kind of thing. */
export const SmoothScrollContext = createContext<SmoothScrollApi | null>(null);
