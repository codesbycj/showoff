import { StatusBar } from 'expo-status-bar';
import { Pressable, View } from 'react-native';

import { Glyph } from '@/features/stakrate/components/glyph';
import { NoteRail } from '@/features/stakrate/components/note-rail';
import { RatingBar } from '@/features/stakrate/components/rating-bar';
import { T } from '@/features/stakrate/components/text';
import { copy, ratings, stock } from '@/features/stakrate/data/ratings';
import {
  BAR_GAP,
  BARS_TOP,
  DISPLAY_TOP,
  HEADER_SIZE,
  HEADER_TOP,
  MARGIN,
  NOTES_TOP,
} from '@/features/stakrate/layout';
import { radius, sk, type } from '@/features/stakrate/theme';
import { useInsets } from '@/features/stakrate/use-insets';

/**
 * Stak — analyst ratings.
 *
 * Assembly only: which stock this is, what the desks think, the split three
 * ways, and what they actually wrote.
 *
 * The three bars are sized by their own share, so the picture and the
 * percentages are one fact rather than two. The reference's are not: it prints
 * 65 / 31 / 2 against counts of 29 / 14 / 1, which is 98% of a total it never
 * states.
 */
export default function StakrateScreen() {
  const insets = useInsets();

  const disc = {
    width: HEADER_SIZE,
    height: HEADER_SIZE,
    borderRadius: radius.control,
    borderWidth: 1.4,
    borderColor: sk.slabEdge,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: sk.canvas,
        paddingTop: insets.top + HEADER_TOP,
        paddingHorizontal: MARGIN,
      }}
    >
      <StatusBar style="light" />

      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Pressable accessibilityRole="button" accessibilityLabel="Go back">
          <View style={disc}>
            <Glyph name="back" size={19} tint={sk.ink} />
          </View>
        </Pressable>
        <View style={{ flex: 1, alignItems: 'center' }}>
          <T variant="name" color={sk.ink} style={{ height: type.name.line }}>
            {stock.name}
          </T>
          <T variant="ticker" color={sk.muted} style={{ height: type.ticker.line }}>
            {stock.ticker}
          </T>
        </View>
        <Pressable accessibilityRole="button" accessibilityLabel="Share">
          <View style={disc}>
            <Glyph name="next" size={18} tint={sk.ink} />
          </View>
        </Pressable>
      </View>

      <View style={{ marginTop: DISPLAY_TOP }}>
        {copy.heading.map((line) => (
          <T key={line} variant="display" color={sk.ink} style={{ height: type.display.line }}>
            {line}
          </T>
        ))}
      </View>

      <View style={{ marginTop: BARS_TOP }}>
        {ratings.map((r, i) => (
          <View key={r.id} style={{ marginTop: i === 0 ? 0 : BAR_GAP }}>
            <RatingBar verdict={r.verdict} share={r.share} count={r.count} tone={r.tone} />
          </View>
        ))}
      </View>

      <View style={{ flex: 1, marginTop: NOTES_TOP }}>
        <NoteRail />
      </View>
    </View>
  );
}
