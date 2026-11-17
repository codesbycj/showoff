import { Pressable, View } from 'react-native';

import { copy, dots } from '../data/trip';
import { ct } from '../theme';
import { T } from './text';

type Props = {
  margin: number;
  displayH: number;
  gapDisplay: number;
  bodyH: number;
  gapBody: number;
  dotsH: number;
  gapDots: number;
  ctaH: number;
  onNext?: () => void;
};

/**
 * The headline, the body, the pager and the action.
 *
 * **R9: the dots count the pages that exist** and mark the one on screen.
 * Both ends are clamped, because the reveal stages this screen's own data and
 * an index outside the list would otherwise mark nothing (I7).
 *
 * **The CTA is the deeper orange.** White on the board's #F2642A measures
 * 3.2:1 and fails R4 at this size; on this step it is 5.2:1, and the board's
 * brighter orange stays on the pager dot, which carries no type.
 */
export function OnboardFoot({
  margin,
  displayH,
  gapDisplay,
  bodyH,
  gapBody,
  dotsH,
  gapDots,
  ctaH,
  onNext,
}: Props) {
  return (
    <View>
      {/* STEP 1.16 display
      <View style={{ marginHorizontal: margin, height: displayH, justifyContent: 'center' }}>
        <T variant="display" style={{ textAlign: 'center' }}>
          {copy.display}
        </T>
      </View>
      */}

      <View style={{ height: gapDisplay }} />
      {/* STEP 1.17 body
      <View style={{ marginHorizontal: margin + 8, height: bodyH }}>
        <T variant="body" style={{ textAlign: 'center' }}>
          {copy.body}
        </T>
      </View>
      */}

      <View style={{ height: gapBody }} />
      {/* STEP 1.18 view
      <View
        style={{
          height: dotsH,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 7,
        }}
      >
        {dots.map((dot) => (
          <View
            key={dot.id}
            accessibilityLabel={dot.label}
            style={{
              width: dot.on ? 20 : 7,
              height: 7,
              borderRadius: 4,
              backgroundColor: dot.on ? ct.orange : ct.line,
            }}
          />
        ))}
      </View>
      */}

      <View style={{ height: gapDots }} />
      <View style={{ marginHorizontal: margin }}>
        <Pressable accessibilityRole="button" accessibilityLabel={copy.cta} onPress={onNext}>
          <View style={{ height: ctaH, alignItems: 'center', justifyContent: 'center' }}>
            {/* STEP 1.19 view
            <View
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                borderRadius: ctaH / 2,
                backgroundColor: ct.orangeDeep,
                shadowColor: ct.orange,
                shadowOpacity: 0.34,
                shadowRadius: 16,
                shadowOffset: { width: 0, height: 8 },
                elevation: 6,
              }}
            />
            */}
            {/* STEP 1.20 cta
            <T variant="cta">{copy.cta}</T>
            */}
          </View>
        </Pressable>
      </View>
    </View>
  );
}
