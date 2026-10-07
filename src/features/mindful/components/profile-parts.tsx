import { Image, Pressable, ScrollView, Text, View } from 'react-native';

import {
  BADGES,
  HEART,
  PROFILE,
  SLEEP,
  STREAK_DAYS,
  type AccountRow,
  type Tool,
} from '../data/profile';
import { LEVEL, R, SP, TYPE, mp } from '../theme';
import { Symbol } from './symbol';

/** Avatar with its verified badge, name and tier, and two action wells. */
export function ProfileTop({
  avatar,
  onBell,
  onTune,
}: {
  avatar: number;
  onBell?: () => void;
  onTune?: () => void;
}) {
  const well = {
    width: 40,
    height: 40,
    borderRadius: R.full,
    backgroundColor: mp.surfaceLow,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
  };

  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: SP.xs,
      }}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: SP.md, flex: 1 }}>
        <View>
          <Image
            source={avatar}
            style={{
              width: 48,
              height: 48,
              borderRadius: R.full,
              backgroundColor: mp.surfaceHigh,
            }}
          />
          <View
            style={{
              position: 'absolute',
              bottom: -2,
              right: -2,
              width: 16,
              height: 16,
              borderRadius: R.full,
              backgroundColor: mp.secondary,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Symbol name="check" size={10} color={mp.onSecondary} />
          </View>
        </View>

        <View style={{ flex: 1 }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: SP.xs }}>
            <Text style={[TYPE.headlineMd, { color: mp.ink }]}>{PROFILE.name}</Text>
            <View
              style={{
                paddingHorizontal: SP.sm,
                paddingVertical: 2,
                borderRadius: R.full,
                backgroundColor: mp.secondaryContainer,
              }}
            >
              <Text style={[TYPE.labelSm, { color: mp.onSecondaryContainer }]}>{PROFILE.tier}</Text>
            </View>
          </View>
          <Text style={[TYPE.bodyMd, { color: mp.variant }]}>{PROFILE.meta}</Text>
        </View>
      </View>

      <View style={{ flexDirection: 'row', alignItems: 'center', gap: SP.xs }}>
        <Pressable onPress={onBell}>
          <View style={well}>
            <Symbol name="notifications" size={20} color={mp.ink} />
          </View>
        </Pressable>
        <Pressable onPress={onTune}>
          <View style={well}>
            <Symbol name="tune" size={20} color={mp.ink} />
          </View>
        </Pressable>
      </View>
    </View>
  );
}

/**
 * One toolkit tile.
 *
 * Each is a pastel block with a soft blob of its own mid-tone hanging off the
 * top-right corner. The export blurs that blob; React Native has no blur on a
 * plain `View`, and reaching for `expo-blur` to fog a 64dp circle would put a
 * native surface inside a scrolling card for a decoration. It is drawn as a
 * flat disc at the blob's own alpha instead, which at 30% over the tile's fill
 * is within a couple of levels of the blurred original.
 *
 * The tile clips, because the blob hangs outside it — and therefore carries no
 * `elevation`, since that pairing is the unreliable one on Android.
 */
export function ToolTile({ tool, onPress }: { tool: Tool; onPress?: () => void }) {
  return (
    <Pressable style={{ flex: 1 }} onPress={onPress}>
      <View
        style={{
          padding: SP.md,
          borderRadius: R.card,
          backgroundColor: tool.fill,
          justifyContent: 'space-between',
          overflow: 'hidden',
        }}
      >
        <View
          style={{
            position: 'absolute',
            top: -12,
            right: -12,
            width: 64,
            height: 64,
            borderRadius: R.full,
            backgroundColor: tool.blob,
          }}
        />

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'flex-start',
            justifyContent: 'space-between',
          }}
        >
          <View
            style={{
              width: 36,
              height: 36,
              borderRadius: R.full,
              backgroundColor: tool.ink,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Symbol name={tool.icon} size={20} color={tool.fill} />
          </View>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 4,
              paddingHorizontal: SP.sm,
              paddingVertical: 2,
              borderRadius: R.full,
              backgroundColor: `${tool.ink}1a`,
            }}
          >
            {tool.chipDot ? (
              <View
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: R.full,
                  backgroundColor: tool.chipDot,
                }}
              />
            ) : null}
            <Text style={[TYPE.labelSm, { color: tool.ink }]}>{tool.chip}</Text>
          </View>
        </View>

        <View style={{ marginTop: SP.md }}>
          <Text style={[TYPE.headlineMd, { color: tool.ink }]}>{tool.title}</Text>
          <Text style={[TYPE.bodyMd, { color: `${tool.ink}cc`, marginTop: 2 }]} numberOfLines={1}>
            {tool.sub}
          </Text>
        </View>

        <View
          style={{
            marginTop: 12,
            paddingTop: SP.sm,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 4,
          }}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, flex: 1 }}>
            {tool.actionNote ? <Symbol name={tool.actionIcon} size={16} color={tool.ink} /> : null}
            <Text style={[TYPE.labelSm, { color: tool.ink }]} numberOfLines={1}>
              {tool.action}
            </Text>
          </View>

          {tool.actionNote ? (
            <Text style={[TYPE.labelSmMedium, { color: `${tool.ink}b3` }]}>{tool.actionNote}</Text>
          ) : (
            <Symbol name={tool.actionIcon} size={16} color={tool.ink} />
          )}
        </View>
      </View>
    </Pressable>
  );
}

/** The streak card: heading, the seven-day row, then the achievement chips. */
export function StreakCard() {
  return (
    <View
      style={{
        padding: SP.md,
        borderRadius: R.card,
        backgroundColor: mp.surfaceLow,
        gap: SP.md,
        ...LEVEL.card,
      }}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: SP.xs, flex: 1 }}>
          <View
            style={{
              width: 32,
              height: 32,
              borderRadius: R.full,
              backgroundColor: mp.secondaryContainer,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Symbol name="localFireDepartment" size={18} color={mp.onSecondaryContainer} />
          </View>
          <Text style={[TYPE.headlineMd, { color: mp.ink }]}>{PROFILE.streakTitle}</Text>
        </View>
        <View
          style={{
            paddingHorizontal: 10,
            paddingVertical: 4,
            borderRadius: R.full,
            backgroundColor: mp.surfaceHigh,
          }}
        >
          <Text style={[TYPE.labelSm, { color: mp.variant }]}>{PROFILE.streakRank}</Text>
        </View>
      </View>

      <View style={{ flexDirection: 'row', gap: 6, paddingVertical: 4 }}>
        {STREAK_DAYS.map((d, i) => (
          <View key={i} style={{ flex: 1, alignItems: 'center', gap: 4 }}>
            <Text
              style={[
                d.today ? TYPE.labelSm : TYPE.labelSmMedium,
                { color: d.today ? mp.primary : mp.variant },
              ]}
            >
              {d.label}
            </Text>
            <View
              style={{
                width: '100%',
                aspectRatio: 1,
                borderRadius: R.base,
                backgroundColor: d.fill,
                alignItems: 'center',
                justifyContent: 'center',
                ...(d.today ? LEVEL.card : null),
              }}
            >
              <Symbol name={d.icon} size={d.today ? 18 : 16} color={d.ink} />
            </View>
          </View>
        ))}
      </View>

      {/* A scrolling rail, not a wrap. The three chips are 30dp wider than the
          card at 393dp, and the reference shows the third clipped rather than
          dropped to a second line — which is the tell. A plain row would let it
          spill past the card's rounded corner into the page margin; a
          `ScrollView` clips to the card and scrolls, which is both correct and
          what the export's `overflow-x-auto` does. */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ flexDirection: 'row', alignItems: 'center', gap: SP.xs }}
      >
        {BADGES.map((b) => (
          <View
            key={b.key}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: SP.sm,
              paddingHorizontal: 12,
              paddingVertical: 6,
              borderRadius: R.full,
              backgroundColor: mp.surfaceHigh,
            }}
          >
            <Symbol name={b.icon} size={14} color={mp.ink} />
            <Text style={[TYPE.labelMd, { color: mp.ink }]}>{b.label}</Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}

/** The resting-heart-rate tile. */
export function HeartTile() {
  return (
    <View
      style={{
        flex: 1,
        padding: SP.md,
        borderRadius: R.card,
        backgroundColor: mp.surfaceLow,
        gap: SP.xs,
      }}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <Symbol name={HEART.icon} size={20} color={HEART.iconColor} />
        <Text style={[TYPE.labelSm, { color: HEART.statusColor }]}>{HEART.status}</Text>
      </View>

      <View style={{ marginTop: SP.sm }}>
        <View style={{ flexDirection: 'row', alignItems: 'baseline', gap: 4 }}>
          <Text style={[TYPE.displayStat, { color: mp.ink }]}>{HEART.value}</Text>
          <Text style={[TYPE.bodyMd, { color: mp.variant }]}>{HEART.unit}</Text>
        </View>
        <Text style={[TYPE.bodyMd, { color: mp.variant }]}>{HEART.label}</Text>
      </View>

      <View
        style={{
          height: 6,
          borderRadius: R.full,
          backgroundColor: mp.surfaceHigh,
          marginTop: 4,
          overflow: 'hidden',
        }}
      >
        <View
          style={{
            width: `${HEART.bar * 100}%`,
            height: '100%',
            borderRadius: R.full,
            backgroundColor: mp.secondary,
          }}
        />
      </View>
    </View>
  );
}

/** The sleep-phase tile, whose bar is three coloured segments. */
export function SleepTile() {
  return (
    <View
      style={{
        flex: 1,
        padding: SP.md,
        borderRadius: R.card,
        backgroundColor: mp.surfaceLow,
        gap: SP.xs,
      }}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <Symbol name={SLEEP.icon} size={20} color={SLEEP.iconColor} />
        <Text style={[TYPE.labelSm, { color: mp.variant }]}>{SLEEP.status}</Text>
      </View>

      <View style={{ marginTop: SP.sm }}>
        <Text style={[TYPE.displayStat, { color: mp.ink }]}>{SLEEP.value}</Text>
        <Text style={[TYPE.bodyMd, { color: mp.variant }]}>{SLEEP.label}</Text>
      </View>

      <View style={{ flexDirection: 'row', gap: 4, height: 6, marginTop: 4 }}>
        {SLEEP.segments.map((s, i) => (
          <View
            key={i}
            style={{
              flex: s.w,
              height: '100%',
              borderRadius: R.full,
              backgroundColor: s.color,
            }}
          />
        ))}
      </View>
    </View>
  );
}

/** One row in the Account & Rituals list. */
export function SettingRow({ row, onPress }: { row: AccountRow; onPress?: () => void }) {
  return (
    <Pressable onPress={onPress}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: SP.md,
          gap: SP.sm,
        }}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: SP.md, flex: 1 }}>
          <View
            style={{
              width: 36,
              height: 36,
              borderRadius: R.full,
              backgroundColor: mp.surfaceHigh,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Symbol name={row.icon} size={20} color={mp.ink} />
          </View>
          <View style={{ flex: 1 }}>
            <Text style={[TYPE.headlineMd, { color: mp.ink }]}>{row.title}</Text>
            <Text style={[TYPE.bodyMd, { color: mp.variant }]}>{row.sub}</Text>
          </View>
        </View>

        {row.toggle ? (
          <View
            style={{
              width: 48,
              height: 28,
              borderRadius: R.full,
              backgroundColor: mp.primary,
              padding: 2,
              justifyContent: 'center',
              alignItems: 'flex-end',
            }}
          >
            <View
              style={{
                width: 24,
                height: 24,
                borderRadius: R.full,
                backgroundColor: mp.onPrimary,
                ...LEVEL.card,
              }}
            />
          </View>
        ) : null}

        {row.pill ? (
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 4,
              paddingHorizontal: 12,
              paddingVertical: 4,
              borderRadius: R.full,
              backgroundColor: row.pill.fill,
            }}
          >
            <Symbol name={row.pill.icon} size={12} color={row.pill.ink} />
            <Text style={[TYPE.labelSm, { color: row.pill.ink }]}>{row.pill.label}</Text>
          </View>
        ) : null}

        {row.status ? (
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
            <Symbol name={row.status.icon} size={16} color={row.status.color} />
            <Text style={[TYPE.labelMdBold, { color: row.status.color }]}>{row.status.label}</Text>
          </View>
        ) : null}
      </View>
    </Pressable>
  );
}

/** The gifting banner that closes the screen. */
export function GiftRow({ onInvite }: { onInvite?: () => void }) {
  return (
    <View
      style={{
        padding: SP.md,
        borderRadius: R.card,
        backgroundColor: mp.surfaceHigh,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: SP.sm,
      }}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: SP.md, flex: 1 }}>
        <View
          style={{
            width: 40,
            height: 40,
            borderRadius: R.full,
            backgroundColor: mp.surface,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Symbol name="cardGiftcard" size={20} color={mp.ink} />
        </View>
        <View style={{ flex: 1 }}>
          <Text style={[TYPE.labelMdBold, { color: mp.ink }]}>{PROFILE.giftTitle}</Text>
          <Text style={[TYPE.bodyMd, { color: mp.variant }]}>{PROFILE.giftSub}</Text>
        </View>
      </View>

      <Pressable onPress={onInvite}>
        <View
          style={{
            paddingHorizontal: SP.md,
            paddingVertical: SP.xs,
            borderRadius: R.full,
            backgroundColor: mp.primary,
          }}
        >
          <Text style={[TYPE.labelMd, { color: mp.onPrimary }]}>{PROFILE.giftCta}</Text>
        </View>
      </Pressable>
    </View>
  );
}
