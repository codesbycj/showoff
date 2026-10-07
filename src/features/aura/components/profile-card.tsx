import { BadgeCheck, Star } from 'lucide-react-native';
import { Text, View } from 'react-native';

import { R, SP, TYPE, au } from '../theme';
import { Avatar } from './avatar';

/**
 * Who the account belongs to.
 *
 * The verified badge overhangs the photo, so the avatar is not inside anything
 * that clips — it draws its own rounded corners and the badge sits over it as a
 * sibling.
 */
export function ProfileCard({
  photo,
  name,
  handle,
  email,
  tier,
}: {
  photo: number;
  name: string;
  handle: string;
  email: string;
  tier: string;
}) {
  return (
    <View
      style={{
        backgroundColor: au.surfaceLowest,
        borderRadius: R.lg,
        padding: SP.md + 2,
        alignItems: 'center',
      }}
    >
      <View>
        <Avatar source={photo} size={78} />
        <View
          style={{
            position: 'absolute',
            right: -2,
            bottom: 2,
            width: 24,
            height: 24,
            borderRadius: 12,
            backgroundColor: au.surfaceLowest,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <BadgeCheck size={20} color={au.primaryBright} strokeWidth={2.4} />
        </View>
      </View>

      <Text style={[TYPE.headlineMd, { marginTop: 10, color: au.onSurface }]}>{name}</Text>
      <Text style={[TYPE.bodySm, { marginTop: 3, color: au.onSurfaceVariant }]}>
        {handle} • {email}
      </Text>

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          gap: 5,
          marginTop: 10,
          backgroundColor: au.surfaceLow,
          borderRadius: R.full,
          paddingHorizontal: 12,
          paddingVertical: 6,
        }}
      >
        <Star size={13} color={au.primary} fill={au.primary} strokeWidth={0} />
        <Text style={[TYPE.labelMd, { color: au.onSurface }]}>{tier}</Text>
      </View>
    </View>
  );
}
