import { View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

import { copy } from '../data/start';
import { BLURB_TOP, DISPLAY_TOP, MARK } from '../layout';
import { fc, radius, type } from '../theme';
import { BrandMark } from './brand-row';
import { T } from './text';

/** A bolt and a stack of plates: two small flat shapes, drawn. */
function Badge({ kind }: { kind: 'bolt' | 'stack' }) {
  const face = kind === 'bolt' ? fc.lime : fc.violet;
  const tint = kind === 'bolt' ? fc.onLime : fc.onBlue;

  return (
    <View
      style={{
        width: 32,
        height: 32,
        marginLeft: 8,
        borderRadius: radius.pill,
        backgroundColor: face,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Svg width={16} height={16} viewBox="0 0 24 24">
        {kind === 'bolt' ? (
          <Path d="M13.4 2.6 5.6 13.4h5l-.8 8 8-10.8h-5Z" fill={tint} />
        ) : (
          <>
            <Path d="M3.4 8.4 12 4.2l8.6 4.2-8.6 4.2Z" fill={tint} />
            <Path
              d="m4.6 12.6 7.4 3.6 7.4-3.6"
              stroke={tint}
              strokeWidth={1.8}
              strokeLinejoin="round"
              fill="none"
            />
            <Path
              d="m4.6 16.4 7.4 3.6 7.4-3.6"
              stroke={tint}
              strokeWidth={1.8}
              strokeLinejoin="round"
              fill="none"
              opacity={0.6}
            />
          </>
        )}
      </Svg>
    </View>
  );
}

/**
 * What the app is for, and the mark beside it.
 *
 * The headline's runs are data, so a weight change is a property of the copy.
 * React Native resolves a face by family name and not by numeric weight, so
 * each run names its own family — never a `font-bold` utility.
 *
 * The two badges sit on the first line and the mark floats to its right. The
 * mark is absolutely placed so it can overlap the second line the way the
 * reference's does without the display lines having to make room for it; it
 * is `pointerEvents="none"` so it never swallows a tap meant for the copy.
 */
export function HeroCopy() {
  return (
    <View style={{ marginTop: DISPLAY_TOP }}>
      <View pointerEvents="none" style={{ position: 'absolute', right: 0, top: 0, opacity: 0.95 }}>
        <BrandMark size={MARK} tint={fc.violet} />
      </View>

      {copy.displayLines.map((line, i) => (
        <View key={i} style={{ flexDirection: 'row', alignItems: 'center' }}>
          {line.map((run) => (
            <T
              key={run.text}
              variant={run.weight === 'bold' ? 'displayBold' : 'displayLight'}
              color={run.weight === 'bold' ? fc.ink : fc.muted}
              style={{ height: type.displayBold.line }}
            >
              {run.text}
            </T>
          ))}
          {i === 0 ? (
            <>
              <Badge kind="bolt" />
              <Badge kind="stack" />
            </>
          ) : null}
        </View>
      ))}

      <T variant="blurb" color={fc.muted} style={{ marginTop: BLURB_TOP, maxWidth: 270 }}>
        {copy.blurb}
      </T>
    </View>
  );
}
