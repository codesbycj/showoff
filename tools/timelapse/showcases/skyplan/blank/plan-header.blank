import { Image, Pressable, View } from 'react-native';

import { header, me } from '../data/plan';
import { ct } from '../theme';
import { T } from './text';

type Props = { margin: number; height: number };

/**
 * The page title and the traveller.
 *
 * **The avatar is a photograph** (I4) — a face is a picture of someone, and
 * initials on a disc is a fallback state rather than a substitute.
 */
export function PlanHeader({ margin, height }: Props) {
  return (
    <View
      style={{
        marginHorizontal: margin,
        height,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      {/* STEP 1.03 title
      <T variant="title">{header.title}</T>
      */}

      {/* STEP 1.04 "Your account"
      <Pressable accessibilityRole="button" accessibilityLabel="Your account">
        <Image
          source={me}
          style={{
            width: 50,
            height: 50,
            borderRadius: 25,
            borderWidth: 2,
            borderColor: ct.white,
          }}
          resizeMode="cover"
        />
      </Pressable>
      */}
    </View>
  );
}
