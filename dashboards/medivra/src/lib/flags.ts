import type { IconName } from '@/components/Icon';
import type { Flag } from '@/data/deck';

/**
 * The glyph that belongs to each handover flag.
 *
 * Its own file because it is a constant rather than a component, and a module
 * that exports both stops Fast Refresh working on the components in it.
 */
export const FLAG_ICON: Record<Flag, IconName> = {
  allergy: 'alert',
  isolation: 'isolation',
  'nil by mouth': 'no-food',
  'falls risk': 'falls',
  DNACPR: 'shield',
};
