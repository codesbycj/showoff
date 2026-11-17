import { ct } from '../theme';

export const TINT = { mint: ct.mint, blue: ct.blue, lilac: ct.lilac, blush: ct.blush } as const;

export type BlockProps = { margin: number; height: number };

export type TabProps = {
  margin: number;
  height: number;
  value: string;
  onSelect: (id: string) => void;
};

export type StripProps = { margin: number; height: number; disc: number; gap: number };

export type ChipProps = { margin: number; height: number; rowH: number; gap: number };

export type PromoProps = { margin: number; height: number; radius: number; ctaH: number };

export type NoteProps = { margin: number; height: number; radius: number; gap: number };
