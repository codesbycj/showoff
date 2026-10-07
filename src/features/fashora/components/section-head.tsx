import { Pressable, Text, View } from 'react-native';

import { TYPE, fa } from '../theme';

import { Symbol } from './symbol';

/**
 * A section title with its "See All" link.
 *
 * No padding of its own. The feed uses it in two different gutters — the
 * category rail's head is inset while its pills bleed off the edge, the product
 * grid's head shares the grid's inset — so the inset belongs to whichever
 * section is placing it.
 *
 * `accent` switches the link from the muted grey the feed uses to the vivid
 * orange the profile's "View All" is set in, and brings a chevron with it. The
 * two are one flag rather than two because the design never separates them.
 */
export function SectionHead({
  title,
  action,
  accent,
  onAction,
}: {
  title: string;
  action?: string;
  accent?: boolean;
  onAction?: () => void;
}) {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
      <Text style={{ ...TYPE.headlineSm, color: fa.onSurface }}>{title}</Text>
      {action ? (
        <Pressable onPress={onAction} accessibilityRole="link">
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 2 }}>
            <Text style={{ ...TYPE.labelMd, color: accent ? fa.primaryContainer : fa.secondary }}>
              {action}
            </Text>
            {accent ? <Symbol name="chevronRight" size={16} color={fa.primaryContainer} /> : null}
          </View>
        </Pressable>
      ) : null}
    </View>
  );
}
