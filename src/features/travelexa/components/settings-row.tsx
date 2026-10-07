import { Pressable, Text, View } from 'react-native';

import { type Setting } from '../data/profile';
import { R, SP, TYPE, tx } from '../theme';

import { Symbol } from './symbol';

/**
 * One row in the account list.
 *
 * All five rows are identical but for their icon and copy, and one carries a
 * small green validity pip beside its title — that is a flag on the datum
 * rather than a check on the key, so the passport row stays the passport row if
 * the list is reordered.
 */
export function SettingsRow({ item, onPress }: { item: Setting; onPress?: () => void }) {
  return (
    <Pressable onPress={onPress}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          paddingVertical: SP.md - 2,
          paddingHorizontal: SP.md,
          gap: SP.sm,
        }}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: SP.md, flexShrink: 1 }}>
          <View
            style={{
              width: 44,
              height: 44,
              borderRadius: R.DEFAULT,
              backgroundColor: tx.surfaceContainerLow,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Symbol name={item.icon} size={22} color={tx.onSurface} />
          </View>

          <View style={{ flexShrink: 1 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: SP.sm }}>
              <Text style={{ ...TYPE.labelLg, color: tx.onSurface }}>{item.title}</Text>
              {item.pip ? (
                <View
                  style={{ width: 8, height: 8, borderRadius: R.full, backgroundColor: '#34d399' }}
                />
              ) : null}
            </View>
            <Text style={{ ...TYPE.bodySm, color: tx.onSurfaceVariant }}>{item.blurb}</Text>
          </View>
        </View>

        <View
          style={{
            width: 28,
            height: 28,
            borderRadius: R.full,
            backgroundColor: tx.surfaceContainerLow,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Symbol name="chevronRight" size={18} color={tx.onSurfaceVariant} />
        </View>
      </View>
    </Pressable>
  );
}
