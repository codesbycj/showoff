import { ArrowRight } from 'lucide-react-native';
import { Pressable, Text, View } from 'react-native';

import { type StackedTone } from '../data/hotels';
import { FONT, R, SP, vy } from '../theme';

const FILL: Record<StackedTone, string> = {
  orange: vy.orange,
  mint: vy.mintLight,
  white: vy.white,
};

/**
 * One card in the overlapping stack above the featured hotel.
 *
 * The three are identical but for their fill, and they overlap the card below
 * by 24dp — so each needs to paint over its predecessor. React Native already
 * paints later siblings on top, but `zIndex` is set explicitly because each
 * card also carries an `elevation`, and on Android elevation, not document
 * order, decides what covers what.
 *
 * `last` swaps the asymmetric 20/36 padding for an even 20: the first two cards
 * are bottom-heavy so the card above can cover the dead space, and the top card
 * has nothing above it to hide.
 */
export function StackedHotelCard({
  name,
  tone,
  depth,
  last = false,
  onPress,
}: {
  name: string;
  tone: StackedTone;
  /** Paint order, counting up from the featured card. */
  depth: number;
  last?: boolean;
  onPress?: () => void;
}) {
  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={`Open ${name.replace('\n', ' ')}`}
      style={{ marginTop: -24, zIndex: 10 + depth * 10 }}
    >
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          backgroundColor: FILL[tone],
          borderRadius: R.card,
          paddingHorizontal: SP['2xl'],
          paddingTop: SP.xl,
          paddingBottom: last ? SP.xl : 36,
          shadowColor: vy.ink,
          shadowOpacity: 0.12,
          shadowRadius: 6,
          shadowOffset: { width: 0, height: 4 },
          elevation: 4 + depth * 2,
        }}
      >
        <Text
          style={{
            fontFamily: FONT.semibold,
            fontSize: 19,
            lineHeight: 26.1,
            letterSpacing: -0.475,
            color: vy.slate950,
          }}
        >
          {name}
        </Text>

        <View style={{ width: 32, height: 32, alignItems: 'center', justifyContent: 'center' }}>
          <ArrowRight size={20} color={vy.slate950} strokeWidth={2} />
        </View>
      </View>
    </Pressable>
  );
}
