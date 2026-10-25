import { StatusBar } from 'expo-status-bar';
import { Pressable, View } from 'react-native';
import Svg, { Circle, Path } from 'react-native-svg';

import { Glyph } from '@/features/sablelimit/components/glyph';
import { T } from '@/features/sablelimit/components/text';
import { balances, limit, promo } from '@/features/sablelimit/data/dash';
import {
  ACTION_GAP,
  ACTION_HEIGHT,
  ACTIONS_TOP,
  CARD_PAD,
  GAUGE_SIZE,
  GAUGE_THICK,
  HEADER_SIZE,
  HEADER_TOP,
  MARGIN,
  PANEL_MIN,
  PANEL_TOP,
  PROMO_HEIGHT,
  PROMO_TOP,
} from '@/features/sablelimit/layout';
import { radius, sb, type } from '@/features/sablelimit/theme';
import { useInsets } from '@/features/sablelimit/use-insets';

/**
 * Sable — the monthly limit.
 *
 * Assembly only: the way back, how much of the limit is used, the two
 * balances behind it, and the offer to raise it.
 *
 * The gauge's sweep, the fraction and the percentage are one number. The
 * reference prints "$6,469/10k" beside "64%" with a needle pointing somewhere
 * else again.
 *
 * The arc is built already rotated rather than wrapped in a rotated `<G>`:
 * react-native-svg's `origin` prop emits an invalid DOM attribute on web and
 * red-bars the screen.
 *
 * The needle is one tapered triangle from the hub to the tip rather than a
 * line with an arrowhead stuck on the end: an arrowhead has to be rotated to
 * the needle's angle, and React Native rotates about an element's centre
 * whatever you ask for, so it ends up beside the needle rather than on it.
 *
 * (That note lives here rather than beside the Path, because a JSX comment
 * inside a block the timelapse stages ends the staged block early with its
 * own closing marker and the blank file stops parsing.)
 */
export default function SablelimitScreen() {
  const insets = useInsets();

  const r = (GAUGE_SIZE - GAUGE_THICK) / 2;
  const c = 2 * Math.PI * r;
  /** half the circle is the dial, open at the foot */
  const dial = c * 0.5;
  const mid = GAUGE_SIZE / 2;
  /** the needle, at the share's angle across 180 degrees */
  const angle = Math.PI * (1 - limit.share);
  const nx = mid + Math.cos(angle) * (r - 42);
  const ny = mid - Math.sin(angle) * (r - 42);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: sb.canvas,
        paddingTop: insets.top + HEADER_TOP,
        paddingHorizontal: MARGIN,
        paddingBottom: insets.bottom,
      }}
    >
      <StatusBar style="light" />

      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Pressable accessibilityRole="button" accessibilityLabel="Go back">
          <View
            style={{
              width: HEADER_SIZE,
              height: HEADER_SIZE,
              borderRadius: radius.control,
              backgroundColor: sb.slab,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Glyph name="back" size={18} tint={sb.onDark} />
          </View>
        </Pressable>
        <View style={{ flex: 1 }} />
        <Pressable accessibilityRole="button" accessibilityLabel="All accounts">
          <View
            style={{
              width: HEADER_SIZE,
              height: HEADER_SIZE,
              borderRadius: radius.control,
              backgroundColor: sb.slab,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Glyph name="grid" size={19} tint={sb.onDark} />
          </View>
        </Pressable>
      </View>

      <View
        style={{
          flex: 1,
          minHeight: PANEL_MIN,
          marginTop: PANEL_TOP,
          borderRadius: radius.card,
          backgroundColor: sb.card,
          padding: CARD_PAD,
        }}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <T variant="display" color={sb.ink} style={{ flex: 1, height: type.display.line }}>
            {limit.title}
          </T>
          <Glyph name="chart" size={19} tint={sb.ink} />
        </View>

        <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
          <Svg width={GAUGE_SIZE} height={GAUGE_SIZE / 2 + GAUGE_THICK}>
            <Circle
              cx={mid}
              cy={mid}
              r={r}
              stroke="rgba(16,17,18,0.14)"
              strokeWidth={GAUGE_THICK}
              strokeLinecap="round"
              fill="none"
              strokeDasharray={`${dial} ${c}`}
              transform={`rotate(180 ${mid} ${mid})`}
            />
            <Circle
              cx={mid}
              cy={mid}
              r={r}
              stroke={sb.ink}
              strokeWidth={GAUGE_THICK}
              strokeLinecap="round"
              fill="none"
              strokeDasharray={`${dial * limit.share} ${c}`}
              transform={`rotate(180 ${mid} ${mid})`}
            />
            <Path d={`M${mid - 7} ${mid} L${mid + 7} ${mid} L${nx} ${ny} Z`} fill={sb.ink} />
            <Circle cx={mid} cy={mid} r={7} fill={sb.ink} />
          </Svg>
        </View>

        <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
          <T variant="gaugeSub" color={sb.ink} style={{ flex: 1, height: type.gaugeSub.line }}>
            {limit.used}
          </T>
          <T variant="gauge" color={sb.ink} style={{ height: type.gauge.line }}>
            {limit.pct + '%'}
          </T>
        </View>
      </View>

      <View style={{ flexDirection: 'row', gap: ACTION_GAP, marginTop: ACTIONS_TOP }}>
        {balances.map((b) => {
          const tint = b.tone === 'yellow' ? sb.yellow : sb.card;
          return (
            <View
              key={b.id}
              style={{
                flex: 1,
                height: ACTION_HEIGHT,
                borderRadius: radius.card,
                backgroundColor: sb.slab,
                padding: CARD_PAD,
                justifyContent: 'space-between',
              }}
            >
              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <T variant="action" color={tint} style={{ flex: 1, height: type.action.line }}>
                  {b.label}
                </T>
                <View
                  style={{
                    width: 28,
                    height: 28,
                    borderRadius: radius.control,
                    borderWidth: 1.4,
                    borderColor: tint,
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <View
                    style={{ transform: [{ rotate: b.tone === 'yellow' ? '0deg' : '180deg' }] }}
                  >
                    <Glyph name="arrow" size={14} tint={tint} />
                  </View>
                </View>
              </View>
              <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
                <T variant="gaugeSub" color={sb.onDark} style={{ height: type.gaugeSub.line }}>
                  {b.major}
                </T>
                <T variant="small" color={sb.muted} style={{ height: type.small.line }}>
                  {b.minor}
                </T>
              </View>
            </View>
          );
        })}
      </View>

      <View
        style={{
          height: PROMO_HEIGHT,
          marginTop: PROMO_TOP,
          borderRadius: radius.card,
          backgroundColor: sb.yellow,
          padding: CARD_PAD,
          justifyContent: 'space-between',
        }}
      >
        <View>
          <T variant="promoTitle" color={sb.ink} style={{ height: type.promoTitle.line }}>
            {promo.title}
          </T>
          <T variant="promoBody" color={sb.ink} style={{ marginTop: 4, maxWidth: 260 }}>
            {promo.body}
          </T>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <T variant="promoTitle" color={sb.ink} style={{ flex: 1, height: type.promoTitle.line }}>
            {promo.price}
          </T>
          <Pressable accessibilityRole="button" accessibilityLabel={'Get ' + promo.title}>
            <View
              style={{
                width: 46,
                height: 46,
                borderRadius: radius.control,
                backgroundColor: sb.dark,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <View style={{ transform: [{ rotate: '180deg' }] }}>
                <Glyph name="back" size={18} tint={sb.onDark} />
              </View>
            </View>
          </Pressable>
        </View>
      </View>
    </View>
  );
}
