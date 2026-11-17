import { View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

import { brand } from '../data/start';
import { ct } from '../theme';
import { T } from './text';

type Props = { margin: number; insetTop: number };

/**
 * The app's name, over the photograph.
 *
 * The board names the app nowhere on this screen; an onboarding that does not
 * say what it is onboarding you to is the row it crops, and inventing that row
 * is the sanctioned fix for a short screen (I3).
 *
 * The paw is drawn, not traced: a mark made of four toes and a pad is an idea
 * (I4). It is **one `<Path>` with five subpaths**, not five shapes: a mark is
 * one element, and five shapes staged separately are five steps of 0.0064%
 * each - zero-diff failures the step probe is right to report (I9).
 *
 * It sits on a scrim because the frame behind it is photography, where
 * contrast cannot be relied on (R4).
 */
export function BrandMark({ margin, insetTop }: Props) {
  return (
    <View
      style={{
        position: 'absolute',
        top: insetTop,
        left: margin,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
        paddingRight: 16,
        paddingLeft: 10,
        paddingVertical: 8,
        borderRadius: 22,
        backgroundColor: ct.scrim,
      }}
    >
      <Svg width={26} height={26} viewBox="0 0 24 24">
        {/* STEP 1.03 path
        <Path
          d="M12 10.8a5.4 4.6 0 0 1 0 9.2 5.4 4.6 0 0 1 0-9.2ZM6.4 7.3a2.3 2.3 0 0 1 0 4.6 2.3 2.3 0 0 1 0-4.6ZM10.4 3.9a2.3 2.3 0 0 1 0 4.6 2.3 2.3 0 0 1 0-4.6ZM15 4.1a2.3 2.3 0 0 1 0 4.6 2.3 2.3 0 0 1 0-4.6ZM18.4 7.7a2.3 2.3 0 0 1 0 4.6 2.3 2.3 0 0 1 0-4.6Z"
          fill={ct.onInk}
        />
        */}
      </Svg>

      {/* STEP 1.04 name
      <T variant="wordmark">{brand.name}</T>
      */}
    </View>
  );
}
