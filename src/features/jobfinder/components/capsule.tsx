import { Text, View } from 'react-native';

import { FONT, R, jf } from '../theme';

/**
 * The job detail hero's location capsules.
 *
 * These are not `TagChip`s wearing a different colour. A tag is 11dp semibold in
 * a tinted pair that carries meaning — green for a country, rose for a city; a
 * capsule is 13dp medium in one neutral fill, and the four on the hero say the
 * same thing in the same voice. Folding them together would mean giving
 * `TagChip` a size and a tone-off switch, which is two props to express that it
 * is a different component.
 */
export function Capsule({ label }: { label: string }) {
  return (
    <View
      style={{
        paddingHorizontal: 14,
        paddingVertical: 6,
        borderRadius: R.full,
        backgroundColor: jf.panelDeep,
      }}
    >
      <Text style={{ fontFamily: FONT.medium, fontSize: 13, lineHeight: 18, color: jf.ink }}>
        {label}
      </Text>
    </View>
  );
}
