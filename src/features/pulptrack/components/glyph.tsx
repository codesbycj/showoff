import Svg, { Circle, Path, Rect } from 'react-native-svg';

import { ct } from '../theme';

/**
 * pulptrack's icon set - interface, so vectors (I4).
 */
export type GlyphName =
  | 'back'
  | 'zoomIn'
  | 'zoomOut'
  | 'clock'
  | 'box'
  | 'home'
  | 'bottle'
  | 'truck'
  | 'check'
  | 'phone'
  | 'chat';

type Props = { name: GlyphName; size?: number; color?: string; strokeWidth?: number };

export function Glyph({ name, size = 20, color = ct.ink, strokeWidth = 1.7 }: Props) {
  const s = {
    stroke: color,
    strokeWidth,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    fill: 'none',
  };

  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      {name === 'back' && <Path d="M14.4 5.2 7.6 12l6.8 6.8" {...s} />}

      {name === 'zoomIn' && (
        <>
          <Circle cx={10.6} cy={10.6} r={6.2} {...s} />
          <Path d="M10.6 7.8v5.6M7.8 10.6h5.6M15.4 15.4l4 4" {...s} />
        </>
      )}

      {name === 'zoomOut' && (
        <>
          <Circle cx={10.6} cy={10.6} r={6.2} {...s} />
          <Path d="M7.8 10.6h5.6M15.4 15.4l4 4" {...s} />
        </>
      )}

      {name === 'clock' && (
        <>
          <Circle cx={12} cy={12} r={8.2} {...s} />
          <Path d="M12 7.4V12l3 1.8" {...s} />
        </>
      )}

      {name === 'box' && (
        <>
          <Path d="M12 3.4 20 7.6v8.8L12 20.6 4 16.4V7.6Z" {...s} />
          <Path d="M4 7.6 12 12l8-4.4M12 12v8.6" {...s} />
        </>
      )}

      {name === 'home' && (
        <>
          <Path
            d="M4.4 10.6 12 4.4l7.6 6.2v8.2a1.4 1.4 0 0 1-1.4 1.4H5.8a1.4 1.4 0 0 1-1.4-1.4Z"
            {...s}
          />
          <Path d="M9.8 20.2v-5.6h4.4v5.6" {...s} />
        </>
      )}

      {name === 'bottle' && (
        <>
          <Rect x={9.4} y={2.8} width={5.2} height={3} rx={1} {...s} />
          <Path
            d="M10 5.8v2.4L7.8 11v8.2a1.8 1.8 0 0 0 1.8 1.8h4.8a1.8 1.8 0 0 0 1.8-1.8V11L14 8.2V5.8"
            {...s}
          />
        </>
      )}

      {name === 'truck' && (
        <>
          <Path d="M2.8 6.4h10.4v9.2H2.8Z" {...s} />
          <Path d="M13.2 9.6h3.6l3.4 3.2v2.8h-7Z" {...s} />
          <Circle cx={7} cy={17.6} r={1.7} {...s} />
          <Circle cx={17} cy={17.6} r={1.7} {...s} />
        </>
      )}

      {name === 'check' && <Path d="m6.4 12.4 3.6 3.6 7.6-8" {...s} />}

      {name === 'phone' && (
        <Path
          d="M7.4 3.8 9.8 8 8 10.2a11 11 0 0 0 5.8 5.8L16 14.2l4.2 2.4-.8 2.8a1.6 1.6 0 0 1-1.8 1.1C11 19.5 4.5 13 3.3 6.4A1.6 1.6 0 0 1 4.4 4.6Z"
          {...s}
        />
      )}

      {name === 'chat' && (
        <Path
          d="M4 6.4a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v7.2a2 2 0 0 1-2 2H9.6L5.2 19.4v-3.8H6a2 2 0 0 1-2-2Z"
          {...s}
        />
      )}
    </Svg>
  );
}
