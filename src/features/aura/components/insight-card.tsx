import { Lightbulb } from 'lucide-react-native';
import { Text, View } from 'react-native';

import { R, SP, TYPE, au } from '../theme';

/**
 * A nudge from the app rather than a number from the account.
 *
 * It uses the amber tint instead of the purple, which is the design's rule for
 * anything advisory — the purple is reserved for the user's own money, so an
 * insight never looks like a balance.
 */
export function InsightCard({ title, body }: { title: string; body: string }) {
  return (
    <View
      style={{
        flexDirection: 'row',
        backgroundColor: au.surfaceLow,
        borderRadius: R.lg,
        padding: SP.md,
      }}
    >
      <View
        style={{
          width: 38,
          height: 38,
          borderRadius: 12,
          backgroundColor: au.secondaryFixed,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Lightbulb size={19} color={au.secondary} strokeWidth={2.2} />
      </View>

      <View style={{ flex: 1, marginLeft: 12 }}>
        <Text style={[TYPE.labelLg, { color: au.onSurface }]}>{title}</Text>
        <Text style={[TYPE.bodySm, { marginTop: 3, color: au.onSurfaceVariant }]}>{body}</Text>
      </View>
    </View>
  );
}
