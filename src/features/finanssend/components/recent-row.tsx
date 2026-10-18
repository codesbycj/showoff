import { Pressable, ScrollView, View } from 'react-native';

import { recent } from '../data/transfer';
import { CONTACT, CONTACT_LABEL_TOP, MARGIN } from '../layout';
import { fn } from '../theme';
import { Avatar } from './avatar';
import { T } from './text';

/**
 * The people you sent to last, in a row that scrolls.
 *
 * Horizontal rather than a wrap: a contact list has no natural end, and the
 * reference's row reaches the right-hand edge with the last face flush against
 * it — which is what a scroll looks like and what a wrap cannot reproduce.
 */
export function RecentRow({ onSelect }: { onSelect?: (key: string) => void }) {
  return (
    <ScrollView
      horizontal
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={{ paddingHorizontal: MARGIN, gap: 16 }}
    >
      {recent.map((c) => (
        <Pressable
          key={c.key}
          onPress={() => onSelect?.(c.key)}
          accessibilityRole="button"
          accessibilityLabel={c.name}
        >
          <View style={{ alignItems: 'center' }}>
            <Avatar face={c.face} size={CONTACT} />
            <T variant="contact" color={fn.muted} style={{ marginTop: CONTACT_LABEL_TOP }}>
              {c.name}
            </T>
          </View>
        </Pressable>
      ))}
    </ScrollView>
  );
}
