import { Image, ScrollView, View } from 'react-native';

import { movements } from '../data/home';
import { ct } from '../theme';
import { T } from './text';

type Props = { margin: number; height: number; gap: number; bottomPad: number };

/**
 * Today's movements.
 *
 * The sign of `amount` decides the colour *and* the word under it, so a row
 * can never read "Sent" in green (R9). Both colours are measured on white:
 * the board's red is 3.4:1 and fails R4.
 *
 * The list is the remainder and runs under the floating dock, as the board
 * crops it (I3).
 */
export function MovementList({ margin, height, gap, bottomPad }: Props) {
  return (
    <ScrollView
      style={{ flex: 1 }}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={{ paddingHorizontal: margin, gap, paddingBottom: bottomPad }}
    >
      {movements.map((movement) => {
        const out = movement.amount < 0;
        return (
          <View
            key={movement.id}
            style={{
              height,
              flexDirection: 'row',
              alignItems: 'center',
              gap: 12,
              paddingHorizontal: 4,
            }}
          >
            <Image
              source={movement.image}
              style={{ width: 44, height: 44, borderRadius: 22 }}
              resizeMode="cover"
              accessibilityLabel={movement.name}
            />

            <View style={{ flex: 1 }}>
              <T variant="txName">{movement.name}</T>
              <T variant="txTime">
                {movement.time}
                {movement.reference ? ` · ${movement.reference}` : ''}
              </T>
            </View>

            <View style={{ alignItems: 'flex-end' }}>
              <T variant={out ? 'txOut' : 'txIn'}>
                {out ? '-' : '+'}
                {Math.abs(movement.amount).toLocaleString('en-US', {
                  minimumFractionDigits: 2,
                })}
              </T>
              <T variant="txState">{out ? 'Sent' : 'Received'}</T>
            </View>
          </View>
        );
      })}
    </ScrollView>
  );
}
