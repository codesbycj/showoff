import { Text, View } from 'react-native';

import { type PulseFace } from '../data/stream';
import { R, SP, TYPE, vt } from '../theme';

const FILL = {
  highest: { bg: 'surfaceContainerHighest', fg: 'primaryFixed' },
  secondary: { bg: 'secondaryContainer', fg: 'onSecondaryContainer' },
  primary: { bg: 'primaryContainer', fg: 'onPrimaryContainer' },
} as const;

/**
 * The social pulse strip at the foot of the stream.
 *
 * Its three avatars are initials in coloured discs, not photographs — the one
 * avatar stack in the showcase that is not an image. That is what the markup
 * draws, and the three fills it uses are a deliberate ladder: a neutral, the
 * sage secondary, and the lime. Carried as a `tone` on each datum rather than
 * being derived from position, so reordering them cannot silently recolour them.
 */
export function SocialPulse({
  title,
  meta,
  blurb,
  faces,
}: {
  title: string;
  meta: string;
  blurb: string;
  faces: readonly PulseFace[];
}) {
  return (
    <View
      style={{
        borderRadius: R.lg,
        backgroundColor: vt.surfaceContainerLow,
        padding: SP.lg,
        gap: SP.md,
      }}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
        <Text style={{ ...TYPE.labelMd, color: vt.primary }}>{title}</Text>
        <Text style={{ ...TYPE.labelSm, color: vt.secondary }}>{meta}</Text>
      </View>

      <View style={{ flexDirection: 'row', alignItems: 'center', gap: SP.md }}>
        <View style={{ flexDirection: 'row' }}>
          {faces.map((f, i) => {
            const fill = FILL[f.tone];
            return (
              <View
                key={f.key}
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: R.full,
                  marginLeft: i === 0 ? 0 : -8,
                  backgroundColor: vt[fill.bg],
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Text style={{ ...TYPE.labelSm, fontSize: 11, color: vt[fill.fg] }}>
                  {f.initials}
                </Text>
              </View>
            );
          })}
        </View>

        <Text style={{ ...TYPE.bodySm, flexShrink: 1, color: vt.secondary }}>{blurb}</Text>
      </View>
    </View>
  );
}
