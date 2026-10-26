import Svg, { Circle, Path, Rect } from 'react-native-svg';

/**
 * The drawn glyphs these screens need.
 *
 * The reference sets a waving hand as an emoji in its greeting. An emoji is
 * rendered by whatever font the platform happens to have — different on
 * Windows, Android and iOS (AGENTS.md: never ship an emoji as UI). Drawn, it
 * takes the screen's own ink colour and looks the same everywhere.
 */

/** A hand, raised. */
export function Wave({ size = 14, tint }: { size?: number; tint: string }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Path
        d="M7.4 11.6V5.4a1.5 1.5 0 0 1 3 0v5M10.4 10.4V4a1.5 1.5 0 0 1 3 0v6M13.4 10.6V5.6a1.5 1.5 0 0 1 3 0v6.6M16.4 11.2l1-2.2a1.5 1.5 0 0 1 2.7 1.3l-2 5.2a7 7 0 0 1-6.5 4.5 6 6 0 0 1-6-6v-3.2a1.5 1.5 0 0 1 3 0"
        stroke={tint}
        strokeWidth={1.7}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </Svg>
  );
}

/** A bell, with a dot when something is waiting. */
export function Bell({ tint }: { tint: string }) {
  return (
    <Svg width={20} height={20} viewBox="0 0 24 24">
      <Path
        d="M6 10.4a6 6 0 0 1 12 0c0 3.2.8 4.6 1.5 5.4.4.5 0 1.2-.6 1.2H5.1c-.6 0-1-.7-.6-1.2.7-.8 1.5-2.2 1.5-5.4Z"
        fill={tint}
      />
      <Path
        d="M10 19.4a2.2 2.2 0 0 0 4 0"
        stroke={tint}
        strokeWidth={1.9}
        strokeLinecap="round"
        fill="none"
      />
    </Svg>
  );
}

/** The four action discs. */
export function Action({ id, tint }: { id: string; tint: string }) {
  if (id === 'sign') {
    return (
      <Svg width={22} height={22} viewBox="0 0 24 24">
        <Rect
          x={4}
          y={4}
          width={16}
          height={16}
          rx={4.5}
          stroke={tint}
          strokeWidth={1.8}
          fill="none"
        />
        <Path
          d="m8.4 12.2 2.4 2.4 4.8-5"
          stroke={tint}
          strokeWidth={1.8}
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </Svg>
    );
  }
  if (id === 'send') {
    return (
      <Svg width={22} height={22} viewBox="0 0 24 24">
        <Rect
          x={4}
          y={4}
          width={16}
          height={16}
          rx={4.5}
          stroke={tint}
          strokeWidth={1.8}
          fill="none"
        />
        <Path d="M9.4 14.6 15 9" stroke={tint} strokeWidth={1.8} strokeLinecap="round" />
        <Path
          d="M10.4 9H15v4.6"
          stroke={tint}
          strokeWidth={1.8}
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </Svg>
    );
  }
  if (id === 'add') {
    return (
      <Svg width={22} height={22} viewBox="0 0 24 24">
        <Path d="M12 5.4v13.2M5.4 12h13.2" stroke={tint} strokeWidth={2.2} strokeLinecap="round" />
      </Svg>
    );
  }
  return (
    <Svg width={22} height={22} viewBox="0 0 24 24">
      <Path
        d="M12 20.2c-.5 0-.9-.2-1.3-.5C6.2 15.9 3.8 13.5 3.8 10.2a4.3 4.3 0 0 1 8.2-1.8 4.3 4.3 0 0 1 8.2 1.8c0 3.3-2.4 5.7-6.9 9.5-.4.3-.8.5-1.3.5Z"
        fill={tint}
      />
    </Svg>
  );
}

/** The four dock glyphs. */
export function DockGlyph({ id, tint }: { id: string; tint: string }) {
  if (id === 'home') {
    return (
      <Svg width={22} height={22} viewBox="0 0 24 24">
        <Path
          d="M4.4 10.4 12 4.6l7.6 5.8v8a1.6 1.6 0 0 1-1.6 1.6H6a1.6 1.6 0 0 1-1.6-1.6Z"
          fill={tint}
        />
      </Svg>
    );
  }
  if (id === 'perf') {
    return (
      <Svg width={22} height={22} viewBox="0 0 24 24">
        <Path d="M12 3.6a8.4 8.4 0 1 0 8.4 8.4H12Z" fill={tint} />
        <Path d="M14 2.6a8.4 8.4 0 0 1 7.4 7.4H14Z" fill={tint} opacity={0.55} />
      </Svg>
    );
  }
  if (id === 'actions') {
    return (
      <Svg width={22} height={22} viewBox="0 0 24 24">
        <Rect x={3.4} y={6} width={17.2} height={12.6} rx={3.4} fill={tint} />
        <Circle cx={16.8} cy={12.3} r={1.7} fill="#16170F" />
      </Svg>
    );
  }
  return (
    <Svg width={22} height={22} viewBox="0 0 24 24">
      <Path d="M12 3.2 19.4 6v6.2c0 4.4-3 7.4-7.4 8.6-4.4-1.2-7.4-4.2-7.4-8.6V6Z" fill={tint} />
    </Svg>
  );
}
