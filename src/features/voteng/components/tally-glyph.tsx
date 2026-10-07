import Svg, { Path, Rect } from 'react-native-svg';

/**
 * The Results tab's icon: three bars of rising height.
 *
 * It is drawn here rather than taken from the icon set because every stock
 * "bar chart" glyph carries an axis, and filling one to mark the tab active
 * closes the gaps between the bars and the axis into a solid block. The export
 * uses three free-standing bars for exactly that reason, so they survive being
 * filled.
 */
export function TallyGlyph({
  size = 20,
  color,
  filled,
}: {
  size?: number;
  color: string;
  filled?: boolean;
}) {
  if (filled) {
    return (
      <Svg width={size} height={size} viewBox="0 0 24 24">
        <Path d="M5 9.2h3V19H5zM10.6 5h2.8v14h-2.8zm5.6 8H19v6h-2.8z" fill={color} />
      </Svg>
    );
  }

  return (
    <Svg width={size} height={size} viewBox="0 0 24 24" fill="none">
      {[
        { x: 5, y: 9.2, h: 9.8 },
        { x: 10.6, y: 5, h: 14 },
        { x: 16.2, y: 13, h: 6 },
      ].map((b) => (
        <Rect
          key={b.x}
          x={b.x}
          y={b.y}
          width={2.8}
          height={b.h}
          rx={0.9}
          stroke={color}
          strokeWidth={1.8}
        />
      ))}
    </Svg>
  );
}
