import { Text, View } from 'react-native';

import { type Highlight } from '../data/destination';
import { R, SP, TYPE, tx } from '../theme';

import { FilledIcon } from './filled-icon';
import { Symbol } from './symbol';

/**
 * The rounded sheet that overlaps the hero: name, rating, the overview with its
 * expand toggle, and the highlight chips.
 *
 * It is pulled up 32dp over the photo and carries a grabber bar, which is what
 * makes it read as a sheet rather than the next section. The overlap is the
 * screen's job (a negative margin there), so this component only draws the
 * sheet; giving it the offset would make it unusable anywhere else.
 *
 * "Read More" is nested inside the overview `Text` so it sits on the same
 * baseline at the end of the last line, which is where the export puts it. A
 * sibling would drop to its own row.
 */
export function DetailSheet({
  name,
  country,
  rating,
  reviews,
  summary,
  rest,
  more,
  less,
  highlights,
  expanded,
  onToggle,
}: {
  name: string;
  country: string;
  rating: string;
  reviews: string;
  summary: string;
  rest: string;
  more: string;
  less: string;
  highlights: readonly Highlight[];
  expanded: boolean;
  onToggle?: () => void;
}) {
  return (
    <View
      style={{
        backgroundColor: tx.surface,
        borderTopLeftRadius: 36,
        borderTopRightRadius: 36,
        paddingHorizontal: SP.margin,
        paddingTop: SP.lg,
      }}
    >
      <View
        style={{
          width: 40,
          height: 4,
          borderRadius: R.full,
          backgroundColor: tx.surfaceContainerHighest,
          alignSelf: 'center',
          marginBottom: SP.md,
        }}
      />

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
          gap: SP.sm,
        }}
      >
        <View style={{ flexShrink: 1 }}>
          <Text style={{ ...TYPE.headlineLg, color: tx.onSurface }}>{name}</Text>
          <View
            style={{ flexDirection: 'row', alignItems: 'center', gap: SP.xs, marginTop: SP.xs }}
          >
            <View
              style={{
                width: 14,
                height: 10,
                borderRadius: 2,
                backgroundColor: tx.secondary,
              }}
            />
            <Text style={{ ...TYPE.labelMd, color: tx.onSurfaceVariant }}>{country}</Text>
          </View>
        </View>

        <View style={{ alignItems: 'flex-end' }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: SP.xs,
              paddingHorizontal: SP.md - 4,
              paddingVertical: 6,
              borderRadius: R.full,
              backgroundColor: tx.surfaceContainer,
            }}
          >
            <FilledIcon name="star" size={15} color={tx.onSurface} />
            <Text style={{ ...TYPE.labelMd, color: tx.onSurface }}>{rating}</Text>
          </View>
          <Text
            style={{
              ...TYPE.labelSm,
              marginTop: SP.xs,
              color: tx.onSurfaceVariant,
              textDecorationLine: 'underline',
            }}
          >
            {reviews}
          </Text>
        </View>
      </View>

      <Text
        style={{ ...TYPE.bodyMd, marginTop: SP.md, lineHeight: 21, color: tx.onSurfaceVariant }}
      >
        {expanded ? `${summary} ${rest}` : summary}{' '}
        <Text
          onPress={onToggle}
          style={{ ...TYPE.labelMd, color: tx.onSurface, textDecorationLine: 'underline' }}
        >
          {expanded ? less : more}
        </Text>
      </Text>

      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: SP.sm, marginTop: SP.md }}>
        {highlights.map((h) => (
          <View
            key={h.key}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 6,
              paddingHorizontal: SP.md - 4,
              paddingVertical: 6,
              borderRadius: R.full,
              backgroundColor: tx.surfaceContainer,
            }}
          >
            <Symbol name={h.icon} size={16} color={tx.onSurface} />
            <Text style={{ ...TYPE.labelSm, color: tx.onSurface }}>{h.label}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}
