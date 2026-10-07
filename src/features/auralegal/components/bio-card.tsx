import { Text, View } from 'react-native';

import { type Specialty } from '../data/profile';
import { R, SP, TYPE, al } from '../theme';

import { Symbol } from './symbol';

/**
 * The biography panel: a pill header, the bar credential, the bio with its
 * expand toggle, and the specialty tags.
 *
 * "Read More" is live rather than decorative — the export ships a script that
 * reveals a second paragraph and swaps the label to "Show Less", so the state
 * lives here and both halves of the copy are in the data.
 *
 * The toggle is nested inside the bio `Text` so it sits on the same baseline at
 * the end of the last line, which is where the export puts it. A sibling
 * `Pressable` would drop to its own row.
 */
export function BioCard({
  pill,
  credential,
  summary,
  rest,
  more,
  less,
  specialties,
  expanded,
  onToggle,
}: {
  pill: string;
  credential: string;
  summary: string;
  rest: string;
  more: string;
  less: string;
  specialties: readonly Specialty[];
  expanded: boolean;
  onToggle?: () => void;
}) {
  return (
    <View
      style={{
        backgroundColor: al.surfaceContainerLow,
        borderRadius: SP.md,
        padding: SP.md,
        marginTop: SP.sm,
        gap: SP.xs,
      }}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <View
          style={{
            paddingHorizontal: 14,
            paddingVertical: SP.xs,
            borderRadius: R.full,
            backgroundColor: al.surfaceContainerHigh,
          }}
        >
          <Text style={{ ...TYPE.labelMd, color: al.onSurface }}>{pill}</Text>
        </View>

        <View style={{ flexDirection: 'row', alignItems: 'center', gap: SP.xs }}>
          <Symbol name="gavel" size={14} color={al.secondary} />
          <Text style={{ ...TYPE.labelSm, color: al.secondary }}>{credential}</Text>
        </View>
      </View>

      <Text style={{ ...TYPE.bodyMd, marginTop: SP.xs, color: al.onSurfaceVariant }}>
        {expanded ? `${summary} ${rest}` : summary}{' '}
        <Text onPress={onToggle} style={{ ...TYPE.labelMd, color: al.primary }}>
          {expanded ? less : more}
        </Text>
      </Text>

      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 6, paddingTop: SP.sm }}>
        {specialties.map((s) => (
          <View
            key={s.key}
            style={{
              paddingHorizontal: 10,
              paddingVertical: SP.xs,
              borderRadius: R.full,
              backgroundColor: al.surfaceContainer,
            }}
          >
            <Text style={{ ...TYPE.labelSm, color: al.onSurfaceVariant }}>{s.label}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}
