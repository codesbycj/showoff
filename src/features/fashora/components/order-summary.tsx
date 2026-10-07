import { Text, View } from 'react-native';

import type { SummaryLine } from '../data/bag';
import { ELEV, FONT, R, SP, TYPE, fa } from '../theme';

/**
 * The order summary card.
 *
 * Three inks across four lines, and which one a row gets is the whole point of
 * the card: a plain row is muted label / dark value, the promo discount is
 * `primary` on both sides, and shipping is a muted label with an accent
 * "(Express)" spliced into it and an accent value. That last one is a nested
 * `Text`, which is how React Native does a run of different type inside a line.
 */
export function OrderSummary({
  title,
  lines,
  totalLabel,
  totalNote,
  total,
}: {
  title: string;
  lines: readonly SummaryLine[];
  totalLabel: string;
  totalNote: string;
  total: string;
}) {
  return (
    <View
      style={{
        backgroundColor: fa.surfaceContainerLowest,
        borderRadius: R.lg,
        padding: SP.md,
        gap: 10,
        ...ELEV.card,
      }}
    >
      <Text style={{ ...TYPE.headlineSm, color: fa.onSurface, paddingBottom: SP.xs }}>
        {title}
      </Text>

      {lines.map((line) => (
        <View
          key={line.key}
          style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}
        >
          <Text style={{ ...TYPE.bodyMd, color: line.accent ? fa.primary : fa.secondary }}>
            {line.label}
            {line.labelSuffix ? (
              <Text style={{ ...TYPE.labelSm, fontFamily: FONT.semibold, color: fa.primary }}>
                {' '}
                {line.labelSuffix}
              </Text>
            ) : null}
          </Text>

          <Text
            style={{
              ...TYPE.labelMd,
              color: line.accent || line.labelSuffix ? fa.primary : fa.onSurface,
            }}
          >
            {line.value}
          </Text>
        </View>
      ))}

      <View
        style={{ height: 1, backgroundColor: fa.surfaceContainer, marginVertical: SP.xs }}
      />

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingTop: 2,
        }}
      >
        <View>
          <Text style={{ ...TYPE.headlineMd, color: fa.onSurface }}>{totalLabel}</Text>
          <Text style={{ ...TYPE.bodySm, color: fa.secondary }}>{totalNote}</Text>
        </View>
        <Text style={{ ...TYPE.headlineLg, color: fa.onSurface }}>{total}</Text>
      </View>
    </View>
  );
}
