import { View } from 'react-native';

import type { PillName } from '../data/landing';
import { fn, radius, shadow } from '../theme';
import { FlagDisc } from './flag-disc';
import { Icon } from './icon';
import { T } from './text';

/**
 * One of the little white pills floating round the collage.
 *
 * Presentational and unpressable on purpose: in the reference these are part
 * of the artwork, not controls — they show what the app does rather than
 * offering to do it. Making them buttons would promise a screen that does not
 * exist yet.
 */
export function FloatPill({ name, label }: { name: PillName; label: string }) {
  return (
    <View
      style={{
        height: 30,
        borderRadius: radius.pill,
        backgroundColor: fn.cardPale,
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 11,
        gap: 5,
        ...shadow.pill,
      }}
    >
      {name === 'dollar' ? <FlagDisc size={15} /> : <Icon name={name} size={13} />}
      <T variant="pill" color={fn.ink}>
        {label}
      </T>
    </View>
  );
}
