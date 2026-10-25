import { Image, Pressable, View } from 'react-native';
import Svg, { Circle, Path } from 'react-native-svg';

import { avatar, copy, taskCount } from '../data/start';
import { AVATAR, HEAD_DISC, HEAD_TOP } from '../layout';
import { br, radius, type } from '../theme';
import { T } from './text';

/**
 * Who is signed in, what is on, and the two things the header does.
 *
 * The task count is read from the list rather than typed into the string —
 * the one line on a dashboard most likely to go stale.
 *
 * The avatar is a photograph, per AGENTS.md, with numeric width and height.
 */
export function ProfileRow({ onAdd }: { onAdd?: () => void }) {
  const disc = {
    width: HEAD_DISC,
    height: HEAD_DISC,
    borderRadius: radius.pill,
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
  };

  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: HEAD_TOP }}>
      <Image
        source={avatar}
        style={{ width: AVATAR, height: AVATAR, borderRadius: radius.pill }}
        accessibilityIgnoresInvertColors
      />
      <View style={{ flex: 1, marginLeft: 10 }}>
        <T variant="name" color={br.ink} style={{ height: type.name.line }}>
          {copy.name}
        </T>
        <T variant="nameSub" color={br.muted} style={{ height: type.nameSub.line }}>
          {'Today you have ' + taskCount + ' tasks'}
        </T>
      </View>

      <Pressable accessibilityRole="button" accessibilityLabel="Settings">
        <View style={[disc, { backgroundColor: br.surface }]}>
          <Svg width={18} height={18} viewBox="0 0 24 24">
            {/* a cog, not a sun: the teeth are a ring of stubby rects */}
            <Circle cx={12} cy={12} r={3.2} stroke={br.ink} strokeWidth={1.7} fill="none" />
            <Path
              d="M12 2.6a9.4 9.4 0 0 1 2.4.3l.3 2.1a7.4 7.4 0 0 1 1.9 1.1l2-.8a9.4 9.4 0 0 1 2.4 4.1l-1.7 1.3a7.4 7.4 0 0 1 0 2.2l1.7 1.3a9.4 9.4 0 0 1-2.4 4.1l-2-.8a7.4 7.4 0 0 1-1.9 1.1l-.3 2.1a9.4 9.4 0 0 1-4.8 0l-.3-2.1a7.4 7.4 0 0 1-1.9-1.1l-2 .8a9.4 9.4 0 0 1-2.4-4.1l1.7-1.3a7.4 7.4 0 0 1 0-2.2L3.4 9.4a9.4 9.4 0 0 1 2.4-4.1l2 .8a7.4 7.4 0 0 1 1.9-1.1l.3-2.1A9.4 9.4 0 0 1 12 2.6Z"
              stroke={br.ink}
              strokeWidth={1.5}
              strokeLinejoin="round"
              fill="none"
            />
          </Svg>
        </View>
      </Pressable>

      <Pressable onPress={onAdd} accessibilityRole="button" accessibilityLabel="New task">
        <View style={[disc, { backgroundColor: br.blue, marginLeft: 8 }]}>
          <Svg width={18} height={18} viewBox="0 0 24 24">
            <Path
              d="M12 5.6v12.8M5.6 12h12.8"
              stroke={br.onBlue}
              strokeWidth={2.2}
              strokeLinecap="round"
            />
          </Svg>
        </View>
      </Pressable>
    </View>
  );
}
