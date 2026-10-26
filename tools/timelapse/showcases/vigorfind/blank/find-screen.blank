import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { View } from 'react-native';

// STEP 1.21 and the articles
// import { ArticleRail } from '@/features/vigorfind/components/article-rail';
// STEP 1.15 which part of it
// import { FilterChips } from '@/features/vigorfind/components/filter-chips';
// STEP 1.06 what the app offers
// import { Headline } from '@/features/vigorfind/components/headline';
// STEP 1.10 a way to search it
// import { SearchLine } from '@/features/vigorfind/components/search-line';
// STEP 1.01 who is here
// import { TopBar } from '@/features/vigorfind/components/top-bar';
import { MARGIN } from '@/features/vigorfind/layout';
import { vg } from '@/features/vigorfind/theme';
import { useInsets } from '@/features/vigorfind/use-insets';

/**
 * Vigor — find a programme.
 *
 * Assembly only: who is here, what the app offers, a way to search it, which
 * part of the catalogue, and the articles themselves.
 *
 * The page is full-bleed blue, so the background is on the outer View and
 * only the horizontal padding is on the content — the two rails bleed back
 * out past it on purpose, so a card is clipped by the right edge rather than
 * stopping neatly inside it.
 */
export default function VigorfindScreen() {
  const insets = useInsets();
  const [picked, setPicked] = useState('prep');

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: vg.blue,
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
        paddingHorizontal: MARGIN,
      }}
    >
      <StatusBar style="light" />

{/* STEP 1.02 at the top
      <TopBar />
*/}

{/* STEP 1.07 the headline
      <Headline />
*/}

{/* STEP 1.11 a search line
      <SearchLine onPress={() => router.push('/vigorplan')} />
*/}

{/* STEP 1.16 a rail of chips
      <FilterChips picked={picked} onPick={setPicked} />
*/}

{/* STEP 1.22 and a rail of cards
      <ArticleRail onPress={() => router.push('/vigorplan')} />
*/}
    </View>
  );
}
