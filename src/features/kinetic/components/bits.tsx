import { type ReactNode } from 'react';
import { Pressable, Text, View } from 'react-native';

import { Symbol } from './symbol';
import type { SymbolName } from '../symbols';
import { FONT, LEVEL, R, TYPE, kc } from '../theme';

/**
 * The small shared pieces every Kinetic screen reaches for. They live together
 * because each is a handful of lines and none is worth a file of its own — a
 * screen importing six one-line components from six paths reads worse than one
 * import of the kit.
 */

/** The top bar: a tinted truck glyph, the screen name, a bell and an avatar. */
export function AppHeader({
  title,
  onBell,
  onAvatar,
}: {
  title: string;
  onBell?: () => void;
  onAvatar?: () => void;
}) {
  return (
    <View
      style={{
        height: 64,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
        <View
          style={{
            width: 40,
            height: 40,
            borderRadius: 20,
            backgroundColor: kc.surfaceLow,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Symbol name="localShipping" size={22} color={kc.rust} />
        </View>

        <Text style={[TYPE.headlineSm, { color: kc.ink }]}>{title}</Text>
      </View>

      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
        <Pressable onPress={onBell} accessibilityRole="button" accessibilityLabel="Notifications">
          <View style={{ width: 44, height: 44, alignItems: 'center', justifyContent: 'center' }}>
            <Symbol name="notifications" size={22} color={kc.variant} />
          </View>
        </Pressable>

        <Pressable onPress={onAvatar} accessibilityRole="button" accessibilityLabel="Account">
          <View
            style={{
              width: 32,
              height: 32,
              borderRadius: 16,
              backgroundColor: kc.rust,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Symbol name="person" size={18} color={kc.onCoral} />
          </View>
        </Pressable>
      </View>
    </View>
  );
}

/** A circular white button with a soft lift — the map controls and row actions. */
export function RoundButton({
  icon,
  size = 44,
  iconSize = 22,
  color = kc.ink,
  fill = kc.surface,
  onPress,
  label,
}: {
  icon: SymbolName;
  size?: number;
  iconSize?: number;
  color?: string;
  fill?: string;
  onPress?: () => void;
  label?: string;
}) {
  return (
    <Pressable onPress={onPress} accessibilityRole="button" accessibilityLabel={label}>
      <View
        style={[
          {
            width: size,
            height: size,
            borderRadius: size / 2,
            backgroundColor: fill,
            alignItems: 'center',
            justifyContent: 'center',
          },
          LEVEL.card,
        ]}
      >
        <Symbol name={icon} size={iconSize} color={color} />
      </View>
    </Pressable>
  );
}

/**
 * The status pill in a card's top-right.
 *
 * The tone is a named status rather than a pair of colours, so a shipment
 * cannot be labelled "Delivered" in transit grey. `DELIVERED` also carries a
 * leading dot, which is the reference's way of marking a terminal state.
 */
export type StatusTone = 'transit' | 'process' | 'delivered' | 'urgent' | 'cancelled';

const TONES: Record<StatusTone, { bg: string; ink: string; dot?: boolean }> = {
  transit: { bg: kc.surfaceHigh, ink: kc.secondary },
  process: { bg: kc.processBg, ink: kc.processInk },
  delivered: { bg: kc.deliveredBg, ink: kc.deliveredInk, dot: true },
  urgent: { bg: kc.coralTint, ink: kc.rust },
  cancelled: { bg: kc.surfaceHigh, ink: kc.secondary },
};

export function StatusBadge({
  label,
  tone,
  caps = false,
}: {
  label: string;
  tone: StatusTone;
  /** The parcels screen sets its badges in small caps; the home card does not. */
  caps?: boolean;
}) {
  const t = TONES[tone];

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        gap: 5,
        alignSelf: 'flex-start',
        backgroundColor: t.bg,
        paddingHorizontal: 12,
        paddingVertical: 4,
        borderRadius: 999,
      }}
    >
      {t.dot ? (
        <View style={{ width: 6, height: 6, borderRadius: 3, backgroundColor: t.ink }} />
      ) : null}
      <Text
        style={{
          fontFamily: FONT.semibold,
          fontSize: caps ? 10 : 12,
          lineHeight: caps ? 14 : 16,
          letterSpacing: caps ? 0.5 : 0,
          textTransform: caps ? 'uppercase' : 'none',
          color: t.ink,
        }}
      >
        {label}
      </Text>
    </View>
  );
}

/** A section title with an optional action on the right. */
export function SectionHead({
  title,
  action,
  actionTone = kc.secondary,
  onAction,
}: {
  title: string;
  action?: string;
  actionTone?: string;
  onAction?: () => void;
}) {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
      <Text style={[TYPE.headlineSm, { color: kc.ink }]}>{title}</Text>

      {action ? (
        <Pressable onPress={onAction} accessibilityRole="button" disabled={!onAction}>
          <Text style={[TYPE.labelMd, { color: actionTone }]}>{action}</Text>
        </Pressable>
      ) : null}
    </View>
  );
}

/** One pill on a horizontal filter rail. Charcoal when selected, white when not. */
export function FilterChip({
  label,
  selected,
  onPress,
}: {
  label: string;
  selected?: boolean;
  onPress?: () => void;
}) {
  return (
    <Pressable onPress={onPress} accessibilityRole="button">
      <View
        style={[
          {
            paddingHorizontal: 16,
            paddingVertical: 9,
            borderRadius: 999,
            backgroundColor: selected ? kc.charcoal : kc.surface,
          },
          LEVEL.card,
        ]}
      >
        <Text style={[TYPE.labelMd, { color: selected ? kc.surface : kc.secondary }]}>{label}</Text>
      </View>
    </Pressable>
  );
}

/**
 * A filled or outlined action button — "Track Live", "Details", "Contact
 * Courier". `tone` picks the fill; the label and icon follow from it, so a
 * coral button can never end up with coral text on it.
 */
export function ActionButton({
  label,
  icon,
  tone = 'coral',
  flex,
  compact = false,
  onPress,
}: {
  label: string;
  icon?: SymbolName;
  tone?: 'coral' | 'charcoal' | 'muted';
  /** Pass 1 to share a row, or leave unset to size to content. */
  flex?: number;
  /** Tighter padding and a 12dp label, for a long label in a narrow column. */
  compact?: boolean;
  onPress?: () => void;
}) {
  const fill = tone === 'coral' ? kc.coral : tone === 'charcoal' ? kc.charcoal : kc.surfaceLow;
  const ink = tone === 'muted' ? kc.ink : kc.onCoral;

  return (
    <Pressable style={flex ? { flex } : undefined} onPress={onPress} accessibilityRole="button">
      <View
        style={[
          {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 8,
            paddingVertical: compact ? 13 : 14,
            paddingHorizontal: compact ? 12 : 18,
            borderRadius: 999,
            backgroundColor: fill,
          },
          tone === 'coral' && LEVEL.fab,
        ]}
      >
        {icon ? <Symbol name={icon} size={compact ? 16 : 18} color={ink} /> : null}
        <Text numberOfLines={1} style={[compact ? TYPE.labelMd : TYPE.labelLg, { color: ink }]}>
          {label}
        </Text>
      </View>
    </Pressable>
  );
}

/** A white card — the container almost everything on the light screens sits in. */
export function Card({
  children,
  padding = SPACING_MD,
  radius = R.card,
  style,
}: {
  children: ReactNode;
  padding?: number;
  radius?: number;
  style?: object;
}) {
  return (
    <View
      style={[
        {
          backgroundColor: kc.surface,
          borderRadius: radius,
          padding,
        },
        LEVEL.card,
        style,
      ]}
    >
      {children}
    </View>
  );
}

const SPACING_MD = 16;
