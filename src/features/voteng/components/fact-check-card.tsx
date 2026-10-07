import { BadgeCheck, Check, CircleAlert, X } from 'lucide-react-native';
import { Pressable, Text, View } from 'react-native';

import type { FactCheck, Verdict } from '../data/news';
import { FONT, R, SP, vt } from '../theme';

/** Wide enough for a claim on two lines; a card and a half shows at 393dp. */
export const CHECK_CARD_WIDTH = 264;

/**
 * One checked claim.
 *
 * The verdict is the only full-strength non-party colour in the app, so it is
 * spent carefully: a pale wash, the matching ink, an icon, and the word itself.
 * The word is not decoration — colour alone would lose the verdict for a
 * colour-blind reader, in a monochrome screenshot, and in the thumbnail a
 * reader sees before they tap. Icon and label are set from one lookup so the
 * three can never drift apart.
 */
const LOOK: Record<Verdict, { label: string; ink: string; tint: string; Icon: typeof Check }> = {
  true: { label: 'True', ink: vt.primary, tint: vt.tintEmerald, Icon: Check },
  false: { label: 'False', ink: vt.liveDeep, tint: vt.tintRed, Icon: X },
  unclear: { label: 'Needs context', ink: vt.warn, tint: vt.tintAmber, Icon: CircleAlert },
};

export function FactCheckCard({ check, onPress }: { check: FactCheck; onPress?: () => void }) {
  const look = LOOK[check.verdict];

  return (
    <Pressable onPress={onPress}>
      <View
        style={{
          width: CHECK_CARD_WIDTH,
          backgroundColor: vt.card,
          borderRadius: R.md,
          borderWidth: 1,
          borderColor: vt.line,
          padding: 14,
          shadowColor: '#000000',
          shadowOpacity: 0.03,
          shadowRadius: 8,
          shadowOffset: { width: 0, height: 2 },
          elevation: 1,
        }}
      >
        <View
          style={{
            alignSelf: 'flex-start',
            flexDirection: 'row',
            alignItems: 'center',
            gap: 4,
            backgroundColor: look.tint,
            borderRadius: R.full,
            paddingHorizontal: 8,
            paddingVertical: 3,
          }}
        >
          <look.Icon size={12} color={look.ink} strokeWidth={3} />
          <Text
            style={{
              fontFamily: FONT.black,
              fontSize: 10,
              lineHeight: 14,
              letterSpacing: 0.3,
              textTransform: 'uppercase',
              color: look.ink,
            }}
          >
            {look.label}
          </Text>
        </View>

        <Text
          numberOfLines={2}
          style={{
            marginTop: SP.sm + 2,
            fontFamily: FONT.bold,
            fontSize: 13,
            lineHeight: 18,
            letterSpacing: -0.2,
            color: vt.ink,
          }}
        >
          {check.claim}
        </Text>

        <Text
          numberOfLines={2}
          style={{
            marginTop: 5,
            fontFamily: FONT.regular,
            fontSize: 11.5,
            lineHeight: 16,
            color: vt.body,
          }}
        >
          {check.detail}
        </Text>

        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5, marginTop: SP.md }}>
          <BadgeCheck size={12} color={vt.faint} strokeWidth={2.2} />
          <Text
            numberOfLines={1}
            style={{
              flex: 1,
              fontFamily: FONT.medium,
              fontSize: 10,
              lineHeight: 14,
              color: vt.faint,
            }}
          >
            {check.source}
          </Text>
        </View>
      </View>
    </Pressable>
  );
}
