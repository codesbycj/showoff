import { Image, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

import { dots, header } from '../data/book';
import { bj, radius } from '../theme';
import { T } from './text';

const SHOP = require('../../../../assets/images/branjabook/shop.jpg');

/**
 * The shop itself.
 *
 * A photograph, because a barbershop interior is a scene — out of drawing
 * range by any reading of AGENTS.md, and the one thing on this screen that
 * cannot be a vector. The mark over it is a wordmark, which is in range.
 *
 * `overflow: 'hidden'` crops the picture to the card's corners, and nothing
 * here carries `elevation` — the two together are unreliable on Android.
 */
export function HeroCard({ height }: { height: number }) {
  return (
    <View style={{ height, borderRadius: radius.hero, overflow: 'hidden' }}>
      <Image
        source={SHOP}
        style={{ position: 'absolute', width: '100%', height }}
        resizeMode="cover"
        accessibilityIgnoresInvertColors
      />

      <View style={{ alignItems: 'center', marginTop: 14 }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 6,
            paddingHorizontal: 12,
            paddingVertical: 6,
            borderRadius: radius.pill,
            backgroundColor: 'rgba(17,10,32,0.52)',
          }}
        >
          <Pole size={13} />
          <T variant="wordmark" color={bj.onDark} style={{ fontSize: 12, letterSpacing: 2.4 }}>
            {header.wordmark}
          </T>
        </View>
      </View>

      <View style={{ flex: 1 }} />

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'center',
          gap: 5,
          marginBottom: 12,
        }}
      >
        {Array.from({ length: dots.count }, (_, i) => (
          <View
            key={i}
            style={{
              width: i === dots.active ? 16 : 6,
              height: 6,
              borderRadius: radius.pill,
              backgroundColor: i === dots.active ? bj.dotOn : bj.dot,
            }}
          />
        ))}
      </View>
    </View>
  );
}

/** The barber's pole in the mark. Drawn: a pole is a small flat object. */
function Pole({ size }: { size: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 12 12">
      <Path d="M3.4 1 H8.6 V11 H3.4 Z" fill="#ffffff" />
      <Path d="M3.4 2.4 L8.6 1 V2.6 L3.4 4 Z" fill="#d63d4a" />
      <Path d="M3.4 5.4 L8.6 4 V5.6 L3.4 7 Z" fill="#2f6fd0" />
      <Path d="M3.4 8.4 L8.6 7 V8.6 L3.4 10 Z" fill="#d63d4a" />
    </Svg>
  );
}
