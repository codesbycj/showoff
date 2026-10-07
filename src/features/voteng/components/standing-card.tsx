import { Image } from 'expo-image';
import { User } from 'lucide-react-native';
import { useEffect } from 'react';
import { Pressable, Text, View } from 'react-native';
import Animated, {
  Easing,
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withTiming,
} from 'react-native-reanimated';

import type { Standing } from '../data/results';
import { FONT, PARTY, R, SP, vt } from '../theme';

const FILL_MS = 1200;
const STAGGER_MS = 100;
/** The tally track is fixed, not full width — see the note in the data file. */
const TRACK = 110;

/**
 * One party's standing on the results screen.
 *
 * This is not the home screen's `TallyCard` with different props. It leads with
 * the party rather than the person, carries the party emblem as a third mark
 * beside the rank and the face, sets the tally on a fixed 110dp track instead of
 * the card's full width, and greens the leader's percentage instead of the
 * leader's rank badge. Four differences in a five-element row is a different
 * component, and collapsing them into one would have meant a prop per
 * difference.
 *
 * The Others row is the same card with its face and emblem missing, so those
 * two are optional rather than a second variant.
 */
export function StandingCard({
  standing,
  index = 0,
  onPress,
}: {
  standing: Standing;
  index?: number;
  onPress?: () => void;
}) {
  const grow = useSharedValue(0);
  const lead = standing.rank === 1;

  useEffect(() => {
    grow.value = withDelay(
      index * STAGGER_MS,
      withTiming(1, { duration: FILL_MS, easing: Easing.bezier(0.16, 1, 0.3, 1) }),
    );
  }, [grow, index]);

  const fill = useAnimatedStyle(() => ({ width: `${grow.value * standing.bar}%` }));

  return (
    <Pressable onPress={onPress}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: vt.card,
          borderRadius: R.md,
          borderWidth: 1,
          borderColor: vt.line,
          paddingVertical: 14,
          paddingLeft: 14,
          paddingRight: SP.md + 4,
          shadowColor: '#000000',
          shadowOpacity: 0.05,
          shadowRadius: 8,
          shadowOffset: { width: 0, height: 2 },
          elevation: 1,
        }}
      >
        <View
          style={{
            width: 24,
            height: 24,
            borderRadius: R.full,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: lead ? vt.primaryInk : '#EDF2F4',
          }}
        >
          <Text
            style={{
              fontFamily: FONT.bold,
              fontSize: 12,
              lineHeight: 15,
              color: lead ? vt.card : '#334155',
            }}
          >
            {standing.rank}
          </Text>
        </View>

        <View
          style={{
            width: 44,
            height: 44,
            marginLeft: 10,
            borderRadius: R.full,
            overflow: 'hidden',
            borderWidth: 2,
            borderColor: vt.line,
            backgroundColor: '#E2E8F0',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {standing.photo ? (
            <Image
              source={standing.photo}
              style={{ width: '100%', height: '100%' }}
              contentFit="cover"
            />
          ) : (
            <User size={24} color={vt.faint} fill={vt.faint} strokeWidth={0} />
          )}
        </View>

        {standing.emblem ? (
          <View
            style={{
              width: 32,
              height: 32,
              marginLeft: 10,
              borderRadius: R.sm + 2,
              overflow: 'hidden',
              borderWidth: 1,
              borderColor: vt.lineStrong,
              backgroundColor: vt.card,
              padding: 2,
            }}
          >
            <Image source={standing.emblem} style={{ flex: 1 }} contentFit="contain" />
          </View>
        ) : null}

        <View style={{ flex: 1, marginLeft: 10 }}>
          <Text
            style={{
              fontFamily: FONT.black,
              fontSize: 14,
              lineHeight: 16,
              letterSpacing: -0.35,
              color: vt.ink,
            }}
          >
            {standing.party === 'OTH' ? 'Others' : standing.party}
          </Text>
          {standing.name ? (
            <Text
              numberOfLines={1}
              style={{
                marginTop: 2,
                fontFamily: FONT.medium,
                fontSize: 12,
                lineHeight: 16,
                color: vt.body,
              }}
            >
              {standing.name}
            </Text>
          ) : null}

          <View
            style={{
              width: TRACK,
              height: 6,
              marginTop: 6,
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
                  backgroundColor: PARTY[standing.party].barAlt,
                },
                fill,
              ]}
            />
          </View>
        </View>

        <View style={{ alignItems: 'flex-end', marginLeft: SP.xs }}>
          <Text
            style={{
              fontFamily: FONT.bold,
              fontSize: 17,
              lineHeight: 22,
              color: lead ? PARTY.LP.barAlt : vt.ink,
            }}
          >
            {standing.pct}
          </Text>
          <Text
            style={{
              marginTop: 4,
              fontFamily: FONT.data,
              fontSize: 11,
              lineHeight: 14,
              color: vt.faint,
            }}
          >
            {standing.votes}
          </Text>
        </View>
      </View>
    </Pressable>
  );
}
