import { Image, Pressable, ScrollView, View } from 'react-native';

import { contacts } from '../data/send';
import { ct } from '../theme';

type Props = { margin: number; height: number };

/**
 * Who the money can go to.
 *
 * **Every face is a photograph** (I4). The chosen contact is marked by a ring
 * rather than by colour alone, so it survives a greyscale render.
 */
export function ContactPicker({ margin, height }: Props) {
  return (
    <View style={{ height }}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: margin, gap: 14, alignItems: 'center' }}
      >
        {contacts.map((contact) => (
          <Pressable
            key={contact.id}
            accessibilityRole="button"
            accessibilityState={{ selected: !!contact.on }}
            accessibilityLabel={contact.name}
          >
            <View
              style={{
                width: 60,
                height: 60,
                borderRadius: 30,
                alignItems: 'center',
                justifyContent: 'center',
                borderWidth: contact.on ? 2.5 : 0,
                borderColor: ct.accent,
              }}
            >
              <Image
                source={contact.image}
                style={{
                  width: contact.on ? 50 : 54,
                  height: contact.on ? 50 : 54,
                  borderRadius: 27,
                }}
                resizeMode="cover"
              />
            </View>
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
}
