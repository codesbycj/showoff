import Svg, { Circle, Path, Rect } from 'react-native-svg';

/**
 * Every icon on the screen, drawn.
 *
 * One component rather than one file each: these are all 16-20dp strokes on a
 * single screen, and a switch keeps them sharing a viewBox and a stroke
 * weight so the set looks like a set.
 */
export function Glyph({ name, size = 18, tint }: { name: string; size?: number; tint: string }) {
  const s = { stroke: tint, strokeWidth: 1.8, fill: 'none' } as const;
  const r = { strokeLinecap: 'round', strokeLinejoin: 'round' } as const;

  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      {name === 'bell' ? (
        <>
          <Path
            d="M12 4a5.4 5.4 0 0 0-5.4 5.4c0 3.3-1 4.7-1.7 5.6-.4.4-.1 1 .5 1h13.2c.6 0 .9-.6.5-1-.7-.9-1.7-2.3-1.7-5.6A5.4 5.4 0 0 0 12 4Z"
            {...s}
            {...r}
          />
          <Path d="M10.3 18.6a1.9 1.9 0 0 0 3.4 0" {...s} {...r} />
        </>
      ) : null}
      {name === 'search' ? (
        <>
          <Circle cx={11} cy={11} r={6.4} {...s} />
          <Path d="M15.8 15.8 20 20" {...s} {...r} />
        </>
      ) : null}
      {name === 'scan' ? (
        <>
          <Path
            d="M4 9V6a2 2 0 0 1 2-2h3M15 4h3a2 2 0 0 1 2 2v3M20 15v3a2 2 0 0 1-2 2h-3M9 20H6a2 2 0 0 1-2-2v-3"
            {...s}
            {...r}
          />
          <Path d="M7 12h10" {...s} {...r} />
        </>
      ) : null}
      {name === 'send' ? (
        <Path d="M20.5 3.5 10.8 13.2M20.5 3.5l-6.3 17-3.4-7.3-7.3-3.4Z" {...s} {...r} />
      ) : null}
      {name === 'pin' ? (
        <>
          <Path d="M12 21s7-5.6 7-11a7 7 0 1 0-14 0c0 5.4 7 11 7 11Z" {...s} {...r} />
          <Circle cx={12} cy={10} r={2.4} {...s} />
        </>
      ) : null}
      {name === 'home' ? (
        <Path
          d="M4.4 10.4 12 4.6l7.6 5.8v8a1.6 1.6 0 0 1-1.6 1.6H6a1.6 1.6 0 0 1-1.6-1.6Z"
          fill={tint}
        />
      ) : null}
      {name === 'order' ? (
        <>
          <Rect x={5} y={3.6} width={14} height={16.8} rx={3} {...s} />
          <Path d="M8.6 9h6.8M8.6 13h6.8M8.6 17h4" {...s} {...r} />
        </>
      ) : null}
      {name === 'tracking' ? (
        <>
          <Circle cx={12} cy={10} r={2.4} {...s} />
          <Path d="M12 21s7-5.6 7-11a7 7 0 1 0-14 0c0 5.4 7 11 7 11Z" {...s} {...r} />
        </>
      ) : null}
      {name === 'profile' ? (
        <>
          <Circle cx={12} cy={8.6} r={3.6} {...s} />
          <Path d="M5.4 19.6a6.6 6.6 0 0 1 13.2 0" {...s} {...r} />
        </>
      ) : null}
      {name === 'check' ? (
        <Path d="m5.6 12.4 4.2 4.4 8.6-9.6" {...s} {...r} strokeWidth={2.4} />
      ) : null}
    </Svg>
  );
}
