import { Image } from 'expo-image';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useId } from 'react';
import { Pressable, ScrollView, View, useWindowDimensions } from 'react-native';
import Svg, { Circle, Defs, LinearGradient, Path, Polygon, Rect, Stop } from 'react-native-svg';

// STEP 1.01 import text
// import { T } from '@/features/stridprofile/components/text';
import { badges, copy, photo, stats } from '@/features/stridprofile/data/profile';
import { ct, radius, type } from '@/features/stridprofile/theme';
import { useInsets } from '@/features/stridprofile/use-insets';

const MARGIN = 20;

function Glyph({
  name,
  size = 20,
  tint = ct.onPage,
}: {
  name: 'back' | 'kebab' | 'share' | 'addPerson' | 'smile' | 'tick';
  size?: number;
  tint?: string;
}) {
  const s = {
    stroke: tint,
    strokeWidth: 1.9,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    fill: 'none',
  };
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      {name === 'back' && <Path {...s} strokeWidth={2.2} d="m14.2 5.6-6.4 6.4 6.4 6.4" />}
      {name === 'kebab' && (
        <>
          <Circle cx="5.6" cy="12" r="1.8" fill={tint} />
          <Circle cx="12" cy="12" r="1.8" fill={tint} />
          <Circle cx="18.4" cy="12" r="1.8" fill={tint} />
        </>
      )}
      {name === 'share' && (
        <>
          <Path {...s} d="M4.6 18.4c1.4-6.4 6-9 12.6-9" />
          <Path {...s} d="M13.6 5.4 19.6 9.4l-6 4" />
        </>
      )}
      {name === 'addPerson' && (
        <>
          <Circle {...s} cx="10" cy="8.6" r="3.4" />
          <Path {...s} d="M3.8 19.4a6.2 6.2 0 0 1 12.4 0" />
          <Path {...s} d="M18 6.4v5.2M15.4 9h5.2" />
        </>
      )}
      {name === 'smile' && (
        <>
          <Circle {...s} cx="12" cy="12" r="8.4" />
          <Path {...s} d="M8.8 14.2c1.8 1.8 4.6 1.8 6.4 0" />
          <Circle cx="9.4" cy="10" r="1.2" fill={tint} />
          <Circle cx="14.6" cy="10" r="1.2" fill={tint} />
        </>
      )}
      {name === 'tick' && (
        <>
          <Circle cx="12" cy="12" r="9" fill={tint} />
          <Path
            d="m8 12.2 2.8 2.8 5.4-5.6"
            stroke={ct.page}
            strokeWidth={2.2}
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </>
      )}
    </Svg>
  );
}

/** One hexagonal badge. Locked ones are an outline with no number. */
function Badge({
  num,
  tone,
  size,
}: {
  num: string;
  tone: 'silver' | 'bronze' | 'locked';
  size: number;
}) {
  const id = useId();
  const fill = `stridBadge-${id}-${tone}`;
  const points = Array.from({ length: 6 })
    .map((_, i) => {
      const a = (Math.PI / 180) * (60 * i - 90);
      return `${(50 + 46 * Math.cos(a)).toFixed(1)},${(50 + 46 * Math.sin(a)).toFixed(1)}`;
    })
    .join(' ');

  const stops =
    tone === 'silver'
      ? ['#DCEAF8', '#8FA9C4']
      : tone === 'bronze'
        ? ['#F3C49A', '#C8824F']
        : ['#2A2A30', '#1C1C21'];

  return (
    <Svg width={size} height={size} viewBox="0 0 100 100">
      <Defs>
        <LinearGradient id={fill} x1="0" y1="0" x2="0.6" y2="1">
          <Stop offset="0" stopColor={stops[0]} />
          <Stop offset="1" stopColor={stops[1]} />
        </LinearGradient>
      </Defs>
      <Polygon
        points={points}
        fill={`url(#${fill})`}
        stroke={tone === 'locked' ? '#34343B' : 'rgba(255,255,255,0.4)'}
        strokeWidth={2}
      />
    </Svg>
  );
}

/**
 * Strid — a profile.
 *
 * Assembly only: the photograph, who it is, the numbers, the three things
 * you can do, and the badges.
 *
 * The hero is a fixed share of the window and the badge card takes what is
 * left, so the "Compare" row sits on the safe area at any phone height.
 */
export default function StridprofileScreen() {
  const insets = useInsets();
  const { width, height } = useWindowDimensions();
  // 0.47 of the window left the badge card 132dp, which clipped both the
  // badge numbers and the award sentence. The photograph gives the space back.
  const heroH = Math.round(height * 0.39);
  const badgeSize = Math.min(80, Math.floor((width - MARGIN * 2 - 40) / 3.6));

  return (
    <View style={{ flex: 1, backgroundColor: ct.page }}>
      <StatusBar style="light" />

      {/* STEP 1.02 "Back"
      <View style={{ height: heroH }}>
        <Image
          source={photo}
          style={{ position: 'absolute', width: '100%', height: heroH }}
          contentFit="cover"
        />
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: insets.top + 6,
            marginHorizontal: MARGIN,
          }}
        >
          <Pressable
            accessibilityRole="button"
            accessibilityLabel="Back"
            onPress={() => router.back()}
          >
            <View
              style={{
                width: 44,
                height: 44,
                borderRadius: radius.disc,
                backgroundColor: 'rgba(16,16,20,0.46)',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Glyph name="back" size={19} />
            </View>
          </Pressable>
          <View style={{ flex: 1 }} />
          <Pressable accessibilityRole="button" accessibilityLabel="More">
            <View
              style={{
                width: 44,
                height: 44,
                borderRadius: radius.disc,
                backgroundColor: 'rgba(16,16,20,0.46)',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Glyph name="kebab" size={19} />
            </View>
          </Pressable>
        </View>
      </View>
      */}

      <View style={{ flex: 1, paddingHorizontal: MARGIN, paddingBottom: insets.bottom + 10 }}>
        {/* STEP 1.03 name
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 16,
          }}
        >
          <Glyph name="tick" size={19} tint={ct.white} />
          <T variant="name" color={ct.onPage} style={{ height: type.name.line, marginLeft: 7 }}>
            {copy.name}
          </T>
        </View>
        */}
        {/* STEP 1.04 handle
        <T
          variant="handle"
          color={ct.faint}
          style={{ height: type.handle.line, textAlign: 'center', marginTop: 2 }}
        >
          {copy.handle}
        </T>
        */}

        {/* STEP 1.05 label
        <View style={{ flexDirection: 'row', marginTop: 18 }}>
          {stats.map((st) => (
            <View key={st.id} style={{ flex: 1, alignItems: 'center' }}>
              <T variant="statLabel" color={ct.faint} style={{ height: type.statLabel.line }}>
                {st.label}
              </T>
              <T
                variant="statValue"
                color={ct.onPage}
                style={{ height: type.statValue.line, marginTop: 2 }}
              >
                {st.value}
              </T>
            </View>
          ))}
        </View>
        */}

        {/* STEP 1.06 "Share this profile"
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            marginTop: 18,
          }}
        >
          <Pressable accessibilityRole="button" accessibilityLabel="Share this profile">
            <View
              style={{
                width: 50,
                height: 50,
                borderRadius: 25,
                backgroundColor: ct.card,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Glyph name="share" size={20} />
            </View>
          </Pressable>

          <Pressable
            accessibilityRole="button"
            accessibilityLabel={copy.follow}
            style={{ marginHorizontal: 14 }}
          >
            {({ pressed }) => (
              <View
                style={{
                  height: 52,
                  paddingHorizontal: 34,
                  borderRadius: radius.pill,
                  backgroundColor: ct.white,
                  flexDirection: 'row',
                  alignItems: 'center',
                  opacity: pressed ? 0.9 : 1,
                }}
              >
                <Glyph name="addPerson" size={18} tint={ct.page} />
                <T
                  variant="follow"
                  color={ct.page}
                  style={{ height: type.follow.line, marginLeft: 8 }}
                >
                  {copy.follow}
                </T>
              </View>
            )}
          </Pressable>

          <Pressable accessibilityRole="button" accessibilityLabel="React">
            <View
              style={{
                width: 50,
                height: 50,
                borderRadius: 25,
                backgroundColor: ct.card,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Glyph name="smile" size={20} />
            </View>
          </Pressable>
        </View>
        */}

        {/* STEP 1.07 num
        <View
          style={{
            flex: 1,
            marginTop: 18,
            borderRadius: radius.card,
            backgroundColor: ct.card,
            paddingVertical: 16,
            justifyContent: 'center',
            overflow: 'hidden',
          }}
        >
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            style={{ flexGrow: 0 }}
            contentContainerStyle={{ alignItems: 'center', paddingHorizontal: 14 }}
          >
            {badges.map((b) => (
              <View
                key={b.id}
                style={{
                  marginHorizontal: 4,
                  alignItems: 'center',
                  justifyContent: 'center',
                  opacity: b.on ? 1 : 0.9,
                  transform: [{ scale: b.on ? 1.08 : 0.92 }],
                }}
              >
                <Badge num={b.num} tone={b.tone} size={badgeSize} />
                {b.num ? (
                  <View style={{ position: 'absolute' }}>
                    <T
                      variant="badgeNum"
                      color={b.tone === 'locked' ? ct.faint : '#2A2A30'}
                      style={{ height: type.badgeNum.line }}
                    >
                      {b.num}
                    </T>
                  </View>
                ) : null}
              </View>
            ))}
          </ScrollView>

          <T
            variant="award"
            color={ct.copper}
            style={{ height: type.award.line, textAlign: 'center', marginTop: 14 }}
          >
            {copy.award}
          </T>
          <T
            variant="awardBody"
            color={ct.faint}
            style={{ textAlign: 'center', marginTop: 4, paddingHorizontal: 30 }}
          >
            {copy.awardBody}
          </T>
        </View>
        */}

        {/* STEP 1.08 compare
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            marginTop: 12,
            height: 50,
            borderRadius: 16,
            backgroundColor: ct.card,
            paddingHorizontal: 18,
          }}
        >
          <T variant="compare" color={ct.dim} style={{ flex: 1, height: type.compare.line }}>
            {copy.compare}
          </T>
          <T variant="compare" color={ct.onPage} style={{ height: type.compare.line }}>
            {copy.rate}
          </T>
        </View>
        */}
        {/* STEP 1.09 a stray gap under it | FIX 1.10 take the gap back out
        <View style={{ height: 23 }} />
        */}
      </View>
    </View>
  );
}
