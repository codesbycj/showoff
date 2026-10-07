import { type ReactNode } from 'react';
import { Pressable, Text, View } from 'react-native';

import { Icon, type IconName } from './icon';
import { FONT, LEVEL, R, TYPE, nv } from '../theme';

/**
 * The small shared pieces every Nova screen reaches for. They live together
 * because each is a handful of lines and none of them is worth a file — a
 * screen importing six one-line components from six paths reads worse than
 * one import of the kit.
 */

/** The white circular header button: menu, scanner, bell, back, overflow. */
export function RoundButton({
  icon,
  glyph,
  size = 40,
  iconSize = 17,
  color = nv.ink,
  badge = false,
  onPress,
  label,
}: {
  icon?: IconName;
  glyph?: ReactNode;
  size?: number;
  iconSize?: number;
  color?: string;
  /** Draws the orange unread dot in the top-right. */
  badge?: boolean;
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
            backgroundColor: nv.surface,
            alignItems: 'center',
            justifyContent: 'center',
          },
          LEVEL.sm,
        ]}
      >
        {glyph ?? <Icon name={icon!} size={iconSize} color={color} />}

        {badge ? (
          <View
            style={{
              position: 'absolute',
              top: 8,
              right: 8,
              width: 8,
              height: 8,
              borderRadius: 4,
              backgroundColor: nv.alert,
              borderWidth: 2,
              borderColor: nv.surface,
            }}
          />
        ) : null}
      </View>
    </Pressable>
  );
}

/**
 * The two-bar hamburger in the dashboard and wallet headers.
 *
 * Both draw it as a long bar over a short one that is indented from the left,
 * which no icon set carries — Lucide's `Menu` is three equal bars. Drawn, so
 * the asymmetry survives.
 */
export function MenuGlyph({ color = nv.ink }: { color?: string }) {
  return (
    <View style={{ width: 18, gap: 6 }}>
      <View style={{ width: 18, height: 2, borderRadius: 1, backgroundColor: color }} />
      <View
        style={{ width: 11, height: 2, borderRadius: 1, backgroundColor: color, marginLeft: 7 }}
      />
    </View>
  );
}

/**
 * The gain/loss percentage pill.
 *
 * `tone` is derived from the sign by the caller rather than passed as a colour,
 * so a negative number can never be painted green.
 */
export function DeltaPill({
  value,
  up,
  size = 'md',
  onDark = false,
}: {
  value: string;
  up: boolean;
  size?: 'sm' | 'md';
  onDark?: boolean;
}) {
  if (onDark) {
    return (
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          gap: 4,
          backgroundColor: 'rgba(255,255,255,0.15)',
          paddingHorizontal: 10,
          paddingVertical: 5,
          borderRadius: 999,
        }}
      >
        <Icon name="arrowUp" size={12} color={nv.lime} strokeWidth={2.6} />
        <Text style={{ fontFamily: FONT.bold, fontSize: 11, lineHeight: 15, color: nv.lime }}>
          {value}
        </Text>
      </View>
    );
  }

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        gap: 2,
        alignSelf: 'flex-start',
        backgroundColor: up ? nv.gainBg : nv.lossBg,
        paddingHorizontal: size === 'sm' ? 6 : 8,
        paddingVertical: size === 'sm' ? 2 : 3,
        borderRadius: size === 'sm' ? R.sm : 999,
      }}
    >
      {/* One glyph, rotated — so a red pill can never show a rising arrow. */}
      <View style={{ transform: [{ rotate: up ? '0deg' : '180deg' }] }}>
        <Icon
          name="arrowUp"
          size={size === 'sm' ? 10 : 11}
          color={up ? nv.gainInk : nv.lossInk}
          strokeWidth={3}
        />
      </View>
      <Text
        style={{
          fontFamily: FONT.bold,
          fontSize: size === 'sm' ? 10 : 11,
          lineHeight: size === 'sm' ? 14 : 15,
          color: up ? nv.gainInk : nv.lossInk,
        }}
      >
        {value}
      </Text>
    </View>
  );
}

/** A section title with an optional action on the right. */
export function SectionHead({
  title,
  action,
  actionTone = nv.muted,
  onAction,
}: {
  title: string;
  action?: string;
  actionTone?: string;
  onAction?: () => void;
}) {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
      <Text style={[TYPE.heading, { color: nv.ink }]}>{title}</Text>

      {action ? (
        <Pressable onPress={onAction} accessibilityRole="button" disabled={!onAction}>
          <Text style={{ fontFamily: FONT.bold, fontSize: 12, lineHeight: 16, color: actionTone }}>
            {action}
          </Text>
        </Pressable>
      ) : null}
    </View>
  );
}

/** One pill on a horizontal filter rail. Dark when selected, white when not. */
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
            paddingVertical: 8,
            borderRadius: 999,
            backgroundColor: selected ? nv.ink : nv.surface,
          },
          !selected && { borderWidth: 1, borderColor: nv.border },
          LEVEL.sm,
        ]}
      >
        <Text
          style={{
            fontFamily: FONT.bold,
            fontSize: 12,
            lineHeight: 16,
            letterSpacing: -0.12,
            color: selected ? '#ffffff' : nv.muted,
          }}
        >
          {label}
        </Text>
      </View>
    </Pressable>
  );
}

/**
 * The screen title bar on the trade and activity screens — back, a centred
 * title, and one action. Flanking the title with two 40dp buttons puts it on
 * the screen's centre line without absolute positioning.
 */
export function ScreenHead({
  title,
  action,
  onBack,
  onAction,
}: {
  title: string;
  action?: IconName;
  onBack?: () => void;
  onAction?: () => void;
}) {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
      <RoundButton icon="back" onPress={onBack} label="Go back" />
      <Text style={[TYPE.headingLg, { color: nv.ink }]}>{title}</Text>
      {action ? (
        <RoundButton icon={action} onPress={onAction} label="Options" />
      ) : (
        <View style={{ width: 40 }} />
      )}
    </View>
  );
}
