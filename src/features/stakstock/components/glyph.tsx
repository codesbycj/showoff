import Svg, { Path } from 'react-native-svg';

/** The marks on the stock screen, drawn — all of them interface. */
export function Glyph({
  name,
  size = 20,
  tint,
}: {
  name: 'back' | 'bell' | 'chevron' | 'check' | 'next' | 'plus' | 'minus' | 'trend';
  size?: number;
  tint: string;
}) {
  const s = {
    stroke: tint,
    strokeWidth: 1.9,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    fill: 'none',
  };

  switch (name) {
    case 'back':
      return (
        <Svg width={size} height={size} viewBox="0 0 24 24">
          <Path d="M14.5 5.5 8 12l6.5 6.5" {...s} strokeWidth={2.2} />
        </Svg>
      );
    case 'bell':
      return (
        <Svg width={size} height={size} viewBox="0 0 24 24">
          <Path d="M6.6 17.4V11a5.4 5.4 0 0 1 10.8 0v6.4" {...s} />
          <Path d="M4.9 17.5h14.2" {...s} />
          <Path d="M10.3 20.1a2 2 0 0 0 3.4 0" {...s} />
        </Svg>
      );
    case 'chevron':
      return (
        <Svg width={size} height={size} viewBox="0 0 24 24">
          <Path d="M10 6.5 15.5 12 10 17.5" {...s} strokeWidth={2.2} />
        </Svg>
      );
    case 'check':
      return (
        <Svg width={size} height={size} viewBox="0 0 24 24">
          <Path d="m5.5 12.5 4.2 4.2L18.5 8" {...s} strokeWidth={2.6} />
        </Svg>
      );
    case 'next':
      return (
        <Svg width={size} height={size} viewBox="0 0 24 24">
          <Path d="m7 6 5 6-5 6M13 6l5 6-5 6" {...s} strokeWidth={2} />
        </Svg>
      );
    case 'plus':
      return (
        <Svg width={size} height={size} viewBox="0 0 24 24">
          <Path d="M12 6v12M6 12h12" {...s} strokeWidth={2.2} />
        </Svg>
      );
    case 'minus':
      return (
        <Svg width={size} height={size} viewBox="0 0 24 24">
          <Path d="M6 12h12" {...s} strokeWidth={2.2} />
        </Svg>
      );
    default:
      // the arrow beside the price: down-right when the day is down
      return (
        <Svg width={size} height={size} viewBox="0 0 24 24">
          <Path d="M7 7l10 10M17 9.6V17H9.6" {...s} strokeWidth={2.4} />
        </Svg>
      );
  }
}
