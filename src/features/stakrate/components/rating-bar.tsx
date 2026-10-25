import { View } from 'react-native';
import Svg, { Line } from 'react-native-svg';

import { BAR_HEIGHT } from '../layout';
import { radius, sk, type } from '../theme';
import { T } from './text';

/**
 * One verdict: the share of analysts who gave it, and how many that is.
 *
 * The bar's width *is* the share — `flex: share` against `flex: 100 - share`
 * — so the picture and the number cannot drift apart. A percentage width
 * would resolve against a parent with no definite width inside this row and
 * collapse.
 *
 * The hatching over the left of the bar is the reference's, and it is drawn as
 * explicit lines rather than an SVG `<Pattern>`: pattern ids are
 * document-global on web, so three bars sharing one id would all render the
 * first one's.
 */
function Hatch({ width, height }: { width: number; height: number }) {
  const step = 7;
  const lines = [];
  for (let x = -height; x < width; x += step) {
    lines.push(
      <Line
        key={x}
        x1={x}
        y1={height}
        x2={x + height}
        y2={0}
        stroke="rgba(11,11,11,0.16)"
        strokeWidth={3}
      />,
    );
  }
  return (
    <Svg width={width} height={height}>
      {lines}
    </Svg>
  );
}

export function RatingBar({
  verdict,
  share,
  count,
  tone,
}: {
  verdict: string;
  share: number;
  count: number;
  tone: 'acid' | 'grey' | 'coal';
}) {
  const fill = tone === 'acid' ? sk.acid : tone === 'grey' ? sk.grey : sk.coal;
  const ink = tone === 'acid' ? sk.onAcid : sk.ink;

  return (
    <View style={{ flexDirection: 'row', height: BAR_HEIGHT }}>
      <View
        style={{
          flex: share,
          // A share can be small enough that the bar cannot hold its own
          // label — 5% of 349dp is 17dp, and "5%" and "SELL" were stacking
          // one glyph per line inside it. The floor is what the widest label
          // needs; past that the width is the share and nothing else.
          minWidth: 116,
          borderRadius: radius.bar,
          backgroundColor: fill,
          justifyContent: 'center',
          paddingLeft: 18,
          overflow: 'hidden',
        }}
      >
        <View style={{ position: 'absolute', left: 0, top: 0 }}>
          <Hatch width={200} height={BAR_HEIGHT} />
        </View>
        <T variant="share" color={ink} numberOfLines={1} style={{ height: type.share.line }}>
          {`${share}%`}
        </T>
        <T variant="verdict" color={ink} numberOfLines={1} style={{ height: type.verdict.line }}>
          {verdict}
        </T>
      </View>
      <View style={{ flex: 100 - share, justifyContent: 'center', paddingLeft: 18 }}>
        <T variant="count" color={sk.body} style={{ height: type.count.line }}>
          {String(count)}
        </T>
      </View>
    </View>
  );
}
