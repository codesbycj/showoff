import { Image } from 'expo-image';
import { Pressable, Text, View } from 'react-native';

import { R, SP, TYPE, alpha, vt } from '../theme';

import { Glow } from './glow';
import { Symbol } from './symbol';

type Side = { name: string; crest: number };

/**
 * The lime hero fixture — the one card in the system that inverts.
 *
 * Everything on it is dark-on-lime, which is the design system's rule for its
 * primary tone: "dark charcoal typography is placed atop this tone to ensure
 * maximum WCAG AAA contrast". So the crest wells, the clock pill and the Bet
 * Slip button all take the *canvas* colour rather than a lighter surface.
 *
 * The footer strip bleeds to the card's edges with negative margins, as the
 * export does, so it reads as a band rather than an inset row. That means the
 * card cannot clip — a `-mx-5` child inside `overflow: 'hidden'` is fine, but
 * the lime glow this card casts would be clipped with it — so the glow sits on
 * an outer view and the radius on an inner one, as everywhere else here.
 */
export function FeaturedMatchCard({
  league,
  status,
  home,
  away,
  score,
  clock,
  momentum,
  cta,
  onPress,
}: {
  league: string;
  status: string;
  home: Side;
  away: Side;
  score: { home: string; away: string };
  clock: string;
  momentum: string;
  cta: string;
  onPress?: () => void;
}) {
  return (
    <View
      style={{
        borderRadius: R.lg,
        shadowColor: vt.primaryFixed,
        shadowOpacity: 0.22,
        shadowRadius: 36,
        shadowOffset: { width: 0, height: 12 },
        elevation: 10,
      }}
    >
      <View
        style={{
          borderRadius: R.lg,
          overflow: 'hidden',
          backgroundColor: vt.primaryFixed,
          paddingTop: SP.lg,
          paddingHorizontal: SP.lg,
        }}
      >
        <Glow color={vt.surfaceContainerLowest} size={176} opacity={0.1} right={-40} bottom={-40} />

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingBottom: SP.sm,
          }}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: SP.sm }}>
            <Symbol name="sportsSoccer" size={18} color={vt.onPrimaryFixed} />
            <Text style={{ ...TYPE.labelSm, letterSpacing: 0.8, color: vt.onPrimaryFixed }}>
              {league.toUpperCase()}
            </Text>
          </View>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 6,
              paddingHorizontal: SP.md,
              paddingVertical: SP.xs,
              borderRadius: R.full,
              backgroundColor: vt.surfaceContainerLowest,
            }}
          >
            <View
              style={{
                width: 6,
                height: 6,
                borderRadius: R.full,
                backgroundColor: vt.primaryFixed,
              }}
            />
            <Text style={{ ...TYPE.labelSm, letterSpacing: 0.8, color: vt.primaryFixed }}>
              {status.toUpperCase()}
            </Text>
          </View>
        </View>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginVertical: SP.lg,
            paddingHorizontal: SP.sm,
          }}
        >
          <Crest side={home} />

          <View style={{ alignItems: 'center', gap: 6 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: SP.md }}>
              <Text style={{ ...TYPE.headlineXl, lineHeight: 40, color: vt.onPrimaryFixed }}>
                {score.home}
              </Text>
              <Text
                style={{
                  ...TYPE.headlineMd,
                  lineHeight: 26,
                  color: alpha(vt.onPrimaryFixed, 0.6),
                }}
              >
                :
              </Text>
              <Text style={{ ...TYPE.headlineXl, lineHeight: 40, color: vt.onPrimaryFixed }}>
                {score.away}
              </Text>
            </View>

            <View
              style={{
                paddingHorizontal: SP.md,
                paddingVertical: SP.xs,
                borderRadius: R.full,
                backgroundColor: alpha(vt.surfaceContainerLowest, 0.15),
              }}
            >
              <Text style={{ ...TYPE.labelSm, letterSpacing: 0.8, color: vt.onPrimaryFixed }}>
                {clock.toUpperCase()}
              </Text>
            </View>
          </View>

          <Crest side={away} />
        </View>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginHorizontal: -SP.lg,
            paddingHorizontal: SP.lg,
            paddingVertical: SP.md,
            backgroundColor: alpha(vt.surfaceContainerLowest, 0.1),
          }}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: SP.sm }}>
            <Symbol name="trendingUp" size={16} color={vt.onPrimaryFixed} />
            <Text
              style={{
                ...TYPE.bodySm,
                fontFamily: TYPE.bodyLg.fontFamily,
                color: vt.onPrimaryFixed,
              }}
            >
              {momentum}
            </Text>
          </View>

          <Pressable onPress={onPress}>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 6,
                paddingHorizontal: SP.gutter,
                paddingVertical: 6,
                borderRadius: R.full,
                backgroundColor: vt.surfaceContainerLowest,
              }}
            >
              <Text style={{ ...TYPE.labelSm, color: vt.primaryFixed }}>{cta}</Text>
              <Symbol name="arrowForward" size={14} color={vt.primaryFixed} />
            </View>
          </Pressable>
        </View>
      </View>
    </View>
  );
}

/** One team: a 56dp dark well holding the crest, with the short name beneath. */
function Crest({ side }: { side: Side }) {
  return (
    <View style={{ alignItems: 'center', gap: SP.sm, minWidth: 76 }}>
      <View
        style={{
          width: 56,
          height: 56,
          borderRadius: R.full,
          backgroundColor: vt.surfaceContainerLowest,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Image
          source={side.crest}
          style={{ width: 40, height: 40, borderRadius: R.full }}
          contentFit="contain"
        />
      </View>
      <Text
        style={{ ...TYPE.labelMd, fontFamily: TYPE.labelLg.fontFamily, color: vt.onPrimaryFixed }}
      >
        {side.name.toUpperCase()}
      </Text>
    </View>
  );
}
