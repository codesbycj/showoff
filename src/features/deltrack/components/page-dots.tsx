import { View } from 'react-native';

import { LEVEL, R, dt } from '../theme';

/**
 * The pager under the hero, in its own white pill.
 *
 * 49x16dp, measured at x 169..219 and y 380..396 — four dots on a 6dp pitch,
 * the live one a shade larger and near-black while the rest are a light grey.
 * It sits under the bite in the in-transit card's foot, which is why the card
 * has that notch at all.
 */
export function PageDots({ count, page }: { count: number; page: number }) {
  return (
    <View style={{ alignItems: 'center' }}>
      <View
        style={[
          {
            height: 16,
            minWidth: 49,
            borderRadius: R.full,
            backgroundColor: dt.surface,
            borderWidth: 1,
            borderColor: dt.hairline,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 2.5,
          },
          LEVEL.button,
        ]}
      >
        {Array.from({ length: count }, (_, i) => {
          const live = i === page;
          return (
            <View
              key={i}
              style={{
                width: live ? 4.5 : 3.5,
                height: live ? 4.5 : 3.5,
                borderRadius: 2.5,
                backgroundColor: live ? dt.navy : '#C7CBD8',
              }}
            />
          );
        })}
      </View>
    </View>
  );
}
