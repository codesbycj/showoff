import { Pressable, Text, View } from 'react-native';
import Svg, { Circle, Path } from 'react-native-svg';

import {
  INSIGHTS,
  ZEN_FACE,
  type Correlation,
  type Practice,
  type ReflectionTag,
} from '../data/insights';
import { LEVEL, R, SP, TYPE, mp } from '../theme';
import { Symbol } from './symbol';

/** The screen's own header: coach badge, title with its AI pill, and a filter well. */
export function InsightsHeader({ onTune }: { onTune?: () => void }) {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingTop: SP.xs,
      }}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: SP.sm, flex: 1 }}>
        <View
          style={{
            width: 40,
            height: 40,
            borderRadius: R.full,
            backgroundColor: mp.secondaryContainer,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Symbol name="autoAwesome" size={20} color={mp.onSecondaryContainer} />
        </View>
        <View style={{ flex: 1 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
            <Text style={[TYPE.headlineMd, { color: mp.ink }]}>{INSIGHTS.title}</Text>
            <View
              style={{
                paddingHorizontal: SP.sm,
                paddingVertical: 2,
                borderRadius: R.full,
                backgroundColor: mp.tertiaryFixed,
              }}
            >
              <Text style={[TYPE.labelSm, { color: mp.onTertiaryFixed }]}>{INSIGHTS.badge}</Text>
            </View>
          </View>
          <Text style={[TYPE.bodyMd, { color: mp.variant }]}>{INSIGHTS.subtitle}</Text>
        </View>
      </View>

      <Pressable onPress={onTune}>
        <View
          style={{
            width: 40,
            height: 40,
            borderRadius: R.full,
            backgroundColor: mp.surfaceHigh,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Symbol name="tune" size={20} color={mp.ink} />
        </View>
      </Pressable>
    </View>
  );
}

/**
 * The emotional-pulse hero.
 *
 * Two decorative discs sit behind the content at `surface-container-lowest` on
 * 30% and 20% — a 128dp one hanging off the bottom-right corner and a 40dp one
 * near the top. The card clips them, which is the one place in this app a clip
 * is load-bearing: without it the big disc spills over the card's radius.
 *
 * It clips without `elevation`, deliberately. Pairing `overflow: 'hidden'` with
 * `elevation` on one Android view is unreliable, and this card is a flat tonal
 * block in a design that says it avoids shadows — so the clip wins and the
 * shadow goes.
 */
export function PulseHero() {
  return (
    <View
      style={{
        borderRadius: R.card,
        backgroundColor: mp.secondaryContainer,
        padding: SP.lg,
        overflow: 'hidden',
      }}
    >
      <View
        style={{
          position: 'absolute',
          right: -24,
          bottom: -24,
          width: 128,
          height: 128,
          borderRadius: R.full,
          backgroundColor: 'rgba(255,255,255,0.3)',
        }}
      />
      <View
        style={{
          position: 'absolute',
          right: 48,
          top: 16,
          width: 40,
          height: 40,
          borderRadius: R.full,
          backgroundColor: 'rgba(255,255,255,0.2)',
        }}
      />

      <View style={{ gap: SP.md }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
          }}
        >
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 6,
              paddingHorizontal: 12,
              paddingVertical: 4,
              borderRadius: R.full,
              backgroundColor: mp.surface,
              ...LEVEL.card,
            }}
          >
            <Symbol name="arrowBackIosNew" size={15} color={mp.onSecondaryContainer} />
            <Text style={[TYPE.labelMd, { color: mp.onSecondaryContainer }]}>
              {INSIGHTS.heroChip}
            </Text>
          </View>

          <View
            style={{
              width: 56,
              height: 56,
              borderRadius: R.full,
              backgroundColor: mp.surface,
              alignItems: 'center',
              justifyContent: 'center',
              ...LEVEL.card,
            }}
          >
            <Svg width={36} height={36} viewBox="0 0 36 36" fill="none">
              <Path
                d={ZEN_FACE.eyeL}
                stroke={ZEN_FACE.stroke}
                strokeWidth="2"
                strokeLinecap="round"
              />
              <Path
                d={ZEN_FACE.eyeR}
                stroke={ZEN_FACE.stroke}
                strokeWidth="2"
                strokeLinecap="round"
              />
              <Circle cx="10" cy="18" r="1.5" fill={ZEN_FACE.blush} />
              <Circle cx="26" cy="18" r="1.5" fill={ZEN_FACE.blush} />
              <Path
                d={ZEN_FACE.mouth}
                stroke={ZEN_FACE.stroke}
                strokeWidth="2"
                strokeLinecap="round"
              />
            </Svg>

            <View
              style={{
                position: 'absolute',
                top: -4,
                right: -4,
                width: 16,
                height: 16,
                borderRadius: R.full,
                backgroundColor: mp.secondary,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Symbol name="autoAwesome" size={10} color={mp.onSecondary} />
            </View>
          </View>
        </View>

        <View>
          <Text
            style={[
              TYPE.labelSm,
              { color: 'rgba(0,114,65,0.8)', textTransform: 'uppercase', marginBottom: 2 },
            ]}
          >
            {INSIGHTS.heroEyebrow}
          </Text>
          <Text style={[TYPE.headlineMd, { color: mp.onSecondaryContainer }]}>
            {INSIGHTS.heroBody}
          </Text>
        </View>

        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: SP.sm, paddingTop: 4 }}>
          {INSIGHTS.heroTags.map((t) => (
            <View
              key={t.key}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 4,
                paddingHorizontal: 10,
                paddingVertical: 4,
                borderRadius: R.full,
                backgroundColor: 'rgba(255,255,255,0.8)',
              }}
            >
              <Symbol name={t.icon} size={13} color={mp.onSecondaryContainer} />
              <Text style={[TYPE.labelSm, { color: mp.onSecondaryContainer }]}>{t.label}</Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
}

/** One micro-practice card. */
export function PracticeCard({ p, onPress }: { p: Practice; onPress?: () => void }) {
  return (
    <View
      style={{
        borderRadius: R.base,
        backgroundColor: p.fill,
        padding: SP.md,
        gap: SP.sm,
      }}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: SP.xs, flex: 1 }}>
          <View
            style={{
              paddingHorizontal: SP.sm,
              paddingVertical: 2,
              borderRadius: R.full,
              backgroundColor: mp.surface,
            }}
          >
            <Text style={[TYPE.labelSm, { color: p.ink }]}>{p.tag}</Text>
          </View>
          <Text style={[TYPE.labelSmMedium, { color: p.inkSoft }]}>{p.meta}</Text>
        </View>
        <View
          style={{
            width: 32,
            height: 32,
            borderRadius: R.full,
            backgroundColor: mp.surface,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Symbol name={p.icon} size={18} color={p.ink} />
        </View>
      </View>

      <View>
        <Text style={[TYPE.headlineMd, { color: p.ink }]}>{p.title}</Text>
        <Text style={[TYPE.bodyMd, { color: p.inkSoft }]}>{p.body}</Text>
      </View>

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingTop: 4,
          gap: SP.sm,
        }}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, flex: 1 }}>
          {p.noteDot ? (
            <View
              style={{ width: 8, height: 8, borderRadius: R.full, backgroundColor: p.noteDot }}
            />
          ) : null}
          {p.noteIcon ? <Symbol name={p.noteIcon} size={13} color={p.inkSoft} /> : null}
          <Text style={[TYPE.labelSmMedium, { color: p.inkSoft, flex: 1 }]}>{p.note}</Text>
        </View>

        <Pressable onPress={onPress}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: p.primary ? 6 : 4,
              paddingHorizontal: SP.md,
              paddingVertical: SP.sm,
              borderRadius: R.full,
              backgroundColor: p.primary ? mp.primary : mp.surface,
              ...LEVEL.card,
            }}
          >
            {p.primary ? <Symbol name={p.actionIcon} size={16} color={mp.onPrimary} /> : null}
            <Text style={[TYPE.labelMd, { color: p.primary ? mp.onPrimary : mp.ink }]}>
              {p.action}
            </Text>
            {p.primary ? null : <Symbol name={p.actionIcon} size={14} color={mp.ink} />}
          </View>
        </Pressable>
      </View>
    </View>
  );
}

/** One booster or drain row. */
function CorrelationRow({
  item,
  well,
  ink,
  chipFill,
  chipInk,
}: {
  item: Correlation;
  well: string;
  ink: string;
  chipFill: string;
  chipInk: string;
}) {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        padding: 10,
        borderRadius: R.base,
        backgroundColor: mp.surface,
      }}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: SP.sm, flex: 1 }}>
        <View
          style={{
            width: 28,
            height: 28,
            borderRadius: R.full,
            backgroundColor: well,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Symbol name={item.icon} size={16} color={ink} />
        </View>
        <Text style={[TYPE.bodyMd, { color: mp.ink, flex: 1 }]} numberOfLines={1}>
          {item.label}
        </Text>
      </View>
      <View
        style={{
          paddingHorizontal: SP.sm,
          paddingVertical: 2,
          borderRadius: R.full,
          backgroundColor: chipFill,
        }}
      >
        <Text style={[TYPE.labelSm, { color: chipInk }]}>{item.delta}</Text>
      </View>
    </View>
  );
}

/** The boosters-and-drains panel, with the coach's footnote. */
export function CorrelationPanel({
  boosters,
  drains,
}: {
  boosters: readonly Correlation[];
  drains: readonly Correlation[];
}) {
  const head = (
    icon: 'trendingUp' | 'trendingDown',
    color: string,
    title: string,
    note: string,
  ) => (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginBottom: 4,
      }}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
        <Symbol name={icon} size={16} color={color} />
        <Text style={[TYPE.labelMd, { color }]}>{title}</Text>
      </View>
      <Text style={[TYPE.labelSmMedium, { color: mp.variant }]}>{note}</Text>
    </View>
  );

  return (
    <View
      style={{
        borderRadius: R.base,
        backgroundColor: mp.surfaceLow,
        padding: SP.lg,
        gap: SP.md,
      }}
    >
      <View style={{ gap: SP.xs }}>
        {head('trendingUp', mp.secondary, INSIGHTS.boostersTitle, INSIGHTS.boostersNote)}
        {boosters.map((b) => (
          <CorrelationRow
            key={b.key}
            item={b}
            well={mp.secondaryFixed}
            ink={mp.onSecondaryFixed}
            chipFill={mp.secondaryContainer}
            chipInk={mp.onSecondaryContainer}
          />
        ))}
      </View>

      <View style={{ gap: SP.xs, paddingTop: 4 }}>
        {head('trendingDown', mp.error, INSIGHTS.drainsTitle, INSIGHTS.drainsNote)}
        {drains.map((d) => (
          <CorrelationRow
            key={d.key}
            item={d}
            well={mp.errorContainer}
            ink={mp.onErrorContainer}
            chipFill={mp.errorContainer}
            chipInk={mp.onErrorContainer}
          />
        ))}
      </View>

      <View
        style={{
          marginTop: 4,
          padding: SP.sm,
          borderRadius: R.base,
          backgroundColor: mp.surfaceContainer,
          flexDirection: 'row',
          alignItems: 'center',
          gap: SP.xs,
        }}
      >
        <Symbol name="lightbulb" size={18} color={mp.variant} />
        <Text style={[TYPE.labelSmMedium, { color: mp.variant, flex: 1 }]}>
          {INSIGHTS.coachNote}
        </Text>
      </View>
    </View>
  );
}

/**
 * The weekly reflection card.
 *
 * The note field is a drawn well rather than a `TextInput`: nothing here is
 * typed into during a recording, and a real input would take focus and raise
 * the keyboard the first time the screen is tapped.
 */
export function ReflectionCard({
  tags,
  selected,
  onToggle,
  onSave,
}: {
  tags: readonly ReflectionTag[];
  selected: readonly string[];
  onToggle?: (key: string) => void;
  onSave?: () => void;
}) {
  return (
    <View
      style={{
        borderRadius: R.base,
        backgroundColor: mp.surfaceLow,
        padding: SP.lg,
        gap: SP.md,
      }}
    >
      <View style={{ flexDirection: 'row', alignItems: 'flex-start', gap: SP.xs }}>
        <View
          style={{
            width: 32,
            height: 32,
            borderRadius: R.full,
            backgroundColor: mp.tertiaryFixed,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Symbol name="editNote" size={16} color={mp.onTertiaryFixed} />
        </View>
        <View style={{ flex: 1 }}>
          <Text style={[TYPE.headlineMd, { color: mp.ink }]}>{INSIGHTS.reflectionPrompt}</Text>
          <Text style={[TYPE.bodyMd, { color: mp.variant }]}>{INSIGHTS.reflectionSub}</Text>
        </View>
      </View>

      <View style={{ gap: 6 }}>
        <Text style={[TYPE.labelSmMedium, { color: mp.variant, textTransform: 'uppercase' }]}>
          {INSIGHTS.quickSelect}
        </Text>
        <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 6 }}>
          {tags.map((t) => {
            const on = selected.includes(t.key);
            return (
              <Pressable key={t.key} onPress={() => onToggle?.(t.key)}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    gap: 6,
                    paddingHorizontal: 12,
                    paddingVertical: 6,
                    borderRadius: R.full,
                    backgroundColor: on ? mp.primary : mp.surface,
                  }}
                >
                  <Symbol name={t.icon} size={14} color={on ? mp.onPrimary : mp.ink} />
                  <Text style={[TYPE.labelMd, { color: on ? mp.onPrimary : mp.ink }]}>
                    {t.label}
                  </Text>
                </View>
              </Pressable>
            );
          })}
        </View>
      </View>

      <View
        style={{
          borderRadius: R.base,
          backgroundColor: mp.surface,
          padding: SP.sm,
          minHeight: 72,
        }}
      >
        <Text style={[TYPE.bodyMd, { color: 'rgba(71,70,75,0.5)' }]}>{INSIGHTS.placeholder}</Text>
      </View>

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingTop: 4,
        }}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
          <Symbol name="lock" size={14} color={mp.variant} />
          <Text style={[TYPE.labelSmMedium, { color: mp.variant }]}>{INSIGHTS.privacy}</Text>
        </View>

        <Pressable onPress={onSave}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 6,
              paddingHorizontal: SP.lg,
              paddingVertical: 10,
              borderRadius: R.full,
              backgroundColor: mp.primary,
              ...LEVEL.card,
            }}
          >
            <Text style={[TYPE.labelMd, { color: mp.onPrimary }]}>{INSIGHTS.save}</Text>
            <Symbol name="check" size={16} color={mp.onPrimary} />
          </View>
        </Pressable>
      </View>
    </View>
  );
}

/** A section heading with an optional trailing note or chip. */
export function SectionHead({
  title,
  sub,
  note,
  chip,
}: {
  title: string;
  sub?: string;
  note?: string;
  chip?: string;
}) {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: SP.sm,
      }}
    >
      <View style={{ flex: 1 }}>
        <Text style={[TYPE.headlineMd, { color: mp.ink }]}>{title}</Text>
        {sub ? <Text style={[TYPE.bodyMd, { color: mp.variant }]}>{sub}</Text> : null}
      </View>

      {chip ? (
        <View
          style={{
            paddingHorizontal: 10,
            paddingVertical: 4,
            borderRadius: R.full,
            backgroundColor: mp.surfaceContainer,
          }}
        >
          <Text style={[TYPE.labelSmMedium, { color: mp.variant }]}>{chip}</Text>
        </View>
      ) : null}
      {note ? <Text style={[TYPE.labelSmMedium, { color: mp.variant }]}>{note}</Text> : null}
    </View>
  );
}
