import ArrowLeft from 'lucide-react-native/icons/arrow-left';
import ChevronDown from 'lucide-react-native/icons/chevron-down';
import { Image, Pressable, View } from 'react-native';

import { header } from '../data/brands';
import { HEADER_AVATAR, HEADER_HEIGHT } from '../layout';
import { ml, radius, shadow } from '../theme';
import { FACES } from './faces';
import { T } from './text';

/**
 * The way back, and whose miles these are.
 *
 * The account pill is centred on the screen rather than between the two
 * controls: the right of this row is empty in this state of the design, and a
 * title that moves when a control appears reads as a bug.
 */
export function Header({ onBack, onAccount }: { onBack?: () => void; onAccount?: () => void }) {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      {/* STEP 1.03 the way back
      <Pressable onPress={onBack} accessibilityRole="button" accessibilityLabel="Back">
        <View
          style={{
            width: HEADER_HEIGHT,
            height: HEADER_HEIGHT,
            borderRadius: radius.full,
            backgroundColor: ml.glass,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <ArrowLeft size={18} color={ml.onCanvas} strokeWidth={2.1} />
        </View>
      </Pressable>
      */}

      <View style={{ flex: 1, alignItems: 'center' }}>
        {/* STEP 1.04 and whose account
        <Pressable onPress={onAccount} accessibilityRole="button" accessibilityLabel={header.name}>
          <View
            style={{
              height: HEADER_HEIGHT,
              borderRadius: radius.pill,
              backgroundColor: ml.surface,
              flexDirection: 'row',
              alignItems: 'center',
              paddingLeft: 7,
              paddingRight: 13,
              gap: 8,
              ...shadow.float,
            }}
          >
            <Image
              source={FACES[0]}
              style={{ width: HEADER_AVATAR, height: HEADER_AVATAR, borderRadius: radius.full }}
              resizeMode="cover"
              accessibilityIgnoresInvertColors
            />
            <T variant="greeting" color={ml.ink}>
              {header.name}
            </T>
            <ChevronDown size={15} color={ml.ink} strokeWidth={2.2} />
          </View>
        </Pressable>
        */}
      </View>

      <View style={{ width: HEADER_HEIGHT }} />
    </View>
  );
}
