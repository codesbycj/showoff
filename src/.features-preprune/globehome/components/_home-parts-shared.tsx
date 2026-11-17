import { LinearGradient } from 'expo-linear-gradient';
import { Image, Pressable, ScrollView, View } from 'react-native';

import { greeting, places, regions, tabs, type Place } from '../data/home';
import { ct } from '../theme';
import { Glyph, type GlyphName } from './glyph';
import { T } from './text';


export function Round({ glyph, label, size, badge }: { glyph: GlyphName; label: string; size: number; badge?: boolean }) {
  return (
    <Pressable hitSlop={8} accessibilityRole="button" accessibilityLabel={label}>
      {({ pressed }) => (
        <View
          style={{
            width: size,
            height: size,
            borderRadius: size / 2,
            alignItems: 'center',
            justifyContent: 'center',
            backgroundColor: ct.white,
            borderWidth: 1,
            borderColor: ct.cardEdge,
            opacity: pressed ? 0.7 : 1,
          }}
        >
          <Glyph name={glyph} size={18} color={ct.ink} />
          {badge ? (
            <View
              style={{
                position: 'absolute',
                top: 8,
                right: 9,
                width: 7,
                height: 7,
                borderRadius: 3.5,
                backgroundColor: ct.badge,
              }}
            />
          ) : null}
        </View>
      )}
    </Pressable>
  );
}

export type BarProps = { margin: number; height: number; control: number };

export type BlockProps = { margin: number; height: number };

export type RegionProps = { margin: number; height: number; thumb: number; value: string; onSelect: (id: string) => void };

export type CardProps = {
  item: Place;
  margin: number;
  height: number;
  radius: number;
  onPress: () => void;
};

/**
 * One destination.
 *
 * **The fill and the photograph are on an absolutely-filled child**, carrying
 * the clip with them, so a reveal that stages the badges and the caption does
 * not open on a grey slab (§5.5 / I9). The clip lives on that child and
 * `elevation` does not: Android is unreliable with `overflow: 'hidden'` and
 * `elevation` on the same View (Part 7).
 *
 * The rating is the card's own number, and the star follows it (R9) — the
 * board prints "5.0" on every card regardless.
 *
 * Every badge sits **wholly inside** the photograph, so none straddles an edge
 * (R3).
 */
export function PlaceCard({ item, margin, height, radius, onPress }: CardProps) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={`${item.name}, ${item.country}`}
      style={{ marginHorizontal: margin }}
    >
      {({ pressed }) => (
        <View style={{ height, opacity: pressed ? 0.9 : 1 }}>
          <View
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              borderRadius: radius,
              overflow: 'hidden',
              backgroundColor: ct.tile,
            }}
          >
            <Image source={item.photo} style={{ width: '100%', height }} resizeMode="cover" />
            <LinearGradient
              colors={['rgba(10,16,24,0)', 'rgba(10,16,24,0.74)']}
              locations={[0.45, 1]}
              style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: height * 0.52 }}
              pointerEvents="none"
            />
          </View>

          <View
            style={{
              position: 'absolute',
              top: 12,
              left: 12,
              flexDirection: 'row',
              alignItems: 'center',
              gap: 5,
              height: 26,
              paddingHorizontal: 10,
              borderRadius: 13,
              backgroundColor: ct.white,
            }}
          >
            <Glyph name="star" size={12} color={ct.star} />
            <T variant="rating">{item.rating.toFixed(1)}</T>
          </View>

          <View
            style={{
              position: 'absolute',
              top: 12,
              right: 12,
              width: 32,
              height: 32,
              borderRadius: 16,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'rgba(255,255,255,0.86)',
            }}
          >
            <Glyph
              name={item.liked ? 'heartFill' : 'heart'}
              size={16}
              color={item.liked ? ct.badge : ct.ink}
              strokeWidth={1.7}
            />
          </View>

          <View style={{ position: 'absolute', left: 14, bottom: 14 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
              <Glyph name="pin" size={13} color={ct.onPhoto} />
              <T variant="country">{item.country}</T>
            </View>
            <T variant="place">{item.name}</T>
          </View>

          <View
            style={{
              position: 'absolute',
              right: 14,
              bottom: 14,
              width: 42,
              height: 42,
              borderRadius: 21,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: ct.white,
            }}
          >
            <Glyph name="arrowUpRight" size={19} color={ct.ink} />
          </View>
        </View>
      )}
    </Pressable>
  );
}

export type ListProps = { margin: number; cardH: number; gap: number; radius: number; onSelect: () => void };

export type TabProps = {
  height: number;
  bottomInset: number;
  value: string;
  onSelect: (id: string) => void;
};
