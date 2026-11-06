import type { IconName } from '@/components/Icon';
import type { Track } from '@/data/deck';

/**
 * The glyph each track is drawn with.
 *
 * Its own file because it is a constant rather than a component, and a module
 * that exports both stops Fast Refresh working on the components in it.
 */
export const TRACK_ICON: Record<Track, IconName> = {
  'UI/UX Design': 'pen',
  Illustration: 'brush',
  Typography: 'type',
  Branding: 'target',
  'Front End': 'code',
};
