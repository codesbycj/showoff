import { Text, View } from 'react-native';

import { SP, TYPE, vt } from '../theme';

/**
 * The explore headline: "Choose your *Favorite game*".
 *
 * The accent words are the one place this design asks for something that does
 * not exist. `DESIGN.md` calls for "Space Grotesk Bold Italic"; Space Grotesk
 * ships upright only, and the export's own render is a browser-synthesised
 * oblique. Measuring the leftmost edge of the lime glyphs down their scanlines
 * gives a slope of -0.2545, or **14.28 degrees** — which is Chrome's standard
 * synthetic oblique (`skew -0.25`). So it is rebuilt as an explicit 14deg skew
 * rather than left to `fontStyle: 'italic'`, which React Native resolves by
 * looking for a real italic face and, finding none, may fall back to a
 * different family entirely.
 *
 * The break is hard-coded into two rows rather than left to wrap, because a
 * transform cannot apply to a nested `Text` span: the skew has to sit on its own
 * element, so the upright and italic halves of the first line are two siblings.
 * The export breaks in the same place.
 */
export function HeroTitle({
  lead,
  accent,
  blurb,
}: {
  lead: string;
  accent: string;
  blurb: string;
}) {
  const [accentFirst, ...accentRest] = accent.split(' ');

  return (
    <View style={{ paddingTop: SP.sm }}>
      <View style={{ flexDirection: 'row', alignItems: 'baseline' }}>
        <Text style={{ ...TYPE.headlineXlMobile, letterSpacing: -0.75, color: vt.primary }}>
          {lead}{' '}
        </Text>
        <Italic>{accentFirst}</Italic>
      </View>

      <Italic>{accentRest.join(' ')}</Italic>

      <Text style={{ ...TYPE.bodySm, marginTop: SP.xs, color: vt.secondary }}>{blurb}</Text>
    </View>
  );
}

/** One slanted word. The skew is the measured 14deg, about the element's centre. */
function Italic({ children }: { children: string }) {
  return (
    <Text
      style={{
        ...TYPE.headlineXlMobile,
        letterSpacing: -0.75,
        color: vt.primaryFixed,
        transform: [{ skewX: '-14deg' }],
      }}
    >
      {children}
    </Text>
  );
}
