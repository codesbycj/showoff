import { Pressable, Text, View } from 'react-native';

import { TYPE, au } from '../theme';
import { Avatar } from './avatar';

/**
 * Who is logged in, and a way to their profile.
 *
 * The text column is flex and the avatar is not, so a longer name wraps inside
 * its own column rather than pushing the photo off the screen edge.
 */
export function GreetingRow({
  greeting,
  tagline,
  photo,
  onPress,
}: {
  greeting: string;
  tagline: string;
  photo: number;
  onPress?: () => void;
}) {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <View style={{ flex: 1, paddingRight: 12 }}>
        <Text style={[TYPE.headlineLg, { color: au.onSurface }]}>{greeting}</Text>
        <Text style={[TYPE.bodyMd, { marginTop: 2, color: au.onSurfaceVariant }]}>{tagline}</Text>
      </View>

      <Pressable onPress={onPress} hitSlop={8}>
        <Avatar source={photo} size={48} dot />
      </Pressable>
    </View>
  );
}
