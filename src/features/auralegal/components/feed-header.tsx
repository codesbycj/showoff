import { Text, View } from 'react-native';

import { SP, TYPE, al } from '../theme';

import { StatusDot } from './status-dot';

/**
 * The feed's masthead — a live dot, an eyebrow, and the two-line headline.
 *
 * The export breaks the headline itself (`Find Top Class<br>Lawyers`), so the
 * break is kept in the copy rather than left to wrap. At 393dp it would wrap in
 * the same place anyway; carrying it explicitly means it still breaks there if
 * the type is ever tuned.
 */
export function FeedHeader({ eyebrow, title }: { eyebrow: string; title: string }) {
  return (
    <View style={{ paddingTop: SP.md, paddingBottom: SP.sm }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: SP.xs }}>
        <StatusDot />
        <Text style={{ ...TYPE.labelMd, letterSpacing: 0.3, color: al.onSurfaceVariant }}>
          {eyebrow}
        </Text>
      </View>

      <Text
        style={{
          ...TYPE.headlineXlMobile,
          marginTop: SP.xs,
          letterSpacing: -0.52,
          color: al.onSurface,
        }}
      >
        {title}
      </Text>
    </View>
  );
}
