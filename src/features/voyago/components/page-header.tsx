import { ArrowLeft } from 'lucide-react-native';
import { Text, View } from 'react-native';

import { FONT, vy } from '../theme';

import { MenuButton } from './menu-button';
import { RoundButton } from './round-button';

/**
 * The hotels screen's header — back, a centred two-line title, and `//`.
 *
 * The title is centred between two 44dp controls, so it is given `flex: 1` and
 * centred text rather than being laid out as the middle of a `space-between`
 * row: with `space-between` the longer first line would push both buttons
 * outward and the title would stop being centred on the screen.
 *
 * Its second line mixes three styles on one baseline — "hotels" at 21dp
 * regular and "for you" at 23dp in the accent serif — which nests as one
 * `Text`, the same construction as home's masthead.
 */
export function PageHeader({
  line1,
  line2,
  accent,
  onBack,
  onMenu,
}: {
  line1: string;
  line2: string;
  accent: string;
  onBack?: () => void;
  onMenu?: () => void;
}) {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', paddingTop: 4, paddingBottom: 16 }}>
      <RoundButton onPress={onBack} accessibilityLabel="Go back">
        <ArrowLeft size={16} color={vy.slate900} strokeWidth={1.8} />
      </RoundButton>

      <View style={{ flex: 1 }}>
        <Text
          style={{
            textAlign: 'center',
            fontFamily: FONT.semibold,
            fontSize: 21,
            lineHeight: 24.15,
            letterSpacing: -0.525,
            color: vy.slate900,
          }}
        >
          {line1}
        </Text>
        <Text
          style={{
            textAlign: 'center',
            fontFamily: FONT.regular,
            fontSize: 21,
            lineHeight: 26,
            letterSpacing: -0.525,
            color: vy.slate900,
          }}
        >
          {line2}{' '}
          <Text style={{ fontFamily: FONT.serif, fontSize: 23, letterSpacing: 0 }}>{accent}</Text>
        </Text>
      </View>

      <MenuButton onPress={onMenu} />
    </View>
  );
}
