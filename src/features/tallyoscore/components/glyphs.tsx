import Svg, { Circle, Path, Rect } from 'react-native-svg';

/**
 * The drawn glyphs this screen needs in place of the reference's emoji.
 *
 * The reference sets a waving hand, a chart, a trophy and a smiling face as
 * emoji, inline in its headline. An emoji is rendered by whatever font the
 * platform happens to have: different on Windows, Android and iOS, and for
 * some codepoints missing outright (AGENTS.md — never ship an emoji as UI).
 * Drawn, they are the same on every device and they take the screen's own
 * ink colour.
 */

/** The brand's four-diamond mark. */
export function Mark({ size = 24, tint }: { size?: number; tint: string }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Path d="M12 1.6 15.4 7 12 12.4 8.6 7Z" fill={tint} />
      <Path d="M12 11.6 15.4 17 12 22.4 8.6 17Z" fill={tint} />
      <Path d="M1.6 12 7 8.6 12.4 12 7 15.4Z" fill={tint} />
      <Path d="M11.6 12 17 8.6 22.4 12 17 15.4Z" fill={tint} />
    </Svg>
  );
}

/** A hand, raised. */
export function Wave({ size = 30, tint }: { size?: number; tint: string }) {
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

/** A line going up and to the right. */
export function Growth({ size = 15, tint }: { size?: number; tint: string }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Path
        d="M3.6 17.4 9 11l4 3.8 7.4-8"
        stroke={tint}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      <Path
        d="M15.6 6.4h4.8v4.8"
        stroke={tint}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </Svg>
  );
}

/** A cup, for the best result so far. */
export function Trophy({ size = 15, tint }: { size?: number; tint: string }) {
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

/** A face, pleased. */
export function Smile({ size = 18, tint }: { size?: number; tint: string }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Circle cx={12} cy={12} r={8.6} stroke={tint} strokeWidth={1.8} fill="none" />
      <Path
        d="M8.4 13.6a4.2 4.2 0 0 0 7.2 0"
        stroke={tint}
        strokeWidth={1.8}
        strokeLinecap="round"
        fill="none"
      />
      <Circle cx={9.2} cy={9.8} r={1} fill={tint} />
      <Circle cx={14.8} cy={9.8} r={1} fill={tint} />
    </Svg>
  );
}

/** An arrow leaving the corner. */
export function Arrow({ size = 17, tint }: { size?: number; tint: string }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Path d="M7 17 17 7" stroke={tint} strokeWidth={2} strokeLinecap="round" />
      <Path
        d="M8.6 7H17v8.4"
        stroke={tint}
        strokeWidth={2}
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
    </Svg>
  );
}

/** Three nodes joined, for sharing. */
export function Share({ size = 18, tint }: { size?: number; tint: string }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Circle cx={17.4} cy={5.6} r={2.6} stroke={tint} strokeWidth={1.8} fill="none" />
      <Circle cx={6.6} cy={12} r={2.6} stroke={tint} strokeWidth={1.8} fill="none" />
      <Circle cx={17.4} cy={18.4} r={2.6} stroke={tint} strokeWidth={1.8} fill="none" />
      <Path d="m9 10.7 6-3.8M9 13.3l6 3.8" stroke={tint} strokeWidth={1.8} strokeLinecap="round" />
    </Svg>
  );
}

/** Two links of a chain. */
export function LinkMark({ size = 18, tint }: { size?: number; tint: string }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      <Path
        d="M10 13.6a4 4 0 0 0 5.8.3l2.4-2.4a4 4 0 1 0-5.7-5.7l-1.4 1.4"
        stroke={tint}
        strokeWidth={1.8}
        strokeLinecap="round"
        fill="none"
      />
      <Path
        d="M14 10.4a4 4 0 0 0-5.8-.3l-2.4 2.4a4 4 0 1 0 5.7 5.7l1.4-1.4"
        stroke={tint}
        strokeWidth={1.8}
        strokeLinecap="round"
        fill="none"
      />
    </Svg>
  );
}

/** The four dock glyphs. */
export function DockGlyph({ id, tint }: { id: string; tint: string }) {
  if (id === 'tasks') {
    // A checklist, not a scatter of squares: the four-rect version read as
    // two stray dots at 20dp, which is the size it is actually drawn at.
    return (
      <Svg width={20} height={20} viewBox="0 0 24 24">
        <Path
          d="m3.6 7 2 2 3.4-3.6M3.6 14.4l2 2 3.4-3.6"
          stroke={tint}
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        <Path d="M12.4 7.4h8M12.4 14.8h8" stroke={tint} strokeWidth={2} strokeLinecap="round" />
      </Svg>
    );
  }
  if (id === 'stats') {
    return <Mark size={20} tint={tint} />;
  }
  if (id === 'settings') {
    return (
      <Svg width={20} height={20} viewBox="0 0 24 24">
        <Circle cx={12} cy={12} r={3.2} stroke={tint} strokeWidth={1.9} fill="none" />
        <Path
          d="M19.4 14.6a1.6 1.6 0 0 0 .3 1.8l.1.1a2 2 0 1 1-2.8 2.8l-.1-.1a1.6 1.6 0 0 0-2.7 1.1v.3a2 2 0 1 1-4 0v-.2a1.6 1.6 0 0 0-2.8-1.1l-.1.1a2 2 0 1 1-2.8-2.8l.1-.1a1.6 1.6 0 0 0-1.1-2.7h-.3a2 2 0 1 1 0-4h.2a1.6 1.6 0 0 0 1.1-2.8l-.1-.1a2 2 0 1 1 2.8-2.8l.1.1a1.6 1.6 0 0 0 2.7-1.1v-.3a2 2 0 1 1 4 0v.2a1.6 1.6 0 0 0 2.8 1.1l.1-.1a2 2 0 1 1 2.8 2.8l-.1.1a1.6 1.6 0 0 0 1.1 2.7h.3a2 2 0 1 1 0 4h-.2a1.6 1.6 0 0 0-1.4 1Z"
          stroke={tint}
          strokeWidth={1.6}
          strokeLinejoin="round"
          fill="none"
        />
      </Svg>
    );
  }
  return (
    <Svg width={20} height={20} viewBox="0 0 24 24">
      <Circle cx={12} cy={8} r={3.6} fill={tint} />
      <Path d="M4.8 20.4c.6-3.8 3.6-5.8 7.2-5.8s6.6 2 7.2 5.8Z" fill={tint} />
    </Svg>
  );
}
