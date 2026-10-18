import ArrowLeft from 'lucide-react-native/icons/arrow-left';
import { Image, Pressable, View } from 'react-native';

import { panel } from '../data/product';
import { HEADER_DISC, HEADER_TOP, MARGIN } from '../layout';
import { radius, sp } from '../theme';
import { T } from './text';

const BOWL = require('../../../../assets/images/sproutsitem/bowl.jpg');

/**
 * The green panel the dish stands on, with the way back over it.
 *
 * The bowl is a photograph. A plate of food is the example AGENTS.md gives for
 * a subject out of drawing range, and a vector of one comes out a cartoon of
 * the dish the design had a picture of.
 *
 * The ghost line behind it is type, which is in range — and it is laid *under*
 * the photograph rather than over it, so the dish stays the thing the eye
 * lands on.
 */
export function ProductStage({
  height,
  topInset,
  onBack,
}: {
  height: number;
  topInset: number;
  onBack?: () => void;
}) {
  return (
    <View style={{ height, backgroundColor: sp.panel, overflow: 'hidden' }}>
      <View style={{ position: 'absolute', left: 0, right: 0, top: height * 0.1 }}>
        <T variant="ghost" color={sp.ghost} style={{ textAlign: 'center' }}>
          {panel.ghost}
        </T>
      </View>

      <Image
        source={BOWL}
        style={{
          position: 'absolute',
          alignSelf: 'center',
          bottom: height * 0.06,
          width: '62%',
          height: height * 0.62,
          borderRadius: radius.tile,
        }}
        resizeMode="cover"
        accessibilityIgnoresInvertColors
      />

      <View style={{ marginTop: topInset + HEADER_TOP, paddingHorizontal: MARGIN }}>
        <Pressable onPress={onBack} accessibilityRole="button" accessibilityLabel="Back">
          <View
            style={{
              width: HEADER_DISC,
              height: HEADER_DISC,
              borderRadius: radius.full,
              backgroundColor: sp.sheet,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <ArrowLeft size={18} color={sp.onDark} strokeWidth={2.1} />
          </View>
        </Pressable>
      </View>
    </View>
  );
}
