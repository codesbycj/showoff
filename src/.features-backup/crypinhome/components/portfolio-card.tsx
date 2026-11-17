import { Pressable, View } from 'react-native';

import { actions, changePct, pct, portfolio, usd } from '../data/wallet';
import { ct } from '../theme';
import { Glyph } from './glyph';
import { T } from './text';

/** One round action under the portfolio figure. */
function Action({
  label,
  glyph,
  size,
}: {
  label: string;
  glyph: 'plus' | 'minus' | 'receive' | 'more';
  size: number;
}) {
  return (
    <Pressable
      style={{ alignItems: 'center', gap: 8 }}
      accessibilityRole="button"
      accessibilityLabel={label}
    >
      {({ pressed }) => (
        <>
          <View
            style={{
              width: size,
              height: size,
              borderRadius: size / 2,
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: ct.disc,
              opacity: pressed ? 0.6 : 1,
            }}
          >
            <Glyph name={glyph} size={19} color={ct.ink} strokeWidth={2} />
          </View>
          <T variant="actionLabel">{label}</T>
        </>
      )}
    </Pressable>
  );
}

type Props = { margin: number; height: number; radius: number; action: number };

/**
 * Portfolio value, its change, and the four things you can do with it.
 *
 * **A translucent panel, not a green fill.** The reference's card sits *over* a
 * green bloom in the background (see `glow.tsx`) and only tints what is behind
 * it. Giving the card its own green gradient — the first pass — produced a flat
 * slab with hard edges and lost the whole atmosphere of the design.
 *
 * The figure is the screen's dominant element (R8): 36dp extra-bold against a
 * 12dp label, everything below visibly subordinate.
 *
 * Both the total and the percentage are computed in `data/wallet.ts` from the
 * holdings under them, never typed — the reference's own "+1.74%" does not
 * follow from its "+$214.67" (R9).
 */
export function PortfolioCard({ margin, height, radius, action }: Props) {
  const total = usd(portfolio.total);
  const [whole, cents] = total.split('.');

  return (
    <View style={{ marginHorizontal: margin, height, paddingTop: 18, paddingBottom: 16 }}>
      <View
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          borderRadius: radius,
          backgroundColor: ct.hero,
          borderWidth: 1,
          borderColor: ct.heroEdge,
        }}
      />

      <View style={{ alignItems: 'center', gap: 2 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
          <T variant="heroLabel">{portfolio.label}</T>
          <Glyph name="eye" size={13} color={ct.sub} strokeWidth={1.7} />
        </View>

        <View style={{ flexDirection: 'row', alignItems: 'baseline' }}>
          <T variant="heroValue">{whole}</T>
          <T variant="heroCents">.{cents}</T>
        </View>

        <Pressable
          hitSlop={10}
          accessibilityRole="button"
          accessibilityLabel={`Up ${usd(portfolio.changeAbs)}, ${pct(changePct)}`}
          style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}
        >
          <Glyph name="trendUp" size={13} color={ct.up} strokeWidth={2.1} />
          <T variant="heroChange">
            +{usd(portfolio.changeAbs)} ({pct(changePct)})
          </T>
          <Glyph name="chevronRight" size={12} color={ct.up} strokeWidth={2.1} />
        </Pressable>
      </View>

      <View
        style={{
          flex: 1,
          flexDirection: 'row',
          justifyContent: 'space-around',
          alignItems: 'flex-end',
        }}
      >
        {actions.map((a) => (
          <Action key={a.id} label={a.label} glyph={a.glyph} size={action} />
        ))}
      </View>
    </View>
  );
}
