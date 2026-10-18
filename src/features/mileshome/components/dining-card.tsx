import { Image, Pressable, View } from 'react-native';

import { card } from '../data/home';
import { CARD_H, CARD_W } from '../layout';
import { ml, radius, shadow } from '../theme';
import { T } from './text';

const DINING = require('../../../../assets/images/mileshome/dining.jpg');

/**
 * The category the carousel is showing.
 *
 * The photograph is a crop, not a cut-out: it fills the card's lower half the
 * way the reference's does, so there is no backdrop to remove.
 *
 * The clip and the shadow are on different views. `overflow: 'hidden'` with
 * `elevation` on the same view is unreliable on Android (AGENTS.md), so the
 * outer view carries the shadow and the inner one does the clipping.
 */
export function DiningCard({ onPress }: { onPress?: () => void }) {
  return (
    <View style={{ alignItems: 'center' }}>
      <Pressable onPress={onPress} accessibilityRole="button" accessibilityLabel={card.title}>
        <View style={{ borderRadius: radius.card, ...shadow.float }}>
          <View
            style={{
              width: CARD_W,
              height: CARD_H,
              // MISTAKE 1.20 the card came in squat
              marginTop: 40,
              borderRadius: radius.card,
              backgroundColor: ml.dining,
              overflow: 'hidden',
            }}
          >
            {/* STEP 1.09 what the category is
            <T variant="card" color={ml.onCanvas} style={{ marginTop: 18, textAlign: 'center' }}>
              {card.title}
            </T>
            */}
            {/* STEP 1.10 and what it looks like
            <Image
              source={DINING}
              style={{ position: 'absolute', left: 0, bottom: 0, width: '100%', height: '62%' }}
              resizeMode="cover"
              accessibilityIgnoresInvertColors
            />
            */}
          </View>
        </View>
      </Pressable>

      {/* STEP 1.11 with how many are in it
      <T variant="cardMeta" color={ml.onCanvasSoft} style={{ marginTop: 10 }}>
        {card.meta}
      </T>
      */}
    </View>
  );
}
