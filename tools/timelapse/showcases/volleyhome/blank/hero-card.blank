import { useId } from 'react';
import { Image, Pressable, View } from 'react-native';
import Svg, { Defs, LinearGradient, Rect, Stop } from 'react-native-svg';

import { avatar1, avatar2, avatar3, avatar4, copy, hero } from '../data/start';
import { DATE_W, HERO_HEIGHT, HERO_PAD, HERO_TOP } from '../layout';
import { radius, type, vl } from '../theme';
import { Arrow, Clock, Pin } from './glyphs';
import { T } from './text';

/** The four faces of people already in. */
function Stack() {
  const faces = [avatar1, avatar2, avatar3, avatar4];
  return (
    <View style={{ flexDirection: 'row' }}>
      {faces.map((f, i) => (
        <Image
          key={i}
          source={f}
          style={{
            width: 26,
            height: 26,
            marginLeft: i === 0 ? 0 : -9,
            borderRadius: radius.pill,
            borderWidth: 1.5,
            borderColor: vl.onGreen,
          }}
        />
      ))}
    </View>
  );
}

/**
 * The event the app wants you in.
 *
 * **The photograph carries a gradient, not a flat veil.** The type sits along
 * the bottom edge and the chips along the top; a tint over the whole frame
 * would dull the court in the middle, which is the part worth showing.
 *
 * The date tile reads `hero.day` and `hero.month`, the same values the event
 * screen's date line is built from — the reference's two screens disagree
 * about when this tournament is.
 */
export function HeroCard({ onJoin }: { onJoin?: () => void }) {
  const scrim = useId();

  return (
    <View
      style={{
        height: HERO_HEIGHT,
        marginTop: HERO_TOP,
        borderRadius: radius.hero,
        overflow: 'hidden',
        padding: HERO_PAD,
        justifyContent: 'space-between',
      }}
    >
{/* STEP 1.07 the court
      <Image
        source={hero.photo}
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

{/* STEP 1.08 something to read on it
      <Svg
        style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
        width="100%"
        height="100%"
      >
        <Defs>
          <LinearGradient id={scrim} x1="0" y1="0" x2="0" y2="1">
            <Stop offset="0" stopColor={vl.scrim} stopOpacity="0.45" />
            <Stop offset="0.45" stopColor={vl.scrim} stopOpacity="0.25" />
            <Stop offset="1" stopColor={vl.scrim} stopOpacity="0.88" />
          </LinearGradient>
        </Defs>
        <Rect x="0" y="0" width="100%" height="100%" fill={`url(#${scrim})`} />
      </Svg>
*/}

{/* STEP 1.09 the level and the date
      <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
        <View
          style={{
            paddingHorizontal: 12,
            paddingVertical: 6,
            borderRadius: radius.pill,
            backgroundColor: vl.onGreen,
          }}
        >
          <T variant="chip" color={vl.green} style={{ height: type.chip.line }}>
            {copy.level}
          </T>
        </View>

        <View style={{ flex: 1 }} />

        <View
          style={{
            width: DATE_W,
            borderRadius: radius.card - 4,
            backgroundColor: '#FFFFFF2E',
            alignItems: 'center',
            paddingVertical: 6,
          }}
        >
          <T variant="dateNum" color={vl.onGreen} style={{ height: type.dateNum.line }}>
            {String(hero.day)}
          </T>
          <T variant="dateMon" color={vl.onGreenDim} style={{ height: type.dateMon.line }}>
            {hero.month}
          </T>
        </View>
      </View>
*/}

      <View>
{/* STEP 1.10 what it is
        <T variant="heroTitle" color={vl.onGreen} style={{ height: type.heroTitle.line }}>
          {hero.title}
        </T>
*/}

        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 2 }}>
          <Pin size={13} tint={vl.onGreenDim} />
          <T
            variant="heroMeta"
            color={vl.onGreenDim}
            style={{ marginLeft: 5, height: type.heroMeta.line }}
          >
            {hero.place}
          </T>
          <View style={{ width: 12 }} />
          <Clock size={13} tint={vl.onGreenDim} />
          <T
            variant="heroMeta"
            color={vl.onGreenDim}
            style={{ marginLeft: 5, height: type.heroMeta.line }}
          >
            {hero.time}
          </T>
        </View>

{/* STEP 1.11 who is in, and the way in
        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 10 }}>
          <Stack />
          <T
            variant="joined"
            color={vl.onGreen}
            style={{ marginLeft: 10, height: type.joined.line }}
          >
            {`${hero.joined}/${hero.capacity}${copy.joined}`}
          </T>

          <View style={{ flex: 1 }} />

          <Pressable
            onPress={onJoin}
            accessibilityRole="button"
            accessibilityLabel={`${copy.joinNow}: ${hero.title}`}
            style={({ pressed }) => ({ opacity: pressed ? 0.88 : 1 })}
          >
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                paddingHorizontal: 16,
                paddingVertical: 10,
                borderRadius: radius.pill,
                backgroundColor: vl.gold,
              }}
            >
              <T variant="joinBtn" color={vl.onGold} style={{ height: type.joinBtn.line }}>
                {copy.joinNow}
              </T>
              <View style={{ marginLeft: 6 }}>
                <Arrow size={13} tint={vl.onGold} />
              </View>
            </View>
          </Pressable>
        </View>
*/}
      </View>
    </View>
  );
}
