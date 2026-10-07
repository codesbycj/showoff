import { Image } from 'expo-image';
import { Pressable, Text, View } from 'react-native';

import { R, SP, TYPE, vt } from '../theme';

import { Symbol } from './symbol';

type Side = { name: string; place: string; crest: number };

/**
 * The standard dark fixture card.
 *
 * The away team mirrors the home team — name and place right-aligned, crest on
 * the outside — so the two are one component taking an `align`, not two blocks
 * written twice.
 *
 * The activity strip bleeds to the card edges and rounds only its bottom
 * corners, which the export does with `-mx-5 -mb-5 rounded-b-lg`. That needs the
 * card to clip, and this card casts no coloured glow, so a single clipping view
 * is enough here — unlike the lime hero.
 */
export function FixtureCard({
  league,
  status,
  home,
  away,
  score,
  clock,
  activity,
  action,
  faces,
  onPress,
}: {
  league: string;
  status: string;
  home: Side;
  away: Side;
  score: { home: string; away: string };
  clock: string;
  activity: string;
  action: string;
  faces: readonly number[];
  onPress?: () => void;
}) {
  return (
    <View
      style={{
        borderRadius: R.lg,
        overflow: 'hidden',
        backgroundColor: vt.surfaceContainer,
        paddingTop: SP.lg,
        paddingHorizontal: SP.lg,
      }}
    >
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: SP.gutter,
        }}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: SP.sm }}>
          <Symbol name="workspacePremium" size={18} color={vt.secondary} />
          <Text style={{ ...TYPE.labelSm, letterSpacing: 0.8, color: vt.secondary }}>
            {league.toUpperCase()}
          </Text>
        </View>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: SP.xs,
            paddingHorizontal: SP.md,
            paddingVertical: SP.xs,
            borderRadius: R.full,
            backgroundColor: vt.surfaceContainerHighest,
          }}
        >
          <Symbol name="schedule" size={12} color={vt.secondary} />
          <Text style={{ ...TYPE.labelSm, letterSpacing: 0.8, color: vt.secondary }}>
            {status.toUpperCase()}
          </Text>
        </View>
      </View>

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingVertical: SP.xs,
        }}
      >
        <Team side={home} />

        <View style={{ alignItems: 'center', gap: SP.xs }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 10,
              paddingHorizontal: SP.md,
              paddingVertical: SP.xs,
              borderRadius: R.full,
              backgroundColor: vt.surfaceContainerLow,
            }}
          >
            <Text style={{ ...TYPE.headlineMd, lineHeight: 20, color: vt.primary }}>
              {score.home}
            </Text>
            <Text style={{ ...TYPE.bodySm, lineHeight: 16, color: vt.secondary }}>:</Text>
            <Text style={{ ...TYPE.headlineMd, lineHeight: 20, color: vt.primaryFixed }}>
              {score.away}
            </Text>
          </View>
          <Text style={{ ...TYPE.labelSm, color: vt.secondary }}>{clock}</Text>
        </View>

        <Team side={away} align="right" />
      </View>

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginTop: SP.gutter,
          marginHorizontal: -SP.lg,
          paddingHorizontal: SP.lg,
          paddingVertical: SP.md,
          backgroundColor: vt.surfaceContainerLow,
        }}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: SP.sm }}>
          <View style={{ flexDirection: 'row' }}>
            {faces.map((f, i) => (
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
            <View
              style={{
                width: 24,
                height: 24,
                borderRadius: R.full,
                marginLeft: -8,
                backgroundColor: vt.surfaceBright,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Text style={{ ...TYPE.labelSm, color: vt.primary }}>+</Text>
            </View>
          </View>
          <Text style={{ ...TYPE.bodySm, color: vt.secondary }}>{activity}</Text>
        </View>

        <Pressable onPress={onPress} hitSlop={8}>
          <Text style={{ ...TYPE.labelSm, color: vt.primaryFixed }}>{action}</Text>
        </Pressable>
      </View>
    </View>
  );
}

/** One team row. `align="right"` mirrors it for the away side. */
function Team({ side, align }: { side: Side; align?: 'right' }) {
  const crest = (
    <View
      style={{
        width: 48,
        height: 48,
        borderRadius: R.full,
        backgroundColor: vt.surfaceContainerHigh,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Image
        source={side.crest}
        style={{ width: 32, height: 32, borderRadius: R.full }}
        contentFit="contain"
      />
    </View>
  );

  const text = (
    <View style={{ alignItems: align === 'right' ? 'flex-end' : 'flex-start' }}>
      <Text style={{ ...TYPE.labelLg, color: vt.primary }}>{side.name}</Text>
      <Text style={{ ...TYPE.bodySm, color: vt.secondary }}>{side.place}</Text>
    </View>
  );

  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', gap: SP.md }}>
      {align === 'right' ? (
        <>
          {text}
          {crest}
        </>
      ) : (
        <>
          {crest}
          {text}
        </>
      )}
    </View>
  );
}
