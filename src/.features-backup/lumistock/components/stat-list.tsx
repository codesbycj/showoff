import { Pressable, View } from 'react-native';

import { screen, stats } from '../data/stock';
import { ct } from '../theme';
import { T } from './text';

type TitleProps = { margin: number; height: number };

/** "Stats". */
export function StatsTitle({ margin, height }: TitleProps) {
  return (
    <View style={{ marginHorizontal: margin, height, justifyContent: 'center' }}>
      <T variant="sectionTitle">{screen.statsTitle}</T>
    </View>
  );
}

type Props = { margin: number; height: number; rowH: number };

/**
 * Open, day range, 52-week range, market cap.
 *
 * **Every value is computed from the same series the chart plots** (R9). The
 * board's own rows include an eight-figure daily range on a $168 share and a
 * twelve-digit market cap written out in full; these are derived and formatted
 * as magnitudes.
 */
export function StatList({ margin, height, rowH }: Props) {
  const rows = stats();
  return (
    <View style={{ marginHorizontal: margin, height }}>
      {rows.map((row, i) => (
        <View
          key={row.id}
          style={{
            height: rowH,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 12,
            borderBottomWidth: i === rows.length - 1 ? 0 : 1,
            borderBottomColor: ct.hairline,
          }}
        >
          <T variant="statLabel">{row.label}</T>
          <T variant="statValue" numberOfLines={1}>
            {row.value}
          </T>
        </View>
      ))}
    </View>
  );
}

type CtaProps = { margin: number; height: number; radius: number };

/**
 * The report button.
 *
 * Outlined rather than filled, as the board draws it, and 54dp so it clears R7
 * on its own. The border and the shadow sit in one style object: a
 * `Platform.select` for a shadow is exactly what the web render cannot check.
 */
export function ReportCta({ margin, height, radius }: CtaProps) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={screen.report}
      style={{ marginHorizontal: margin }}
    >
      {({ pressed }) => (
        <View
          style={{
            height,
            borderRadius: radius,
            alignItems: 'center',
            justifyContent: 'center',
            borderWidth: 1.5,
            borderColor: ct.deep,
            backgroundColor: ct.white,
            opacity: pressed ? 0.75 : 1,
            shadowColor: '#0D2409',
            shadowOpacity: 0.08,
            shadowRadius: 12,
            shadowOffset: { width: 0, height: 4 },
            elevation: 3,
          }}
        >
          <T variant="report">{screen.report}</T>
        </View>
      )}
    </Pressable>
  );
}
