import { Image } from 'expo-image';
import { Pressable, Text, View } from 'react-native';

import { type Match, type Team } from '../data/scores';
import { R, SP, TYPE, alpha, vt } from '../theme';

import { Glow } from './glow';
import { Symbol } from './symbol';

/**
 * One fixture on the scores board, live or scheduled.
 *
 * The two kinds share a shell — venue meta, a three-column team grid with the
 * score or a VS badge between, an odds strip, and a footer bled to the card's
 * edges — and differ in what fills those slots. So this is one component with
 * two branches rather than two cards: duplicating the shell would be fifty lines
 * of identical layout kept in step by hand.
 *
 * The team columns are `flex: 3` either side of a `flex: 1` centre, which is
 * the export's `grid-cols-7` split. Team names are allowed to wrap rather than
 * truncate — "BAYERN MUNICH" does not fit a 3/7 column at `headline-md`, and the
 * export truncates it, which loses the name entirely on the away side.
 */
export function ScoreCard({ match, onPress }: { match: Match; onPress?: () => void }) {
  return (
    <View
      style={{
        borderRadius: R.lg,
        overflow: 'hidden',
        backgroundColor: vt.surfaceContainerLow,
        padding: SP.lg,
        gap: SP.lg,
      }}
    >
      {match.kind === 'live' && match.key === 'che-mci' ? (
        <Glow color={vt.primaryFixed} size={128} opacity={0.05} top={0} right={0} />
      ) : null}

      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, flexShrink: 1 }}>
          <Symbol name={match.venueIcon} size={14} color={vt.secondary} />
          <Text
            numberOfLines={1}
            style={{ ...TYPE.labelSm, letterSpacing: 0.8, color: vt.secondary }}
          >
            {match.venue.toUpperCase()}
          </Text>
        </View>

        {match.kind === 'live' ? (
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 6,
              paddingHorizontal: 10,
              paddingVertical: SP.xs,
              borderRadius: R.full,
              backgroundColor: alpha('#93000a', 0.4),
            }}
          >
            <View
              style={{ width: 8, height: 8, borderRadius: R.full, backgroundColor: vt.error }}
            />
            <Text style={{ ...TYPE.labelSm, letterSpacing: 0.8, color: vt.error }}>
              {match.clock.toUpperCase()}
            </Text>
          </View>
        ) : (
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 6,
              paddingHorizontal: SP.md,
              paddingVertical: SP.xs,
              borderRadius: R.full,
              backgroundColor: vt.surfaceContainerHighest,
            }}
          >
            <Symbol name="alarm" size={14} color={vt.primaryFixed} />
            <Text style={{ ...TYPE.labelMd, letterSpacing: 0.8, color: vt.primary }}>
              {match.kickoff}
            </Text>
          </View>
        )}
      </View>

      <View style={{ flexDirection: 'row', alignItems: 'center', paddingVertical: SP.xs }}>
        <TeamColumn team={match.home} />

        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          {match.kind === 'live' ? (
            <>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: SP.xs }}>
                <Text
                  style={{
                    ...TYPE.headlineXlMobile,
                    color: match.lead === 'away' ? vt.secondary : vt.primary,
                  }}
                >
                  {match.score.home}
                </Text>
                <Text style={{ ...TYPE.headlineMd, color: alpha(vt.secondary, 0.5) }}>:</Text>
                <Text
                  style={{
                    ...TYPE.headlineXlMobile,
                    color: match.lead === 'away' ? vt.primaryFixed : vt.secondary,
                  }}
                >
                  {match.score.away}
                </Text>
              </View>
              <Text
                style={{
                  ...TYPE.labelSm,
                  letterSpacing: 1,
                  marginTop: SP.xs,
                  color: vt.primaryFixed,
                }}
              >
                LIVE
              </Text>
            </>
          ) : (
            <>
              <View
                style={{
                  width: 36,
                  height: 36,
                  borderRadius: R.full,
                  backgroundColor: vt.surfaceContainerHigh,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Text style={{ ...TYPE.labelMd, color: vt.secondary }}>VS</Text>
              </View>
              <Text
                style={{
                  ...TYPE.labelSm,
                  letterSpacing: 1,
                  marginTop: SP.xs,
                  color: alpha(vt.secondary, 0.7),
                }}
              >
                TODAY
              </Text>
            </>
          )}
        </View>

        <TeamColumn team={match.away} />
      </View>

      {match.kind === 'live' ? (
        <View style={{ flexDirection: 'row', gap: SP.sm }}>
          {match.odds.map((o) => {
            const on = o.key === match.activeOdd;
            return (
              <View
                key={o.key}
                style={{
                  flex: 1,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  paddingHorizontal: SP.md,
                  paddingVertical: SP.sm,
                  borderRadius: R.full,
                  backgroundColor: on ? vt.primaryFixed : vt.surfaceContainerHigh,
                }}
              >
                <Text
                  style={{
                    ...TYPE.labelMd,
                    opacity: on ? 0.8 : 0.7,
                    color: on ? vt.onPrimaryFixed : vt.secondary,
                  }}
                >
                  {o.label}
                </Text>
                <Text
                  style={{
                    ...TYPE.labelMd,
                    fontFamily: TYPE.labelLg.fontFamily,
                    color: on ? vt.onPrimaryFixed : vt.onSurface,
                  }}
                >
                  {o.value}
                </Text>
              </View>
            );
          })}
        </View>
      ) : (
        <View style={{ gap: 6 }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingHorizontal: SP.xs,
            }}
          >
            <Text style={{ ...TYPE.labelSm, letterSpacing: 0.8, color: vt.secondary }}>
              {match.oddsTitle.toUpperCase()}
            </Text>
            <Text style={{ ...TYPE.labelSm, color: vt.primaryFixed }}>{match.oddsTag}</Text>
          </View>

          <View style={{ flexDirection: 'row', gap: SP.sm }}>
            {match.odds.map((o, i) => (
              <View
                key={o.key}
                style={{
                  flex: 1,
                  alignItems: 'center',
                  justifyContent: 'center',
                  paddingVertical: 10,
                  borderRadius: R.full,
                  backgroundColor: vt.surfaceContainerHigh,
                }}
              >
                <Text numberOfLines={1} style={{ ...TYPE.labelSm, color: vt.secondary }}>
                  {o.label}
                </Text>
                <Text
                  style={{
                    ...TYPE.headlineMd,
                    color: i === 0 ? vt.primaryFixed : vt.onSurface,
                  }}
                >
                  {o.value}
                </Text>
              </View>
            ))}
          </View>
        </View>
      )}

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginHorizontal: -SP.lg,
          marginBottom: -SP.lg,
          marginTop: SP.xs,
          paddingHorizontal: SP.lg,
          paddingVertical: SP.sm,
          backgroundColor: alpha(vt.surfaceContainer, 0.6),
        }}
      >
        {match.kind === 'live' ? (
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: SP.xs, flexShrink: 1 }}>
            <View style={{ flexDirection: 'row' }}>
              {match.faces.map((f, i) => (
                <Image
                  key={i}
                  source={f}
                  style={{
                    width: 24,
                    height: 24,
                    borderRadius: R.full,
                    marginLeft: i === 0 ? 0 : -8,
                  }}
                  contentFit="cover"
                />
              ))}
            </View>
            <Text
              numberOfLines={1}
              style={{ ...TYPE.bodySm, marginLeft: SP.xs, color: vt.secondary }}
            >
              {match.social}
            </Text>
          </View>
        ) : (
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, flexShrink: 1 }}>
            <Symbol name="analytics" size={16} color={vt.primaryFixed} />
            <Text numberOfLines={1} style={{ ...TYPE.bodySm, color: vt.secondary }}>
              {match.insight}
            </Text>
          </View>
        )}

        <Pressable onPress={onPress} hitSlop={8}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 2 }}>
            <Text style={{ ...TYPE.labelSm, color: vt.primaryFixed }}>{match.action}</Text>
            <Symbol
              name={match.kind === 'live' ? 'arrowForward' : 'notificationsActive'}
              size={14}
              color={vt.primaryFixed}
            />
          </View>
        </Pressable>
      </View>
    </View>
  );
}

/** One side of the fixture: crest well, name, home/away caption. */
function TeamColumn({ team }: { team: Team }) {
  return (
    <View style={{ flex: 3, alignItems: 'center', gap: 6 }}>
      <View
        style={{
          width: 56,
          height: 56,
          borderRadius: R.full,
          backgroundColor: vt.surfaceContainerHigh,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Image
          source={team.crest}
          style={{ width: 44, height: 44, borderRadius: R.full }}
          contentFit="contain"
        />
      </View>
      <Text style={{ ...TYPE.headlineMd, textAlign: 'center', color: vt.primary }}>
        {team.name.toUpperCase()}
      </Text>
      <Text style={{ ...TYPE.bodySm, color: vt.secondary }}>{team.side}</Text>
    </View>
  );
}
