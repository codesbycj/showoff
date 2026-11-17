import { useId } from 'react';
import Svg, { Circle, ClipPath, Defs, G, Rect } from 'react-native-svg';

export type FlagName = 'ch' | 'at' | 'no';

type Props = { name: FlagName; size?: number };

/**
 * A country, drawn as a disc.
 *
 * **The board sets these as emoji** — which differ across Windows, Android and
 * iOS, and which Windows does not ship at all for flags (I8, §4.4). A flag
 * disc is explicitly in drawing range (§2.5), so each is a few bands inside a
 * clipped circle.
 *
 * The clip id comes from `useId`: ids are document-global on web, and a second
 * disc would otherwise be clipped by the first one's path.
 */
export function FlagDisc({ name, size = 18 }: Props) {
  const cid = useId();

  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Defs>
        <ClipPath id={cid}>
          <Circle cx={12} cy={12} r={12} />
        </ClipPath>
      </Defs>

      <G clipPath={`url(#${cid})`}>
        {name === 'ch' && (
          <>
            <Rect x={0} y={0} width={24} height={24} fill="#D52B1E" />
            <Rect x={10} y={5} width={4} height={14} fill="#FFFFFF" />
            <Rect x={5} y={10} width={14} height={4} fill="#FFFFFF" />
          </>
        )}

        {name === 'at' && (
          <>
            <Rect x={0} y={0} width={24} height={24} fill="#FFFFFF" />
            <Rect x={0} y={0} width={24} height={8} fill="#ED2939" />
            <Rect x={0} y={16} width={24} height={8} fill="#ED2939" />
          </>
        )}

        {name === 'no' && (
          <>
            <Rect x={0} y={0} width={24} height={24} fill="#BA0C2F" />
            <Rect x={0} y={9} width={24} height={6} fill="#FFFFFF" />
            <Rect x={7} y={0} width={6} height={24} fill="#FFFFFF" />
            <Rect x={0} y={10.5} width={24} height={3} fill="#00205B" />
            <Rect x={8.5} y={0} width={3} height={24} fill="#00205B" />
          </>
        )}
      </G>

      <Circle cx={12} cy={12} r={11.4} fill="none" stroke="rgba(0,0,0,0.12)" strokeWidth={1.2} />
    </Svg>
  );
}
