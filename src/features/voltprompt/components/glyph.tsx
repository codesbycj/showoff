import Svg, { Circle, Path, Rect } from 'react-native-svg';

/** Every mark on the screen, drawn — all of them interface. */
export function Glyph({
  name,
  size = 20,
  tint,
}: {
  name:
    | 'bolt'
    | 'command'
    | 'bell'
    | 'plus'
    | 'clock'
    | 'wallet'
    | 'grid'
    | 'store'
    | 'board'
    | 'back'
    | 'inbox'
    | 'box'
    | 'folder'
    | 'target'
    | 'mic'
    | 'send'
    | 'close'
    | 'trash'
    | 'edit'
    | 'chart'
    | 'line'
    | 'layers';
  size?: number;
  tint: string;
}) {
  const s = {
    stroke: tint,
    strokeWidth: 1.8,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    fill: 'none',
  };

  switch (name) {
    case 'bolt':
      return (
        <Svg width={size} height={size} viewBox="0 0 24 24">
          <Path d="M13.4 2 5 13.4h5.3L9.8 22l8.6-11.6h-5.4Z" fill={tint} />
        </Svg>
      );
    case 'command':
      return (
        <Svg width={size} height={size} viewBox="0 0 24 24">
          <Path
            d="M9 9V7a2.5 2.5 0 1 0-2.5 2.5H9Zm0 0h6m-6 0v6m6-6V7a2.5 2.5 0 1 1 2.5 2.5H15Zm0 0v6m0 0h2.5A2.5 2.5 0 1 1 15 17.5V15Zm-6 0H6.5A2.5 2.5 0 1 0 9 17.5V15Z"
            {...s}
          />
        </Svg>
      );
    case 'bell':
      return (
        <Svg width={size} height={size} viewBox="0 0 24 24">
          <Path d="M6.8 17.2V11a5.2 5.2 0 0 1 10.4 0v6.2" {...s} />
          <Path d="M5.2 17.4h13.6" {...s} />
          <Path d="M10.4 19.9a2 2 0 0 0 3.2 0" {...s} />
        </Svg>
      );
    case 'plus':
      return (
        <Svg width={size} height={size} viewBox="0 0 24 24">
          <Path d="M12 6v12M6 12h12" {...s} strokeWidth={2.4} />
        </Svg>
      );
    case 'clock':
      return (
        <Svg width={size} height={size} viewBox="0 0 24 24">
          <Circle cx={12} cy={12} r={8} {...s} />
          <Path d="M12 7.6V12l3 2" {...s} />
        </Svg>
      );
    case 'wallet':
      return (
        <Svg width={size} height={size} viewBox="0 0 24 24">
          <Rect x={3.6} y={6.4} width={16.8} height={11.2} rx={3} {...s} />
          <Path d="M15.6 12h2.8" {...s} strokeWidth={2.6} />
        </Svg>
      );
    case 'grid':
      return (
        <Svg width={size} height={size} viewBox="0 0 24 24">
          <Rect x={4} y={4} width={6.4} height={6.4} rx={2} fill={tint} />
          <Rect x={13.6} y={4} width={6.4} height={6.4} rx={2} fill={tint} />
          <Rect x={4} y={13.6} width={6.4} height={6.4} rx={2} fill={tint} />
          <Rect x={13.6} y={13.6} width={6.4} height={6.4} rx={2} fill={tint} />
        </Svg>
      );
    case 'store':
      return (
        <Svg width={size} height={size} viewBox="0 0 24 24">
          <Path d="M4.5 9.5h15v8.5a1.5 1.5 0 0 1-1.5 1.5H6a1.5 1.5 0 0 1-1.5-1.5Z" {...s} />
          <Path d="M4.5 9.5 6.4 5h11.2l1.9 4.5" {...s} />
        </Svg>
      );
    case 'board':
      return (
        <Svg width={size} height={size} viewBox="0 0 24 24">
          <Rect x={4} y={4.6} width={16} height={14.8} rx={3.4} {...s} />
          <Path d="M9 9.4v6M15 9.4v3.4" {...s} />
        </Svg>
      );
    case 'back':
      return (
        <Svg width={size} height={size} viewBox="0 0 24 24">
          <Path d="M14.5 5.5 8 12l6.5 6.5" {...s} strokeWidth={2.2} />
        </Svg>
      );
    case 'inbox':
      return (
        <Svg width={size} height={size} viewBox="0 0 24 24">
          <Rect x={3.8} y={6} width={16.4} height={12} rx={3} {...s} />
          <Path d="m5.4 8.4 6.6 4.5 6.6-4.5" {...s} />
        </Svg>
      );
    case 'box':
      return (
        <Svg width={size} height={size} viewBox="0 0 24 24">
          <Path d="M12 3.6 20 8v8l-8 4.4L4 16V8Z" {...s} />
          <Path d="M4 8l8 4.4L20 8M12 12.4v8" {...s} />
        </Svg>
      );
    case 'folder':
      return (
        <Svg width={size} height={size} viewBox="0 0 24 24">
          <Path
            d="M3.8 7.4a2 2 0 0 1 2-2h3.3l1.8 2.2h7.3a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H5.8a2 2 0 0 1-2-2Z"
            {...s}
          />
        </Svg>
      );
    case 'target':
      return (
        <Svg width={size} height={size} viewBox="0 0 24 24">
          <Circle cx={12} cy={12} r={7.6} {...s} />
          <Circle cx={12} cy={12} r={3.2} {...s} />
        </Svg>
      );
    case 'mic':
      return (
        <Svg width={size} height={size} viewBox="0 0 24 24">
          <Rect x={9} y={3.4} width={6} height={10.4} rx={3} fill={tint} />
          <Path d="M5.8 11.6a6.2 6.2 0 0 0 12.4 0M12 17.8v2.8" {...s} />
        </Svg>
      );
    case 'send':
      return (
        <Svg width={size} height={size} viewBox="0 0 24 24">
          <Path d="M4.4 11.6 19.6 5l-6.6 15.2-2-6.6Z" fill={tint} />
        </Svg>
      );
    case 'trash':
      return (
        <Svg width={size} height={size} viewBox="0 0 24 24">
          <Path
            d="M5.6 7.4h12.8M9.4 7.4V5.8a1.4 1.4 0 0 1 1.4-1.4h2.4a1.4 1.4 0 0 1 1.4 1.4v1.6"
            {...s}
          />
          <Path
            d="M7.4 7.4 8.2 19a1.4 1.4 0 0 0 1.4 1.3h4.8a1.4 1.4 0 0 0 1.4-1.3l.8-11.6"
            {...s}
          />
        </Svg>
      );
    case 'edit':
      return (
        <Svg width={size} height={size} viewBox="0 0 24 24">
          <Path d="M15.6 4.8 19.2 8.4 8.6 19H5v-3.6Z" {...s} />
        </Svg>
      );
    case 'chart':
      return (
        <Svg width={size} height={size} viewBox="0 0 24 24">
          <Rect x={5} y={11} width={3.4} height={8} rx={1.7} fill={tint} />
          <Rect x={10.3} y={6} width={3.4} height={13} rx={1.7} fill={tint} />
          <Rect x={15.6} y={13.6} width={3.4} height={5.4} rx={1.7} fill={tint} />
        </Svg>
      );
    case 'line':
      return (
        <Svg width={size} height={size} viewBox="0 0 24 24">
          <Path d="M4.6 16.4 9.4 10l3.6 3.4L19.4 6" {...s} strokeWidth={2} />
        </Svg>
      );
    case 'layers':
      return (
        <Svg width={size} height={size} viewBox="0 0 24 24">
          <Path d="M12 4.2 20 8.4 12 12.6 4 8.4Z" {...s} />
          <Path d="m4 12.4 8 4.2 8-4.2" {...s} />
        </Svg>
      );
    case 'close':
      return (
        <Svg width={size} height={size} viewBox="0 0 24 24">
          <Path d="M8 8l8 8M16 8l-8 8" {...s} strokeWidth={2} />
        </Svg>
      );
    default:
      return (
        <Svg width={size} height={size} viewBox="0 0 24 24">
          <Rect x={5} y={9} width={3.6} height={10} rx={1.8} fill={tint} />
          <Rect x={10.2} y={5} width={3.6} height={14} rx={1.8} fill={tint} />
          <Rect x={15.4} y={11.5} width={3.6} height={7.5} rx={1.8} fill={tint} />
        </Svg>
      );
  }
}
