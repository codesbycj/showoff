import { Image, Pressable, ScrollView, View } from 'react-native';

import {
  categories,
  collection,
  collectionLine,
  greeting,
  playlist,
  popular,
  songs,
  tabs,
  tracks,
} from '../data/home';
import { ct } from '../theme';
import { Glyph, type GlyphName } from './glyph';
import { T } from './text';

function Round({ glyph, label, size, filled }: { glyph: GlyphName; label: string; size: number; filled?: boolean }) {
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
            backgroundColor: filled ? ct.white : ct.disc,
            opacity: pressed ? 0.7 : 1,
          }}
        >
          <Glyph name={glyph} size={17} color={filled ? ct.page : ct.ink} />
        </View>
      )}
    </Pressable>
  );
}

type BarProps = { margin: number; height: number; control: number };

/** The greeting and the two corner controls. The board sets a sparkle emoji
 *  beside the name; drawn instead, because emoji differ across platforms and
 *  the web render cannot see that (§4.4). */
export function GreetingBar({ margin, height, control }: BarProps) {
  return (
    <View
      style={{
        marginHorizontal: margin,
        height,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 10,
      }}
    >
      <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', gap: 6 }}>
        <T variant="hello">{greeting.hello}</T>
        <T variant="name">{greeting.name}</T>
        <Glyph name="sparkle" size={14} color={ct.lime} />
      </View>
      <Round glyph="bell" label="Notifications" size={control} />
      <Round glyph="mail" label="Messages" size={control} filled />
    </View>
  );
}

type BlockProps = { margin: number; height: number };

/** "Select Categories". */
export function CategoryLabel({ margin, height }: BlockProps) {
  return (
    <View style={{ marginHorizontal: margin, height, justifyContent: 'center' }}>
      <T variant="sectionLabel">{categories.title}</T>
    </View>
  );
}

type ChipProps = { margin: number; height: number; value: string; onSelect: (id: string) => void };

/**
 * The category chips.
 *
 * **A horizontal `ScrollView`, not a wrap.** The board shows its last chip cut
 * by the screen edge, and a wrap layout physically cannot reproduce that (R2).
 * The rail is pinned to its own height so it cannot absorb the screen's slack.
 */
export function CategoryChips({ margin, height, value, onSelect }: ChipProps) {
  return (
    <View style={{ height }}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: margin, gap: 8, alignItems: 'center' }}
      >
        {categories.items.map((c) => {
          const on = c === value;
          return (
            <Pressable
              key={c}
              onPress={() => onSelect(c)}
              hitSlop={{ top: 8, bottom: 8, left: 2, right: 2 }}
              accessibilityRole="button"
              accessibilityState={{ selected: on }}
              accessibilityLabel={c}
            >
              {({ pressed }) => (
                <View
                  style={{
                    height,
                    paddingHorizontal: 16,
                    borderRadius: height / 2,
                    alignItems: 'center',
                    justifyContent: 'center',
                    borderWidth: on ? 0 : 1,
                    borderColor: ct.cardEdge,
                    backgroundColor: on ? ct.lime : 'transparent',
                    opacity: pressed ? 0.75 : 1,
                  }}
                >
                  <T variant={on ? 'chipOn' : 'chip'}>{c}</T>
                </View>
              )}
            </Pressable>
          );
        })}
      </ScrollView>
    </View>
  );
}

type HeadProps = { margin: number; height: number; title: string; more: string };

/** A section heading and its "See all". */
export function SectionHead({ margin, height, title, more }: HeadProps) {
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
      <T variant="sectionTitle">{title}</T>
      <Pressable
        hitSlop={{ top: 12, bottom: 12, left: 10, right: 10 }}
        accessibilityRole="button"
        accessibilityLabel={`${more}, ${title}`}
      >
        {({ pressed }) => (
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 3, opacity: pressed ? 0.6 : 1 }}>
            <T variant="sectionMore">{more}</T>
            <Glyph name="chevronRight" size={13} color={ct.sub} strokeWidth={2} />
          </View>
        )}
      </Pressable>
    </View>
  );
}

export function PopularHead({ margin, height }: BlockProps) {
  return <SectionHead margin={margin} height={height} title={popular.title} more={popular.more} />;
}

export function PlaylistHead({ margin, height }: BlockProps) {
  return <SectionHead margin={margin} height={height} title={playlist.title} more={playlist.more} />;
}

type RailProps = { margin: number; height: number; art: number; onSelect: () => void };

/**
 * The popular songs.
 *
 * **A horizontal `ScrollView`, not a wrap** (R2) — the board shows its third
 * sleeve cut by the screen edge. Every sleeve is a **photograph** standing in
 * for a fictional release; the board's own are real album covers.
 */
export function SongRail({ margin, height, art, onSelect }: RailProps) {
  return (
    <View style={{ height }}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: margin, gap: 12 }}
      >
        {songs.map((song) => (
          <Pressable
            key={song.id}
            onPress={onSelect}
            accessibilityRole="button"
            accessibilityLabel={`${song.title} by ${song.artist}`}
          >
            {({ pressed }) => (
              <View style={{ width: art, opacity: pressed ? 0.85 : 1 }}>
                <Image
                  source={song.cover}
                  style={{ width: art, height: art, borderRadius: 12 }}
                  resizeMode="cover"
                />
                <View style={{ marginTop: 8 }}>
                  <T variant="songTitle" numberOfLines={1}>
                    {song.title}
                  </T>
                  <T variant="songArtist" numberOfLines={1}>
                    {song.artist}
                  </T>
                </View>
              </View>
            )}
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
}

export function CollectionHead({ margin, height }: BlockProps) {
  return (
    <View style={{ marginHorizontal: margin, height, justifyContent: 'center' }}>
      <T variant="sectionTitle">{collection.title}</T>
    </View>
  );
}

type CardProps = { margin: number; height: number; width: number; radius: number };

/**
 * The collection card.
 *
 * **The fill is on an absolutely-filled child**, carrying the clip with it, so
 * a reveal that stages the copy and the photograph does not open on a solid
 * white slab (§5.5 / I9). The clip lives on that child and `elevation` does
 * not: Android is unreliable with `overflow: 'hidden'` and `elevation` on the
 * same View (Part 7).
 *
 * The song count comes from `data/home.ts` (R9).
 */
export function CollectionCard({ margin, height, width, radius }: CardProps) {
  return (
    <View style={{ height }}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: margin, gap: 12 }}
      >
        <Pressable accessibilityRole="button" accessibilityLabel={collectionLine()}>
          {({ pressed }) => (
            <View style={{ width, height, padding: 16, opacity: pressed ? 0.9 : 1 }}>
              <View
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  borderRadius: radius,
                  overflow: 'hidden',
                  backgroundColor: ct.sheet,
                }}
              >
                <Image
                  source={collection.photo}
                  style={{ position: 'absolute', right: 0, top: 0, width: width * 0.46, height }}
                  resizeMode="cover"
                />
              </View>

              {collection.cardTitle.map((line) => (
                <T key={line} variant="cardTitle">
                  {line}
                </T>
              ))}
              <T variant="cardLine">{collectionLine()}</T>

              <View style={{ flex: 1, justifyContent: 'flex-end' }}>
                <Glyph name="arrowRight" size={20} color={ct.onSheet} />
              </View>
            </View>
          )}
        </Pressable>
      </ScrollView>
    </View>
  );
}

type ListProps = {
  margin: number;
  height: number;
  rowH: number;
  art: number;
  count: number;
  onSelect: () => void;
};

/**
 * The playlist.
 *
 * **Whole rows, filling the space above the dock** (see `layout.ts`), so
 * nothing is clipped through its own text (R2) and no band is left at the
 * foot (I3).
 */
export function TrackList({ margin, height, rowH, art, count, onSelect }: ListProps) {
  const shown = tracks.slice(0, count);
  return (
    <View style={{ marginHorizontal: margin, height }}>
      {shown.map((t, i) => (
        <Pressable
          key={t.id}
          onPress={onSelect}
          accessibilityRole="button"
          accessibilityLabel={`${t.title} by ${t.artist}`}
        >
          {({ pressed }) => (
            <View
              style={{
                height: rowH,
                flexDirection: 'row',
                alignItems: 'center',
                gap: 12,
                borderBottomWidth: i === shown.length - 1 ? 0 : 1,
                borderBottomColor: ct.hairline,
                opacity: pressed ? 0.7 : 1,
              }}
            >
              <Image
                source={t.art}
                style={{ width: art, height: art, borderRadius: 10 }}
                resizeMode="cover"
              />
              <View style={{ flex: 1 }}>
                <T variant="trackTitle" numberOfLines={1}>
                  {t.title}
                </T>
                <T variant="trackMeta">{t.artist}</T>
              </View>
              <T variant="trackMeta">{t.minutes}</T>
            </View>
          )}
        </Pressable>
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
 * The floating dock. The active tab is a lime pill carrying its label; the
 * rest are glyphs alone, which is how the board draws it.
 *
 * **`bottomInset` is a lift, not a second strip.** R1b, the rule that put an
 * empty band under four screens of a deleted batch: when the app is not
 * edge-to-edge the system already reserves its navigation strip, so adding
 * `insets.bottom` to a dock that already stops above it counts the strip
 * twice. The inset comes from `use-insets.ts`, which uses the design's value
 * as a **fallback** rather than a `Math.max`.
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
                  <Glyph
                    name={t.glyph}
                    size={19}
                    color={on ? ct.onLime : ct.sub}
                    strokeWidth={1.9}
                  />
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
