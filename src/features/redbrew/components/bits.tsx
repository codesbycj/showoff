import { type ReactNode } from 'react';
import { Image } from 'expo-image';
import { Pressable, Text, View } from 'react-native';

import { BrandMark } from './brand-mark';
import { Symbol } from './symbol';
import { TABS, type TabKey } from '../data/nav';
import type { SymbolName } from '../symbols';
import { FONT, LEVEL, R, SP, TYPE, rb } from '../theme';

/**
 * The small shared pieces every Red Brew screen reaches for. They live together
 * because each is a handful of lines and none is worth a file of its own — a
 * screen importing six one-line components from six paths reads worse than one
 * import of the kit.
 */

/** How much room a screen leaves below its content for the tab bar. */
export const TABBAR_CLEARANCE = 84;

/**
 * The app header: the brand lockup with the current section after a slash, a
 * store picker beneath it, a bell and an avatar.
 *
 * The lockup and the section title share one `Text` so the slash sits on their
 * baseline — as two flex children it rides high against the heavier wordmark.
 */
export function AppHeader({
  section,
  store,
  avatar,
  onBell,
  onAvatar,
  onStore,
}: {
  section: string;
  store: string;
  avatar: number;
  onBell?: () => void;
  onAvatar?: () => void;
  onStore?: () => void;
}) {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: SP.md,
      }}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, flex: 1 }}>
        <BrandMark size={26} />

        <View style={{ flex: 1 }}>
          <Text
            style={{
              fontFamily: FONT.displayBold,
              fontSize: 17,
              lineHeight: 22,
              letterSpacing: -0.3,
              color: rb.crimson,
            }}
            numberOfLines={1}
          >
            RED BREW <Text style={{ color: rb.surfaceDim }}>/</Text>
            <Text style={{ color: rb.ink }}> {section}</Text>
          </Text>

          <Pressable onPress={onStore} accessibilityRole="button">
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 3, marginTop: 1 }}>
              <Symbol name="nearMe" size={13} color={rb.crimson} />
              <Text style={[TYPE.labelMd, { color: rb.secondary }]} numberOfLines={1}>
                {store}
              </Text>
              <Symbol name="expandMore" size={15} color={rb.secondary} />
            </View>
          </Pressable>
        </View>
      </View>

      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
        <Pressable onPress={onBell} accessibilityRole="button" accessibilityLabel="Notifications">
          <View style={{ width: 32, height: 32, alignItems: 'center', justifyContent: 'center' }}>
            <Symbol name="notifications" size={24} color={rb.ink} />
            <View
              style={{
                position: 'absolute',
                top: 2,
                right: 2,
                width: 9,
                height: 9,
                borderRadius: 5,
                backgroundColor: rb.crimson,
                borderWidth: 1.5,
                borderColor: rb.bg,
              }}
            />
          </View>
        </Pressable>

        <Pressable onPress={onAvatar} accessibilityRole="button" accessibilityLabel="Account">
          <Image
            source={avatar}
            style={{
              width: 38,
              height: 38,
              borderRadius: 19,
              borderWidth: 2,
              borderColor: rb.surfaceHigh,
            }}
            contentFit="cover"
          />
        </Pressable>
      </View>
    </View>
  );
}

/** A white card — the container almost everything sits in. */
export function Card({
  children,
  padding = SP.gutter,
  radius = R.lg,
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
          backgroundColor: rb.surface,
          borderRadius: radius,
          padding,
          borderWidth: 1,
          borderColor: rb.hairline,
        },
        LEVEL.card,
        style,
      ]}
    >
      {children}
    </View>
  );
}

/**
 * A small tinted chip — promo, status, count.
 *
 * `tone` is a named role rather than a pair of colours, so a "Delivered" badge
 * cannot be painted amber or a "Brewing" one mint.
 */
export type ChipTone = 'crimson' | 'mint' | 'amber' | 'neutral' | 'crimsonSoft';

const TONES: Record<ChipTone, { bg: string; ink: string }> = {
  crimson: { bg: rb.crimson, ink: rb.onCrimson },
  crimsonSoft: { bg: rb.crimsonTint, ink: rb.crimsonDeep },
  mint: { bg: rb.mintTint, ink: '#047857' },
  amber: { bg: rb.amberTint, ink: '#b45309' },
  neutral: { bg: rb.surfaceHigh, ink: rb.secondary },
};

export function Chip({
  label,
  tone = 'neutral',
  icon,
  caps = false,
  dot = false,
}: {
  label: string;
  tone?: ChipTone;
  icon?: SymbolName;
  caps?: boolean;
  dot?: boolean;
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
        paddingHorizontal: 10,
        paddingVertical: 4,
        borderRadius: 999,
      }}
    >
      {dot ? (
        <View style={{ width: 6, height: 6, borderRadius: 3, backgroundColor: t.ink }} />
      ) : null}
      {icon ? <Symbol name={icon} size={13} color={t.ink} /> : null}
      <Text
        style={[
          caps ? TYPE.labelSm : TYPE.labelMd,
          { color: t.ink, textTransform: caps ? 'uppercase' : 'none' },
        ]}
      >
        {label}
      </Text>
    </View>
  );
}

/**
 * The crimson pill CTA, with an optional price on its right.
 *
 * The spec gives this a fixed 52dp height and a divider between label and
 * price, so `price` is a separate prop rather than part of the label — that way
 * the divider only appears when there is something to divide.
 */
export function PrimaryCta({
  label,
  price,
  icon,
  trailingIcon,
  onPress,
}: {
  label: string;
  price?: string;
  icon?: SymbolName;
  trailingIcon?: SymbolName;
  onPress?: () => void;
}) {
  return (
    <Pressable onPress={onPress} accessibilityRole="button">
      <View
        style={[
          {
            height: 52,
            borderRadius: 999,
            backgroundColor: rb.crimson,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: price ? 'space-between' : 'center',
            paddingHorizontal: 24,
            gap: 10,
          },
          LEVEL.cta,
        ]}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
          {icon ? <Symbol name={icon} size={18} color={rb.onCrimson} /> : null}
          <Text style={[TYPE.titleMd, { color: rb.onCrimson }]}>{label}</Text>
        </View>

        {price ? (
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
            <Text style={[TYPE.titleMd, { color: rb.onCrimson }]}>{price}</Text>
            {trailingIcon ? <Symbol name={trailingIcon} size={18} color={rb.onCrimson} /> : null}
          </View>
        ) : trailingIcon ? (
          <Symbol name={trailingIcon} size={18} color={rb.onCrimson} />
        ) : null}
      </View>
    </Pressable>
  );
}

/** A section title with an optional action on the right. */
export function SectionHead({
  title,
  action,
  actionIcon,
  actionTone = rb.crimson,
  chip,
  onAction,
}: {
  title: string;
  action?: string;
  actionIcon?: SymbolName;
  actionTone?: string;
  chip?: ReactNode;
  onAction?: () => void;
}) {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
        <Text style={[TYPE.headlineMd, { color: rb.ink }]}>{title}</Text>
        {chip}
      </View>

      {action ? (
        <Pressable onPress={onAction} accessibilityRole="button" disabled={!onAction}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 2 }}>
            <Text style={[TYPE.labelLg, { color: actionTone }]}>{action}</Text>
            {actionIcon ? <Symbol name={actionIcon} size={16} color={actionTone} /> : null}
          </View>
        </Pressable>
      ) : null}
    </View>
  );
}

/** One pill on a horizontal filter rail. Crimson when selected, white when not. */
export function FilterChip({
  label,
  icon,
  selected,
  onPress,
}: {
  label: string;
  icon?: SymbolName;
  selected?: boolean;
  onPress?: () => void;
}) {
  return (
    <Pressable onPress={onPress} accessibilityRole="button">
      <View
        style={[
          {
            flexDirection: 'row',
            alignItems: 'center',
            gap: 6,
            paddingHorizontal: 16,
            paddingVertical: 10,
            borderRadius: 999,
            backgroundColor: selected ? rb.crimson : rb.surface,
            borderWidth: 1,
            borderColor: selected ? rb.crimson : rb.hairline,
          },
          !selected && LEVEL.card,
        ]}
      >
        {icon ? (
          <Symbol name={icon} size={15} color={selected ? rb.onCrimson : rb.secondary} />
        ) : null}
        <Text style={[TYPE.labelLg, { color: selected ? rb.onCrimson : rb.ink }]}>{label}</Text>
      </View>
    </Pressable>
  );
}

/**
 * The bottom tab bar.
 *
 * Flat against the bottom edge rather than a floating capsule — that is what
 * the reference draws, and it is the only dock in this set of showcases that
 * is not detached. The cart tab carries a count badge.
 */
export function TabBar({ active, onSelect }: { active: TabKey; onSelect?: (key: TabKey) => void }) {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: rb.bg,
        borderTopWidth: 1,
        borderTopColor: rb.surfaceHigh,
        paddingTop: 10,
      }}
    >
      {TABS.map((tab) => {
        const on = tab.key === active;

        return (
          <Pressable
            key={tab.key}
            style={{ flex: 1 }}
            onPress={() => onSelect?.(tab.key)}
            accessibilityRole="button"
            accessibilityLabel={tab.label}
            accessibilityState={{ selected: on }}
          >
            <View style={{ alignItems: 'center', gap: 3 }}>
              <View>
                <Symbol name={tab.icon} size={24} color={on ? rb.crimson : rb.secondary} />

                {tab.badge ? (
                  <View
                    style={{
                      position: 'absolute',
                      top: -5,
                      right: -9,
                      minWidth: 17,
                      height: 17,
                      borderRadius: 9,
                      paddingHorizontal: 4,
                      backgroundColor: rb.crimson,
                      alignItems: 'center',
                      justifyContent: 'center',
                      borderWidth: 1.5,
                      borderColor: rb.bg,
                    }}
                  >
                    <Text style={{ fontFamily: FONT.bold, fontSize: 9, color: rb.onCrimson }}>
                      {tab.badge}
                    </Text>
                  </View>
                ) : null}
              </View>

              <Text style={[TYPE.labelMd, { color: on ? rb.crimson : rb.secondary }]}>
                {tab.label}
              </Text>
            </View>
          </Pressable>
        );
      })}
    </View>
  );
}
