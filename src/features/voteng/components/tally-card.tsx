import { Image } from 'expo-image';
import { useEffect } from 'react';
import { Pressable, Text, View } from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated';

import type { Candidate } from '../data/home';
import { FONT, PARTY, R, SP, vt } from '../theme';

/** The fill's own run, and how far each card lags the one above it. */
const FILL_MS = 1200;
const STAGGER_MS = 100;

/**
 * One candidate's standing on home: rank, face, name, share, and the tally bar
 * beneath.
 *
 * The bar grows from zero on mount, staggered down the list, which is the
 * export's own behaviour and the thing that makes four near-identical rows read
 * as a live feed rather than a table. `index` is what sets the lag, so the
 * screen decides the order and the card only honours it.
 *
 * Note the card is padded and the bar is full-bleed *within* that padding — it
 * spans the card's inner width, not the text column's. Matching the text column
 * would put the bar's right end under the percentage, which is not what the
 * reference draws.
 */
export function TallyCard({
  candidate,
  index = 0,
  onPress,
}: {
  candidate: Candidate;
  index?: number;
  onPress?: () => void;
}) {
  const grow = useSharedValue(0);
  const lead = candidate.rank === 1;

  useEffect(() => {
    grow.value = withDelay(
      index * STAGGER_MS,
      withTiming(1, { duration: FILL_MS, easing: Easing.bezier(0.16, 1, 0.3, 1) }),
    );
  }, [grow, index]);

  const fill = useAnimatedStyle(() => ({ width: `${grow.value * candidate.share}%` }));

  return (
    <Pressable onPress={onPress}>
      <View
        style={{
          backgroundColor: vt.card,
          borderRadius: R.md,
          padding: SP.md,
          borderWidth: 1,
          borderColor: vt.line,
          shadowColor: '#000000',
          shadowOpacity: 0.04,
          shadowRadius: 8,
          shadowOffset: { width: 0, height: 2 },
          elevation: 1,
        }}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View
            style={{
              width: 24,
              height: 24,
              borderRadius: R.full,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: lead ? vt.primary : vt.line,
              borderWidth: lead ? 0 : 1,
              borderColor: vt.lineStrong,
            }}
          >
            <Text
              style={{
                fontFamily: FONT.bold,
                fontSize: 11,
                lineHeight: 14,
                color: lead ? vt.card : vt.body,
              }}
            >
              {candidate.rank}
            </Text>
          </View>

          <View
            style={{
              width: 44,
              height: 44,
              borderRadius: R.full,
              marginLeft: SP.md,
              overflow: 'hidden',
              borderWidth: 1,
              borderColor: vt.lineStrong,
              backgroundColor: vt.line,
            }}
          >
            <Image
              source={candidate.photo}
              style={{ width: '100%', height: '100%' }}
              contentFit="cover"
            />
          </View>

          <View style={{ flex: 1, marginLeft: SP.md }}>
            <Text style={{ fontFamily: FONT.bold, fontSize: 12, lineHeight: 15, color: vt.ink }}>
              {candidate.name}
            </Text>
            <Text
              numberOfLines={1}
              style={{
                marginTop: 2,
                fontFamily: FONT.medium,
                fontSize: 10,
                lineHeight: 14,
                color: vt.muted,
              }}
            >
              {candidate.affiliation}
            </Text>
          </View>

          <View style={{ alignItems: 'flex-end', marginLeft: SP.sm }}>
            <Text style={{ fontFamily: FONT.black, fontSize: 14, lineHeight: 18, color: vt.ink }}>
              {candidate.pct}
            </Text>
            <Text
              style={{
                marginTop: 1,
                fontFamily: FONT.data,
                fontSize: 9.5,
                lineHeight: 13,
                color: vt.faint,
              }}
            >
              {candidate.votes}
            </Text>
          </View>
        </View>

        <View
          style={{
            height: 6,
            marginTop: SP.sm,
            borderRadius: R.full,
            backgroundColor: vt.line,
            overflow: 'hidden',
          }}
        >
          <Animated.View
            style={[
              {
                height: '100%',
                borderRadius: R.full,
                backgroundColor: PARTY[candidate.party].bar,
              },
              fill,
            ]}
          />
        </View>
      </View>
    </Pressable>
  );
}
