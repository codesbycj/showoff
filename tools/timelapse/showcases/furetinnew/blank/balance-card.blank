import ChevronDown from 'lucide-react-native/icons/chevron-down';
import { View } from 'react-native';
import Svg, { Circle, Path, Rect } from 'react-native-svg';

import { balance } from '../data/wallet';
import { CARD_PAD } from '../layout';
import { fu, radius } from '../theme';
import { Flag } from './flag';
import { T } from './text';

/**
 * What is in the wallet, and in which currency.
 *
 * The redraw takes the three actions *out* of the card and puts them under it,
 * which is the whole point of the second phone — so this card is shorter than
 * its counterpart and carries a pattern instead.
 *
 * The pattern is drawn in the card's own user space rather than tiled as an
 * image: it is a handful of rounded rectangles, which is squarely in drawing
 * range and costs no asset.
 */
export function BalanceCard() {
  return (
    <View
      style={{
        borderRadius: radius.card,
        backgroundColor: fu.yellow,
        padding: CARD_PAD,
        overflow: 'hidden',
      }}
    >
      {/* STEP 1.08 the pattern in the card
      <Pattern />
      */}

      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 7 }}>
        {/* STEP 1.09 what the number is
        <T variant="balanceLabel" color={fu.onYellow}>
          {balance.label}
        </T>
        */}
        <Spiral size={15} />
      </View>

      {/* STEP 1.10 the number, and its currency
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginTop: 4,
        }}
      >
        <T variant="balance" color={fu.onYellow}>
          {balance.value}
        </T>

        <View
          style={{
            height: 32,
            paddingHorizontal: 10,
            borderRadius: radius.pill,
            backgroundColor: fu.currencyWell,
            flexDirection: 'row',
            alignItems: 'center',
            gap: 6,
          }}
        >
          <Flag country="ng" size={16} />
          <T variant="currency" color={fu.onCurrency}>
            {balance.currency}
          </T>
          <ChevronDown size={14} color={fu.onCurrency} strokeWidth={2.4} />
        </View>
      </View>
      */}
    </View>
  );
}

/** The ghost shapes printed into the card. */
function Pattern() {
  return (
    <Svg
      width="100%"
      height="100%"
      viewBox="0 0 200 110"
      preserveAspectRatio="none"
      style={{ position: 'absolute', left: 0, top: 0 }}
    >
      <Rect x={18} y={-12} width={30} height={42} rx={15} fill={fu.cardPattern} />
      <Rect x={58} y={-20} width={30} height={50} rx={15} fill={fu.cardPattern} />
      <Rect x={98} y={-12} width={30} height={42} rx={15} fill={fu.cardPattern} />
      <Rect x={138} y={-20} width={30} height={50} rx={15} fill={fu.cardPattern} />
      <Rect x={150} y={62} width={44} height={30} rx={15} fill={fu.cardPattern} />
      <Rect x={104} y={62} width={34} height={30} rx={15} fill={fu.cardPattern} />
    </Svg>
  );
}

/** The hide-balance mark. Drawn: an icon set has no spiral at 15dp that reads. */
function Spiral({ size }: { size: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 16 16">
      <Circle cx={8} cy={8} r={6.6} fill="none" stroke={fu.onYellow} strokeWidth={1.5} />
      <Path
        d="M8 4.2 A3.8 3.8 0 1 1 4.6 9.6"
        fill="none"
        stroke={fu.onYellow}
        strokeWidth={1.5}
        strokeLinecap="round"
      />
    </Svg>
  );
}
