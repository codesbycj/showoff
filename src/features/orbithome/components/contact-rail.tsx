import { Image, Pressable, ScrollView, View } from 'react-native';

import { contacts } from '../data/home';
import { ct } from '../theme';
import { Glyph } from './glyph';
import { T } from './text';

type Props = { margin: number; width: number; height: number; onSelect?: () => void };

/**
 * The people this account sends to most.
 *
 * **Every face is a photograph** (I4). A horizontal scroller, not a wrap: the
 * board crops its rail at the frame, which a wrap cannot reproduce (R2).
 */
export function ContactRail({ margin, width, height, onSelect }: Props) {
  return (
    <View style={{ height }}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: margin, gap: 14 }}
      >
        {/* STEP 1.17 name
        {contacts.map((contact) => (
          <Pressable
            key={contact.id}
            accessibilityRole="button"
            accessibilityLabel={`Send to ${contact.name}`}
            onPress={onSelect}
            style={{ width, alignItems: 'center', gap: 7 }}
          >
            <Image
              source={contact.image}
              style={{ width: 56, height: 56, borderRadius: 28 }}
              resizeMode="cover"
            />
            <T variant="contact" numberOfLines={1}>
              {contact.name}
            </T>
          </Pressable>
        ))}
        */}

        {/* STEP 1.18 "Add"
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Add a contact"
          style={{ width, alignItems: 'center', gap: 7 }}
        >
          <View
            style={{
              width: 56,
              height: 56,
              borderRadius: 28,
              borderWidth: 1.5,
              borderStyle: 'dashed',
              borderColor: ct.line,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Glyph name="plus" size={20} color={ct.muted} strokeWidth={2} />
          </View>
          <T variant="contact">Add</T>
        </Pressable>
        */}
      </ScrollView>
    </View>
  );
}
