import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import Plus from 'lucide-react-native/icons/plus';
import { Image, Pressable, useWindowDimensions, View } from 'react-native';

import { AppointmentCard } from '@/features/branjabook/components/appointment-card';
import { Dock } from '@/features/branjabook/components/dock';
import { FACES } from '@/features/branjabook/components/faces';
import { HeroCard } from '@/features/branjabook/components/hero-card';
import { T } from '@/features/branjabook/components/text';
import { copy, header } from '@/features/branjabook/data/book';
import {
  APPOINTMENT_TOP,
  BOOK_HEIGHT,
  BOOK_TOP,
  COPY_TOP,
  DOCK_BOTTOM,
  DOCK_TOP,
  HEADER_DISC,
  HEADER_TOP,
  HERO_TOP,
  MARGIN,
} from '@/features/branjabook/layout';
import { bj, radius } from '@/features/branjabook/theme';
import { useInsets } from '@/features/branjabook/use-insets';

/**
 * Branja — booking home.
 *
 * Assembly only: the brand, the shop, what the app is for, the way to book,
 * and the booking already made.
 *
 * The hero takes a share of the window rather than a dp height, so the
 * composition holds on a short phone instead of pushing the appointment card
 * off the page.
 */
export default function BranjaBook() {
  const insets = useInsets();
  const { height } = useWindowDimensions();

  return (
    <View style={{ flex: 1, backgroundColor: bj.canvas }}>
      <StatusBar style="light" />

      {/* Vertical, so it is not the diagonal case that comes out mirrored on
          web (AGENTS.md, "Diagonal gradients flip on web"). */}
      <LinearGradient
        colors={[bj.canvasTop, bj.canvas]}
        locations={[0, 0.55]}
        style={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
      />

      <View
        style={{
          flex: 1,
          paddingTop: insets.top + HEADER_TOP,
          paddingBottom: insets.bottom + DOCK_BOTTOM,
          paddingHorizontal: MARGIN,
        }}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Image
            source={FACES[0]}
            style={{ width: HEADER_DISC, height: HEADER_DISC, borderRadius: radius.full }}
            resizeMode="cover"
            accessibilityIgnoresInvertColors
          />
          <View style={{ flex: 1, alignItems: 'center' }}>
            <T variant="wordmark" color={bj.onDark}>
              {header.wordmark}
            </T>
          </View>
          <View>
            <Image
              source={FACES[1]}
              style={{ width: HEADER_DISC, height: HEADER_DISC, borderRadius: radius.full }}
              resizeMode="cover"
              accessibilityIgnoresInvertColors
            />
            <View
              style={{
                position: 'absolute',
                right: -2,
                top: -2,
                minWidth: 17,
                height: 17,
                paddingHorizontal: 4,
                borderRadius: radius.full,
                backgroundColor: bj.panel,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <T variant="discount" color={bj.ink}>
                {header.badge}
              </T>
            </View>
          </View>
        </View>

        <View style={{ marginTop: HERO_TOP }}>
          <HeroCard height={height * 0.26} />
        </View>

        <View style={{ marginTop: COPY_TOP }}>
          <T variant="kicker" color={bj.onDarkSoft}>
            {copy.kicker}
          </T>
          <T variant="display" color={bj.onDark} style={{ marginTop: 4 }}>
            {copy.display}
          </T>
        </View>

        <View style={{ marginTop: BOOK_TOP, flexDirection: 'row', alignItems: 'center', gap: 10 }}>
          <Pressable accessibilityRole="button" accessibilityLabel={copy.cta} style={{ flex: 1 }}>
            <View
              style={{
                height: BOOK_HEIGHT,
                borderRadius: radius.pill,
                backgroundColor: bj.glass,
                borderWidth: 1,
                borderColor: bj.glassLine,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <T variant="button" color={bj.onDark}>
                {copy.cta}
              </T>
            </View>
          </Pressable>

          <Pressable accessibilityRole="button" accessibilityLabel="New">
            <View
              style={{
                width: BOOK_HEIGHT,
                height: BOOK_HEIGHT,
                borderRadius: radius.full,
                backgroundColor: bj.panel,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Plus size={22} color={bj.ink} strokeWidth={2.3} />
            </View>
          </Pressable>
        </View>

        <View style={{ marginTop: APPOINTMENT_TOP }}>
          <AppointmentCard />
        </View>

        <View style={{ flex: 1 }} />

        <View style={{ marginTop: DOCK_TOP }}>
          <Dock />
        </View>
      </View>
    </View>
  );
}
