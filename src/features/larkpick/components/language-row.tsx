import { Pressable, View } from 'react-native';

import { ROW_HEIGHT } from '../layout';
import { lk, radius, type } from '../theme';
import { Flag } from './flag';
import { T } from './text';

/**
 * One language to choose.
 *
 * The whole 56dp pill is the target, not the label: a row that is only
 * tappable where its words are sends half the taps nowhere.
 *
 * Each row takes an equal share of what the headline and the button leave, so
 * the list reaches the button at any screen height instead of stacking at a
 * fixed 56dp pitch and leaving a band of canvas above it.
 *
 * The selected row swaps the pill to lime and the ink to near-black rather
 * than adding a tick, which is the reference's idea and the stronger one —
 * at a glance the chosen row is the only bright thing on the page.
 */
export function LanguageRow({
  label,
  flag,
  selected,
  onPress,
}: {
  label: string;
  flag: string;
  selected?: boolean;
  onPress?: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      style={{ flex: 1 }}
      accessibilityRole="radio"
      accessibilityState={{ selected: !!selected }}
      accessibilityLabel={label}
    >
      <View
        style={{
          flex: 1,
          minHeight: ROW_HEIGHT,
          borderRadius: radius.pill,
          backgroundColor: selected ? lk.lime : lk.pill,
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 13,
        }}
      >
{/* STEP 1.11 its flag, drawn
        <Flag name={flag} />
*/}
{/* STEP 1.12 and its name
        <T
          variant="row"
          color={selected ? lk.onLime : lk.ink}
          style={{ marginLeft: 14, height: type.row.line }}
        >
          {label}
        </T>
*/}
      </View>
    </Pressable>
  );
}
