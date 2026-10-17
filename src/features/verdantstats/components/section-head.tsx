import { View } from 'react-native';

import { vs } from '../theme';
import { T } from './text';

/**
 * A section heading, with an optional trailing slot.
 *
 * The slot is `children` rather than a `meta` string, because the two uses on
 * this screen want different things on the right: "Your Spending" carries a
 * month and a chevron that open a picker, and "Spending Trend" carries
 * nothing at all. A string prop would have grown a second one for the icon,
 * then a third for its handler.
 */
export function SectionHead({ title, children }: { title: string; children?: React.ReactNode }) {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
      <T variant="section" color={vs.ink}>
        {title}
      </T>
      {children}
    </View>
  );
}
