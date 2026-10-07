import { View } from 'react-native';
import Svg, { Line } from 'react-native-svg';

import { R, vy } from '../theme';

/** The notch is 26dp across and straddles the card edge, so half of it shows. */
const NOTCH = 26;

/**
 * The perforation between the pass's dark half and its white one.
 *
 * The two half-circles are whole 26dp discs in the canvas colour, hung half
 * outside the card on either side; the card's own clip cuts them down to
 * semicircles. That is how the export does it, and it is also the only way to
 * get a concave bite out of a filled rectangle without a mask.
 *
 * The dashed rule is an SVG `Line`, not a dashed border. React Native's
 * `borderStyle: 'dashed'` renders differently across platforms and ignores the
 * dash length entirely, and this dash is measurable: 5.7dp on, 4dp off at 2dp
 * thick, read off the reference at its 1.833x render scale.
 */
export function TicketDivider() {
  return (
    <View
      style={{
        height: 28,
        backgroundColor: vy.white,
        alignItems: 'center',
        justifyContent: 'center',
        overflow: 'hidden',
      }}
    >
      <View style={{ height: 2, alignSelf: 'stretch', marginHorizontal: 20 }}>
        <Svg width="100%" height="2">
          <Line
            x1="0"
            y1="1"
            x2="100%"
            y2="1"
            stroke={vy.gray300}
            strokeWidth={2}
            strokeDasharray="5.7 4"
          />
        </Svg>
      </View>

      <View style={[notch, { left: -NOTCH / 2 }]} />
      <View style={[notch, { right: -NOTCH / 2 }]} />
    </View>
  );
}

const notch = {
  position: 'absolute',
  top: (28 - NOTCH) / 2,
  width: NOTCH,
  height: NOTCH,
  borderRadius: R.full,
  backgroundColor: vy.canvas,
} as const;
