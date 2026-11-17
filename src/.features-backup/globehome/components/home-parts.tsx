import { LinearGradient } from 'expo-linear-gradient';
import { Image, Pressable, ScrollView, View } from 'react-native';

import { greeting, places, regions, tabs, type Place } from '../data/home';
import { ct } from '../theme';
import { Glyph, type GlyphName } from './glyph';
import { T } from './text';

function Round({ glyph, label, size, badge }: { glyph: GlyphName; label: string; size: number; badge?: boolean }) {
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

type BarProps = { margin: number; height: number; control: number };

/** The menu, the search and the bell. */
export function HomeBar({ margin, height, control }: BarProps) {
  return (
    <View
      style={{
        marginHorizontal: margin,
        height,
        flexDirection: 'row',
        alignItems: 'center',
      }}
    >
      <Round glyph="menu" label="Menu" size={control} />
      <View style={{ flex: 1 }} />
      <View style={{ flexDirection: 'row', gap: 10 }}>
        <Round glyph="search" label="Search" size={control} />
        <Round glyph="bell" label="Notifications" size={control} badge />
      </View>
    </View>
  );
}

type BlockProps = { margin: number; height: number };

/** The greeting. The board sets an emoji here; drawn instead (§4.4). */
export function Greeting({ margin, height }: BlockProps) {
  return (
    <View
      style={{
        marginHorizontal: margin,
        height,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
      }}
    >
      <T variant="greeting">{greeting.hello}</T>
      <Glyph name="wave" size={22} color={ct.star} strokeWidth={1.9} />
    </View>
  );
}

type RegionProps = { margin: number; height: number; thumb: number; value: string; onSelect: (id: string) => void };

/**
 * The region chips.
 *
 * **A horizontal `ScrollView`, not a wrap.** The board shows its third chip
 * cut by the screen edge, and a wrap layout physically cannot reproduce that
 * (R2). The rail is pinned to its own height so it cannot absorb the screen's
 * slack.
 *
 * Each chip carries a **photograph**, not a drawn icon (I4).
 */
export function RegionRow({ margin, height, thumb, value, onSelect }: RegionProps) {
  return (
    <View style={{ height }}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: margin, gap: 10, alignItems: 'center' }}
      >
        {regions.map((r) => {
          const on = r.id === value;
          return (
            <Pressable
              key={r.id}
              onPress={() => onSelect(r.id)}
              accessibilityRole="button"
              accessibilityState={{ selected: on }}
              accessibilityLabel={r.label}
            >
              {({ pressed }) => (
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 9,
                    height,
                    paddingLeft: 5,
                    paddingRight: 16,
                    borderRadius: height / 2,
                    backgroundColor: ct.white,
                    borderWidth: 1,
                    borderColor: on ? ct.brand : ct.cardEdge,
                    opacity: pressed ? 0.78 : 1,
                  }}
                >
                  <Image
                    source={r.photo}
                    style={{
                      width: thumb,
                      height: thumb,
                      borderRadius: thumb / 2,
                      backgroundColor: ct.tile,
                    }}
                  />
                  <T variant="region">{r.label}</T>
                </View>
              )}
            </Pressable>
          );
        })}
      </ScrollView>
    </View>
  );
}

type CardProps = {
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
function PlaceCard({ item, margin, height, radius, onPress }: CardProps) {
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

type ListProps = { margin: number; cardH: number; gap: number; radius: number; onSelect: () => void };

/**
 * The destinations.
 *
 * **Three, not the board's two-and-a-bit.** The board crops its second card at
 * the tab bar, so the list genuinely continues (R6) — and I3's lever for that
 * space is the row the board cut, never a taller block above it.
 */
export function PlaceList({ margin, cardH, gap, radius, onSelect }: ListProps) {
  return (
    <View style={{ gap }}>
      {places.map((p) => (
        <PlaceCard
          key={p.id}
          item={p}
          margin={margin}
          height={cardH}
          radius={radius}
          onPress={onSelect}
        />
      ))}
    </View>
  );
}

type TabProps = {
  height: number;
  bottomInset: number;
  value: string;
  onSelect: (id: string) => void;
};

/**
 * The tab bar.
 *
 * **`bottomInset` is padding inside the bar, not a strip under it.** R1b, the
 * rule that put an empty band under four screens of a deleted batch: when the
 * app is not edge-to-edge the system already reserves its navigation strip, so
 * a bar that *also* sits on top of `insets.bottom` counts it twice.
 */
export function TabBar({ height, bottomInset, value, onSelect }: TabProps) {
  return (
    <View
      style={{
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        paddingBottom: bottomInset,
        backgroundColor: ct.white,
        borderTopWidth: 1,
        borderTopColor: ct.hairline,
      }}
    >
      <View style={{ height, flexDirection: 'row', alignItems: 'center' }}>
        {tabs.map((t) => {
          const on = t.id === value;
          return (
            <Pressable
              key={t.id}
              onPress={() => onSelect(t.id)}
              accessibilityRole="button"
              accessibilityState={{ selected: on }}
              accessibilityLabel={t.label}
              style={{ flex: 1 }}
            >
              {({ pressed }) => (
                <View style={{ alignItems: 'center', gap: 4, opacity: pressed ? 0.7 : 1 }}>
                  <Glyph name={t.glyph} size={21} color={on ? ct.brand : ct.sub} strokeWidth={1.8} />
                  <T variant={on ? 'tabOn' : 'tab'}>{t.label}</T>
                </View>
              )}
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}
