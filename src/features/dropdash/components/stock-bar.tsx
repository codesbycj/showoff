import { View } from 'react-native';

import { stock } from '../data/dashboard';
import { STOCK_HEIGHT } from '../layout';
import { dd, radius } from '../theme';
import { Icon } from './icon';
import { T } from './text';

/**
 * The three stock states, in one bar.
 *
 * Equal flex columns with hairlines between them, so the bar fits any phone
 * and the three read as one measurement split three ways rather than as three
 * separate cards.
 *
 * The divider is drawn *between* columns rather than as a border on each, so
 * the bar has two rules and not four.
 */
export function StockBar() {
  return (
    <View
      style={{
        height: STOCK_HEIGHT,
        borderRadius: radius.field,
        backgroundColor: dd.surface,
        borderWidth: 1,
        borderColor: dd.edge,
        flexDirection: 'row',
        alignItems: 'center',
      }}
    >
      {/* STEP 1.19 three states, one bar
      {stock.items.map((item, i) => (
        <View key={item.key} style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
          {i === 0 ? null : <View style={{ width: 1, height: 26, backgroundColor: dd.rule }} />}
          <View style={{ flex: 1, alignItems: 'center' }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
              <Icon name={item.mark} size={13} color={item.color} strokeWidth={2.2} />
              <T variant="stockLabel" color={dd.muted}>
                {item.label}
              </T>
            </View>
            <T variant="stockValue" color={dd.ink}>
              {item.value}
            </T>
          </View>
        </View>
      ))}
      */}
    </View>
  );
}
