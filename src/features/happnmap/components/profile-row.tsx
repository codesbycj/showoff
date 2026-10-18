import Heart from 'lucide-react-native/icons/heart';
import MapPin from 'lucide-react-native/icons/map-pin';
import { Image, Pressable, View } from 'react-native';
import Svg, { Circle, Path } from 'react-native-svg';

import { facts, profile } from '../data/map';
import { CARD_AVATAR, FACT_GAP, FACT_TOP } from '../layout';
import { hp, radius } from '../theme';
import { T } from './text';

const CARD = require('../../../../assets/images/happnmap/card.jpg');

/**
 * The person the radar is pointing at: who they are, and the three numbers
 * that say why they are on this screen at all.
 *
 * The facts sit in a row of equal chips rather than a sentence, because the
 * reference's three are read at a glance and a sentence is not.
 */
export function ProfileRow({ onLike }: { onLike?: () => void }) {
  return (
    <View>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
        {/* STEP 1.14 their picture
        <Image
          source={CARD}
          style={{ width: CARD_AVATAR, height: CARD_AVATAR, borderRadius: radius.chip }}
          resizeMode="cover"
          accessibilityIgnoresInvertColors
        />
        */}

        {/* STEP 1.15 who they are
        <View style={{ flex: 1 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
            <T variant="name" color={hp.ink}>
              {profile.name}
            </T>
            <Verified size={15} />
          </View>
          <T variant="role" color={hp.blueDeep}>
            {profile.role}
          </T>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 1 }}>
            <MapPin size={12} color={hp.muted} strokeWidth={1.9} />
            <T variant="place" color={hp.muted}>
              {profile.place}
            </T>
          </View>
        </View>
        */}

        {/* STEP 1.16 whether you like them
        <Pressable onPress={onLike} accessibilityRole="button" accessibilityLabel="Like">
          <View
            style={{
              width: 40,
              height: 40,
              borderRadius: radius.full,
              backgroundColor: hp.fact,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Heart size={18} color={hp.ink} strokeWidth={1.9} />
          </View>
        </Pressable>
        */}
      </View>

      <View style={{ flexDirection: 'row', gap: FACT_GAP, marginTop: FACT_TOP }}>
        {/* STEP 1.17 and why they are here
        {facts.map((f) => (
          <View
            key={f.key}
            style={{
              flex: 1,
              paddingVertical: 9,
              paddingHorizontal: 10,
              borderRadius: radius.chip,
              backgroundColor: hp.fact,
            }}
          >
            <T variant="fact" color={hp.ink}>
              {f.value}
            </T>
            <T variant="factMeta" color={hp.muted}>
              {f.meta}
            </T>
          </View>
        ))}
        */}
      </View>
    </View>
  );
}

/**
 * The verified tick.
 *
 * Drawn rather than taken from an icon set: the disc behind the tick is a
 * shape, not a stroke, and every set draws it differently.
 */
function Verified({ size }: { size: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 20 20">
      <Circle cx={10} cy={10} r={9} fill={hp.blue} />
      <Path
        d="M5.8 10.2 L8.7 13 L14.2 7.2"
        stroke="#ffffff"
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </Svg>
  );
}
