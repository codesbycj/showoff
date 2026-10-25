import { Image, View } from 'react-native';

import type { NodeKind } from '../data/flow';
import { NODE_AVATAR, NODE_CHIP, NODE_PAD } from '../layout';
import { radius, sc, shadow } from '../theme';
import { FACES } from './faces';
import { Icon } from './icon';
import { T } from './text';

/**
 * One step of the case flow.
 *
 * Two kinds, and they are the same card: a pale one for a step that is
 * settled, and a dark one for the step being worked on now. The reference
 * treats the live step as the same object wearing the ink, which is why this
 * takes a `kind` rather than being two components.
 *
 * The tick and the calendar chip only appear on a settled step — a step that
 * has not happened has nothing to confirm and no date to show, and drawing
 * them greyed would say it does.
 */
export function FlowNode({
  text,
  face,
  kind,
  done,
}: {
  text: string;
  face: number;
  kind: NodeKind;
  done: boolean;
}) {
  const dark = kind === 'active';

  return (
    <View
      style={{
        borderRadius: radius.card,
        backgroundColor: dark ? sc.active : sc.surface,
        padding: NODE_PAD,
        ...shadow.card,
      }}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Image
          source={FACES[face % FACES.length]}
          style={{ width: NODE_AVATAR, height: NODE_AVATAR, borderRadius: radius.full }}
          resizeMode="cover"
          accessibilityIgnoresInvertColors
        />

        <View style={{ flex: 1 }} />

        {done ? (
          <>
            <Icon name="check" size={17} color={sc.done} strokeWidth={2.6} />
            <View style={{ width: 10 }} />
            <View
              style={{
                width: NODE_CHIP,
                height: NODE_CHIP,
                borderRadius: radius.full,
                backgroundColor: sc.chip,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Icon name="calendar" size={15} color={sc.ink} />
            </View>
          </>
        ) : (
          <Icon name="more" size={18} color={dark ? sc.onActive : sc.faint} strokeWidth={2.4} />
        )}
      </View>

      <T
        variant={dark ? 'stepOn' : 'step'}
        color={dark ? sc.onActive : sc.ink}
        style={{ marginTop: 12 }}
      >
        {text}
      </T>
    </View>
  );
}
