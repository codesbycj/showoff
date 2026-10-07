import { Image, Pressable, Text, View } from 'react-native';

import type { Metric, MoodChip } from '../data/home';
import { LEVEL, R, SP, TYPE, mp } from '../theme';
import { MoodGlyph } from './mood-glyphs';
import { Symbol } from './symbol';

/** The avatar row: portrait, eyebrow over name, and the menu well. */
export function ProfileHeader({
  eyebrow,
  name,
  avatar,
  onMenu,
  onAvatar,
}: {
  eyebrow: string;
  name: string;
  avatar: number;
  onMenu?: () => void;
  onAvatar?: () => void;
}) {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: SP.sm, flex: 1 }}>
        <Pressable onPress={onAvatar}>
          <Image
            source={avatar}
            style={{
              width: 48,
              height: 48,
              borderRadius: R.full,
              backgroundColor: mp.surfaceHigh,
            }}
          />
        </Pressable>
        <View style={{ flex: 1 }}>
          <Text style={[TYPE.labelSm, { color: mp.variant, textTransform: 'uppercase' }]}>
            {eyebrow}
          </Text>
          <Text style={[TYPE.headlineMd, { color: mp.ink }]} numberOfLines={1}>
            {name}
          </Text>
        </View>
      </View>

      <Pressable onPress={onMenu}>
        <View
          style={{
            width: 44,
            height: 44,
            borderRadius: R.full,
            backgroundColor: mp.surfaceContainer,
            alignItems: 'center',
            justifyContent: 'center',
            ...LEVEL.card,
          }}
        >
          <Symbol name="menu" size={22} color={mp.ink} />
        </View>
      </Pressable>
    </View>
  );
}

/**
 * One mood chip — a white pill holding a coloured well and a label.
 *
 * These sit in a horizontal scroll view and the reference shows the fourth one
 * clipped by the right edge, which is the tell that it scrolls rather than
 * wraps. The chip therefore never shrinks: it is sized by its content and the
 * row overflows.
 */
export function MoodChipButton({ chip, onPress }: { chip: MoodChip; onPress?: () => void }) {
  return (
    <Pressable onPress={onPress}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          gap: SP.xs,
          paddingVertical: SP.xs,
          paddingHorizontal: SP.md,
          borderRadius: R.full,
          backgroundColor: mp.surface,
          ...LEVEL.card,
        }}
      >
        <View
          style={{
            width: 32,
            height: 32,
            borderRadius: R.full,
            backgroundColor: chip.well,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <MoodGlyph kind={chip.key} color={chip.ink} />
        </View>
        <Text style={[TYPE.labelMdBold, { color: mp.ink, paddingRight: 4 }]}>{chip.label}</Text>
      </View>
    </Pressable>
  );
}

/**
 * A metric tile — icon and title, a bar chart, then the readout.
 *
 * The bars are a fixed 64dp well with each bar a percentage of it, which is how
 * the export writes them. They are 10dp wide and fully rounded, so a short bar
 * is a capsule rather than a sliver.
 *
 * The tile deliberately does not set `overflow: 'hidden'`. The export does, to
 * clip a decorative blob it never actually draws, and pairing a clip with
 * `elevation` on one Android view is unreliable — the card either loses its
 * shadow or its corners.
 */
export function MetricTile({ metric }: { metric: Metric }) {
  return (
    <View
      style={{
        flex: 1,
        padding: SP.md,
        borderRadius: R.card,
        backgroundColor: metric.fill,
        justifyContent: 'space-between',
        ...LEVEL.card,
      }}
    >
      <View style={{ gap: SP.xs }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: SP.xs }}>
          <Symbol name={metric.icon} size={18} color={metric.ink} />
          <Text style={[TYPE.labelMdBold, { color: metric.ink, flex: 1 }]}>{metric.title}</Text>
        </View>

        <View
          style={{
            height: 64,
            flexDirection: 'row',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            paddingHorizontal: 4,
            paddingTop: SP.sm,
            gap: 4,
          }}
        >
          {metric.bars.map((b, i) => (
            <View
              key={i}
              style={{
                width: 10,
                height: `${b.h * 100}%`,
                borderRadius: R.full,
                backgroundColor: metric.bar,
                opacity: b.o,
              }}
            />
          ))}
        </View>
      </View>

      <View style={{ flexDirection: 'row', alignItems: 'baseline', gap: 4, paddingTop: SP.sm }}>
        <Text style={[TYPE.displayStat, { color: metric.statColor }]}>{metric.stat}</Text>
        {metric.statUnit ? (
          <Text style={[TYPE.headlineMd, { color: mp.variant }]}>{metric.statUnit}</Text>
        ) : null}
      </View>
    </View>
  );
}

/** The mint quiz card: eyebrow and counter, the question, then Yes / No. */
export function QuizCard({
  eyebrow,
  counter,
  question,
  yes,
  no,
  onAnswer,
}: {
  eyebrow: string;
  counter: string;
  question: string;
  yes: string;
  no: string;
  onAnswer?: (answer: 'yes' | 'no') => void;
}) {
  return (
    <View
      style={{
        padding: SP.lg,
        borderRadius: R.card,
        backgroundColor: mp.secondaryContainer,
        gap: SP.md,
        ...LEVEL.card,
      }}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: SP.xs, flex: 1 }}>
          <Symbol name="psychiatry" size={20} color={mp.onSecondaryContainer} />
          <Text
            style={[TYPE.labelSm, { color: mp.onSecondaryContainer, textTransform: 'uppercase' }]}
          >
            {eyebrow}
          </Text>
        </View>
        <View
          style={{
            paddingHorizontal: SP.xs,
            paddingVertical: 2,
            borderRadius: R.full,
            backgroundColor: mp.secondary,
          }}
        >
          <Text style={[TYPE.labelSm, { color: mp.onSecondary }]}>{counter}</Text>
        </View>
      </View>

      <Text style={[TYPE.headlineMd, { color: mp.onSecondaryFixed }]}>{question}</Text>

      <View style={{ flexDirection: 'row', gap: SP.sm, paddingTop: SP.xs }}>
        {[
          { key: 'yes' as const, label: yes, opacity: 1 },
          { key: 'no' as const, label: no, opacity: 0.8 },
        ].map((b) => (
          <Pressable key={b.key} style={{ flex: 1 }} onPress={() => onAnswer?.(b.key)}>
            <View
              style={{
                paddingVertical: SP.sm,
                paddingHorizontal: SP.md,
                borderRadius: R.full,
                backgroundColor: mp.primary,
                opacity: b.opacity,
                alignItems: 'center',
                ...LEVEL.card,
              }}
            >
              <Text style={[TYPE.labelMdBold, { color: mp.onPrimary }]}>{b.label}</Text>
            </View>
          </Pressable>
        ))}
      </View>
    </View>
  );
}

/** The white summary row that closes the dashboard. */
export function RoutineRow({
  title,
  sub,
  onPress,
}: {
  title: string;
  sub: string;
  onPress?: () => void;
}) {
  return (
    <Pressable onPress={onPress}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: SP.md,
          borderRadius: R.card,
          backgroundColor: mp.surface,
          ...LEVEL.card,
        }}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: SP.sm, flex: 1 }}>
          <View
            style={{
              width: 40,
              height: 40,
              borderRadius: R.full,
              backgroundColor: mp.surfaceContainer,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Symbol name="insights" size={20} color={mp.ink} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={[TYPE.labelMdBold, { color: mp.ink }]}>{title}</Text>
            <Text style={[TYPE.labelSmMedium, { color: mp.variant }]}>{sub}</Text>
          </View>
        </View>

        <View
          style={{
            width: 32,
            height: 32,
            borderRadius: R.full,
            backgroundColor: mp.primary,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Symbol name="arrowForward" size={18} color={mp.onPrimary} />
        </View>
      </View>
    </Pressable>
  );
}
