import { ArrowLeft } from 'lucide-react-native';
import { Text, View } from 'react-native';

import { FONT, vy } from '../theme';

import { RoundButton } from './round-button';

/**
 * The ticket screen's header — back, "Your *Ticket*", and a 44dp spacer.
 *
 * The spacer is in the export and is kept: it is what centres the title
 * between the two edges when only one side carries a control. Dropping it and
 * centring the text instead would put the title 22dp left of where the
 * reference draws it.
 */
export function TicketHeader({
  lead,
  accent,
  onBack,
}: {
  lead: string;
  accent: string;
  onBack?: () => void;
}) {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        marginTop: 8,
        marginBottom: 24,
      }}
    >
      <RoundButton borderOpacity={0.15} onPress={onBack} accessibilityLabel="Go back">
        <ArrowLeft size={20} color={vy.ink} strokeWidth={2.2} />
      </RoundButton>

      <Text
        style={{
          paddingRight: 12,
          fontFamily: FONT.bold,
          fontSize: 24,
          lineHeight: 34,
          letterSpacing: -0.6,
          color: vy.ink,
        }}
      >
        {lead}{' '}
        <Text style={{ fontFamily: FONT.serif, fontSize: 30, letterSpacing: 0 }}>{accent}</Text>
      </Text>

      <View style={{ width: 44 }} />
    </View>
  );
}
