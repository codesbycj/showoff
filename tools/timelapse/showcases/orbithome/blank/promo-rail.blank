import { Pressable, ScrollView, View } from 'react-native';

import { promos } from '../data/home';
import { ct } from '../theme';
import { Glyph } from './glyph';
import { T } from './text';

type Props = { margin: number; width: number; height: number; radius: number };

/**
 * The two offer cards.
 *
 * **The board's gift is a 3D emoji**; emoji differ across Windows / Android /
 * iOS and the web render cannot show that (I8), so the mark is drawn.
 *
 * R5: each card is a title and one line of nine words — the board's own body
 * runs to two sentences of filler under the same heading.
 */
export function PromoRail({ margin, width, height, radius }: Props) {
  return (
    <View style={{ height }}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: margin, gap: 12 }}
      >
        {promos.map((promo) => (
          <Pressable key={promo.id} accessibilityRole="button" accessibilityLabel={promo.title}>
            <View
              style={{
                width,
                height,
                borderRadius: radius,
                backgroundColor: ct.accentSoft,
                paddingHorizontal: 16,
                flexDirection: 'row',
                alignItems: 'center',
                gap: 12,
              }}
            >
              <View style={{ flex: 1 }}>
                <T variant="promoTitle">{promo.title}</T>
                <T variant="promoBody">{promo.body}</T>
              </View>

              <View
                style={{
                  width: 42,
                  height: 42,
                  borderRadius: 21,
                  backgroundColor: ct.white,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Glyph name={promo.glyph} size={21} color={ct.accent} strokeWidth={1.7} />
              </View>
            </View>
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
}
