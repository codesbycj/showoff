import { Image, Pressable, View } from 'react-native';

import { copy } from '../data/bikes';
import { CARD_HEIGHT, CARD_PAD, SWIPE_HEIGHT } from '../layout';
import { radius, shadow, sp, type } from '../theme';
import { Glyph } from './glyph';
import { T } from './text';

/**
 * One bike: what it is, how it has been used, and the way to take it.
 *
 * The photograph fills the card's right half and is clipped by the card's own
 * corner — a crop, not a cut-out. A bicycle on a studio sweep does not exist
 * in free stock, and cutting one out of a street photograph leaves a halo
 * around forty spokes.
 *
 * The clip and the shadow are on **different** Views: `overflow: 'hidden'`
 * and `elevation` on one view is unreliable on Android, and this card needs
 * both.
 */
export function BikeCard({
  name,
  usage,
  battery,
  src,
  onPress,
}: {
  name: string;
  usage: string;
  battery: string;
  src: number;
  onPress?: () => void;
}) {
  return (
    <View style={{ borderRadius: radius.card, ...shadow.card }}>
      <View
        style={{
          height: CARD_HEIGHT,
          borderRadius: radius.card,
          backgroundColor: sp.card,
          overflow: 'hidden',
        }}
      >
        <Image
          source={src}
          resizeMode="cover"
          style={{
            position: 'absolute',
            right: 0,
            top: 0,
            width: '58%',
            height: CARD_HEIGHT,
          }}
        />

        <View style={{ flex: 1, padding: CARD_PAD }}>
          <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
            <T variant="cardTitle" color={sp.ink} style={{ flex: 1, height: type.cardTitle.line }}>
              {name}
            </T>
            <Pressable
              onPress={onPress}
              accessibilityRole="button"
              accessibilityLabel={'Open ' + name}
            >
              <View
                style={{
                  width: 42,
                  height: 42,
                  borderRadius: radius.control,
                  backgroundColor: sp.dark,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Glyph name="arrow" size={18} tint={sp.onDark} />
              </View>
            </Pressable>
          </View>

          <View style={{ marginTop: 16 }}>
            <T variant="statLabel" color={sp.muted} style={{ height: type.statLabel.line }}>
              Usage time
            </T>
            <T variant="statValue" color={sp.ink} style={{ height: type.statValue.line }}>
              {usage}
            </T>
          </View>

          <View style={{ marginTop: 12 }}>
            <T variant="statLabel" color={sp.muted} style={{ height: type.statLabel.line }}>
              Battery
            </T>
            <T variant="statValue" color={sp.ink} style={{ height: type.statValue.line }}>
              {battery}
            </T>
          </View>

          <View style={{ flex: 1 }} />

          <View
            style={{
              height: SWIPE_HEIGHT,
              alignSelf: 'flex-start',
              paddingLeft: 5,
              paddingRight: 14,
              borderRadius: radius.pill,
              backgroundColor: 'rgba(255, 255, 255, 0.72)',
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            <View
              style={{
                width: 34,
                height: 34,
                borderRadius: radius.control,
                backgroundColor: sp.cardEdge,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Glyph name="lock" size={16} tint={sp.ink} />
            </View>
            <T variant="swipe" color={sp.body} style={{ marginLeft: 9, height: type.swipe.line }}>
              {copy.swipe}
            </T>
            <View style={{ marginLeft: 6 }}>
              <Glyph name="next" size={14} tint={sp.muted} />
            </View>
          </View>
        </View>
      </View>
    </View>
  );
}
