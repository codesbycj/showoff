import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// STEP 3.01 import the hero
// import { DetailHero } from '@/features/travelexa/components/detail-hero';
// STEP 3.03 import the detail sheet
// import { DetailSheet } from '@/features/travelexa/components/detail-sheet';
// STEP 3.09 import the section head
// import { SectionHead } from '@/features/travelexa/components/section-head';
import { Symbol } from '@/features/travelexa/components/symbol';
// STEP 3.10 import the tour card
// import { UpcomingCard } from '@/features/travelexa/components/upcoming-card';
import {
  BOOKING,
  GUIDE,
  HIGHLIGHTS,
  PLACE,
  TOURS_HEAD,
  UPCOMING,
} from '@/features/travelexa/data/destination';
import { ELEV, R, SP, TYPE, travelexaTheme, tx } from '@/features/travelexa/theme';

/**
 * Screen 3 — the destination detail.
 *
 * The export gives this screen a fixed top bar — back, a title, share and the
 * signed-in avatar — *and* a second pair of floating controls over the photo,
 * and its own render stacks them. The bar is dropped: it duplicated the back
 * control and spent 64dp above the fold on a screen whose subject is the
 * photograph. The hero runs full-bleed to the top edge in its place, which is
 * why the status bar is set light here and nowhere else.
 *
 * It is also the only screen with no dock. The booking bar takes that slot — a
 * floating white capsule pinned above the safe area — which is what the export
 * does with `sticky bottom-0`.
 */
export default function TravelexaDestination() {
  const insets = useSafeAreaInsets();
  const [expanded, setExpanded] = useState(false);
  const [saved, setSaved] = useState<readonly string[]>(['bali']);

  const toggle = (key: string) =>
    setSaved((s) => (s.includes(key) ? s.filter((k) => k !== key) : [...s, key]));

  return (
    <View style={[travelexaTheme, { flex: 1, backgroundColor: tx.surface }]}>
      <StatusBar style="light" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: insets.bottom + 120 }}
      >
{/* STEP 3.02 the photograph
        <DetailHero
          image={PLACE.hero}
          topInset={insets.top}
          saved={saved.includes('bali')}
          onBack={() => router.back()}
          onToggleSave={() => toggle('bali')}
        />
*/}

{/* STEP 3.04 the sheet that overlaps it
        <View style={{ marginTop: -32 }}>
          <DetailSheet
            name={PLACE.name}
            country={PLACE.country}
            rating={PLACE.rating}
            reviews={PLACE.reviews}
            summary={PLACE.summary}
            rest={PLACE.rest}
            more={PLACE.more}
            less={PLACE.less}
            highlights={HIGHLIGHTS}
            expanded={expanded}
            onToggle={() => setExpanded((v) => !v)}
          />
        </View>
*/}

{/* STEP 3.11 room for the tours
        <View style={{ gap: SP.md, marginTop: SP.lg }}>
          <SectionHead title={TOURS_HEAD.title} action={TOURS_HEAD.action} tone="ink" />

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              paddingHorizontal: SP.margin,
              gap: SP.md,
              paddingBottom: SP.sm,
            }}
          >
            {UPCOMING.map((t) => (
              <UpcomingCard
                key={t.key}
                tour={t}
                saved={saved.includes(t.key)}
                onToggleSave={() => toggle(t.key)}
              />
            ))}
          </ScrollView>
        </View>
*/}

{/* STEP 3.15 the local guide
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginHorizontal: SP.margin,
            marginTop: SP.md,
            padding: SP.md,
            borderRadius: R.DEFAULT,
            backgroundColor: tx.surfaceContainer,
            gap: SP.sm,
          }}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: SP.md, flexShrink: 1 }}>
            <View
              style={{
                width: 44,
                height: 44,
                borderRadius: R.full,
                backgroundColor: tx.surfaceContainerLowest,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Symbol name="explore" size={20} color={tx.onSurface} />
            </View>
            <View style={{ flexShrink: 1 }}>
              <Text style={{ ...TYPE.labelMd, color: tx.onSurface }}>{GUIDE.title}</Text>
              <Text numberOfLines={1} style={{ ...TYPE.bodySm, color: tx.onSurfaceVariant }}>
                {GUIDE.blurb}
              </Text>
            </View>
          </View>

          <Symbol name="verified" size={18} color={tx.onSurfaceVariant} />
        </View>
*/}
      </ScrollView>

{/* STEP 3.16 the booking bar
      <View
        style={{
          position: 'absolute',
          left: SP.margin,
          right: SP.margin,
          bottom: insets.bottom + SP.md,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderRadius: R.full,
          backgroundColor: tx.surfaceContainerLowest,
          paddingLeft: SP.lg,
          paddingRight: SP.sm,
          paddingVertical: SP.sm,
          ...ELEV.floating,
          // MISTAKE 3.17 the capsule squared off to a card
          borderRadius: 12,
        }}
      >
        <View>
          <Text style={{ ...TYPE.bodySm, color: tx.onSurfaceVariant }}>{BOOKING.priceLabel}</Text>
          <View style={{ flexDirection: 'row', alignItems: 'baseline', gap: SP.xs }}>
            <Text style={{ ...TYPE.headlineMd, color: tx.onSurface }}>{BOOKING.price}</Text>
            <Text style={{ ...TYPE.bodySm, color: tx.onSurfaceVariant }}>{BOOKING.per}</Text>
          </View>
        </View>

        <Pressable onPress={() => router.push('/travelexa/profile')}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: SP.sm,
              height: 48,
              paddingHorizontal: SP.lg + 4,
              borderRadius: R.full,
              backgroundColor: tx.primary,
            }}
          >
            <Text style={{ ...TYPE.labelLg, color: tx.onPrimary }}>{BOOKING.cta}</Text>
            <Symbol name="arrowForward" size={18} color={tx.onPrimary} />
          </View>
        </Pressable>
      </View>
*/}
    </View>
  );
}
