import { ShieldAlert, ShieldCheck } from 'lucide-react-native';
import { Text, View } from 'react-native';

import { EM, FONT, R, alpha, vt } from '../theme';

/**
 * The two capsules that bracket the splash: the certified-feed mark at the top
 * and the federal seal at the bottom.
 *
 * They are one component with a `tone` rather than two, because they are the
 * same object at two weights — the seal is the feed mark a shade dimmer, a
 * shade wider and set in medium rather than semibold. Passing eight props at
 * each call site would have hidden that; a named pair states it.
 */
const TONES = {
  feed: {
    Icon: ShieldAlert,
    fill: alpha(EM[950], 0.7),
    border: alpha(EM[500], 0.3),
    ink: EM[200],
    iconInk: vt.neon,
    font: FONT.semibold,
    tracking: 0.1,
    padH: 12,
    padV: 4,
    gap: 6,
  },
  seal: {
    Icon: ShieldCheck,
    fill: alpha(EM[950], 0.5),
    border: alpha(EM[500], 0.2),
    ink: alpha(EM[200], 0.9),
    iconInk: EM[400],
    font: FONT.medium,
    tracking: 0.05,
    padH: 14,
    padV: 6,
    gap: 8,
  },
} as const;

export function BootBadge({ label, tone = 'feed' }: { label: string; tone?: keyof typeof TONES }) {
  const t = TONES[tone];
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        gap: t.gap,
        alignSelf: 'center',
        backgroundColor: t.fill,
        borderWidth: 1,
        borderColor: t.border,
        borderRadius: R.full,
        paddingHorizontal: t.padH,
        paddingVertical: t.padV,
      }}
    >
      <t.Icon size={14} color={t.iconInk} strokeWidth={2} />
      <Text
        style={{
          fontFamily: t.font,
          fontSize: 10,
          lineHeight: 14,
          letterSpacing: 10 * t.tracking,
          textTransform: 'uppercase',
          color: t.ink,
        }}
      >
        {label}
      </Text>
    </View>
  );
}
