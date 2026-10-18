import { Image, Pressable, View } from 'react-native';

import { promo } from '../data/wallet';
import { PROMO_H } from '../layout';
import { fu, radius } from '../theme';
import { T } from './text';

const PROMO = require('../../../../assets/images/furetinnew/promo.png');

/**
 * The partner banner at the middle of the page.
 *
 * The figure is a photograph cut off its backdrop by `tools/bake/cutout.py` —
 * a person is out of drawing range (AGENTS.md), and the reference puts one
 * here. The ghost wordmark behind them is type, which is in range.
 *
 * `overflow: 'hidden'` crops the figure to the banner's corners, and nothing
 * here carries `elevation` — the two together are unreliable on Android.
 */
export function PromoBanner({ onPress }: { onPress?: () => void }) {
  return (
    <Pressable onPress={onPress} accessibilityRole="button" accessibilityLabel={promo.wordmark}>
      <View
        style={{
          height: PROMO_H,
          borderRadius: radius.card,
          backgroundColor: fu.promo,
          overflow: 'hidden',
        }}
      >
        {/* STEP 1.19 the brand, big and behind
        <View style={{ position: 'absolute', right: 0, left: '34%', top: 6 }}>
          <T variant="balance" color={fu.promoGhost} style={{ letterSpacing: 2 }}>
            {promo.wordmark}
          </T>
        </View>
        */}

        {/* STEP 1.20 the person in front of it
        <Image
          source={PROMO}
          style={{ position: 'absolute', right: 4, bottom: -8, width: 128, height: 128 }}
          resizeMode="contain"
          accessibilityIgnoresInvertColors
        />
        */}

        {/* STEP 1.21 and what it is selling
        <View style={{ padding: 14, width: '64%' }}>
          <T variant="wordmark" color={fu.promoAccent}>
            {promo.wordmark}
          </T>
          <T variant="promo" color={fu.onPromo} style={{ marginTop: 8 }}>
            {promo.lead}
            <T variant="promo" color={fu.promoAccent}>
              {promo.accent}
            </T>
          </T>
          <T variant="promoMeta" color={fu.onPromoSoft} style={{ marginTop: 2 }}>
            {promo.meta}
          </T>
        </View>
        */}
      </View>
    </Pressable>
  );
}
