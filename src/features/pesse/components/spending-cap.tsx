import { Text, View } from 'react-native';

import { LEVEL, R, TYPE, ps } from '../theme';
import { Symbol } from './symbol';

/**
 * The daily spending cap: a titled row with the figure at the right, then a
 * slider under it.
 *
 * The slider is drawn, not a real control. Nothing on this screen changes the
 * cap, and a `Slider` would bring a native dependency plus a platform-specific
 * track that the web harness renders differently from the device — for a
 * showcase, the two-View version is both truer to the reference and honest
 * about doing nothing.
 */
export function SpendingCap({
  title,
  subtitle,
  value,
  min,
  max,
  fraction,
}: {
  title: string;
  subtitle: string;
  value: string;
  min: string;
  max: string;
  fraction: number;
}) {
  return (
    <View
      style={[
        {
          backgroundColor: ps.surfaceLowest,
          borderRadius: R.lg,
          padding: 16,
        },
        LEVEL.container,
      ]}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
        <View
          style={{
            width: 36,
            height: 36,
            borderRadius: R.full,
            backgroundColor: ps.surfaceContainer,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Symbol name="speed" size={18} color={ps.onSurface} />
        </View>

        <View style={{ flex: 1, minWidth: 0 }}>
          <Text style={[TYPE.labelLg, { color: ps.onSurface }]}>{title}</Text>
          <Text style={[TYPE.bodySm, { color: ps.secondary }]} numberOfLines={1}>
            {subtitle}
          </Text>
        </View>

        <Text style={[TYPE.headlineMd, { color: ps.onSurface }]}>{value}</Text>
      </View>

      <View style={{ marginTop: 16, justifyContent: 'center' }}>
        <View style={{ height: 6, borderRadius: R.full, backgroundColor: ps.surfaceHighest }} />
        <View
          style={{
            position: 'absolute',
            left: 0,
            height: 6,
            width: `${fraction * 100}%`,
            borderRadius: R.full,
            backgroundColor: ps.olive,
          }}
        />
        {/* The knob is centred on the fill's end, so it is offset by half its
            own width — anchoring its left edge there puts it a knob's width
            past the value it marks. */}
        <View
          style={{
            position: 'absolute',
            left: `${fraction * 100}%`,
            marginLeft: -9,
            width: 18,
            height: 18,
            borderRadius: 9,
            backgroundColor: ps.olive,
            borderWidth: 3,
            borderColor: ps.surfaceLowest,
          }}
        />
      </View>

      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-between',
          marginTop: 10,
        }}
      >
        <Text style={[TYPE.bodySm, { color: ps.secondary }]}>{min}</Text>
        <Text style={[TYPE.bodySm, { color: ps.secondary }]}>{max}</Text>
      </View>
    </View>
  );
}
