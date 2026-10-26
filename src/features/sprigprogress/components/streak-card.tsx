import { Image, View } from 'react-native';
import Svg, { Defs, LinearGradient, Rect, Stop } from 'react-native-svg';
import { useId } from 'react';

import { copy, streakDays, streakPhoto } from '../data/start';
import { STREAK_MIN, STREAK_PAD, STREAK_TOP } from '../layout';
import { radius, sg, type } from '../theme';
import { T } from './text';

/**
 * The run of days kept.
 *
 * **The card is a photograph** — food is a picture *of* something, and this
 * is the one block on the screen whose job is to look appetising rather than
 * to report a number.
 *
 * The type sits on a gradient rather than straight on the frame. A dark
 * photograph is dark *somewhere*; white text over the pale broth in the top
 * left of this one is unreadable without it, and a flat scrim would dull the
 * whole picture.
 *
 * The image is absolutely filled with all four insets given, and the card
 * carries an explicit height. An Image with insets but no size paints
 * nothing at all, silently.
 */
export function StreakCard() {
  const scrim = useId();

  return (
    <View
      style={{
        flex: 1,
        minHeight: STREAK_MIN,
        marginTop: STREAK_TOP,
        borderRadius: radius.photo,
        overflow: 'hidden',
        justifyContent: 'flex-end',
        padding: STREAK_PAD,
      }}
    >
{/* STEP 1.18 the photograph
      <Image
        source={streakPhoto}
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

{/* STEP 1.19 something to read it on
      <Svg
        style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0 }}
        width="100%"
        height="100%"
      >
        <Defs>
          <LinearGradient id={scrim} x1="0" y1="0" x2="1" y2="0">
            <Stop offset="0" stopColor="#000000" stopOpacity="0.62" />
            <Stop offset="0.72" stopColor="#000000" stopOpacity="0" />
          </LinearGradient>
        </Defs>
        <Rect x="0" y="0" width="100%" height="100%" fill={`url(#${scrim})`} />
      </Svg>
*/}

{/* STEP 1.20 and the streak
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <T variant="streakBig" color={sg.onDark} style={{ height: type.streakBig.line }}>
          {String(streakDays)}
        </T>
        <View style={{ marginLeft: 10 }}>
          <T variant="streakLine" color={sg.onDark} style={{ height: type.streakLine.line }}>
            {copy.streakUnit}
          </T>
          <T variant="streakLine" color={sg.onDark} style={{ height: type.streakLine.line }}>
            {copy.streakCheer}
          </T>
        </View>
      </View>
*/}
    </View>
  );
}
