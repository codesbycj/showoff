import { Text, View } from 'react-native';

import { type Metric } from '../data/profile';
import { SP, TYPE, al, alpha } from '../theme';

import { FilledIcon } from './filled-icon';

/**
 * The three metric pods on the profile.
 *
 * Only the middle pod is raised onto its own fill — the export gives it
 * `bg-surface-container/60 rounded-xl py-2` and leaves the outer two bare,
 * which is what makes the row read as a dial rather than three equal cells. So
 * `raised` is a property of the datum, not of the index.
 */
export function MetricsTray({ metrics }: { metrics: readonly Metric[] }) {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: al.surfaceContainerLow,
        borderRadius: SP.md,
        padding: SP.md,
        marginTop: SP.xs,
      }}
    >
      {metrics.map((m) => (
        <View
          key={m.key}
          style={{
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
            padding: SP.xs,
            paddingVertical: m.raised ? SP.sm : SP.xs,
            borderRadius: m.raised ? 12 : 0,
            backgroundColor: m.raised ? alpha(al.surfaceContainer, 0.6) : 'transparent',
          }}
        >
          <Text
            style={{
              ...TYPE.labelSm,
              letterSpacing: 0.55,
              marginBottom: SP.xs,
              color: al.onSurfaceVariant,
            }}
          >
            {m.label.toUpperCase()}
          </Text>

          <View style={{ flexDirection: 'row', alignItems: 'center', gap: SP.xs }}>
            {m.star ? <FilledIcon name="star" size={16} color={al.secondary} /> : null}
            <Text
              style={{
                ...TYPE.headlineLg,
                fontFamily: TYPE.headlineXl.fontFamily,
                color: m.tone === 'secondary' ? al.secondary : al.onSurface,
              }}
            >
              {m.value}
            </Text>
          </View>
        </View>
      ))}
    </View>
  );
}
