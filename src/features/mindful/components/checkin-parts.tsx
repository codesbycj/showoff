import { Image, Pressable, Text, View } from 'react-native';
import Svg, { Ellipse, Path } from 'react-native-svg';

import { CHECKIN, ENERGY, REST, type CheckinMood, type Trigger } from '../data/checkin';
import { LEVEL, R, SP, TYPE, mp } from '../theme';
import { Symbol } from './symbol';

/**
 * The parametric mood face.
 *
 * Three paths and two cheeks in an 80-unit box. Every one of the five moods is
 * the same drawing with different `d` strings, which is how the export models it
 * and why the hero and the chip badge can be one component at two sizes.
 *
 * The cheeks are `currentColor` at 0.18 in the export; react-native-svg has no
 * `currentColor`, so the colour is passed down explicitly.
 */
export function MoodFaceGlyph({
  mood,
  size,
  color = mp.ink,
}: {
  mood: CheckinMood;
  size: number;
  color?: string;
}) {
  const stroke = {
    stroke: color,
    strokeWidth: 4.5,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
  };
  return (
    <Svg width={size} height={size} viewBox="0 0 80 80" fill="none">
      <Path d={mood.eyeL} {...stroke} />
      <Path d={mood.eyeR} {...stroke} />
      <Path d={mood.mouth} {...stroke} />
      <Ellipse cx="22" cy="42" rx="4" ry="2" fill={color} opacity={0.18} />
      <Ellipse cx="58" cy="42" rx="4" ry="2" fill={color} opacity={0.18} />
    </Svg>
  );
}

/** Back arrow, title, and the account disc. */
export function CheckinHeader({
  title,
  onBack,
  onAccount,
}: {
  title: string;
  onBack?: () => void;
  onAccount?: () => void;
}) {
  return (
    <View
      style={{
        height: 56,
        paddingHorizontal: SP.marginSm,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: SP.xs, flex: 1 }}>
        <Pressable onPress={onBack}>
          <View
            style={{
              width: 44,
              height: 44,
              borderRadius: R.full,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Symbol name="arrowBack" size={24} color={mp.ink} />
          </View>
        </Pressable>
        <Text style={[TYPE.headlineMd, { color: mp.ink }]} numberOfLines={1}>
          {title}
        </Text>
      </View>

      <Pressable onPress={onAccount}>
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
          <Symbol name="person" size={18} color={mp.onPrimary} />
        </View>
      </Pressable>
    </View>
  );
}

/**
 * The mint hero: eyebrow, the live mood name, the big face, and the five chips.
 *
 * The hero circle is `secondary-fixed` on the card's `secondary-container` —
 * two greens four points apart, so it reads as a barely-there disc rather than
 * a distinct shape. That is the design's intent and not a rendering fault, so
 * the values are kept exact rather than pushed apart to "look right".
 *
 * The chips share the row equally (`flex-1`), which is what keeps five of them
 * inside 361dp without scrolling.
 */
export function MoodHero({
  moods,
  active,
  onSelect,
}: {
  moods: readonly CheckinMood[];
  active: CheckinMood;
  onSelect?: (m: CheckinMood) => void;
}) {
  return (
    <View
      style={{
        alignItems: 'center',
        backgroundColor: mp.secondaryContainer,
        borderRadius: R.card,
        padding: SP.lg,
      }}
    >
      <View
        style={{
          width: '100%',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: SP.sm,
        }}
      >
        <Text
          style={[
            TYPE.labelSm,
            { color: 'rgba(0,114,65,0.8)', textTransform: 'uppercase', flex: 1 },
          ]}
        >
          {CHECKIN.heroEyebrow}
        </Text>
        <View
          style={{
            paddingHorizontal: 12,
            paddingVertical: 4,
            borderRadius: R.full,
            backgroundColor: mp.surface,
            ...LEVEL.card,
          }}
        >
          <Text style={[TYPE.labelMd, { color: mp.ink }]}>{active.title}</Text>
        </View>
      </View>

      <View
        style={{
          width: 112,
          height: 112,
          borderRadius: R.full,
          backgroundColor: active.fill,
          alignItems: 'center',
          justifyContent: 'center',
          marginVertical: SP.sm,
          ...LEVEL.card,
        }}
      >
        <MoodFaceGlyph mood={active} size={80} />
      </View>

      <View
        style={{
          width: '100%',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 6,
          marginTop: SP.sm,
        }}
      >
        {moods.map((m) => {
          const on = m.key === active.key;
          return (
            <Pressable key={m.key} style={{ flex: 1 }} onPress={() => onSelect?.(m)}>
              <View
                style={{
                  paddingVertical: SP.sm,
                  paddingHorizontal: 10,
                  borderRadius: R.full,
                  backgroundColor: on ? mp.surface : 'rgba(255,255,255,0.7)',
                  alignItems: 'center',
                  gap: 4,
                  ...(on ? LEVEL.card : null),
                }}
              >
                <View
                  style={{
                    width: 24,
                    height: 24,
                    borderRadius: R.full,
                    backgroundColor: m.fill,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  {m.badge.kind === 'face' ? <MoodFaceGlyph mood={m} size={18} /> : null}
                  {m.badge.kind === 'icon' ? (
                    <Symbol name={m.badge.name} size={15} color={mp.ink} />
                  ) : null}
                  {m.badge.kind === 'text' ? (
                    <Text style={[TYPE.labelSm, { color: mp.ink, fontSize: 13 }]}>
                      {m.badge.ch}
                    </Text>
                  ) : null}
                </View>
                <Text style={[TYPE.labelSm, { color: mp.ink }]}>{m.label}</Text>
              </View>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
}

/**
 * The intensity slider.
 *
 * Drawn rather than wired to a gesture: it is a 12dp track with a 20dp obsidian
 * thumb, and the thumb's centre is placed as a fraction of the track. Its inset
 * is half the thumb so the thumb stays inside the track at either end, which is
 * what a real range input does and what the reference shows at level 7.
 */
export function IntensityCard({
  label,
  value,
  min,
  max,
  scale,
}: {
  label: string;
  value: number;
  min: number;
  max: number;
  scale: readonly string[];
}) {
  const t = (value - min) / (max - min);
  const THUMB = 20;

  return (
    <View
      style={{
        backgroundColor: mp.surfaceLow,
        borderRadius: R.card,
        padding: SP.md,
        gap: SP.sm,
      }}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <Text style={[TYPE.labelMd, { color: mp.ink }]}>{label}</Text>
        <Text style={[TYPE.headlineMd, { color: mp.secondary }]}>Level {value}</Text>
      </View>

      <View style={{ paddingVertical: SP.sm, justifyContent: 'center' }}>
        <View
          style={{
            height: 12,
            borderRadius: R.full,
            backgroundColor: mp.surfaceHighest,
          }}
        />
        <View
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            top: 0,
            bottom: 0,
            justifyContent: 'center',
            paddingHorizontal: THUMB / 2,
          }}
        >
          <View style={{ marginLeft: `${t * 100}%` }}>
            <View
              style={{
                width: THUMB,
                height: THUMB,
                borderRadius: R.full,
                backgroundColor: mp.primary,
                marginLeft: -THUMB / 2,
              }}
            />
          </View>
        </View>
      </View>

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          paddingHorizontal: 4,
        }}
      >
        {scale.map((s) => (
          <Text key={s} style={[TYPE.labelSmMedium, { color: mp.variant }]}>
            {s}
          </Text>
        ))}
      </View>
    </View>
  );
}

/**
 * The nine context chips.
 *
 * A real wrap, not a scrolling rail — the reference shows the last row ending
 * short with nothing clipped by either edge, which is the tell. `flexWrap` with
 * an 8dp gap reproduces the export's break points at 361dp.
 */
export function TriggerChips({
  triggers,
  selected,
  onToggle,
}: {
  triggers: readonly Trigger[];
  selected: readonly string[];
  onToggle?: (key: string) => void;
}) {
  return (
    <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: SP.sm }}>
      {triggers.map((t) => {
        const on = selected.includes(t.key);
        return (
          <Pressable key={t.key} onPress={() => onToggle?.(t.key)}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 6,
                paddingHorizontal: 12,
                paddingVertical: SP.sm,
                borderRadius: R.full,
                backgroundColor: on ? mp.primaryContainer : mp.surfaceLow,
              }}
            >
              <Symbol name={t.icon} size={18} color={on ? mp.onPrimary : mp.ink} />
              <Text style={[TYPE.bodyMd, { color: on ? mp.onPrimary : mp.ink }]}>{t.label}</Text>
            </View>
          </Pressable>
        );
      })}
    </View>
  );
}

/** The energy tile — five fixed-height bars, the last one mint. */
export function EnergyTile() {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: mp.surfaceHigh,
        borderRadius: R.card,
        padding: SP.md,
        justifyContent: 'space-between',
      }}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <Text style={[TYPE.labelMd, { color: mp.ink }]}>{ENERGY.title}</Text>
        <Symbol name="bolt" size={20} color={mp.secondary} />
      </View>

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'flex-end',
          gap: 6,
          height: 48,
          marginVertical: SP.sm,
        }}
      >
        {ENERGY.bars.map((h, i) => (
          <View
            key={i}
            style={{
              flex: 1,
              height: h,
              borderTopLeftRadius: R.barTop,
              borderTopRightRadius: R.barTop,
              backgroundColor: i === ENERGY.bars.length - 1 ? mp.secondary : mp.surface,
            }}
          />
        ))}
      </View>

      <View
        style={{ flexDirection: 'row', alignItems: 'baseline', justifyContent: 'space-between' }}
      >
        <Text style={[TYPE.headlineMd, { color: mp.ink }]}>{ENERGY.stat}</Text>
        <Text style={[TYPE.labelSmMedium, { color: mp.variant }]}>{ENERGY.delta}</Text>
      </View>
    </View>
  );
}

/** The rest tile — a violet panel with the hours split across two type sizes. */
export function RestTile() {
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: mp.tertiaryFixed,
        borderRadius: R.card,
        padding: SP.md,
        justifyContent: 'space-between',
      }}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <Text style={[TYPE.labelMd, { color: mp.onTertiaryFixed }]}>{REST.title}</Text>
        <Symbol name="hotel" size={20} color={mp.onTertiaryFixed} />
      </View>

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'baseline',
          gap: 4,
          marginVertical: SP.sm,
        }}
      >
        <Text style={[TYPE.headlineXlMobile, { color: mp.onTertiaryFixed, lineHeight: 30 }]}>
          {REST.hours}
        </Text>
        <Text style={[TYPE.labelMd, { color: mp.onTertiaryFixedVariant }]}>{REST.hoursUnit}</Text>
        <Text
          style={[
            TYPE.headlineXlMobile,
            { color: mp.onTertiaryFixed, lineHeight: 30, marginLeft: 4 },
          ]}
        >
          {REST.minutes}
        </Text>
        <Text style={[TYPE.labelMd, { color: mp.onTertiaryFixedVariant }]}>{REST.minutesUnit}</Text>
      </View>

      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <Text style={[TYPE.labelSm, { color: mp.onTertiaryFixed }]}>{REST.note}</Text>
        <View
          style={{ width: 10, height: 10, borderRadius: R.full, backgroundColor: mp.secondary }}
        />
      </View>
    </View>
  );
}

/** The journal card — header, the entry, and the attachment row. */
export function JournalCard({
  title,
  dictate,
  body,
  attachment,
  thumb,
}: {
  title: string;
  dictate: string;
  body: string;
  attachment: string;
  thumb: number;
}) {
  return (
    <View
      style={{
        backgroundColor: mp.surface,
        borderRadius: R.card,
        padding: SP.md,
        gap: SP.xs,
        ...LEVEL.card,
      }}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
          <Symbol name="editNote" size={18} color={mp.ink} />
          <Text style={[TYPE.labelMd, { color: mp.ink }]}>{title}</Text>
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 4,
            paddingHorizontal: 10,
            paddingVertical: 4,
            borderRadius: R.full,
            backgroundColor: mp.surfaceContainer,
          }}
        >
          <Symbol name="mic" size={15} color={mp.ink} />
          <Text style={[TYPE.labelSm, { color: mp.ink }]}>{dictate}</Text>
        </View>
      </View>

      <Text style={[TYPE.bodyMd, { color: mp.ink, paddingTop: 4 }]}>{body}</Text>

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingTop: SP.sm,
        }}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: SP.sm, flex: 1 }}>
          <Image source={thumb} style={{ width: 32, height: 32, borderRadius: R.full }} />
          <Text style={[TYPE.labelSmMedium, { color: mp.variant }]} numberOfLines={1}>
            {attachment}
          </Text>
        </View>
        <Symbol name="addPhotoAlternate" size={18} color={mp.variant} />
      </View>
    </View>
  );
}
