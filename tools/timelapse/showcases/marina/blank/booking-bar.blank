import { Pressable, View } from 'react-native';

import { T } from './text';
import { BAR_HEIGHT, MARGIN } from '../layout';
import { radius, shadow, mr } from '../theme';

type Rate = { amount: string; unit: string };

/**
 * The prices and the way to book, fixed at the foot of the screen.
 *
 * Fixed over the scroll rather than inside it, which is why `layout.ts` has a
 * `SCROLL_BOTTOM_PAD`: a bar that floats cannot reserve its own space.
 */
export function BookingBar({
  label,
  rates,
  cta,
  bottomInset,
  onBook,
}: {
  label: string;
  rates: readonly Rate[];
  cta: string;
  bottomInset: number;
  onBook?: () => void;
}) {
  return (
    <View
      style={{
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        paddingBottom: bottomInset,
        backgroundColor: mr.surface,
        borderTopWidth: 1,
        borderTopColor: mr.rule,
        ...shadow.bar,
      }}
    >
      <View
        style={{
          minHeight: BAR_HEIGHT,
          paddingHorizontal: MARGIN,
          paddingVertical: 12,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 16,
        }}
      >
        {/* STEP 1.32 what it costs
        <View>
          <T variant="small" color={mr.muted}>
            {label}
          </T>
          {rates.map((r) => (
            <View key={r.unit} style={{ flexDirection: 'row', alignItems: 'baseline', gap: 6 }}>
              <T variant="price" color={mr.accent}>
                {r.amount}
              </T>
              <T variant="small" color={mr.muted}>
                {r.unit}
              </T>
            </View>
          ))}
        </View>
        */}

        {/* STEP 1.33 and the way to take it
        <Pressable onPress={onBook} accessibilityRole="button" accessibilityLabel={cta}>
          <View
            style={{
              borderRadius: radius.full,
              backgroundColor: mr.accent,
              paddingHorizontal: 30,
              paddingVertical: 16,
              ...shadow.button,
            }}
          >
            <T variant="label" color={mr.onBrand}>
              {cta}
            </T>
          </View>
        </Pressable>
        */}
      </View>
    </View>
  );
}
