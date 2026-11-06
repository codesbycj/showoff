import { Pressable, View } from 'react-native';

import { PERIOD_H } from '../layout';
import { ct, radius, type } from '../theme';
import { copy, expense } from '../data/stats';
import { Glyph } from './glyph';
import { T } from './text';

/**
 * What went out, and over which month.
 *
 * The figure is summed from the categories at the foot of the screen rather
 * than typed, so the total and the list cannot drift apart.
 */
export function ExpenseHead({ onPeriod }: { onPeriod?: () => void }) {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <View style={{ flex: 1 }}>
        <T variant="label" color={ct.muted} style={{ height: type.label.line }}>
          {copy.expenseLabel}
        </T>
        <T variant="figure" color={ct.ink} style={{ height: type.figure.line, marginTop: 1 }}>
          {expense}
        </T>
      </View>

      <Pressable
        accessibilityRole="button"
        accessibilityLabel={`Period: ${copy.period}`}
        onPress={onPeriod}
      >
        <View
          style={{
            height: PERIOD_H,
            paddingHorizontal: 16,
            borderRadius: radius.pill,
            borderWidth: 1,
            borderColor: ct.hairline,
            flexDirection: 'row',
            alignItems: 'center',
          }}
        >
          <T variant="pill" color={ct.ink} style={{ height: type.pill.line }}>
            {copy.period}
          </T>
          <View style={{ marginLeft: 8, transform: [{ rotate: '90deg' }] }}>
            <Glyph name="chevron" size={14} tint={ct.ink} strokeWidth={2} />
          </View>
        </View>
      </Pressable>
    </View>
  );
}
