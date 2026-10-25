import { Pressable, View } from 'react-native';
import Svg, { Circle, Path } from 'react-native-svg';

import { route } from '../data/search';
import { CARD_PAD, ROUTE_HEIGHT } from '../layout';
import { radius, rv, type } from '../theme';
import { Glyph } from './glyph';
import { T } from './text';

/**
 * Where you are going, and where from.
 *
 * The reference puts a stock photograph behind this card with the supplier's
 * watermark still across it — "FLIGHT TO …" in grey capitals, legible at
 * card size. That is not copied. In its place the two stops are joined by a
 * drawn line with a pin at each end, which is a route rather than a picture
 * of one and holds at any width.
 *
 * The swap control is its own `Pressable` between the two fields rather than
 * decoration on the line, because it does something.
 */
export function RouteCard({ onSwap }: { onSwap?: () => void }) {
  return (
    <View
      style={{
        height: ROUTE_HEIGHT,
        borderRadius: radius.card,
        backgroundColor: rv.card,
        borderWidth: 1,
        borderColor: rv.cardEdge,
        padding: CARD_PAD,
      }}
    >
      <View style={{ height: 52, justifyContent: 'center' }}>
        <Svg width="100%" height={52}>
          <Path
            d="M28 34 C90 8 230 8 300 34"
            stroke={rv.greenDim}
            strokeWidth={2}
            strokeDasharray="5 6"
            fill="none"
          />
          <Circle cx={28} cy={34} r={5} fill={rv.green} />
          <Circle cx={300} cy={34} r={5} fill={rv.green} />
        </Svg>
      </View>

      <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
        <View style={{ flex: 1 }}>
          <T variant="fieldLabel" color={rv.muted} style={{ height: type.fieldLabel.line }}>
            {route.from.label}
          </T>
          <T variant="fieldValue" color={rv.ink} style={{ height: type.fieldValue.line }}>
            {route.from.place}
          </T>
          <T variant="fieldLabel" color={rv.green} style={{ height: type.fieldLabel.line }}>
            {route.from.code}
          </T>
        </View>

        <Pressable onPress={onSwap} accessibilityRole="button" accessibilityLabel="Swap the stops">
          <View
            style={{
              width: 42,
              height: 42,
              borderRadius: radius.control,
              backgroundColor: rv.greenDim,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Glyph name="swap" size={19} tint={rv.green} />
          </View>
        </Pressable>

        <View style={{ flex: 1, alignItems: 'flex-end' }}>
          <T variant="fieldLabel" color={rv.muted} style={{ height: type.fieldLabel.line }}>
            {route.to.label}
          </T>
          <T variant="fieldValue" color={rv.ink} style={{ height: type.fieldValue.line }}>
            {route.to.place}
          </T>
          <T variant="fieldLabel" color={rv.green} style={{ height: type.fieldLabel.line }}>
            {route.to.code}
          </T>
        </View>
      </View>
    </View>
  );
}
