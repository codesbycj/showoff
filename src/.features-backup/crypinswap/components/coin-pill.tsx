import { Pressable, View } from 'react-native';

import { TICKER, type Coin } from '../data/swap';
import { ct } from '../theme';
import { Glyph } from './glyph';
import { T } from './text';

const DISC: Record<Coin, string> = { btc: ct.btc, usdt: ct.usdt };

type Props = { coin: Coin; height: number; disc: number };

/** The asset selector: a coin on its own disc, the ticker, and a chevron. */
export function CoinPill({ coin, height, disc }: Props) {
  return (
    <Pressable
      hitSlop={8}
      accessibilityRole="button"
      accessibilityLabel={`Change asset, currently ${TICKER[coin]}`}
    >
      {({ pressed }) => (
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 6,
            height,
            paddingLeft: 4,
            paddingRight: 8,
            borderRadius: height / 2,
            backgroundColor: ct.disc,
            opacity: pressed ? 0.7 : 1,
          }}
        >
          <View
            style={{
              width: disc,
              height: disc,
              borderRadius: disc / 2,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: DISC[coin],
            }}
          >
            <Glyph name={coin} size={13} color={ct.white} />
          </View>
          <T variant="coin">{TICKER[coin]}</T>
          <Glyph name="chevronDown" size={13} color={ct.sub} strokeWidth={2.2} />
        </View>
      )}
    </Pressable>
  );
}
