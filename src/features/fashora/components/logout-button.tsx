import { Pressable, Text, View } from 'react-native';

import { R, SP, TYPE, fa } from '../theme';

import { Symbol } from './symbol';

/** The muted sign-out link that closes the profile. */
export function LogoutButton({ label, onPress }: { label: string; onPress?: () => void }) {
  return (
    <View style={{ alignItems: 'center', paddingTop: SP.sm }}>
      <Pressable onPress={onPress} accessibilityRole="button">
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: SP.sm,
            paddingHorizontal: SP.lg,
            paddingVertical: 10,
            borderRadius: R.full,
          }}
        >
          <Symbol name="logout" size={18} color={fa.secondary} />
          <Text style={{ ...TYPE.labelMd, color: fa.secondary }}>{label}</Text>
        </View>
      </Pressable>
    </View>
  );
}
