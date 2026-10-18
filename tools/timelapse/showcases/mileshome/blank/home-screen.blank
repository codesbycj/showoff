import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import ArrowRight from 'lucide-react-native/icons/arrow-right';
import { Pressable, useWindowDimensions, View } from 'react-native';

// STEP 1.07 the category they are on
// import { DiningCard } from '@/features/mileshome/components/dining-card';
// STEP 1.01 who is here
// import { Header } from '@/features/mileshome/components/header';
// STEP 1.12 the throw of partners
// import { Scatter } from '@/features/mileshome/components/scatter';
// STEP 1.17 the way around
// import { TabBar } from '@/features/mileshome/components/tab-bar';
import { T } from '@/features/mileshome/components/text';
import { balance, cta, dots } from '@/features/mileshome/data/home';
import {
  BALANCE_TOP,
  BUTTON_HEIGHT,
  BUTTON_TOP,
  CARD_H,
  CARD_TOP,
  DOTS_TOP,
  HEADER_TOP,
  MARGIN,
  TAB_BOTTOM,
} from '@/features/mileshome/layout';
import { ml, radius } from '@/features/mileshome/theme';
import { useInsets } from '@/features/mileshome/use-insets';

/**
 * Miles — the home screen.
 *
 * Assembly only: who is here, what they have, the category they are looking
 * at, and the one thing the screen asks.
 *
 * The scatter is an absolute layer over the middle of the page rather than
 * part of the flow, because the reference's renders overlap the balance and
 * the card — and anything in the flow would push them apart instead.
 */
export default function MilesHome() {
  const insets = useInsets();
  const { width, height } = useWindowDimensions();
  const [held, setHeld] = useState(false);

  return (
    <View style={{ flex: 1, backgroundColor: ml.canvas }}>
      <StatusBar style="light" />

      {/* Vertical, so it is not the diagonal case that comes out mirrored on
          web (AGENTS.md, "Diagonal gradients flip on web"). */}
      <LinearGradient
        colors={[ml.canvasTop, ml.canvas]}
        locations={[0, 0.7]}
        style={{ position: 'absolute', left: 0, right: 0, top: 0, bottom: 0 }}
      />

      <View
        style={{
          flex: 1,
          paddingTop: insets.top + HEADER_TOP,
          paddingBottom: insets.bottom + TAB_BOTTOM,
          paddingHorizontal: MARGIN,
        }}
      >
        {/* STEP 1.02 across the top
        <Header />
        */}

        {/* STEP 1.06 what they have
        <View style={{ marginTop: BALANCE_TOP, alignItems: 'center' }}>
          <T variant="balanceLabel" color={ml.onCanvasSoft}>
            {balance.label}
          </T>
          <T variant="balance" color={ml.onCanvas}>
            {balance.value}
          </T>
          <T variant="balanceMeta" color={ml.onCanvasSoft}>
            {balance.meta}
          </T>
        </View>
        */}

        <View style={{ flex: 1, marginTop: CARD_TOP }}>
          {/* STEP 1.08 in the middle of the page
          <DiningCard />
          */}
          {/* The scatter's box is the card's own block, so the throw stays
              around the card rather than trailing down the empty page. */}
          {/* STEP 1.13 over the card
          <Scatter width={width - MARGIN * 2} height={CARD_H + 70} />
          */}
        </View>

        {/* STEP 1.15 which page this is
        <View
          style={{
            marginTop: DOTS_TOP,
            flexDirection: 'row',
            justifyContent: 'center',
            gap: 5,
          }}
        >
          {Array.from({ length: dots.count }, (_, i) => (
            <View
              key={i}
              style={{
                width: i === dots.active ? 16 : 5,
                height: 5,
                borderRadius: radius.pill,
                backgroundColor: i === dots.active ? ml.dotOn : ml.dot,
              }}
            />
          ))}
        </View>
        */}

        {/* STEP 1.16 and the one thing it asks
        <Pressable
          onPressIn={() => setHeld(true)}
          onPressOut={() => setHeld(false)}
          accessibilityRole="button"
          accessibilityLabel={cta}
          style={{ marginTop: BUTTON_TOP, alignSelf: 'center' }}
        >
          <View
            style={{
              height: BUTTON_HEIGHT,
              paddingHorizontal: 26,
              borderRadius: radius.pill,
              backgroundColor: ml.action,
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 10,
              opacity: held ? 0.86 : 1,
            }}
          >
            <T variant="button" color={ml.onAction}>
              {cta}
            </T>
            <View
              style={{
                width: 24,
                height: 24,
                borderRadius: 8,
                backgroundColor: ml.onAction,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <ArrowRight size={14} color={ml.action} strokeWidth={2.4} />
            </View>
          </View>
        </Pressable>
        */}

        <View style={{ marginTop: 14 }}>
          {/* STEP 1.18 along the bottom
          <TabBar />
          */}
        </View>
      </View>
    </View>
  );
}
