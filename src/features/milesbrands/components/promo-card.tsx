import { Pressable, View } from 'react-native';

import { promo } from '../data/brands';
import { PROMO_HEIGHT } from '../layout';
import { ml, radius } from '../theme';
import { T } from './text';

/** The offer the screen is pushing, and the badge that says so. */
export function PromoCard({ onPress }: { onPress?: () => void }) {
  return (
    <Pressable onPress={onPress} accessibilityRole="button" accessibilityLabel={promo.brand}>
      <View
        style={{
          height: PROMO_HEIGHT,
          borderRadius: radius.card,
          backgroundColor: ml.promo,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingHorizontal: 16,
        }}
      >
        <View>
          {/* STEP 1.16 what the offer is
          <T variant="promo" color={ml.onCanvas}>
            {promo.lead}
            <T variant="promo" color={ml.promoAccent}>
              {promo.brand}
            </T>
          </T>
          */}
          <T variant="promoMeta" color={ml.onCanvasSoft}>
            {promo.meta}
          </T>
        </View>

        <View
          style={{
            height: 30,
            paddingHorizontal: 14,
            borderRadius: radius.pill,
            backgroundColor: ml.promoChip,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {/* STEP 1.17 and that it is featured
          <T variant="chip" color={ml.ink}>
            {promo.chip}
          </T>
          */}
        </View>
      </View>
    </Pressable>
  );
}
