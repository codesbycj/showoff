import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';

import { FooterActions } from '@/features/paytinstart/components/footer-actions';
import { Headline } from '@/features/paytinstart/components/headline';
import { Scatter } from '@/features/paytinstart/components/scatter';
import { Stage } from '@/features/paytinstart/components/stage';
import { T } from '@/features/paytinstart/components/text';
import { onboarding } from '@/features/paytinstart/data/onboarding';
import {
  FOOTER_BOTTOM,
  FOOTER_TOP,
  GLYPH_BAND,
  GLYPH_TOP,
  LEDE_TOP,
  MARGIN,
} from '@/features/paytinstart/layout';
import { pt } from '@/features/paytinstart/theme';
import { useInsets } from '@/features/paytinstart/use-insets';

/**
 * Paytin — onboarding.
 *
 * Assembly only: the marks scattered round the top, the illustration on its
 * disc, the headline, one line about it, and the foot of the screen.
 *
 * The stage takes whatever height the copy leaves — a plain flex stack, so the
 * screen holds together on a 360dp phone and on a 430dp one with nothing
 * positioned off the top.
 *
 * Both handlers are empty on purpose. The other two screens of this design are
 * their own showcases with their own slugs, so there is nothing to push to
 * yet; what matters is that the destination is decided *here*.
 */
export default function PaytinStart() {
  const insets = useInsets();

  return (
    <View style={{ flex: 1, backgroundColor: pt.lime }}>
      <StatusBar style="dark" />

      {/* A layer, not a row — see the note in `scatter.tsx`. */}
      <View
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          top: insets.top + GLYPH_TOP,
          paddingHorizontal: 0,
        }}
        pointerEvents="none"
      >
        <Scatter height={GLYPH_BAND} />
      </View>

      <View
        style={{
          flex: 1,
          paddingTop: insets.top + GLYPH_TOP,
          paddingBottom: insets.bottom + FOOTER_BOTTOM,
          paddingHorizontal: MARGIN,
        }}
      >
        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Stage />
        </View>

        <Headline
          one={onboarding.headline.one}
          two={onboarding.headline.two}
          three={onboarding.headline.three}
        />

        <View style={{ marginTop: LEDE_TOP }}>
          <T variant="lede" color={pt.inkSoft}>
            {onboarding.lede}
          </T>
        </View>

        <View style={{ marginTop: FOOTER_TOP }}>
          <FooterActions skip={onboarding.skip} start={onboarding.start} />
        </View>
      </View>
    </View>
  );
}
