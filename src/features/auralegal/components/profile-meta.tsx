import { Pressable, Text, View } from 'react-native';

import { R, SP, TYPE, al } from '../theme';

import { FilledIcon } from './filled-icon';
import { Symbol } from './symbol';

/**
 * The name, location and the two contact buttons under the profile header.
 *
 * The verified tick is the filled variant, drawn from the path set rather than
 * the icon font — see `filled-icon.tsx`.
 */
export function ProfileMeta({
  name,
  place,
  onMessage,
  onCall,
}: {
  name: string;
  place: string;
  onMessage?: () => void;
  onCall?: () => void;
}) {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingVertical: SP.sm,
        marginBottom: SP.sm,
      }}
    >
      <View>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
          <Text style={{ ...TYPE.headlineLg, letterSpacing: -0.44, color: al.onSurface }}>
            {name}
          </Text>
          <FilledIcon name="verified" size={18} color={al.secondary} />
        </View>

        <View style={{ flexDirection: 'row', alignItems: 'center', gap: SP.xs, marginTop: 2 }}>
          <Symbol name="locationOn" size={14} color={al.onSurfaceVariant} />
          <Text style={{ ...TYPE.labelMd, color: al.onSurfaceVariant }}>{place}</Text>
        </View>
      </View>

      <View style={{ flexDirection: 'row', alignItems: 'center', gap: SP.xs }}>
        <ContactButton icon="chatBubble" label={`Message ${name}`} onPress={onMessage} />
        <ContactButton icon="call" label={`Call ${name}`} onPress={onCall} />
      </View>
    </View>
  );
}

function ContactButton({
  icon,
  label,
  onPress,
}: {
  icon: 'chatBubble' | 'call';
  label: string;
  onPress?: () => void;
}) {
  return (
    <Pressable onPress={onPress} accessibilityRole="button" accessibilityLabel={label}>
      <View
        style={{
          width: 44,
          height: 44,
          borderRadius: R.full,
          backgroundColor: al.surfaceContainer,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Symbol name={icon} size={20} color={al.onSurface} />
      </View>
    </Pressable>
  );
}
