import { Pressable, Text, View } from 'react-native';

import { ChevronRight } from './icons';
import { R, SP, TYPE, dt } from '../theme';

/**
 * A section title with its "View all" chip.
 *
 * The chip is an outlined pill 22dp tall, running from x 299 to the page's
 * right margin, with a second hairline disc around its chevron. It is centred
 * on the title's cap rather than on its line box, which is why the row's
 * height comes from the chip.
 */
export function SectionHead({
  title,
  action,
  onAction,
}: {
  title: string;
  action: string;
  onAction?: () => void;
}) {
  return (
    <View
      style={{
        height: 22,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: SP.margin,
      }}
    >
      <Text style={[TYPE.section, { color: dt.ink }]}>{title}</Text>

      <Pressable onPress={onAction} accessibilityRole="button" accessibilityLabel={action}>
        <View
          style={{
            height: 22,
            borderRadius: R.full,
            borderWidth: 1,
            borderColor: dt.hairline,
            flexDirection: 'row',
            alignItems: 'center',
            paddingLeft: 9,
            paddingRight: 4,
            gap: 4,
          }}
        >
          <Text style={[TYPE.valueSoft, { fontSize: 12, color: dt.subtle }]}>{action}</Text>

          <View
            style={{
              width: 13,
              height: 13,
              borderRadius: 6.5,
              borderWidth: 1,
              borderColor: dt.hairline,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <ChevronRight size={9} color={dt.subtle} />
          </View>
        </View>
      </Pressable>
    </View>
  );
}
