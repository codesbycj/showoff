import { type ReactNode } from 'react';
import { Text, View } from 'react-native';

import { FONT, SP, vt } from '../theme';

/**
 * A tab's masthead: the 34dp title, a line of standfirst, and room on the right
 * for one control.
 *
 * This is `ResultsHead` with its two controls taken out, and it exists rather
 * than absorbing that component because the difference is structural. Results
 * pairs the title with an election picker *and* a scope pill, which forces its
 * title column to share the row; News and More carry a subtitle that runs the
 * full width under the title. Folding both into one component would have meant
 * a prop for every part and a layout that branches on which parts arrived.
 */
export function PageHead({
  title,
  subtitle,
  action,
}: {
  title: string;
  subtitle?: string;
  action?: ReactNode;
}) {
  return (
    <View style={{ paddingHorizontal: SP.margin, paddingTop: 12, paddingBottom: SP.xs }}>
      <View
        style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}
      >
        <Text
          style={{
            fontFamily: FONT.black,
            fontSize: 34,
            lineHeight: 40,
            letterSpacing: -1.02,
            color: vt.ink,
          }}
        >
          {title}
        </Text>
        {action}
      </View>

      {subtitle ? (
        <Text
          style={{
            marginTop: 2,
            fontFamily: FONT.medium,
            fontSize: 13,
            lineHeight: 18,
            color: vt.muted,
          }}
        >
          {subtitle}
        </Text>
      ) : null}
    </View>
  );
}
