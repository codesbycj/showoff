import { Image, Pressable, View } from 'react-native';

import { clients } from '../data/home';
import { ct } from '../theme';
import { T } from './text';

type Props = { margin: number; width: number; height: number; radius: number; gap: number };

/**
 * The clients.
 *
 * **Each card is a photograph** (I4) with the name on a white pill over it, as
 * the board draws it - a name straight on a frame is the contrast failure R4
 * exists for, and the audit cannot measure text over photography.
 */
export function ClientRail({ margin, width, height, radius, gap }: Props) {
  const photoH = height - 22;

  return (
    <View style={{ marginHorizontal: margin, flexDirection: 'row', gap }}>
      {clients.map((client) => (
        <Pressable
          key={client.id}
          accessibilityRole="button"
          accessibilityLabel={`${client.name}, ${client.tag}`}
          style={{ width }}
        >
          <View style={{ width, height: photoH, borderRadius: radius, overflow: 'hidden' }}>
            <Image source={client.image} style={{ width, height: photoH }} resizeMode="cover" />

            <View style={{ position: 'absolute', left: 6, right: 6, bottom: 8 }}>
              <View
                style={{
                  height: 26,
                  borderRadius: 13,
                  backgroundColor: ct.white,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <T variant="clientName" numberOfLines={1}>
                  {client.name}
                </T>
              </View>
            </View>
          </View>

          <View style={{ height: 22, alignItems: 'center', justifyContent: 'center' }}>
            <T variant="clientTag">{client.tag}</T>
          </View>
        </Pressable>
      ))}
    </View>
  );
}
