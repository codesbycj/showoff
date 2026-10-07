import { Pressable, Text, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

import { FONT, R, SP, vy } from '../theme';

/** The export's own house path, on the same reasoning as the plane glyph. */
function HomeGlyph({ size, color }: { size: number; color: string }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Path fill={color} d="M10 20v-6h4v6h5v-8h3L12 3 2 12h3v8z" />
    </Svg>
  );
}

/**
 * The ticket screen's dock.
 *
 * Not the same control as home's tab bar, and deliberately not shared with it:
 * this one has two items rather than three, its active item is an orange pill
 * with a label rather than a disc beside one, and it sits in the layout flow
 * instead of floating. The two look alike at a glance and have almost nothing
 * in common structurally.
 */
export function TicketDock({
  ticketsLabel,
  homeLabel,
  onTickets,
  onHome,
}: {
  ticketsLabel: string;
  homeLabel: string;
  onTickets?: () => void;
  onHome?: () => void;
}) {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: vy.night,
        borderRadius: R.full,
        padding: SP.sm,
        shadowColor: vy.ink,
        shadowOpacity: 0.2,
        shadowRadius: 10,
        shadowOffset: { width: 0, height: 5 },
        elevation: 6,
      }}
    >
      <Pressable style={{ flex: 1 }} onPress={onTickets}>
        <Text
          style={{
            textAlign: 'center',
            paddingVertical: SP.md,
            fontFamily: FONT.bold,
            fontSize: 12,
            lineHeight: 16,
            letterSpacing: 1.2,
            color: vy.gray300,
          }}
        >
          {ticketsLabel.toUpperCase()}
        </Text>
      </Pressable>

      <Pressable onPress={onHome}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            gap: SP.sm,
            backgroundColor: vy.orange,
            borderRadius: R.full,
            paddingHorizontal: SP.xl,
            paddingVertical: 10,
            shadowColor: vy.ink,
            shadowOpacity: 0.15,
            shadowRadius: 4,
            shadowOffset: { width: 0, height: 2 },
            elevation: 3,
          }}
        >
          <HomeGlyph size={16} color={vy.ink} />
          <Text
            style={{
              fontFamily: FONT.bold,
              fontSize: 11,
              lineHeight: 15,
              letterSpacing: 0.55,
              color: vy.ink,
            }}
          >
            {homeLabel.toUpperCase()}
          </Text>
        </View>
      </Pressable>
    </View>
  );
}
