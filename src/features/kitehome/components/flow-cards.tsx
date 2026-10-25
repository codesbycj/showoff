import { View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

import { copy, money, moneyIn, moneyOut } from '../data/start';
import { FLOW_GAP, FLOW_HEIGHT, FLOW_TOP } from '../layout';
import { kt, radius, type } from '../theme';
import { T } from './text';

/**
 * What came in and what went out.
 *
 * Both figures are summed from `history` rather than typed, so adding a row
 * moves the card above it. The reference's two totals match neither each
 * other nor the rows underneath them.
 *
 * The arrows carry the colour and the direction together — a green arrow
 * pointing down into the wallet, a red one pointing up out of it — so the
 * pair reads without the labels.
 */
export function FlowCards() {
  const cards = [
    {
      id: 'in',
      label: copy.moneyIn,
      value: moneyIn,
      tint: kt.green,
      d: 'M12 6v12M7.4 13.4 12 18l4.6-4.6',
    },
    {
      id: 'out',
      label: copy.moneyOut,
      value: moneyOut,
      tint: kt.red,
      d: 'M12 18V6M7.4 10.6 12 6l4.6 4.6',
    },
  ];

  return (
    <View style={{ flexDirection: 'row', marginTop: FLOW_TOP }}>
      {cards.map((c, i) => (
        <View
          key={c.id}
          style={{
            flex: 1,
            height: FLOW_HEIGHT,
            marginLeft: i === 0 ? 0 : FLOW_GAP,
            borderRadius: radius.card,
            backgroundColor: kt.panelCard,
            padding: 14,
            justifyContent: 'space-between',
          }}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <View
              style={{
                width: 22,
                height: 22,
                borderRadius: radius.pill,
                backgroundColor: c.tint + '2E',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Svg width={13} height={13} viewBox="0 0 24 24">
                <Path
                  d={c.d}
                  stroke={c.tint}
                  strokeWidth={2.2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="none"
                />
              </Svg>
            </View>
            <T
              variant="flowLabel"
              color={kt.dim}
              style={{ marginLeft: 8, height: type.flowLabel.line }}
            >
              {c.label}
            </T>
          </View>
          <T variant="flowValue" color={kt.ink} style={{ height: type.flowValue.line }}>
            {money(c.value)}
          </T>
        </View>
      ))}
    </View>
  );
}
