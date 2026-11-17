import { View } from 'react-native';

import { banner } from '../data/menu';
import { ct } from '../theme';
import { Glyph } from './glyph';
import { DiscProps } from './_menu-head-shared';

/**
 * The restaurant's own mark.
 *
 * **Drawn, and for a fictional restaurant** — the board sets McDonald's arches
 * here. It straddles the banner's lower edge, which is the board's design and
 * the one shape on this screen where an overlap is deliberate; it crosses an
 * *edge*, never any text (R3).
 */
export function PlaceDisc({ size, top }: DiscProps) {
  return (
    <View
      style={{
        position: 'absolute',
        top,
        left: 0,
        right: 0,
        alignItems: 'center',
      }}
      pointerEvents="none"
    >
      <View
        style={{
          width: size,
          height: size,
          borderRadius: size / 2,
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: ct.white,
          borderWidth: 3,
          borderColor: ct.white,
          shadowColor: '#2A1A14',
          shadowOpacity: 0.2,
          shadowRadius: 12,
          shadowOffset: { width: 0, height: 5 },
          elevation: 6,
        }}
      >
        <View
          style={{
            width: size - 10,
            height: size - 10,
            borderRadius: (size - 10) / 2,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: ct.brand,
          }}
        >
          {/* STEP 1.26 glyph
          <Glyph name="tag" size={size * 0.42} color={ct.brandInk} strokeWidth={1.9} />
          */}
        </View>
      </View>
    </View>
  );
}
