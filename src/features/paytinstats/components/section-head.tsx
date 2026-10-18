import { View } from 'react-native';

import { ps } from '../theme';
import { IconButton } from './icon-button';
import { T } from './text';

/**
 * "Overview", with the control that filters it on the right.
 *
 * The button is this component's rather than the screen's because the two are
 * one thing — a heading and the control that changes what it heads — and
 * splitting them would leave the screen aligning a button against a baseline
 * it cannot see.
 */
export function SectionHead({ title, onFilter }: { title: string; onFilter?: () => void }) {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
      <T variant="section" color={ps.text}>
        {title}
      </T>
      <IconButton name="filter" onPress={onFilter} accessibilityLabel="Filter" size={32} />
    </View>
  );
}
