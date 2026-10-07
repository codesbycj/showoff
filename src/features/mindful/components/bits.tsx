import { Pressable, Text, View, type ViewStyle } from 'react-native';

import { TABS } from '../data/nav';
import { LEVEL, R, SP, TYPE, mp } from '../theme';
import { Symbol } from './symbol';

/**
 * The obsidian pill that ends a screen.
 *
 * Two screens use it and they are not quite the same control, so the
 * differences are props rather than a second component:
 *
 * | | onboarding | check-in |
 * |---|---|---|
 * | box | `h-14 px-space-lg` | `py-4 px-6` |
 * | label | leading | centred |
 * | disc | 36dp, `on-primary/20` | 32dp, `surface-container-highest/20` |
 *
 * The check-in one centres its label by hanging a 24dp spacer opposite the
 * disc — the export's own trick, kept because a centred absolute label would
 * measure differently once the label got long.
 *
 * The fill sits on an inner `View`. A `Pressable` given a function style drops
 * it entirely in a static render, which costs the height and the black.
 */
export function PrimaryCta({
  label,
  onPress,
  centered = false,
  height = 56,
  discSize = 36,
  discFill = 'rgba(255,255,255,0.2)',
}: {
  label: string;
  onPress?: () => void;
  centered?: boolean;
  height?: number;
  discSize?: number;
  discFill?: string;
}) {
  return (
    <Pressable onPress={onPress}>
      <View
        style={{
          height,
          borderRadius: R.full,
          backgroundColor: mp.primary,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingHorizontal: SP.lg,
          ...LEVEL.card,
        }}
      >
        {centered ? <View style={{ width: 24 }} /> : null}
        <Text style={[TYPE.headlineMd, { color: mp.onPrimary }]}>{label}</Text>
        <View
          style={{
            width: discSize,
            height: discSize,
            borderRadius: R.full,
            backgroundColor: discFill,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Symbol name="arrowForward" size={20} color={mp.onPrimary} />
        </View>
      </View>
    </Pressable>
  );
}

/**
 * A small pill carrying a label, optionally with a leading dot or icon.
 *
 * This is the design's most repeated shape — it is the status chip, the
 * category tag, the "3 Tailored" counter and the onboarding hint, at four
 * different fills. Everything but the fill and the label is constant.
 */
export function Chip({
  label,
  fill = mp.surfaceContainer,
  color = mp.variant,
  dot,
  icon,
  iconColor,
  bold = false,
  style,
}: {
  label: string;
  fill?: string;
  color?: string;
  /** A leading 10dp dot, in this colour. */
  dot?: string;
  icon?: Parameters<typeof Symbol>[0]['name'];
  iconColor?: string;
  bold?: boolean;
  style?: ViewStyle;
}) {
  return (
    <View
      style={[
        {
          flexDirection: 'row',
          alignItems: 'center',
          gap: SP.xs,
          paddingHorizontal: SP.md,
          paddingVertical: SP.xs,
          borderRadius: R.full,
          backgroundColor: fill,
          alignSelf: 'flex-start',
        },
        style,
      ]}
    >
      {dot ? (
        <View style={{ width: 10, height: 10, borderRadius: R.full, backgroundColor: dot }} />
      ) : null}
      {icon ? <Symbol name={icon} size={14} color={iconColor ?? color} /> : null}
      <Text style={[bold ? TYPE.labelMdBold : TYPE.labelMd, { color }]}>{label}</Text>
    </View>
  );
}

/**
 * The floating navigation dock.
 *
 * An obsidian pill hovering over the scrolling content, centred rather than
 * stretched — it is only as wide as its four 48dp wells plus padding. The
 * design's one real shadow lives here; everywhere else depth comes from tonal
 * blocking.
 *
 * The active well takes `bg-surface/20`, which is the canvas colour at a fifth
 * opacity rather than plain white — on black those read almost the same, but
 * the canvas is warm and resolving it to white would cool the highlight.
 *
 * `alignSelf: 'center'` is what keeps the pill hugging its content. Giving the
 * row `justifyContent: 'center'` inside a full-width black pill instead would
 * look identical against a white page and wrong against everything else.
 */
export function TabBar({ active, onSelect }: { active: string; onSelect?: (key: string) => void }) {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        alignSelf: 'center',
        gap: SP.gutter,
        paddingHorizontal: SP.md,
        paddingVertical: SP.xs,
        borderRadius: R.full,
        backgroundColor: mp.primary,
        ...LEVEL.dock,
      }}
    >
      {TABS.map((t) => {
        const on = t.key === active;
        return (
          <Pressable key={t.key} onPress={() => onSelect?.(t.key)}>
            <View
              style={{
                width: 48,
                height: 48,
                borderRadius: R.full,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: on ? 'rgba(252,249,247,0.2)' : 'transparent',
              }}
            >
              <Symbol name={t.icon} size={22} color={on ? mp.onPrimary : 'rgba(255,255,255,0.6)'} />
            </View>
          </Pressable>
        );
      })}
    </View>
  );
}
