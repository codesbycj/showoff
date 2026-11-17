import { ct } from '../theme';

export const TINT = { blush: ct.blush, mint: ct.mint, lilac: ct.lilac } as const;

export type BarProps = { margin: number; height: number };

export type RingProps = { margin: number; height: number; size: number };

export type BlockProps = { margin: number; height: number };

export type ChartProps = { margin: number; height: number; axisH: number };

export type TileProps = { margin: number; height: number; radius: number; gap: number };
