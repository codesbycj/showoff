import { Image, ScrollView, View } from 'react-native';

import { activityTitle, movements } from '../data/chart';
import { ct } from '../theme';
import { T } from './text';

type Props = { margin: number; radius: number; rowH: number; gap: number };

/**
 * What moved, under a sheet that runs off the bottom of the frame.
 *
 * **The sheet's fill is an absolutely-filled child** carrying its own shadow
 * (§5.5), so an emptied sheet paints nothing in frame one rather than a white
 * strip with a shadow under it.
 *
 * The sign of `amount` decides both the colour and the word, so a row can
 * never read "Sent" in green (R9).
 */
export function ActivitySheet({ margin, radius, rowH, gap }: Props) {
  return (
    <View style={{ flex: 1 }}>
      {/* STEP 1.22 view
      <View
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: ct.white,
          borderTopLeftRadius: radius,
          borderTopRightRadius: radius,
          shadowColor: '#15161A',
          shadowOpacity: 0.1,
          shadowRadius: 22,
          shadowOffset: { width: 0, height: -8 },
          elevation: 10,
        }}
      />
      */}

      {/* STEP 1.23 view
      <View style={{ height: 22, alignItems: 'center', justifyContent: 'center' }}>
        <View style={{ width: 38, height: 4.5, borderRadius: 3, backgroundColor: ct.line }} />
      </View>
      */}

      {/* STEP 1.24 view
      <View style={{ marginHorizontal: margin, height: 34, justifyContent: 'center' }}>
        <T variant="sheetTitle">{activityTitle}</T>
      </View>
      */}

      {/* STEP 1.25 name
      <ScrollView
        style={{ flex: 1 }}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: margin, gap }}
      >
        {movements.map((movement) => {
          const out = movement.amount < 0;
          return (
            <View
              key={movement.id}
              style={{ height: rowH, flexDirection: 'row', alignItems: 'center', gap: 12 }}
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
                  {movement.method ? ` · ${movement.method}` : ''}
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
      */}
    </View>
  );
}
