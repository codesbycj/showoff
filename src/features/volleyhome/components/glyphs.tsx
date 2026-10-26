import Svg, { Circle, Path, Rect } from 'react-native-svg';

/** The glyphs these screens need, all drawn for the showcase. */

export function Pin({ size = 22, tint }: { size?: number; tint: string }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Path
        d="M12 21.4c4.4-4.6 6.6-7.8 6.6-10.8a6.6 6.6 0 0 0-13.2 0c0 3 2.2 6.2 6.6 10.8Z"
        stroke={tint}
        strokeWidth={1.8}
        strokeLinejoin="round"
        fill="none"
      />
      <Circle cx={12} cy={10.4} r={2.4} stroke={tint} strokeWidth={1.8} fill="none" />
    </Svg>
  );
}

export function Clock({ size = 14, tint }: { size?: number; tint: string }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Circle cx={12} cy={12} r={8.6} stroke={tint} strokeWidth={1.8} fill="none" />
      <Path
        d="M12 7.2V12l3.4 2.4"
        stroke={tint}
        strokeWidth={1.8}
        strokeLinecap="round"
        fill="none"
      />
    </Svg>
  );
}

export function Calendar({ size = 14, tint }: { size?: number; tint: string }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Rect
        x={4}
        y={6}
        width={16}
        height={14}
        rx={3.2}
        stroke={tint}
        strokeWidth={1.8}
        fill="none"
      />
      <Path
        d="M4 10.6h16M8.4 3.6v4M15.6 3.6v4"
        stroke={tint}
        strokeWidth={1.8}
        strokeLinecap="round"
      />
    </Svg>
  );
}

export function Trophy({ size = 22, tint }: { size?: number; tint: string }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Path
        d="M7 3.6h10v5.2a5 5 0 0 1-10 0Z"
        stroke={tint}
        strokeWidth={1.8}
        strokeLinejoin="round"
        fill="none"
      />
      <Path
        d="M7 5.4H4.8a2.6 2.6 0 0 0 2.6 2.8M17 5.4h2.2a2.6 2.6 0 0 1-2.6 2.8"
        stroke={tint}
        strokeWidth={1.8}
        strokeLinecap="round"
        fill="none"
      />
      <Path d="M12 13.8v3.6M8.8 20.4h6.4" stroke={tint} strokeWidth={1.8} strokeLinecap="round" />
    </Svg>
  );
}

export function Racket({ size = 22, tint }: { size?: number; tint: string }) {
  // A padel bat: a solid rounded oval with a short handle and a few holes.
  // The strung-racket version read as a magnifying glass at 22dp, which is
  // the only size it is ever drawn at.
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Path
        d="M12 2.6c3.9 0 6.6 2.9 6.6 6.9 0 3.7-2.8 6.6-6.6 6.6S5.4 13.2 5.4 9.5c0-4 2.7-6.9 6.6-6.9Z"
        stroke={tint}
        strokeWidth={1.8}
        fill="none"
      />
      <Path d="M12 16.1v3.1" stroke={tint} strokeWidth={2} strokeLinecap="round" />
      <Path d="M9.8 19.2h4.4a1 1 0 0 1 1 1v1.2H8.8v-1.2a1 1 0 0 1 1-1Z" fill={tint} />
      <Circle cx={10.2} cy={8} r={0.9} fill={tint} />
      <Circle cx={13.8} cy={8} r={0.9} fill={tint} />
      <Circle cx={12} cy={11.2} r={0.9} fill={tint} />
    </Svg>
  );
}

export function People({ size = 22, tint }: { size?: number; tint: string }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Circle cx={9} cy={8.6} r={3.2} stroke={tint} strokeWidth={1.8} fill="none" />
      <Circle cx={17} cy={9.6} r={2.4} stroke={tint} strokeWidth={1.8} fill="none" />
      <Path
        d="M3 19.4c.5-3.2 3-5 6-5s5.5 1.8 6 5"
        stroke={tint}
        strokeWidth={1.8}
        strokeLinecap="round"
        fill="none"
      />
      <Path
        d="M16.4 14.6c2.3.2 3.9 1.8 4.3 4.4"
        stroke={tint}
        strokeWidth={1.8}
        strokeLinecap="round"
        fill="none"
      />
    </Svg>
  );
}

export function Arrow({ size = 15, tint }: { size?: number; tint: string }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Path d="M7 17 17 7" stroke={tint} strokeWidth={2.2} strokeLinecap="round" />
      <Path
        d="M8.6 7H17v8.4"
        stroke={tint}
        strokeWidth={2.2}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </Svg>
  );
}

export function Chevron({ size = 15, tint }: { size?: number; tint: string }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Path
        d="m9.6 6 5.4 6-5.4 6"
        stroke={tint}
        strokeWidth={2.2}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </Svg>
  );
}

export function Refresh({ size = 20, tint }: { size?: number; tint: string }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Path
        d="M20 12a8 8 0 1 1-2.4-5.7"
        stroke={tint}
        strokeWidth={1.9}
        strokeLinecap="round"
        fill="none"
      />
      <Path
        d="M20 3.6V8h-4.4"
        stroke={tint}
        strokeWidth={1.9}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </Svg>
  );
}

/** The four dock glyphs. */
export function DockGlyph({ id, tint }: { id: string; tint: string }) {
  if (id === 'home') {
    return (
      <Svg width={20} height={20} viewBox="0 0 24 24">
        <Path
          d="M4.4 10.4 12 4.6l7.6 5.8v8a1.6 1.6 0 0 1-1.6 1.6H6a1.6 1.6 0 0 1-1.6-1.6Z"
          fill={tint}
        />
      </Svg>
    );
  }
  if (id === 'booking') {
    return <Calendar size={20} tint={tint} />;
  }
  if (id === 'rank') {
    return <Trophy size={20} tint={tint} />;
  }
  return (
    <Svg width={20} height={20} viewBox="0 0 24 24">
      <Circle cx={12} cy={8} r={3.4} fill={tint} />
      <Path d="M5 20.4c.6-3.6 3.4-5.6 7-5.6s6.4 2 7 5.6Z" fill={tint} />
    </Svg>
  );
}
