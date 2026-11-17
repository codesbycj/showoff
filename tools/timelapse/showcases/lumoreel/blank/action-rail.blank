import { Pressable, View } from 'react-native';

import { actions, count } from '../data/reel';
import { ct } from '../theme';
import { Glyph } from './glyph';
import { T } from './text';

type Props = { bottom: number; gap: number };

/**
 * Like, comment, share - the rail the board stacks down the right edge.
 *
 * **Every count is formatted, never typed** (R9): 1.9M comes from the same
 * helper the feed uses, so the two screens cannot disagree about one post.
 *
 * Each control is 44dp of box with its label under it, and both sit on a soft
 * scrim: white type straight on a photograph is the contrast failure R4
 * exists for and the audit cannot measure it over a frame.
 */
export function ActionRail({ bottom, gap }: Props) {
  return (
    <View style={{ position: 'absolute', right: 14, bottom, alignItems: 'center', gap }}>
      {actions.map((action) => (
        <Pressable
          key={action.id}
          accessibilityRole="button"
          accessibilityLabel={`${action.id}, ${count(action.value)}`}
          style={{ alignItems: 'center', gap: 5 }}
        >
          <View
            style={{
              width: 44,
              height: 44,
              borderRadius: 22,
              backgroundColor: 'rgba(18,11,34,0.55)',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Glyph
              name={action.glyph}
              size={21}
              color={action.glyph === 'liked' ? ct.like : ct.ink}
              strokeWidth={1.8}
            />
          </View>
          <T variant="count">{count(action.value)}</T>
        </Pressable>
      ))}
    </View>
  );
}
