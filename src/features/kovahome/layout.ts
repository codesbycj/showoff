import { useWindowDimensions } from 'react-native';

import { useInsets } from './use-insets';

/**
 * Every size for kovahome, derived from the live window (I2).
 *
 * The upcoming rail is the remainder and runs under the floating dock exactly
 * as the board crops it, which is what keeps the foot closed (I3).
 */
export function useLayout() {
  const { width: W, height: H } = useWindowDimensions();
  const insets = useInsets();

  const margin = 20;

  const greetH = 64;
  const gapGreet = 16;

  const statsH = 84;
  const gapStats = 20;

  const sectionH = 28;
  const gapSection = 10;

  const clientW = (W - margin * 2 - 20) / 3;
  const clientH = clientW * 1.26 + 22;
  const gapClients = 12;

  const addH = 52;
  const gapAdd = 18;

  const reminderH = 70;
  const gapReminder = 18;

  const dockH = 66;
  const dockBottom = insets.bottom + 6;

  const used =
    insets.top +
    greetH +
    gapGreet +
    statsH +
    gapStats +
    sectionH +
    gapSection +
    clientH +
    gapClients +
    addH +
    gapAdd +
    sectionH +
    gapSection +
    reminderH +
    gapReminder +
    sectionH +
    gapSection +
    dockH +
    dockBottom;
  const upcomingH = Math.max(120, H - used + 40);

  return {
    W,
    H,
    insets,
    margin,
    greetH,
    gapGreet,
    statsH,
    gapStats,
    sectionH,
    gapSection,
    client: { w: clientW, h: clientH, radius: 16 },
    gapClients,
    add: { h: addH, radius: 16 },
    gapAdd,
    reminder: { h: reminderH, radius: 18 },
    gapReminder,
    upcoming: { h: upcomingH, w: Math.round(W * 0.62), radius: 18 },
    dock: { h: dockH, bottom: dockBottom },
  };
}
