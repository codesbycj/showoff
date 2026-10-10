import { type StyleProp, type ViewStyle } from 'react-native';
import Svg, { Circle, Path, Rect } from 'react-native-svg';

import { dt } from '../theme';

/**
 * Every glyph on the screen, drawn.
 *
 * Deltrack cuts no icon font. Two faces trimmed out of one source file both
 * keep the family name that is written *inside* the file, and Android resolves
 * a face by that name rather than by the key it was registered under — so the
 * second showcase to ship a Material Symbols subset silently rendered out of
 * the first one's glyph set. Web gives every `useFonts` key its own
 * `@font-face`, so the harness cannot see it. There are eleven glyphs here;
 * drawing them costs less than the trap does.
 *
 * Each takes `size` and `color` and draws inside a 24x24 box, so swapping one
 * for another never moves anything. Strokes are rounded, 1.7 units at 24 —
 * which lands on the reference's ~1.3dp at the 18dp the dock sets them.
 */

type IconProps = {
  size?: number;
  color?: string;
  /** For nudging a glyph whose ink does not fill its 24-unit box. */
  style?: StyleProp<ViewStyle>;
};

const box = (size: number, style?: StyleProp<ViewStyle>) => ({
  width: size,
  height: size,
  viewBox: '0 0 24 24',
  style,
});

const stroke = {
  strokeWidth: 1.7,
  strokeLinecap: 'round' as const,
  strokeLinejoin: 'round' as const,
  fill: 'none',
};

/** The chevron beside "My Location". */
export function ChevronDown({ size = 24, color = dt.ink, style }: IconProps) {
  return (
    <Svg {...box(size, style)}>
      <Path d="M6 9.5 12 15.5 18 9.5" stroke={color} {...stroke} />
    </Svg>
  );
}

/** The chevron in a "View all" chip's disc. */
export function ChevronRight({ size = 24, color = dt.ink, style }: IconProps) {
  return (
    <Svg {...box(size, style)}>
      <Path d="M9.5 5 16 12 9.5 19" stroke={color} {...stroke} />
    </Svg>
  );
}

/** The filled pin in front of the address. */
export function MapPin({ size = 24, color = dt.ink, style }: IconProps) {
  return (
    <Svg {...box(size, style)}>
      <Path
        d="M12 2.5C7.3 2.5 3.5 6.3 3.5 11c0 5.6 7.1 12.1 7.4 12.4a1.6 1.6 0 0 0 2.2 0c.3-.3 7.4-6.8 7.4-12.4 0-4.7-3.8-8.5-8.5-8.5Zm0 11.8a3.3 3.3 0 1 1 0-6.6 3.3 3.3 0 0 1 0 6.6Z"
        fill={color}
      />
    </Svg>
  );
}

/**
 * The bell in the header's white disc.
 *
 * The reference draws it as an outline with a separate clapper below the rim,
 * rather than the single closed path most icon sets ship.
 */
export function Bell({ size = 24, color = dt.ink, style }: IconProps) {
  return (
    <Svg {...box(size, style)}>
      <Path d="M5.4 17.4h13.2M5.4 17.4v-6.2a6.6 6.6 0 0 1 13.2 0v6.2" stroke={color} {...stroke} />
      <Path d="M10.4 19.6a2.1 2.1 0 0 0 3.2 0" stroke={color} {...stroke} />
    </Svg>
  );
}

/** The magnifier at the head of the tracking field. */
export function Search({ size = 24, color = dt.ink, style }: IconProps) {
  return (
    <Svg {...box(size, style)}>
      <Circle cx={10.8} cy={10.8} r={6.6} stroke={color} {...stroke} />
      <Path d="m15.9 15.9 4.1 4.1" stroke={color} {...stroke} />
    </Svg>
  );
}

/**
 * The scan mark: the field's trailing button, and the dock's centre button.
 *
 * A rounded frame broken at the top and bottom of each side, a rule straight
 * across the middle that overshoots the frame, and a small bar in each half.
 */
export function Scan({ size = 24, color = dt.ink, style }: IconProps) {
  return (
    <Svg {...box(size, style)}>
      <Path
        d="M9.2 3.4H7.4A4 4 0 0 0 3.4 7.4v1.8M14.8 3.4h1.8a4 4 0 0 1 4 4v1.8M9.2 20.6H7.4a4 4 0 0 1-4-4v-1.8M14.8 20.6h1.8a4 4 0 0 0 4-4v-1.8"
        stroke={color}
        {...stroke}
      />
      <Path d="M2.2 12h19.6" stroke={color} {...stroke} />
      <Path d="M8.6 8.2h6.8M8.6 15.8h6.8" stroke={color} {...stroke} />
    </Svg>
  );
}

/** The white archive glyph beside the in-transit card's id. */
export function Archive({ size = 24, color = dt.onDark, style }: IconProps) {
  return (
    <Svg {...box(size, style)}>
      {/* Wider than it is tall: the reference's glyph measures 18x14dp. */}
      <Rect x={2.5} y={4.5} width={19} height={3.9} rx={1.3} fill={color} />
      <Path d="M4.3 9.7h15.4v8.1a1.7 1.7 0 0 1-1.7 1.7H6a1.7 1.7 0 0 1-1.7-1.7V9.7Z" fill={color} />
      <Rect x={8.6} y={12.3} width={6.8} height={2.4} rx={1.2} fill={dt.transitD} />
    </Svg>
  );
}

/** The + in the in-transit card's white disc. */
export function Plus({ size = 24, color = dt.blue, style }: IconProps) {
  return (
    <Svg {...box(size, style)}>
      <Path d="M12 4.6v14.8M4.6 12h14.8" stroke={color} strokeWidth={2.4} strokeLinecap="round" />
    </Svg>
  );
}

/** The hero card's overflow dots. */
export function MoreDots({ size = 24, color = dt.ink, style }: IconProps) {
  return (
    <Svg {...box(size, style)}>
      <Circle cx={4.6} cy={12} r={2.1} fill={color} />
      <Circle cx={12} cy={12} r={2.1} fill={color} />
      <Circle cx={19.4} cy={12} r={2.1} fill={color} />
    </Svg>
  );
}

/** The arrow in the carrier band's navy disc. */
export function ArrowRight({ size = 24, color = dt.onDark, style }: IconProps) {
  return (
    <Svg {...box(size, style)}>
      <Path d="M4.4 12h14.6M13.2 6.2 19 12l-5.8 5.8" stroke={color} {...stroke} />
    </Svg>
  );
}

/** The dock's Home tab — filled, because it is the tab the screen is on. */
export function HomeGlyph({ size = 24, color = dt.onDark, style }: IconProps) {
  return (
    <Svg {...box(size, style)}>
      {/* Taller than it is wide: the reference's house measures 14x15dp. */}
      <Path
        d="M11.3 2.9a1.2 1.2 0 0 1 1.4 0l7.3 6.1c.3.2.5.6.5 1v10.2a1.2 1.2 0 0 1-1.2 1.2H5.2A1.2 1.2 0 0 1 4 20.2V10c0-.4.2-.8.5-1l6.8-6.1Z"
        fill={color}
      />
      <Rect x={8.8} y={16.2} width={6.4} height={2.1} rx={1.05} fill={dt.navy} />
    </Svg>
  );
}

/** The dock's Send tab. */
export function Truck({ size = 24, color = dt.onDark, style }: IconProps) {
  return (
    <Svg {...box(size, style)}>
      {/* Flat: the reference's truck is 16x11dp, half again as wide as tall. */}
      <Path
        d="M2.8 6.9h9.3a.9.9 0 0 1 .9.9v8.1H3.7a.9.9 0 0 1-.9-.9V6.9Z"
        stroke={color}
        {...stroke}
      />
      <Path d="M13 9.6h3.3l4 3.2v3.1H13V9.6Z" stroke={color} {...stroke} />
      <Circle cx={6.8} cy={18.2} r={1.7} stroke={color} {...stroke} />
      <Circle cx={16.6} cy={18.2} r={1.7} stroke={color} {...stroke} />
    </Svg>
  );
}

/** The dock's History tab. */
export function Layers({ size = 24, color = dt.onDark, style }: IconProps) {
  return (
    <Svg {...box(size, style)}>
      {/* Three flat sheets: 16x11dp in the reference, not a cube of plates. */}
      <Path d="m12 6.5 9.6 3.3-9.6 3.3-9.6-3.3 9.6-3.3Z" stroke={color} {...stroke} />
      <Path d="m3.8 13.4 8.2 2.8 8.2-2.8" stroke={color} {...stroke} />
      <Path d="m3.8 16.6 8.2 2.8 8.2-2.8" stroke={color} {...stroke} />
    </Svg>
  );
}

/** The dock's Profile tab. */
export function Person({ size = 24, color = dt.onDark, style }: IconProps) {
  return (
    <Svg {...box(size, style)}>
      <Circle cx={12} cy={6.8} r={3.6} stroke={color} {...stroke} />
      <Path d="M4.6 20.4a7.4 7.4 0 0 1 14.8 0" stroke={color} {...stroke} />
    </Svg>
  );
}

/** The check in a parcel disc's amber dot. */
export function Check({ size = 24, color = dt.onDark, style }: IconProps) {
  return (
    <Svg {...box(size, style)}>
      <Path
        d="m5.4 12.6 4.4 4.4 8.8-9.6"
        stroke={color}
        strokeWidth={2.6}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </Svg>
  );
}
