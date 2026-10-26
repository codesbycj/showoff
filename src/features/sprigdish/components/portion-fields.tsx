import { Pressable, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

import { copy } from '../data/start';
import { FIELD_HEIGHT, FIELD_TOP } from '../layout';
import { radius, sg, type } from '../theme';
import { T } from './text';

/**
 * How much, and of what.
 *
 * The quantity is real state with a stepper either side, rather than the
 * reference's unlabelled "05" in a box that cannot be changed. The serving is
 * a serving — "Piece (0.1 oz)" is not a way to eat a bowl of poke.
 */
export function PortionFields({
  qty,
  onQty,
  onServing,
}: {
  qty: number;
  onQty?: (n: number) => void;
  onServing?: () => void;
}) {
  const step = (dir: -1 | 1, label: string) => (
    <Pressable
      onPress={() => onQty?.(Math.max(1, qty + dir))}
      accessibilityRole="button"
      accessibilityLabel={label}
    >
      <View
        style={{
          width: 26,
          height: 26,
          borderRadius: radius.pill,
          backgroundColor: sg.well,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Svg width={13} height={13} viewBox="0 0 24 24">
          <Path
            d={dir === 1 ? 'M12 5.4v13.2M5.4 12h13.2' : 'M5.4 12h13.2'}
            stroke={sg.ink}
            strokeWidth={2.2}
            strokeLinecap="round"
          />
        </Svg>
      </View>
    </Pressable>
  );

  return (
    <View style={{ flexDirection: 'row', gap: 12, marginTop: FIELD_TOP }}>
{/* STEP 1.16 how many
      <View style={{ width: 128 }}>
        <T variant="fieldLabel" color={sg.muted} style={{ height: type.fieldLabel.line }}>
          {copy.quantity}
        </T>
        <View
          style={{
            height: FIELD_HEIGHT,
            marginTop: 6,
            borderRadius: radius.field,
            borderWidth: 1,
            borderColor: sg.hairline,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            paddingHorizontal: 8,
          }}
        >
          {step(-1, 'One fewer')}
          <T variant="fieldValue" color={sg.ink} style={{ height: type.fieldValue.line }}>
            {String(qty)}
          </T>
          {step(1, 'One more')}
        </View>
      </View>
*/}

{/* STEP 1.17 and how big
      <View style={{ flex: 1 }}>
        <T variant="fieldLabel" color={sg.muted} style={{ height: type.fieldLabel.line }}>
          {copy.serving}
        </T>
        <Pressable onPress={onServing} accessibilityRole="button" accessibilityLabel={copy.serving}>
          <View
            style={{
              height: FIELD_HEIGHT,
              marginTop: 6,
              borderRadius: radius.field,
              borderWidth: 1,
              borderColor: sg.hairline,
              flexDirection: 'row',
              alignItems: 'center',
              paddingHorizontal: 14,
            }}
          >
            <T
              variant="fieldValue"
              color={sg.ink}
              style={{ flex: 1, height: type.fieldValue.line }}
            >
              {copy.servingValue}
            </T>
            <Svg width={16} height={16} viewBox="0 0 24 24">
              <Path
                d="m6.6 9.4 5.4 5.2 5.4-5.2"
                stroke={sg.muted}
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
                fill="none"
              />
            </Svg>
          </View>
        </Pressable>
      </View>
*/}
    </View>
  );
}
