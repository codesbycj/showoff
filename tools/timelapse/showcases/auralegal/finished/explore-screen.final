import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { ScrollView, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import { AmbientGlow } from '@/features/auralegal/components/ambient-glow';
import { BriefingBanner } from '@/features/auralegal/components/briefing-banner';
import { CategoryChips } from '@/features/auralegal/components/category-chips';
import { Dock } from '@/features/auralegal/components/dock';
import { ExpertRow } from '@/features/auralegal/components/expert-row';
import { FeedHeader } from '@/features/auralegal/components/feed-header';
import { HeroDeck } from '@/features/auralegal/components/hero-deck';
import { SectionHead } from '@/features/auralegal/components/section-head';
import { StatsTray } from '@/features/auralegal/components/stats-tray';
import {
  BRIEFING,
  CATEGORIES,
  DECK,
  DOCK,
  EXPERTS,
  FEED,
  HERO,
  STATS,
} from '@/features/auralegal/data/explore';
import { SP, al, auralegalTheme } from '@/features/auralegal/theme';

/** The feed's content width inside the 20dp gutter, at the reference 393dp. */
const CONTENT = 393 - SP.margin * 2;

/**
 * Screen 2 — the discovery feed.
 *
 * The export reserves 64dp at the top for a fixed header that is empty on this
 * screen — it carries only a blur and a hairline shadow, no content. That is
 * rebuilt as the safe-area inset rather than a spacer: on the reference device
 * the inset is 59dp, which puts the eyebrow within a few dp of where the export
 * draws it, and it keeps the feed clear of the real status bar.
 *
 * Every destination is wired here. The hero card and both expert rows open the
 * profile; the briefing banner jumps straight to booking.
 */
export default function AuralegalExplore() {
  const insets = useSafeAreaInsets();
  const [category, setCategory] = useState<string>('family');

  return (
    <View style={[auralegalTheme, { flex: 1, backgroundColor: al.surface }]}>
      <StatusBar style="light" />

      <AmbientGlow color={al.secondary} size={400} opacity={0.1} top={-130} left={-130} />
      <AmbientGlow color={al.primaryContainer} size={460} opacity={0.1} top={280} right={-150} />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingTop: insets.top + SP.xs,
          paddingHorizontal: SP.margin,
          paddingBottom: insets.bottom + 104,
        }}
      >
        <FeedHeader eyebrow={FEED.eyebrow} title={FEED.title} />

        <CategoryChips categories={CATEGORIES} selected={category} onSelect={setCategory} />

        <HeroDeck
          peeks={DECK}
          hero={HERO}
          width={CONTENT}
          onOpen={() => router.push('/auralegal/profile')}
        />

        <StatsTray stats={STATS} />

        <BriefingBanner
          title={BRIEFING.title}
          subtitle={BRIEFING.subtitle}
          action={BRIEFING.action}
          onPress={() => router.push('/auralegal/booking')}
        />

        <SectionHead
          title={FEED.sectionTitle}
          count={FEED.sectionCount}
          action={FEED.sectionAction}
        />

        <View style={{ gap: 10 }}>
          {EXPERTS.map((e) => (
            <ExpertRow key={e.key} expert={e} onPress={() => router.push('/auralegal/profile')} />
          ))}
        </View>
      </ScrollView>

      <Dock items={DOCK} active="explore" inset={insets.bottom} />
    </View>
  );
}
