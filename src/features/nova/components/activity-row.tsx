import { Pressable, Text, View } from 'react-native';

import { CoinMark } from './coin-mark';
import type { Entry } from '../data/activity';
import { FONT, LEVEL, R, nv } from '../theme';

/**
 * One entry on the activity list.
 *
 * The middle line pairs a timestamp with a tinted percentage chip, separated by
 * a bullet. The chip's tint follows the sign of the percentage, while the fiat
 * value on the right has its *own* tone — the reference has rows where the two
 * disagree, such as a Bitcoin buy whose price ticked up while the cash line is
 * negative. So `deltaUp` and `valueTone` are separate fields rather than one
 * flag driving both.
 */
export function ActivityRow({ entry, onPress }: { entry: Entry; onPress?: () => void }) {
  const valueColor =
    entry.valueTone === 'gain' ? nv.gainInk : entry.valueTone === 'loss' ? nv.lossInk : nv.subtle;

  return (
    <Pressable onPress={onPress} accessibilityRole="button">
      <View
        style={[
          {
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            backgroundColor: nv.surface,
            borderRadius: R.base,
            padding: 14,
            borderWidth: 1,
            borderColor: nv.border,
          },
          LEVEL.card,
        ]}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12, flex: 1 }}>
          <CoinMark coin={entry.coin} size={44} radius={R.base} />

          <View style={{ flex: 1 }}>
            <Text
              style={{
                fontFamily: FONT.bold,
                fontSize: 15,
                lineHeight: 19,
                letterSpacing: -0.15,
                color: nv.ink,
              }}
              numberOfLines={1}
            >
              {entry.title}
            </Text>

            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 3 }}>
              <Text
                style={{ fontFamily: FONT.medium, fontSize: 11, lineHeight: 15, color: nv.subtle }}
              >
                {entry.time}
              </Text>
              <Text style={{ fontSize: 10, lineHeight: 15, color: '#d1d5db' }}>•</Text>

              <View
                style={{
                  backgroundColor: entry.deltaUp ? nv.gainBg : nv.lossBg,
                  paddingHorizontal: 6,
                  paddingVertical: 1,
                  borderRadius: 6,
                }}
              >
                <Text
                  style={{
                    fontFamily: FONT.medium,
                    fontSize: 11,
                    lineHeight: 15,
                    color: entry.deltaUp ? nv.gainInk : nv.lossInk,
                  }}
                >
                  {entry.delta}
                </Text>
              </View>
            </View>
          </View>
        </View>

        <View style={{ alignItems: 'flex-end', paddingLeft: 8 }}>
          <Text
            style={{
              fontFamily: FONT.bold,
              fontSize: 15,
              lineHeight: 19,
              letterSpacing: -0.15,
              color: nv.ink,
            }}
          >
            {entry.amount}
          </Text>
          <Text
            style={{
              fontFamily: FONT.medium,
              fontSize: 12,
              lineHeight: 16,
              color: valueColor,
              marginTop: 2,
            }}
          >
            {entry.value}
          </Text>
        </View>
      </View>
    </Pressable>
  );
}

/** The sticky-looking label above each day's entries. */
export function GroupHead({ label, count }: { label: string; count: string }) {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: 8,
      }}
    >
      <Text
        style={{
          fontFamily: FONT.bold,
          fontSize: 11,
          lineHeight: 15,
          letterSpacing: 0.55,
          textTransform: 'uppercase',
          color: nv.subtle,
        }}
      >
        {label}
      </Text>
      <Text style={{ fontFamily: FONT.medium, fontSize: 11, lineHeight: 15, color: nv.subtle }}>
        {count}
      </Text>
    </View>
  );
}
