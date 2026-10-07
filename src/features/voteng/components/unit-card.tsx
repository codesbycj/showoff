import { ChevronRight, MapPin } from 'lucide-react-native';
import { Pressable, Text, View } from 'react-native';

import { FONT, R, SP, vt } from '../theme';

/**
 * The polling unit the account is registered at.
 *
 * It carries a status chip in the same emerald tint the explore grid uses,
 * because "Results in" is the answer to the only question this card exists to
 * settle: has my unit been counted yet. The unit code is set in the data face
 * for the same reason as the voter number — it is read as digits, not as words.
 */
export function UnitCard({
  label,
  name,
  code,
  where,
  status,
  onPress,
}: {
  label: string;
  name: string;
  code: string;
  where: string;
  status: string;
  onPress?: () => void;
}) {
  return (
    <Pressable onPress={onPress}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          backgroundColor: vt.card,
          borderRadius: R.lg,
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
            width: 40,
            height: 40,
            borderRadius: R.md,
            backgroundColor: vt.tintEmerald,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <MapPin size={19} color={vt.primary} strokeWidth={2.2} />
        </View>

        <View style={{ flex: 1, marginLeft: SP.md }}>
          <Text
            style={{
              fontFamily: FONT.medium,
              fontSize: 10,
              lineHeight: 14,
              letterSpacing: 0.4,
              textTransform: 'uppercase',
              color: vt.faint,
            }}
          >
            {label}
          </Text>
          <Text
            numberOfLines={1}
            style={{
              marginTop: 1,
              fontFamily: FONT.bold,
              fontSize: 14,
              lineHeight: 19,
              letterSpacing: -0.28,
              color: vt.ink,
            }}
          >
            {name}
          </Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 3 }}>
            <Text style={{ fontFamily: FONT.data, fontSize: 10, lineHeight: 14, color: vt.muted }}>
              {code}
            </Text>
            <View style={{ width: 3, height: 3, borderRadius: 1.5, backgroundColor: vt.ghost }} />
            <Text
              style={{ fontFamily: FONT.medium, fontSize: 10, lineHeight: 14, color: vt.muted }}
            >
              {where}
            </Text>
          </View>
        </View>

        <View style={{ alignItems: 'flex-end', gap: 6, marginLeft: SP.sm }}>
          <View
            style={{
              backgroundColor: vt.tintEmerald,
              borderRadius: R.full,
              paddingHorizontal: 8,
              paddingVertical: 3,
            }}
          >
            <Text
              style={{ fontFamily: FONT.bold, fontSize: 9.5, lineHeight: 13, color: vt.primary }}
            >
              {status}
            </Text>
          </View>
          <ChevronRight size={16} color={vt.faint} strokeWidth={2.4} />
        </View>
      </View>
    </Pressable>
  );
}
