import { useWindowDimensions } from 'react-native';

import { tracks } from './data/home';
import { useInsets } from './use-insets';

/**
 * Every size for sonichome, derived from the live window (I2).
 *
 * **The playlist is the remainder.** It fills the space above the floating
 * dock in whole rows, so nothing is clipped through its own text (R2) and no
 * band is left at the foot (I3).
 */
export function useLayout() {
  const { width: W, height: H } = useWindowDimensions();
  const insets = useInsets();

  const margin = 20;

  const barH = 44;
  const gapBar = 16;
  const catLabelH = 20;
  const gapCatLabel = 8;
  const chipsH = 34;
  const gapChips = 18;
  const popularH = 24;
  const gapPopular = 10;

  const art = 132;
  const songRailH = art + 46;
  const gapRail = 18;
  const collectionHeadH = 24;
  const gapCollectionHead = 10;
  const collectionH = 118;
  const gapCollection = 18;
  const playlistHeadH = 24;
  const gapPlaylistHead = 6;

  const dockW = Math.round(W * 0.84);
  const dockH = 54;
  const dockLift = 12;

  const listTop =
    insets.top +
    barH +
    gapBar +
    catLabelH +
    gapCatLabel +
    chipsH +
    gapChips +
    popularH +
    gapPopular +
    songRailH +
    gapRail +
    collectionHeadH +
    gapCollectionHead +
    collectionH +
    gapCollection +
    playlistHeadH +
    gapPlaylistHead;

  /**
   * The list fills the space **above** the dock, in whole rows.
   *
   * Forcing it to `tracks.length` rows regardless pushed the last row under
   * the floating pill, and R3 calls covering text a FAIL outright —
   * `audit.js` reported it three times. The row count is derived from the
   * space instead, so nothing can land beneath the dock.
   */
  const dockSpace = dockH + dockLift + insets.bottom;
  const listH = Math.max(60, H - listTop - dockSpace);
  const rows = Math.min(tracks.length, Math.max(1, Math.round(listH / 62)));
  const rowH = listH / rows;

  return {
    W,
    H,
    insets,
    margin,
    barH,
    gapBar,
    control: 36,
    catLabelH,
    gapCatLabel,
    chipsH,
    gapChips,
    popularH,
    gapPopular,
    songRail: { h: songRailH, art },
    gapRail,
    collectionHeadH,
    gapCollectionHead,
    collection: { h: collectionH, w: Math.round(W * 0.72), radius: 18 },
    gapCollection,
    playlistHeadH,
    gapPlaylistHead,
    list: { h: listH, rowH, rows, art: 42 },
    dock: { w: dockW, h: dockH, lift: dockLift, item: 38 },
  };
}
