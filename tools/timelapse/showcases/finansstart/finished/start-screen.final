import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';

import { Backdrop } from '@/features/finansstart/components/backdrop';
import { Collage } from '@/features/finansstart/components/collage';
import { PrimaryButton } from '@/features/finansstart/components/primary-button';
import { T } from '@/features/finansstart/components/text';
import { Wordmark } from '@/features/finansstart/components/wordmark';
import { landing } from '@/features/finansstart/data/landing';
import {
  BODY_TOP,
  BODY_WIDTH,
  BUTTON_BOTTOM,
  BUTTON_TOP,
  COPY_TOP,
  MARGIN,
  MARK_TOP,
  useCollage,
} from '@/features/finansstart/layout';
import { fn } from '@/features/finansstart/theme';
import { useInsets } from '@/features/finansstart/use-insets';

/**
 * Finans — the landing screen.
 *
 * Assembly only: a lit page, the brand, a collage of cards, what the app is
 * for, and the one thing it asks.
 *
 * The collage is the one block that escapes the page margin — its back card
 * runs off the left edge by design, and the screen lets it rather than
 * clipping, because `overflow: 'hidden'` next to an `elevation` is unreliable
 * on Android.
 *
 * The handler is empty on purpose. The other screens of this design are their
 * own showcases with their own slugs, so there is nothing to push to yet;
 * what matters is that the destination is decided here.
 */
export default function FinansStart() {
  const insets = useInsets();
  const { slot } = useCollage();

  return (
    <View style={{ flex: 1, backgroundColor: fn.canvas }}>
      <StatusBar style="dark" />
      <Backdrop height={insets.top + 120 + slot} />

      <View
        style={{
          flex: 1,
          paddingTop: insets.top + MARK_TOP,
          paddingBottom: insets.bottom + BUTTON_BOTTOM,
          paddingHorizontal: MARGIN,
        }}
      >
        <Wordmark name={landing.brand} />

        <View style={{ flex: 1, justifyContent: 'center', marginHorizontal: -MARGIN }}>
          <Collage />
        </View>

        <View style={{ marginTop: COPY_TOP }}>
          <T variant="display" color={fn.ink}>
            {landing.headline.one}
          </T>
          <T variant="display" color={fn.ink}>
            {landing.headline.two}
          </T>
          <T variant="display" color={fn.ink}>
            {landing.headline.three}
          </T>
        </View>

        <View style={{ marginTop: BODY_TOP, width: `${BODY_WIDTH * 100}%` }}>
          <T variant="body" color={fn.muted}>
            {landing.body}
          </T>
        </View>

        <View style={{ marginTop: BUTTON_TOP }}>
          <PrimaryButton label={landing.cta} />
        </View>
      </View>
    </View>
  );
}
