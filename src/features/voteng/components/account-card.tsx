import { BadgeCheck, ChevronRight, User } from 'lucide-react-native';
import { Pressable, Text, View } from 'react-native';

import { FONT, R, SP, vt } from '../theme';

/**
 * Who is signed in, and whether their registration has been verified.
 *
 * The avatar is the same grey circle with a filled user glyph that the home
 * masthead and the Others standing use — not a photograph. This showcase's only
 * portraits are AI-generated likenesses of real politicians that came with the
 * export; inventing a face for the *user* would add a person who does not
 * exist to a screen about identity, which is the one place in the app that
 * would be actively misleading.
 *
 * The voter number is set in the data face rather than the body face. It is the
 * one string on this screen that is read digit by digit, and Inter's tabular
 * figures keep it from shifting as it changes.
 */
export function AccountCard({
  name,
  meta,
  voterId,
  action,
  onPress,
}: {
  name: string;
  meta: string;
  voterId: string;
  action: string;
  onPress?: () => void;
}) {
  return (
    <Pressable onPress={onPress}>
      <View
        style={{
          backgroundColor: vt.card,
          borderRadius: R.lg,
          borderWidth: 1,
          borderColor: vt.line,
          padding: SP.lg,
          shadowColor: '#000000',
          shadowOpacity: 0.05,
          shadowRadius: 10,
          shadowOffset: { width: 0, height: 2 },
          elevation: 1,
        }}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View
            style={{
              width: 52,
              height: 52,
              borderRadius: R.full,
              backgroundColor: '#E2E8F0',
              borderWidth: 1,
              borderColor: vt.ghost,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <User size={28} color={vt.muted} fill={vt.muted} strokeWidth={0} />
          </View>

          <View style={{ flex: 1, marginLeft: SP.md + 2 }}>
            <Text
              style={{
                fontFamily: FONT.black,
                fontSize: 17,
                lineHeight: 22,
                letterSpacing: -0.4,
                color: vt.ink,
              }}
            >
              {name}
            </Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4, marginTop: 3 }}>
              <BadgeCheck size={13} color={vt.primary} strokeWidth={2.4} />
              <Text
                style={{ fontFamily: FONT.medium, fontSize: 11, lineHeight: 15, color: vt.muted }}
              >
                {meta}
              </Text>
            </View>
          </View>

          <ChevronRight size={18} color={vt.faint} strokeWidth={2.4} />
        </View>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: SP.md + 2,
            paddingTop: SP.md,
            borderTopWidth: 1,
            borderTopColor: vt.line,
          }}
        >
          <Text
            style={{
              fontFamily: FONT.data,
              fontSize: 12,
              lineHeight: 16,
              letterSpacing: 0.3,
              color: vt.body,
            }}
          >
            {voterId}
          </Text>
          <Text style={{ fontFamily: FONT.bold, fontSize: 11, lineHeight: 15, color: vt.primary }}>
            {action}
          </Text>
        </View>
      </View>
    </Pressable>
  );
}
