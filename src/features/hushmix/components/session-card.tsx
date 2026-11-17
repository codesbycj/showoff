import { Pressable, View } from 'react-native';

import { session, tags } from '../data/session';
import { ct } from '../theme';
import { Glyph } from './glyph';
import { T } from './text';

type Props = { radius: number; height: number; onOpen: () => void };

/**
 * The session being built.
 *
 * The chips carry `onChip`, not the page's muted grey: the same grey that
 * reads 7.6:1 on the page lands at 4.1:1 on a chip, and a dark theme needs a
 * token per ground (R4).
 *
 * The card's fill sits on an absolutely-filled child so an emptied card paints
 * nothing in frame one of the reveal (I9).
 */
export function SessionCard({ radius, height, onOpen }: Props) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={`${session.name}, ${session.by}`}
      onPress={onOpen}
    >
      <View style={{ height, borderRadius: radius, padding: 18, justifyContent: 'center' }}>
        <View
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: ct.card,
            borderRadius: radius,
          }}
        />

        {/* STEP 1.05 name
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <View style={{ flex: 1 }}>
            <T variant="session">{session.name}</T>
            <T variant="by">{session.by}</T>
          </View>
          <Glyph name="chevron" size={16} color={ct.onDarkMuted} strokeWidth={1.8} />
        </View>
        */}

        <View style={{ flexDirection: 'row', gap: 7, marginTop: 12 }}>
          {/* STEP 1.06 label
          {tags.map((tag) => (
            <View
              key={tag.id}
              style={{
                height: 24,
                borderRadius: 12,
                paddingHorizontal: 10,
                justifyContent: 'center',
                backgroundColor: ct.chip,
              }}
            >
              <T variant="tag">{tag.label}</T>
            </View>
          ))}
          */}
        </View>
      </View>
    </Pressable>
  );
}
