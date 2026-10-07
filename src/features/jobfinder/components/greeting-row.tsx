import { Bell, Search } from 'lucide-react-native';
import { Text, View } from 'react-native';

import { FONT, TYPE, jf } from '../theme';
import { Avatar } from './avatar';
import { IconButton } from './icon-button';

/**
 * The feed's header: who you are on the left, what you can do on the right.
 *
 * The two-line greeting sets its own sizes rather than taking them from `TYPE`.
 * 17/12 is a pairing that appears once, here, and naming it in the scale would
 * imply it is reused.
 */
export function GreetingRow({
  greeting,
  tagline,
  photo,
  onProfile,
  onSearch,
  onNotifications,
}: {
  greeting: string;
  tagline: string;
  photo: number;
  onProfile?: () => void;
  onSearch?: () => void;
  onNotifications?: () => void;
}) {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
        <Avatar source={photo} size={44} ring={2} dot={jf.online} onPress={onProfile} />
        <View>
          <Text
            style={{
              fontFamily: FONT.bold,
              fontSize: 17,
              lineHeight: 21,
              letterSpacing: -0.4,
              color: jf.ink,
            }}
          >
            {greeting}
          </Text>
          <Text style={[TYPE.meta, { color: jf.muted, marginTop: 2 }]}>{tagline}</Text>
        </View>
      </View>

      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
        <IconButton icon={Search} onPress={onSearch} accessibilityLabel="Search jobs" />
        <IconButton
          icon={Bell}
          onPress={onNotifications}
          badge="#D97706"
          accessibilityLabel="Notifications"
        />
      </View>
    </View>
  );
}
