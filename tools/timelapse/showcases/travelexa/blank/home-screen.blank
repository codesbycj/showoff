import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { ScrollView, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// STEP 1.06 import the region rail
// import { ChipRail } from '@/features/travelexa/components/chip-rail';
// STEP 1.22 import the dock
// import { Dock } from '@/features/travelexa/components/dock';
// STEP 1.01 import the greeting
// import { GreetingHeader } from '@/features/travelexa/components/greeting-header';
// STEP 1.13 import the hero card
// import { HeroCard } from '@/features/travelexa/components/hero-card';
// STEP 1.03 import the search row
// import { SearchRow } from '@/features/travelexa/components/search-row';
// STEP 1.05 import the section head
// import { SectionHead } from '@/features/travelexa/components/section-head';
// STEP 1.17 import the tour card
// import { TourCard } from '@/features/travelexa/components/tour-card';
import {
  GREETING,
  HERO,
  NAV,
  REGIONS,
  SEARCH,
  SECTIONS,
  TOURS,
} from '@/features/travelexa/data/home';
import { SP, travelexaTheme, tx } from '@/features/travelexa/theme';

/**
 * Screen 1 — home / explore.
 *
 * The export reserves 64dp at the top for a fixed header that is empty on every
 * screen but the detail view. That is rebuilt as the safe-area inset rather
 * than a spacer, which keeps the greeting clear of the real status bar.
 *
 * Saved state lives here rather than in the cards, so the hero and the carousel
 * read from one place — tapping the heart on the Bali hero and on the Bali
 * treehouse tour are different saves, which is why the set is keyed.
 */
export default function TravelexaHome() {
  const insets = useSafeAreaInsets();
  const [region, setRegion] = useState<string>('asia');
  const [saved, setSaved] = useState<readonly string[]>([]);

  const toggle = (key: string) =>
    setSaved((s) => (s.includes(key) ? s.filter((k) => k !== key) : [...s, key]));

  return (
    <View style={[travelexaTheme, { flex: 1, backgroundColor: tx.surface }]}>
      <StatusBar style="dark" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingTop: insets.top,
          paddingBottom: insets.bottom + 112,
          gap: SP.lg,
        }}
      >
{/* STEP 1.02 say hello
        <GreetingHeader
          hello={GREETING.hello}
          welcome={GREETING.welcome}
          avatar={GREETING.avatar}
        />
*/}

{/* STEP 1.04 somewhere to search
        <SearchRow placeholder={SEARCH.placeholder} />
*/}

{/* STEP 1.07 room for the regions
        <View style={{ gap: SP.sm }}>
          <SectionHead title={SECTIONS.regions} />
          <View style={{ paddingHorizontal: SP.margin }}>
            <ChipRail items={REGIONS} selected={region} onSelect={setRegion} />
          </View>
        </View>
*/}

{/* STEP 1.14 the headline destination | FIX 1.16 drop the copy with the labels swapped
        <HeroCard badge={HERO.badge}
          country={HERO.name}
          tagline={HERO.tagline}
          name={HERO.country}
          rating={HERO.rating}
          reviews={HERO.reviews}
          cta={HERO.cta}
          price={HERO.price}
          image={HERO.image}
          saved={saved.includes('hero')}
          onToggleSave={() => toggle('hero')}
          onPress={() => router.push('/travelexa/destination')}
        />
*/}

{/* STEP 1.15 the same card with the country as the kicker
        <HeroCard
          badge={HERO.badge}
          country={HERO.country}
          tagline={HERO.tagline}
          name={HERO.name}
          rating={HERO.rating}
          reviews={HERO.reviews}
          cta={HERO.cta}
          price={HERO.price}
          image={HERO.image}
          saved={saved.includes('hero')}
          onToggleSave={() => toggle('hero')}
          onPress={() => router.push('/travelexa/destination')}
        />
*/}

{/* STEP 1.18 room for the experiences
        <View style={{ gap: SP.md }}>
          <SectionHead
            title={SECTIONS.popular}
            subtitle={SECTIONS.popularSub}
            action={SECTIONS.seeAll}
            onAction={() => router.push('/travelexa/discover')}
          />

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              paddingHorizontal: SP.margin,
              gap: SP.md,
              paddingBottom: SP.sm,
            }}
          >
            {TOURS.map((t) => (
              <TourCard
                key={t.key}
                tour={t}
                saved={saved.includes(t.key)}
                onToggleSave={() => toggle(t.key)}
                onPress={() => router.push('/travelexa/destination')}
              />
            ))}
          </ScrollView>
        </View>
*/}
      </ScrollView>

{/* STEP 1.23 pin the dock
      <Dock
        items={NAV}
        active="home"
        inset={insets.bottom}
        onSelect={(item) => {
          if (item.key !== 'home') router.push(item.route as never);
        }}
      />
*/}
    </View>
  );
}
