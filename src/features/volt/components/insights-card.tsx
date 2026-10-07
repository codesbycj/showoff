import { Text, View } from 'react-native';

import { R, SP, TYPE, vt } from '../theme';

import { FilledIcon } from './filled-icon';
import { Symbol } from './symbol';

/**
 * The monthly performance panel: a win/loss record with its ratio bar, the
 * primary sport, and the biggest single win.
 *
 * The ratio bar is driven by `ratio` from the data rather than computed from
 * the W/L figures. The export hard-codes `width: 75%` against an 18-6 record,
 * which is 75% exactly — but deriving it would silently diverge the moment the
 * copy changed, and the number the design ships is the one to draw.
 */
export function InsightsCard({
  title,
  month,
  recordLabel,
  wins,
  losses,
  ratio,
  sportLabel,
  sport,
  sportShare,
  bestLabel,
  bestTicket,
  bestAmount,
}: {
  title: string;
  month: string;
  recordLabel: string;
  wins: string;
  losses: string;
  ratio: number;
  sportLabel: string;
  sport: string;
  sportShare: string;
  bestLabel: string;
  bestTicket: string;
  bestAmount: string;
}) {
  return (
    <View
      style={{
        borderRadius: R.lg,
        backgroundColor: vt.surfaceContainerLow,
        padding: SP.lg,
        gap: SP.lg,
      }}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: SP.sm }}>
          <Symbol name="queryStats" size={20} color={vt.primaryFixed} />
          <Text style={{ ...TYPE.headlineMd, color: vt.primary }}>{title}</Text>
        </View>
        <View
          style={{
            paddingHorizontal: 10,
            paddingVertical: 2,
            borderRadius: R.full,
            backgroundColor: vt.surfaceContainer,
          }}
        >
          <Text style={{ ...TYPE.labelSm, color: vt.secondary }}>{month}</Text>
        </View>
      </View>

      <View style={{ flexDirection: 'row', gap: SP.md }}>
        <View
          style={{
            flex: 1,
            borderRadius: R.DEFAULT,
            backgroundColor: vt.surfaceContainer,
            padding: SP.md,
            gap: 6,
          }}
        >
          <Text style={{ ...TYPE.bodySm, color: vt.secondary }}>{recordLabel}</Text>
          <View style={{ flexDirection: 'row', alignItems: 'baseline', gap: 6 }}>
            <Text style={{ ...TYPE.headlineMd, color: vt.primary }}>{wins}</Text>
            <Text style={{ ...TYPE.bodyMd, color: vt.onSurfaceVariant }}>{losses}</Text>
          </View>
          <View
            style={{
              height: 6,
              marginTop: 6,
              borderRadius: R.full,
              backgroundColor: vt.surfaceContainerLowest,
              overflow: 'hidden',
            }}
          >
            <View
              style={{
                width: `${ratio * 100}%`,
                height: 6,
                borderRadius: R.full,
                backgroundColor: vt.primaryFixed,
              }}
            />
          </View>
        </View>

        <View
          style={{
            flex: 1,
            borderRadius: R.DEFAULT,
            backgroundColor: vt.surfaceContainer,
            padding: SP.md,
            gap: 6,
          }}
        >
          <Text style={{ ...TYPE.bodySm, color: vt.secondary }}>{sportLabel}</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
            <Symbol name="sportsSoccer" size={18} color={vt.primaryFixed} />
            <Text numberOfLines={1} style={{ ...TYPE.headlineMd, color: vt.primary }}>
              {sport}
            </Text>
          </View>
          <Text numberOfLines={1} style={{ ...TYPE.labelSm, color: vt.onSurfaceVariant }}>
            {sportShare}
          </Text>
        </View>
      </View>

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderRadius: R.DEFAULT,
          backgroundColor: vt.surfaceContainerLowest,
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
              backgroundColor: vt.surfaceContainerHigh,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <FilledIcon name="trophy" size={20} color={vt.primaryFixed} />
          </View>
          <View style={{ flexShrink: 1 }}>
            <Text style={{ ...TYPE.labelSm, letterSpacing: 0.8, color: vt.secondary }}>
              {bestLabel.toUpperCase()}
            </Text>
            <Text numberOfLines={1} style={{ ...TYPE.bodyMd, color: vt.primary }}>
              {bestTicket}
            </Text>
          </View>
        </View>

        <Text style={{ ...TYPE.headlineMd, color: vt.primaryFixed }}>{bestAmount}</Text>
      </View>
    </View>
  );
}
