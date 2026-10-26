import { useId } from 'react';
import { Image, Pressable, View, useWindowDimensions } from 'react-native';
import Svg, { Defs, LinearGradient, Path, Rect, Stop } from 'react-native-svg';

import { copy, dateLine, event, hero, totalXp } from '../data/start';
import { CLOSE_DISC, HERO_PAD, HERO_SHARE, MARGIN } from '../layout';
import { radius, type, vl } from '../theme';
import { Calendar, Clock, Pin, Trophy } from './glyphs';
import { T } from './text';

/**
 * The court, and what is happening on it.
 *
 * **The reward badge reads `totalXp`**, which is the sum of the four badges
 * further down the screen. The reference promises 150 XP over rewards worth
 * 130 — a headline the page itself contradicts two scrolls later.
 *
 * The hero's height is a share of the window rather than a number, so it
 * holds its proportion on a short phone and a tall one.
 */
export function EventHero({ top, onClose }: { top: number; onClose?: () => void }) {
  const scrim = useId();
  const win = useWindowDimensions();
  const h = win.height * HERO_SHARE + top;

  return (
    <View style={{ height: h, paddingTop: top, justifyContent: 'flex-end' }}>
{/* STEP 1.03 the frame
      <Image
        source={hero}
        resizeMode="cover"
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          width: '100%',
          height: '100%',
        }}
      />
*/}

{/* STEP 1.04 something to read on it
      <Svg
        style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
        width="100%"
        height="100%"
      >
        <Defs>
          <LinearGradient id={scrim} x1="0" y1="0" x2="0" y2="1">
            <Stop offset="0" stopColor={vl.scrim} stopOpacity="0.4" />
            <Stop offset="0.4" stopColor={vl.scrim} stopOpacity="0.2" />
            <Stop offset="1" stopColor={vl.scrim} stopOpacity="0.92" />
          </LinearGradient>
        </Defs>
        <Rect x="0" y="0" width="100%" height="100%" fill={`url(#${scrim})`} />
      </Svg>
*/}

{/* STEP 1.05 a way out
      <View style={{ position: 'absolute', top: top + 4, right: MARGIN }}>
        <Pressable onPress={onClose} accessibilityRole="button" accessibilityLabel="Close">
          <View
            style={{
              width: CLOSE_DISC,
              height: CLOSE_DISC,
              borderRadius: radius.pill,
              backgroundColor: '#FFFFFF2E',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Svg width={16} height={16} viewBox="0 0 24 24">
              <Path
                d="M6.4 6.4 17.6 17.6M17.6 6.4 6.4 17.6"
                stroke={vl.onGreen}
                strokeWidth={2.2}
                strokeLinecap="round"
              />
            </Svg>
          </View>
        </Pressable>
      </View>
*/}

      <View style={{ paddingHorizontal: MARGIN, paddingBottom: HERO_PAD }}>
{/* STEP 1.06 what kind of event
        <View style={{ flexDirection: 'row' }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              paddingHorizontal: 12,
              paddingVertical: 6,
              borderRadius: radius.pill,
              backgroundColor: vl.lime,
            }}
          >
            <Trophy size={13} tint={vl.limeInk} />
            <T variant="chip" color={vl.limeInk} style={{ marginLeft: 6, height: type.chip.line }}>
              {copy.kindChip}
            </T>
          </View>

          <View
            style={{
              marginLeft: 8,
              paddingHorizontal: 12,
              paddingVertical: 6,
              borderRadius: radius.pill,
              borderWidth: 1,
              borderColor: '#FFFFFF8A',
            }}
          >
            <T variant="chip" color={vl.onGreen} style={{ height: type.chip.line }}>
              {copy.levelChip}
            </T>
          </View>
        </View>
*/}

        <View style={{ flexDirection: 'row', alignItems: 'flex-end', marginTop: 10 }}>
{/* STEP 1.07 what and when
          <View style={{ flex: 1 }}>
            <T variant="heroTitle" color={vl.onGreen} style={{ height: type.heroTitle.line }}>
              {event.title}
            </T>

            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 4 }}>
              <Pin size={12} tint={vl.onGreenDim} />
              <T variant="heroMeta" color={vl.onGreenDim} style={{ marginLeft: 4 }}>
                {event.place}
              </T>
              <View style={{ width: 10 }} />
              <Clock size={12} tint={vl.onGreenDim} />
              <T variant="heroMeta" color={vl.onGreenDim} style={{ marginLeft: 4 }}>
                {event.time}
              </T>
            </View>

            <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 2 }}>
              <Calendar size={12} tint={vl.onGreenDim} />
              <T variant="heroMeta" color={vl.onGreenDim} style={{ marginLeft: 4 }}>
                {dateLine}
              </T>
            </View>
          </View>
*/}

{/* STEP 1.08 and what it pays
          <View
            style={{
              paddingHorizontal: 12,
              paddingVertical: 8,
              borderRadius: radius.card - 4,
              backgroundColor: vl.lime,
              alignItems: 'center',
            }}
          >
            <T variant="reward" color={vl.limeInk} style={{ height: type.reward.line }}>
              {copy.rewardLabel}
            </T>
            <T variant="rewardXp" color={vl.limeInk} style={{ height: type.rewardXp.line }}>
              {`+${totalXp} XP`}
            </T>
          </View>
*/}
        </View>
      </View>
    </View>
  );
}
