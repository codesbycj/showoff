import { Pressable, View } from 'react-native';

import { recent, signed, txns, wallet, type Txn } from '../data/wallet';
import { T } from './text';

import { HeadProps } from './_txn-list-shared';

/** "Recent Transactions" and the way to the rest. */
export function RecentHead({ margin, height }: HeadProps) {
  return (
    <View
      style={{
        marginHorizontal: margin,
        height,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      <T variant="sectionTitle">{recent.title}</T>
      <Pressable
        hitSlop={{ top: 14, bottom: 14, left: 10, right: 10 }}
        accessibilityRole="button"
        accessibilityLabel={`${recent.more}, ${recent.title}`}
      >
        {({ pressed }) => (
          <View style={{ opacity: pressed ? 0.6 : 1 }}>
            <T variant="sectionMore">{recent.more}</T>
          </View>
        )}
      </Pressable>
    </View>
  );
}
