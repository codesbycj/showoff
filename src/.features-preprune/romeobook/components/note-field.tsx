import { View } from 'react-native';

import { ct } from '../theme';
import { T } from './text';

type Props = {
  margin: number;
  caption: string;
  hint: string;
  height: number;
  radius: number;
  multiline?: boolean;
};

/**
 * A captioned input box — used for "Special Requests" and "Booking by".
 *
 * Drawn rather than a live `TextInput`: the screen is filmed, never typed into,
 * and a focused input brings a caret and a keyboard that the capture would
 * have to fight. The placeholder is the state the reference shows.
 *
 * The box is a plain `View` so nothing animates under the reveal; the caption
 * sits outside it, as in the reference.
 */
export function NoteField({ margin, caption, hint, height, radius, multiline }: Props) {
  return (
    <View style={{ marginHorizontal: margin, gap: 6 }}>
      <T variant="caption">{caption}</T>
      <View
        style={{
          height,
          borderRadius: radius,
          paddingHorizontal: 14,
          paddingTop: multiline ? 12 : 0,
          justifyContent: multiline ? 'flex-start' : 'center',
          backgroundColor: ct.surface,
          borderWidth: 1,
          borderColor: ct.hairline,
        }}
      >
        <T variant="placeholder">{hint}</T>
      </View>
    </View>
  );
}
