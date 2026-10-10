import { View } from 'react-native';
import Svg, { Circle, G, Path } from 'react-native-svg';

import { Check } from './icons';
import { dt } from '../theme';

/**
 * The parcel mark: a line-art carton on a near-black disc, with an amber tick
 * on its lower right.
 *
 * 32dp in both the shipment cards and the history rows. A row that has faded
 * out under the dock dims the whole row rather than this mark, so there is
 * nothing to vary here.
 */
export function ParcelDisc({ size = 32 }: { size?: number }) {
  const tick = size * 0.36;

  return (
    <View style={{ width: size, height: size }}>
      <Svg width={size} height={size} viewBox="0 0 32 32">
        <Circle cx={16} cy={16} r={16} fill={dt.parcelDisc} />

        {/* An isometric carton, drawn in outline: the lid's rhombus, the two
            faces under it, and the seam down the middle. */}
        <G
          stroke="#FFFFFF"
          strokeWidth={1.3}
          strokeLinejoin="round"
          strokeLinecap="round"
          fill="none"
        >
          <Path d="M16 6.4 24.6 11 16 15.6 7.4 11 16 6.4Z" />
          <Path d="M7.4 11v10L16 25.6 24.6 21V11" />
          <Path d="M16 15.6v10" />
          <Path d="m11.7 8.7 8.6 4.6" />
        </G>
      </Svg>

      <View
        style={{
          position: 'absolute',
          right: -1,
          bottom: -1,
          width: tick,
          height: tick,
          borderRadius: tick / 2,
          backgroundColor: dt.amber,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Check size={tick * 0.62} color="#FFFFFF" />
      </View>
    </View>
  );
}
