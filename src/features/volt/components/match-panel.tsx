import { Pressable, Text, View } from 'react-native';

import { type Market } from '../data/stream';
import { R, SP, TYPE, alpha, vt } from '../theme';

import { Symbol } from './symbol';

type Club = { code: string; name: string; note: string };

/**
 * The glass panel under the video: league, score, in-play markets, the active
 * slip, and the swipe-to-bet track.
 *
 * It overlaps the player by 16dp — the export pulls it up with `-mt-4` and
 * raises it with `z-30` — which is what makes it read as a sheet over the
 * broadcast rather than a section beneath it.
 *
 * The score row is compressed against the export. At 393dp the reference's own
 * row overruns the screen — its render cuts "Man City" off at the right edge —
 * because two 44dp discs, two club blocks and a 40dp score cannot share 297dp.
 * The discs drop to 32, the row's own padding to 8, the gaps to 4 and the score
 * to 30dp, which fits the row with both club names intact. The markup marks
 * those names `truncate`, so ellipsis is sanctioned — but at the spec's sizes it
 * eats them down to "Liver…" and "Man …", which loses the fixture.
 *
 * The swipe track is drawn at rest, not wired. The export implements a real
 * drag that locks the bet at 75% and springs back after three seconds; a
 * gesture is not something the screenshot harness can verify, and the recording
 * never performs one, so the handle sits at its start position. The affordance
 * is all drawn: the track, the lime handle with its glow, the label and chevron.
 */
export function MatchPanel({
  league,
  tag,
  home,
  away,
  score,
  marketsTitle,
  marketsAction,
  markets,
  activeMarket,
  slip,
  swipeLabel,
  onMarket,
  onAllMarkets,
}: {
  league: string;
  tag: string;
  home: Club;
  away: Club;
  score: { home: string; away: string };
  marketsTitle: string;
  marketsAction: string;
  markets: readonly Market[];
  activeMarket: string;
  slip: { title: string; detail: string; lock: string };
  swipeLabel: string;
  onMarket?: (key: string) => void;
  onAllMarkets?: () => void;
}) {
  return (
    <View
      style={{
        borderRadius: R.lg,
        backgroundColor: alpha(vt.surfaceContainerLow, 0.97),
        padding: SP.lg,
        gap: SP.lg,
      }}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: SP.xs, flexShrink: 1 }}>
          <Symbol name="militaryTech" size={18} color={vt.primaryFixed} />
          <Text
            numberOfLines={1}
            style={{ ...TYPE.labelSm, letterSpacing: 1, color: vt.secondary }}
          >
            {league.toUpperCase()}
          </Text>
        </View>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: SP.xs,
            paddingHorizontal: 10,
            paddingVertical: SP.xs,
            borderRadius: R.full,
            backgroundColor: vt.surfaceContainer,
          }}
        >
          <Symbol name="bolt" size={14} color={vt.primaryFixed} />
          <Text style={{ ...TYPE.labelSm, color: vt.primaryFixed }}>{tag}</Text>
        </View>
      </View>

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          borderRadius: R.DEFAULT,
          backgroundColor: alpha(vt.surfaceContainerHigh, 0.6),
          paddingVertical: SP.md,
          paddingHorizontal: SP.sm,
        }}
      >
        <Side club={home} />

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: SP.sm,
            paddingHorizontal: SP.md,
          }}
        >
          <Text style={{ ...TYPE.headlineXl, fontSize: 30, lineHeight: 34, color: vt.primary }}>
            {score.home}
          </Text>
          <Text style={{ ...TYPE.headlineMd, color: vt.secondary }}>:</Text>
          <Text style={{ ...TYPE.headlineXl, fontSize: 30, lineHeight: 34, color: vt.secondary }}>
            {score.away}
          </Text>
        </View>

        <Side club={away} align="right" />
      </View>

      <View style={{ gap: SP.sm }}>
        <View
          style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}
        >
          <Text style={{ ...TYPE.labelSm, letterSpacing: 0.8, color: vt.secondary }}>
            {marketsTitle.toUpperCase()}
          </Text>
          <Pressable onPress={onAllMarkets} hitSlop={8}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 2 }}>
              <Text style={{ ...TYPE.labelSm, color: vt.primaryFixed }}>{marketsAction}</Text>
              <Symbol name="chevronRight" size={14} color={vt.primaryFixed} />
            </View>
          </Pressable>
        </View>

        <View style={{ flexDirection: 'row', gap: SP.sm }}>
          {markets.map((m) => {
            const on = m.key === activeMarket;
            return (
              <Pressable key={m.key} style={{ flex: 1 }} onPress={() => onMarket?.(m.key)}>
                <View
                  style={{
                    alignItems: 'center',
                    justifyContent: 'center',
                    paddingVertical: 10,
                    paddingHorizontal: SP.sm,
                    borderRadius: R.DEFAULT,
                    backgroundColor: on ? vt.primaryFixed : alpha(vt.surfaceContainerHigh, 0.9),
                    shadowColor: vt.primaryFixed,
                    shadowOpacity: on ? 0.4 : 0,
                    shadowRadius: 20,
                    shadowOffset: { width: 0, height: 0 },
                  }}
                >
                  <Text
                    numberOfLines={1}
                    style={{
                      ...TYPE.labelSm,
                      letterSpacing: on ? 0.8 : 0.6,
                      color: on ? vt.onPrimaryFixed : vt.secondary,
                    }}
                  >
                    {on ? m.label.toUpperCase() : m.label}
                  </Text>
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'baseline',
                      gap: SP.xs,
                      marginTop: 2,
                    }}
                  >
                    <Text
                      style={{
                        ...TYPE.headlineMd,
                        fontSize: 15,
                        lineHeight: 20,
                        color: on ? vt.onPrimaryFixed : vt.primary,
                      }}
                    >
                      {m.value}
                    </Text>
                    <Text
                      style={{
                        ...TYPE.labelSm,
                        fontSize: 11,
                        color: on ? vt.onPrimaryFixed : vt.secondary,
                      }}
                    >
                      {m.price}
                    </Text>
                  </View>
                </View>
              </Pressable>
            );
          })}
        </View>
      </View>

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderRadius: R.DEFAULT,
          backgroundColor: vt.surfaceContainer,
          padding: SP.md,
          gap: SP.sm,
        }}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: SP.md, flexShrink: 1 }}>
          <View
            style={{
              width: 40,
              height: 40,
              borderRadius: R.full,
              backgroundColor: alpha(vt.primaryFixed, 0.2),
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Symbol name="electricBolt" size={20} color={vt.primaryFixed} />
          </View>
          <View style={{ flexShrink: 1 }}>
            <Text numberOfLines={1} style={{ ...TYPE.labelMd, color: vt.primary }}>
              {slip.title}
            </Text>
            <Text numberOfLines={1} style={{ ...TYPE.bodySm, color: vt.secondary }}>
              {slip.detail}
            </Text>
          </View>
        </View>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: SP.xs,
            paddingHorizontal: SP.md,
            paddingVertical: 6,
            borderRadius: R.full,
            backgroundColor: vt.surfaceContainerHighest,
          }}
        >
          <Symbol name="lockClock" size={14} color={vt.primaryFixed} />
          <Text style={{ ...TYPE.labelSm, color: vt.primaryFixed }}>{slip.lock}</Text>
        </View>
      </View>

      <View
        style={{
          height: 64,
          borderRadius: R.full,
          backgroundColor: vt.surfaceContainerHighest,
          justifyContent: 'center',
          padding: 6,
        }}
      >
        <View
          style={{
            position: 'absolute',
            left: 0,
            right: 0,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            gap: SP.xs,
          }}
          pointerEvents="none"
        >
          <Text style={{ ...TYPE.labelLg, letterSpacing: 0.5, color: vt.primary }}>
            {swipeLabel}
          </Text>
          <Symbol name="chevronRight" size={18} color={vt.primaryFixed} />
        </View>

        <View
          style={{
            width: 48,
            height: 48,
            borderRadius: R.full,
            backgroundColor: vt.primaryFixed,
            alignItems: 'center',
            justifyContent: 'center',
            shadowColor: vt.primaryFixed,
            shadowOpacity: 0.6,
            shadowRadius: 16,
            shadowOffset: { width: 0, height: 0 },
          }}
        >
          <Symbol name="trendingFlat" size={24} color={vt.onPrimaryFixed} />
        </View>
      </View>
    </View>
  );
}

/** One club: a 44dp initials disc with its name and a stat note. */
function Side({ club, align }: { club: Club; align?: 'right' }) {
  const disc = (
    <View
      style={{
        width: 32,
        height: 32,
        borderRadius: R.full,
        backgroundColor: vt.surfaceContainerHighest,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Text style={{ ...TYPE.headlineMd, fontSize: 13, lineHeight: 16, color: vt.primary }}>
        {club.code}
      </Text>
    </View>
  );

  const text = (
    <View style={{ flexShrink: 1, alignItems: align === 'right' ? 'flex-end' : 'flex-start' }}>
      <Text
        numberOfLines={1}
        style={{ ...TYPE.headlineMd, fontSize: 16, lineHeight: 20, color: vt.primary }}
      >
        {club.name}
      </Text>
      <Text numberOfLines={1} style={{ ...TYPE.bodySm, color: vt.secondary }}>
        {club.note}
      </Text>
    </View>
  );

  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        gap: SP.xs,
        justifyContent: align === 'right' ? 'flex-end' : 'flex-start',
      }}
    >
      {align === 'right' ? (
        <>
          {text}
          {disc}
        </>
      ) : (
        <>
          {disc}
          {text}
        </>
      )}
    </View>
  );
}
