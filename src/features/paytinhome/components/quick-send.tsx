import { Pressable, ScrollView, View } from 'react-native';

import { contacts } from '../data/home';
import { CONTACT, CONTACT_LABEL_TOP, MARGIN } from '../layout';
import { ph } from '../theme';
import { Avatar } from './avatar';
import { T } from './text';

/**
 * The people you send to most, in a row that scrolls.
 *
 * Horizontal rather than a wrap: a contact list has no natural end, and the
 * reference's row reaches the right-hand edge of the screen with the last face
 * flush against it — which is what a scroll looks like and what a wrap cannot
 * reproduce.
 *
 * The padding is on the content container, not the view, so the first face
 * lines up with the page margin while the row still scrolls edge to edge.
 */
export function QuickSend({ onSelect }: { onSelect?: (key: string) => void }) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ paddingHorizontal: MARGIN, gap: 16 }}
    >
      {contacts.map((c) => (
        <Pressable
          key={c.key}
          onPress={() => onSelect?.(c.key)}
          accessibilityRole="button"
          accessibilityLabel={c.name}
        >
          <View style={{ alignItems: 'center' }}>
            <Avatar face={c.face} size={CONTACT} />
            <T variant="contact" color={ph.muted} style={{ marginTop: CONTACT_LABEL_TOP }}>
              {c.name}
            </T>
          </View>
        </Pressable>
      ))}
    </ScrollView>
  );
}
