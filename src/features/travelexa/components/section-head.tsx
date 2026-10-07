import { Pressable, Text, View } from 'react-native';

import { SP, TYPE, tx } from '../theme';

import { Symbol } from './symbol';

/**
 * A section heading with an optional subtitle and an optional "See all" link.
 *
 * Both are optional because this design uses all three combinations: home's
 * regions heading is bare, its experiences heading has a subtitle *and* a link,
 * and the detail screen's "Upcoming tours" has a link and no subtitle.
 *
 * `large` steps the title up from `headline-sm` to `headline-md`, which is what
 * the discovery screen uses for its three section heads, and `tone` switches the
 * link from the primary black to plain ink — discovery sets its "View all" in
 * `on-surface` where home sets "See all" in `primary`. Two props rather than a
 * second component, because nothing else about them differs.
 */
export function SectionHead({
  title,
  subtitle,
  action,
  large = false,
  tone = 'primary',
  onAction,
}: {
  title: string;
  subtitle?: string;
  action?: string;
  large?: boolean;
  tone?: 'primary' | 'ink';
  onAction?: () => void;
}) {
  const link = tone === 'ink' ? tx.onSurface : tx.primary;
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: subtitle ? 'flex-start' : 'center',
        justifyContent: 'space-between',
        paddingHorizontal: SP.margin,
        gap: SP.md,
      }}
    >
      <View style={{ flexShrink: 1 }}>
        <Text style={{ ...(large ? TYPE.headlineMd : TYPE.headlineSm), color: tx.onSurface }}>
          {title}
        </Text>
        {subtitle ? (
          <Text style={{ ...TYPE.bodySm, color: tx.onSurfaceVariant }}>{subtitle}</Text>
        ) : null}
      </View>

      {action ? (
        <Pressable onPress={onAction} hitSlop={8}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: SP.xs }}>
            <Text style={{ ...TYPE.labelMd, color: link }}>{action}</Text>
            <Symbol name="chevronRight" size={16} color={link} />
          </View>
        </Pressable>
      ) : null}
    </View>
  );
}
