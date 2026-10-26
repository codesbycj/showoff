import { Image, Pressable, View, useWindowDimensions } from 'react-native';
import Svg, { Path } from 'react-native-svg';

import { copy, photo } from '../data/start';
import { DISC, HERO_SHARE, MARGIN, PLATE_SHARE } from '../layout';
import { radius, sg } from '../theme';

/** One of the two round controls over the hero. */
function Disc({
  kind,
  onPress,
  label,
}: {
  kind: 'back' | 'heart';
  onPress?: () => void;
  label: string;
}) {
  return (
    <Pressable onPress={onPress} accessibilityRole="button" accessibilityLabel={label}>
      <View
        style={{
          width: DISC,
          height: DISC,
          borderRadius: radius.pill,
          backgroundColor: sg.limeDeep,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Svg width={19} height={19} viewBox="0 0 24 24">
          {kind === 'back' ? (
            <Path
              d="M14.4 5.6 8 12l6.4 6.4"
              stroke={sg.ink}
              strokeWidth={2}
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
          ) : (
            <Path
              d="M12 20.2c-.5 0-.9-.2-1.3-.5C6.2 15.9 3.8 13.5 3.8 10.2a4.3 4.3 0 0 1 8.2-1.8 4.3 4.3 0 0 1 8.2 1.8c0 3.3-2.4 5.7-6.9 9.5-.4.3-.8.5-1.3.5Z"
              stroke={sg.ink}
              strokeWidth={1.8}
              strokeLinejoin="round"
              fill="none"
            />
          )}
        </Svg>
      </View>
    </Pressable>
  );
}

/**
 * The plate, on lime.
 *
 * **The bowl is a photograph, masked to a circle at bake time** — food is a
 * picture *of* something and belongs in a bitmap (AGENTS.md, "Draw the
 * interface, photograph the picture"). The mask is cut at the bowl's own rim,
 * which is a true circle in an overhead shot, so there is no flood fill to
 * tune and no grey halo on the lime.
 *
 * The lime is an absolutely-filled child rather than this View's own fill, so
 * the blank state is a blank page and the hero arrives as a step.
 *
 * The plate's size is a share of the window, not a number: a fixed 300dp
 * plate is half a short phone and a third of a tall one.
 */
export function Hero({
  top,
  onBack,
  onSave,
}: {
  top: number;
  onBack?: () => void;
  onSave?: () => void;
}) {
  const { width, height } = useWindowDimensions();
  const plate = Math.min(width * PLATE_SHARE, height * HERO_SHARE * 0.82);

  return (
    <View
      style={{
        height: height * HERO_SHARE + top,
        paddingTop: top,
        paddingHorizontal: MARGIN,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
{/* STEP 1.03 the lime
      <View
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: sg.lime,
        }}
      />
*/}

      {/*
        The shadow is on a wrapping View, not on the Image: React Native's
        ImageStyle has no `elevation`, so an Android shadow cannot be set on
        an Image at all. `shadow*` and `elevation` travel together in one
        object — a `Platform.select` here is exactly what the web harness
        cannot check.
      */}
{/* STEP 1.04 the bowl
      <View
        style={{
          width: plate,
          height: plate,
          borderRadius: plate / 2,
          shadowColor: '#2C3A10',
          shadowOpacity: 0.22,
          shadowRadius: 26,
          shadowOffset: { width: 0, height: 14 },
          elevation: 12,
        }}
      >
        <Image source={photo} style={{ width: plate, height: plate }} />
      </View>
*/}

      <View
        style={{
          position: 'absolute',
          top,
          left: MARGIN,
          right: MARGIN,
          flexDirection: 'row',
          justifyContent: 'space-between',
        }}
      >
{/* STEP 1.05 the way back
        <Disc kind="back" onPress={onBack} label={copy.back} />
*/}
{/* STEP 1.06 and a way to keep it
        <Disc kind="heart" onPress={onSave} label={copy.save} />
*/}
      </View>
    </View>
  );
}
