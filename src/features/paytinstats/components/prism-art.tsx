import { View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

/**
 * The faceted graphic in the spending card.
 *
 * The reference puts an abstract rendered object here — nested squares turned
 * forty-five degrees, each face a step lighter than the one behind it, which
 * reads as a solid lit from one corner. A render cannot be recreated
 * (AGENTS.md, "Three kinds of reference"), but this one is pure geometry, so
 * it is rebuilt exactly rather than stood in for.
 *
 * Four nested diamonds drawn largest first, each inset and offset slightly
 * towards the light, which is what gives the illusion of depth. No gradients:
 * the steps do the work, and four flat fills are the same picture on every
 * platform.
 */
export function PrismArt({ size, shades }: { size: number; shades: readonly string[] }) {
  const c = 50;

  return (
    <View style={{ width: size, height: size }}>
      <Svg width={size} height={size} viewBox="0 0 100 100">
        {shades.map((shade, i) => {
          const r = 48 - i * 10.5;
          const dx = i * 2.4;
          const dy = i * -1.6;
          return (
            <Path
              key={shade}
              d={`M ${c + dx} ${c - r + dy} L ${c + r + dx} ${c + dy} L ${c + dx} ${c + r + dy} L ${c - r + dx} ${c + dy} Z`}
              fill={shade}
            />
          );
        })}
      </Svg>
    </View>
  );
}
