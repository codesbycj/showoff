import { createContext } from 'react';

export type SmoothScrollApi = {
  lock: () => void;
  unlock: () => void;
  scrollTo: (target: string | number | HTMLElement) => void;
};

/** Kept apart from the provider so each file exports only one kind of thing. */
export const SmoothScrollContext = createContext<SmoothScrollApi | null>(null);
