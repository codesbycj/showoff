import { LinearGradient } from 'expo-linear-gradient';
import { Image, Pressable, ScrollView, View } from 'react-native';

import { explore, features, genres, moods, search, tabs } from '../data/explore';
import { ct } from '../theme';
import { Glyph } from './glyph';
import { T } from './text';

type SearchProps = { margin: number; height: number };

/**
 * The search field.
 *
 * A `Pressable`, not a `TextInput`: this showcase is filmed, not typed into,
 * and a focused input would put a blinking caret in every frame.
 */
export function SearchField({ margin, height }: SearchProps) {
  return (
    <Pressable
      accessibilityRole="search"
      accessibilityLabel={search.placeholder}
      style={{ marginHorizontal: margin }}
    >
      {({ pressed }) => (
        <View
          style={{
            height,
            flexDirection: 'row',
            alignItems: 'center',
            gap: 10,
            paddingHorizontal: 16,
            borderRadius: height / 2,
            borderWidth: 1,
            borderColor: ct.cardEdge,
            backgroundColor: ct.card,
            opacity: pressed ? 0.8 : 1,
          }}
        >
          <T variant="placeholder" style={{ flex: 1 }}>
            {search.placeholder}
          </T>
          <Glyph name="search" size={17} color={ct.sub} />
        </View>
      )}
    </Pressable>
  );
}

type TitleProps = { margin: number; height: number };

/** FIX: the board names a real service in this heading. */
export function ExploreTitle({ margin, height }: TitleProps) {
  return (
    <View style={{ marginHorizontal: margin, height, justifyContent: 'center' }}>
      <T variant="sectionTitle">{explore.title}</T>
    </View>
  );
}

export function MoodsTitle({ margin, height }: TitleProps) {
  return (
    <View style={{ marginHorizontal: margin, height, justifyContent: 'center' }}>
      <T variant="sectionTitle">{moods.title}</T>
    </View>
  );
}

type RailProps = { margin: number; height: number; width: number; radius: number };

/**
 * The featured tiles.
 *
 * **A horizontal `ScrollView`, not a wrap.** The board shows its third tile
 * cut by the screen edge, and a wrap layout physically cannot reproduce that
 * (R2). The rail is pinned to its own height so it cannot absorb the screen's
 * slack.
 *
 * Each caption sits under a scrim, because text over a photograph has to clear
 * 4.5:1 (R4). The scrim runs top to bottom, which `expo-linear-gradient`
 * handles; only a *diagonal* is mirrored on web (Part 7).
 */
export function FeatureRail({ margin, height, width, radius }: RailProps) {
  return (
    <View style={{ height }}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: margin, gap: 12 }}
      >
        {features.map((f) => (
          <Pressable key={f.id} accessibilityRole="button" accessibilityLabel={`${f.tag}, ${f.artist}`}>
            {({ pressed }) => (
              <View
                style={{
                  width,
                  height,
                  borderRadius: radius,
                  overflow: 'hidden',
                  backgroundColor: ct.card,
                  opacity: pressed ? 0.88 : 1,
                }}
              >
                <Image source={f.photo} style={{ width, height }} resizeMode="cover" />
                <LinearGradient
                  colors={['rgba(10,10,10,0)', 'rgba(10,10,10,0.92)']}
                  locations={[0.45, 1]}
                  style={{ position: 'absolute', left: 0, right: 0, bottom: 0, height: height * 0.55 }}
                  pointerEvents="none"
                />
                <View style={{ position: 'absolute', left: 12, right: 12, bottom: 12 }}>
                  <T variant="tag">{f.tag}</T>
                  <T variant="tagArtist">{f.artist}</T>
                </View>
              </View>
            )}
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
}

type GridProps = {
  margin: number;
  height: number;
  gutter: number;
  rowH: number;
  radius: number;
  art: number;
};

/**
 * The genre tiles.
 *
 * Laid out as explicit rows rather than a wrap, so a reveal can stage one tile
 * at a time without the rest reflowing underneath it.
 *
 * Each tile's artwork sits **wholly inside** its own tile, so nothing straddles
 * an edge (R3) — the board's own thumbnails hang off the right of theirs.
 */
export function GenreGrid({ margin, height, gutter, rowH, radius, art }: GridProps) {
  const rows = [genres.slice(0, 2), genres.slice(2, 4), genres.slice(4)];

  return (
    <View style={{ marginHorizontal: margin, height, gap: gutter }}>
      {rows.map((row) => (
        <View key={row[0]?.id ?? 'empty'} style={{ flexDirection: 'row', gap: gutter }}>
          {row.map((g) => (
            <Pressable key={g.id} accessibilityRole="button" accessibilityLabel={g.label} style={{ flex: 1 }}>
              {({ pressed }) => (
                <View
                  style={{
                    height: rowH,
                    borderRadius: radius,
                    backgroundColor: g.tint,
                    paddingHorizontal: 12,
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 8,
                    opacity: pressed ? 0.85 : 1,
                  }}
                >
                  <T variant="genre" style={{ flex: 1 }} numberOfLines={1}>
                    {g.label}
                  </T>
                  <Image
                    source={g.art}
                    style={{ width: art, height: art, borderRadius: 8 }}
                    resizeMode="cover"
                  />
                </View>
              )}
            </Pressable>
          ))}
        </View>
      ))}
    </View>
  );
}

type DockProps = {
  width: number;
  height: number;
  lift: number;
  item: number;
  bottomInset: number;
  value: string;
  onSelect: (id: string) => void;
};

/**
 * The floating dock.
 *
 * **`bottomInset` is a lift, not a second strip** (R1b) — when the app is not
 * edge-to-edge the system already reserves its navigation strip, so adding
 * `insets.bottom` to a dock that already stops above it counts it twice.
 */
export function Dock({ width, height, lift, item, bottomInset, value, onSelect }: DockProps) {
  return (
    <View
      style={{
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: bottomInset + lift,
        alignItems: 'center',
      }}
    >
      <View
        style={{
          width,
          height,
          borderRadius: height / 2,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-around',
          paddingHorizontal: 8,
          backgroundColor: ct.card,
          borderWidth: 1,
          borderColor: ct.cardEdge,
          shadowColor: '#000000',
          shadowOpacity: 0.5,
          shadowRadius: 20,
          shadowOffset: { width: 0, height: 10 },
          elevation: 10,
        }}
      >
        {tabs.map((t) => {
          const on = t.id === value;
          return (
            <Pressable
              key={t.id}
              onPress={() => onSelect(t.id)}
              accessibilityRole="button"
              accessibilityState={{ selected: on }}
              accessibilityLabel={t.label}
            >
              {({ pressed }) => (
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 7,
                    height: item,
                    paddingHorizontal: on ? 13 : 9,
                    borderRadius: item / 2,
                    backgroundColor: on ? ct.lime : 'transparent',
                    opacity: pressed ? 0.75 : 1,
                  }}
                >
                  <Glyph name={t.glyph} size={19} color={on ? ct.onLime : ct.sub} strokeWidth={1.9} />
                  {on ? <T variant="tab">{t.label}</T> : null}
                </View>
              )}
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}
