import { Pressable, View } from 'react-native';

import { chips, dayUnit, days, headline, logTitle, notes, promo, ranges } from '../data/cycle';
import { ct } from '../theme';
import { Glyph } from './glyph';
import { T } from './text';

const TINT = { mint: ct.mint, blue: ct.blue, lilac: ct.lilac, blush: ct.blush } as const;

type BlockProps = { margin: number; height: number };

/** The back control, alone at the top as the board places it. */
export function BackRow({ margin, height, onBack }: BlockProps & { onBack: () => void }) {
  return (
    <View style={{ marginHorizontal: margin, height, alignItems: 'center', justifyContent: 'center' }}>
      <Pressable hitSlop={10} onPress={onBack} accessibilityRole="button" accessibilityLabel="Back">
        {({ pressed }) => (
          <View
            style={{
              width: height,
              height,
              borderRadius: height / 2,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: 'rgba(255,255,255,0.7)',
              opacity: pressed ? 0.7 : 1,
            }}
          >
            <Glyph name="back" size={18} color={ct.ink} />
          </View>
        )}
      </Pressable>
    </View>
  );
}

/** The headline. Two lines, centred, serif — the dominant element (R8).
 *  The board writes "advanceded"; a typo is not a design (I1). */
export function Headline({ margin, height }: BlockProps) {
  return (
    <View style={{ marginHorizontal: margin, height, alignItems: 'center', justifyContent: 'center' }}>
      {headline.map((line) => (
        <T key={line} variant="display" style={{ textAlign: 'center' }}>
          {line}
        </T>
      ))}
    </View>
  );
}

type TabProps = { margin: number; height: number; value: string; onSelect: (id: string) => void };

/** Week / Month / Quarter. */
export function RangeTabs({ margin, height, value, onSelect }: TabProps) {
  return (
    <View
      style={{
        marginHorizontal: margin,
        height,
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 8,
      }}
    >
      {ranges.map((r) => {
        const on = r === value;
        return (
          <Pressable
            key={r}
            onPress={() => onSelect(r)}
            hitSlop={{ top: 8, bottom: 8, left: 4, right: 4 }}
            accessibilityRole="button"
            accessibilityState={{ selected: on }}
            accessibilityLabel={r}
          >
            {({ pressed }) => (
              <View
                style={{
                  height,
                  paddingHorizontal: 16,
                  borderRadius: height / 2,
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: on ? ct.dark : 'rgba(255,255,255,0.7)',
                  opacity: pressed ? 0.78 : 1,
                }}
              >
                <T variant={on ? 'tabOn' : 'tab'}>{r}</T>
              </View>
            )}
          </Pressable>
        );
      })}
    </View>
  );
}

type StripProps = { margin: number; height: number; disc: number; gap: number };

/**
 * The week.
 *
 * **This is the block that absorbs the screen's slack** (see `layout.ts`): the
 * columns' height comes from the layout as the remainder, which is the kind of
 * block I3 says to grow — unlike padding, which it forbids.
 *
 * The selected day's figure carries its unit. The board prints "2.5" with no
 * unit anywhere on the screen (R5: a unit, a count, a state).
 */
export function DayStrip({ margin, height, disc, gap }: StripProps) {
  const colH = height - 22;

  return (
    <View style={{ marginHorizontal: margin, height, flexDirection: 'row', gap }}>
      {days.map((d) => (
        <Pressable
          key={d.id}
          accessibilityRole="button"
          accessibilityState={{ selected: !!d.today }}
          accessibilityLabel={d.litres ? `${d.label}, ${d.litres} ${dayUnit}` : d.label}
          style={{ flex: 1 }}
        >
          {({ pressed }) => (
            <View style={{ flex: 1, alignItems: 'center', opacity: pressed ? 0.75 : 1 }}>
              <T variant="dayLabel">{d.label}</T>
              <View
                style={{
                  flex: 1,
                  width: '100%',
                  marginTop: 4,
                  borderRadius: disc / 2,
                  alignItems: 'center',
                  justifyContent: 'center',
                  backgroundColor: d.today ? 'transparent' : 'rgba(255,255,255,0.55)',
                }}
              >
                {d.today ? (
                  <View
                    style={{
                      width: disc,
                      height: Math.max(disc, colH * 0.6),
                      borderRadius: disc / 2,
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: ct.accentDeep,
                    }}
                  >
                    <T variant="dayOn">{d.label}</T>
                  </View>
                ) : null}
              </View>
              <View style={{ height: 16, justifyContent: 'center' }}>
                {d.litres ? (
                  <T variant="dayValue">{`${d.litres}${dayUnit}`}</T>
                ) : null}
              </View>
            </View>
          )}
        </Pressable>
      ))}
    </View>
  );
}

type ChipProps = { margin: number; height: number; rowH: number; gap: number };

/**
 * How the day felt.
 *
 * Laid out as two explicit rows rather than a wrap, so a reveal can stage one
 * chip at a time without the rest reflowing underneath it.
 */
export function SymptomChips({ margin, height, rowH, gap }: ChipProps) {
  const rows = [chips.slice(0, 3), chips.slice(3)];

  return (
    <View style={{ marginHorizontal: margin, height, gap }}>
      {rows.map((row) => (
        <View key={row[0]?.id ?? 'empty'} style={{ flexDirection: 'row', gap }}>
          {row.map((c) => (
            <Pressable
              key={c.id}
              hitSlop={{ top: 8, bottom: 8, left: 2, right: 2 }}
              accessibilityRole="button"
              accessibilityLabel={c.label}
            >
              {({ pressed }) => (
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 6,
                    height: rowH,
                    paddingHorizontal: 12,
                    borderRadius: rowH / 2,
                    backgroundColor: TINT[c.tint],
                    opacity: pressed ? 0.78 : 1,
                  }}
                >
                  <Glyph name={c.glyph} size={14} color={ct.ink} strokeWidth={1.6} />
                  <T variant="chip">{c.label}</T>
                </View>
              )}
            </Pressable>
          ))}
        </View>
      ))}
    </View>
  );
}

/** "Cycling Log". */
export function LogTitle({ margin, height }: BlockProps) {
  return (
    <View style={{ marginHorizontal: margin, height, alignItems: 'center', justifyContent: 'center' }}>
      <T variant="section">{logTitle}</T>
    </View>
  );
}

type PromoProps = { margin: number; height: number; radius: number; ctaH: number };

/**
 * The health prompt.
 *
 * **The fill is on an absolutely-filled child**, so a reveal that stages the
 * copy and the button does not open on a solid peach slab (§5.5 / I9).
 *
 * The board's own copy — "Control you're looking to track progress," — is a
 * sentence with no verb and a trailing comma. Rewritten as a label (R5, I1).
 */
export function PromoCard({ margin, height, radius, ctaH }: PromoProps) {
  return (
    <View style={{ marginHorizontal: margin, height, padding: 16 }}>
      <View
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          borderRadius: radius,
          backgroundColor: ct.accentSoft,
        }}
      />

      <View style={{ flexDirection: 'row', alignItems: 'flex-start', gap: 10 }}>
        <View style={{ flex: 1 }}>
          <T variant="promoTitle">{promo.title}</T>
          <T variant="promoLine">{promo.line}</T>
        </View>
        <Glyph name="sparkle" size={22} color={ct.accentDeep} />
      </View>

      <View style={{ flex: 1, justifyContent: 'flex-end' }}>
        <Pressable accessibilityRole="button" accessibilityLabel={promo.cta}>
          {({ pressed }) => (
            <View
              style={{
                height: ctaH,
                borderRadius: ctaH / 2,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: ct.white,
                opacity: pressed ? 0.85 : 1,
              }}
            >
              <T variant="promoCta">{promo.cta}</T>
            </View>
          )}
        </Pressable>
      </View>
    </View>
  );
}

type NoteProps = { margin: number; height: number; radius: number; gap: number };

/** Two small cards. Labels, never prose (R5). */
export function NoteRow({ margin, height, radius, gap }: NoteProps) {
  return (
    <View style={{ marginHorizontal: margin, height, flexDirection: 'row', gap }}>
      {notes.map((n) => (
        <View
          key={n.id}
          style={{
            flex: 1,
            borderRadius: radius,
            backgroundColor: ct.white,
            padding: 12,
            justifyContent: 'center',
            gap: 4,
          }}
        >
          <Glyph name={n.glyph} size={16} color={ct.accentDeep} />
          <T variant="noteTitle">{n.title}</T>
          <T variant="noteLine">{n.line}</T>
        </View>
      ))}
    </View>
  );
}
