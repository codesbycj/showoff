import { Image } from 'expo-image';
import { Text, View } from 'react-native';

import { Icon } from './icon';
import { FONT } from '../theme';

/**
 * The left half of the profile header — avatar, name, level chip and tagline.
 *
 * It sits beside the two stat cards in a two-column row and is the taller of
 * the pair, so it distributes its own children with `space-between` and lets
 * the stat column stretch to match rather than fixing either height.
 */
export function ProfileIdentity({
  name,
  level,
  tagline,
  photo,
}: {
  name: string;
  level: string;
  tagline: string;
  photo: number;
}) {
  return (
    <View style={{ flex: 1, justifyContent: 'space-between', paddingVertical: 2 }}>
      <Image
        source={photo}
        style={{
          width: 74,
          height: 74,
          borderRadius: 37,
          borderWidth: 2,
          borderColor: 'rgba(255,255,255,0.8)',
        }}
        contentFit="cover"
      />

      <View style={{ marginTop: 10 }}>
        <Text
          style={{
            fontFamily: FONT.bold,
            fontSize: 19,
            lineHeight: 26,
            letterSpacing: -0.38,
            color: '#141915',
          }}
        >
          {name}
        </Text>

        <View
          style={{
            alignSelf: 'flex-start',
            flexDirection: 'row',
            alignItems: 'center',
            gap: 5,
            backgroundColor: '#eaf8ea',
            paddingHorizontal: 10,
            paddingVertical: 3,
            borderRadius: 999,
            marginTop: 4,
          }}
        >
          <Icon name="star" size={11} color="#1db34f" fill="#1db34f" />
          <Text style={{ fontFamily: FONT.bold, fontSize: 11, lineHeight: 15, color: '#1db34f' }}>
            {level}
          </Text>
        </View>

        <Text
          style={{
            fontFamily: FONT.medium,
            fontSize: 11,
            lineHeight: 15,
            color: '#859286',
            marginTop: 4,
          }}
        >
          {tagline}
        </Text>
      </View>
    </View>
  );
}

/** Shared by both stat blocks — a tinted circular well holding one glyph. */
export function StatWell({
  icon,
  size,
  tint,
  ink,
}: {
  icon: Parameters<typeof Icon>[0]['name'];
  size: number;
  tint: string;
  ink: string;
}) {
  return (
    <View
      style={{
        width: size,
        height: size,
        borderRadius: size / 2,
        backgroundColor: tint,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Icon name={icon} size={size * 0.44} color={ink} />
    </View>
  );
}
