import Svg, { Circle, ClipPath, Defs, G, Path, Rect } from 'react-native-svg';
import { useId } from 'react';

export type FlagName = 'my' | 'vn' | 'th' | 'jp';

type Props = { name: FlagName; size?: number };

/**
 * A country, drawn as a disc.
 *
 * **The board sets these as emoji** — which differ across Windows, Android and
 * iOS, and which Windows does not ship at all for flags (I8, §4.4). A flag
 * disc is explicitly in drawing range (§2.5), so each is a few bands and a
 * mark inside a clipped circle.
 *
 * The clip id comes from `useId`: ids are document-global on web, and a second
 * disc would otherwise be clipped by the first one's path.
 */
export function FlagDisc({ name, size = 18 }: Props) {
  const cid = useId();
  const r = size / 2;

  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Defs>
        <ClipPath id={cid}>
          <Circle cx={12} cy={12} r={12} />
        </ClipPath>
      </Defs>

      <G clipPath={`url(#${cid})`}>
        {name === 'my' && (
          <>
            <Rect x={0} y={0} width={24} height={24} fill="#F2F2F2" />
            {[0, 2, 4, 6, 8, 10, 12].map((y) => (
              <Rect key={y} x={0} y={y * 1.7} width={24} height={1.7} fill="#CC0001" />
            ))}
            <Rect x={0} y={0} width={13} height={12} fill="#10338C" />
            <Circle cx={6.4} cy={6} r={3.2} fill="#FFCC00" />
            <Circle cx={7.6} cy={6} r={2.6} fill="#10338C" />
          </>
        )}

        {name === 'vn' && (
          <>
            <Rect x={0} y={0} width={24} height={24} fill="#DA251D" />
            <Path
              d="M12 6.6 13.5 11h4.6l-3.7 2.7 1.4 4.4-3.8-2.7-3.8 2.7 1.4-4.4L6 11h4.6Z"
              fill="#FFCD00"
            />
          </>
        )}

        {name === 'th' && (
          <>
            <Rect x={0} y={0} width={24} height={24} fill="#A51931" />
            <Rect x={0} y={4} width={24} height={16} fill="#F4F5F8" />
            <Rect x={0} y={8} width={24} height={8} fill="#2D2A4A" />
          </>
        )}

        {name === 'jp' && (
          <>
            <Rect x={0} y={0} width={24} height={24} fill="#FFFFFF" />
            <Circle cx={12} cy={12} r={6.4} fill="#BC002D" />
          </>
        )}
      </G>

      <Circle
        cx={12}
        cy={12}
        r={r > 0 ? 11.4 : 0}
        fill="none"
        stroke="rgba(0,0,0,0.08)"
        strokeWidth={1.2}
      />
    </Svg>
  );
}
