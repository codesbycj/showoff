import Svg, { Circle, Path } from 'react-native-svg';

/**
 * The company's mark, invented.
 *
 * The reference puts Apple's own logo on this card. A real company's mark over
 * invented analyst figures is exactly what rule 10 is for, so this is a mark
 * of this project's instead — a halcyon, which is a bird, reduced to one
 * stroke in a disc at the same size in the same place.
 */
export function BrandMark({ size = 30, tint }: { size?: number; tint: string }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 32 32">
      <Circle cx={16} cy={16} r={15} fill={tint} />
      <Path
        d="M8.5 19.2c3.4.2 5.6-1 6.8-3.4.8-1.7.7-3.4-.3-5.2 3.1 1 5.2 3 6.2 6.1.5 1.5.6 3 .3 4.6-2.4-1.3-4.3-1.6-5.8-1-1.1.4-2 1.3-2.8 2.6-1.8-.9-3.3-2.1-4.4-3.7Z"
        fill="#0B0B0B"
      />
    </Svg>
  );
}
