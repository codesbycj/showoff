import { Pressable, ScrollView, Text, View } from 'react-native';

import { FONT, R, TYPE, jf } from '../theme';

/**
 * A pill can carry a dot after its label — the saved screen marks its selected
 * tab with a green one. Plain strings are accepted too, because the feed's
 * filters are only ever labels and wrapping each of them in an object would be
 * noise at the call site.
 */
export type Pill = string | { label: string; dot?: string; count?: number };

const labelOf = (p: Pill) => (typeof p === 'string' ? p : p.label);
const dotOf = (p: Pill) => (typeof p === 'string' ? undefined : p.dot);
const countOf = (p: Pill) => (typeof p === 'string' ? undefined : p.count);

/**
 * The scrolling pill row — "New / Hot / Near / Remote" on the feed, "Saved /
 * Applied (6) / Archived" on the saved screen, "All / Unread / Recruiters" in
 * messages.
 *
 * It is a horizontal `ScrollView`, not a wrap. The reference shows the last pill
 * clipped by the right edge of the screen, and a wrap layout physically cannot
 * reproduce that — it would move the pill to a second line. The clip is the tell
 * that the items sit in one scrolling row.
 */
export function FilterPills({
  items,
  active,
  onSelect,
  gutter = 20,
  paddingVertical = 11,
}: {
  items: readonly Pill[];
  active: string;
  onSelect?: (label: string) => void;
  /** The row bleeds to the screen edge, so it carries its own side padding. */
  gutter?: number;
  paddingVertical?: number;
}) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      style={{ marginHorizontal: -gutter }}
      contentContainerStyle={{ paddingHorizontal: gutter, gap: 8 }}
    >
      {items.map((item) => {
        const label = labelOf(item);
        const dot = dotOf(item);
        const count = countOf(item);
        const on = label === active;
        return (
          <Pressable key={label} onPress={() => onSelect?.(label)}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 6,
                paddingHorizontal: 20,
                // The reference's `py-2` plus the line box a 13px label gets in
                // a browser, which measures 39dp overall rather than the 33 an
                // 8dp pad and a tight line height give.
                paddingVertical,
                borderRadius: R.full,
                backgroundColor: on ? jf.ink : jf.card,
                shadowColor: '#000000',
                shadowOpacity: 0.04,
                shadowRadius: 4,
                shadowOffset: { width: 0, height: 1 },
                elevation: 1,
              }}
            >
              <Text style={[TYPE.pill, { color: on ? jf.card : '#404040' }]}>{label}</Text>
              {on && dot ? (
                <View style={{ width: 6, height: 6, borderRadius: 3, backgroundColor: dot }} />
              ) : null}
              {count !== undefined ? (
                <View
                  style={{
                    width: 16,
                    height: 16,
                    borderRadius: 8,
                    alignItems: 'center',
                    justifyContent: 'center',
                    backgroundColor: on ? jf.card : jf.ink,
                  }}
                >
                  <Text
                    style={{
                      fontFamily: FONT.bold,
                      fontSize: 10,
                      lineHeight: 13,
                      color: on ? jf.ink : jf.card,
                    }}
                  >
                    {count}
                  </Text>
                </View>
              ) : null}
            </View>
          </Pressable>
        );
      })}
    </ScrollView>
  );
}
