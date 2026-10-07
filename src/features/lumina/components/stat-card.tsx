import { Text, View } from 'react-native';

import { StatWell } from './profile-identity';
import type { Stat } from '../data/profile';
import { FONT, LEVEL, ll } from '../theme';

/** One of the two cards beside the avatar — glyph, big number, small label. */
export function StatCard({ stat }: { stat: Stat }) {
  return (
    <View
      style={[
        {
          flex: 1,
          flexDirection: 'row',
          alignItems: 'center',
          gap: 12,
          backgroundColor: ll.surface,
          borderRadius: 22,
          padding: 14,
        },
        LEVEL.card,
      ]}
    >
      <StatWell icon={stat.icon} size={36} tint={stat.tint} ink={stat.ink} />

      <View>
        <Text
          style={{
            fontFamily: FONT.extrabold,
            fontSize: 17,
            lineHeight: 18,
            letterSpacing: -0.34,
            color: '#191e1a',
          }}
        >
          {stat.value}
        </Text>
        <Text
          style={{
            fontFamily: FONT.medium,
            fontSize: 11,
            lineHeight: 14,
            color: '#889489',
            marginTop: 4,
          }}
        >
          {stat.label}
        </Text>
      </View>
    </View>
  );
}

/**
 * The three-up card below them.
 *
 * The reference separates the columns with `divide-x`, a rule on every child
 * but the first. React Native has no such utility, so each column after the
 * first carries its own left border — which is the same thing and keeps the
 * rule inside the padded box rather than spanning the card's full height.
 */
export function StatTriple({ stats }: { stats: (Stat & { suffix?: string })[] }) {
  return (
    <View
      style={[
        {
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: ll.surface,
          borderRadius: 24,
          padding: 16,
        },
        LEVEL.card,
      ]}
    >
      {stats.map((stat, i) => (
        <View
          key={stat.key}
          style={[
            { flex: 1, alignItems: 'center', paddingHorizontal: 4 },
            i > 0 && { borderLeftWidth: 1, borderLeftColor: '#eef2ec' },
          ]}
        >
          <StatWell icon={stat.icon} size={28} tint={stat.tint} ink={stat.ink} />

          <Text
            style={{
              fontFamily: FONT.medium,
              fontSize: 11,
              lineHeight: 15,
              color: '#889489',
              marginTop: 4,
            }}
          >
            {stat.label}
          </Text>

          <Text
            style={{
              fontFamily: FONT.bold,
              fontSize: 17,
              lineHeight: 22,
              letterSpacing: -0.34,
              color: ll.ink,
              marginTop: 2,
            }}
          >
            {stat.value}
            {stat.suffix ? (
              <Text style={{ fontFamily: FONT.regular, fontSize: 12, color: '#889489' }}>
                {stat.suffix}
              </Text>
            ) : null}
          </Text>
        </View>
      ))}
    </View>
  );
}
