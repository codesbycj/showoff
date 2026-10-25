import { View } from 'react-native';
import Svg, { Circle, Path } from 'react-native-svg';

import { card } from '../data/start';
import { CARD_HEIGHT, CARD_TOP } from '../layout';
import { kt, radius, type } from '../theme';
import { T } from './text';

/**
 * The card itself.
 *
 * The mark at the top left is the issuer's own — four petals around a centre,
 * a small flat shape and squarely in drawing range. The mark at the right is
 * the issuer's too, a kite: the reference puts a card network's mark there,
 * and a network's mark is not a showcase's to wear.
 *
 * The name is invented. Embossing a plausible real person's name on a bank
 * card is the one detail on this board that could not be shipped as-is.
 */
export function KiteCard() {
  return (
    <View
      style={{
        height: CARD_HEIGHT,
        marginTop: CARD_TOP,
        borderRadius: radius.card,
        backgroundColor: kt.cardFace,
        borderWidth: 1,
        borderColor: kt.cardEdge,
        padding: 16,
        justifyContent: 'space-between',
      }}
    >
      <Svg width={22} height={22} viewBox="0 0 24 24">
        <Circle cx={12} cy={6.4} r={3.3} fill={kt.ink} opacity={0.9} />
        <Circle cx={12} cy={17.6} r={3.3} fill={kt.ink} opacity={0.55} />
        <Circle cx={6.4} cy={12} r={3.3} fill={kt.ink} opacity={0.7} />
        <Circle cx={17.6} cy={12} r={3.3} fill={kt.ink} opacity={0.4} />
      </Svg>

      <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
        <View style={{ flex: 1 }}>
          <T variant="holder" color={kt.dim} style={{ height: type.holder.line }}>
            {card.holder}
          </T>
          <T
            variant="pan"
            color={kt.ink}
            numberOfLines={1}
            style={{ marginTop: 4, height: type.pan.line }}
          >
            {card.pan}
          </T>
        </View>

        <Svg width={30} height={30} viewBox="0 0 30 30">
          <Path d="M15 3.5 25 15 15 26.5 5 15Z" fill={kt.coral} />
          <Path d="M15 3.5 25 15H15Z" fill={kt.ink} opacity={0.85} />
        </Svg>
      </View>
    </View>
  );
}
