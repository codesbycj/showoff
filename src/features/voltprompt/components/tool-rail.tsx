import { Pressable, View } from 'react-native';

import { RAIL_SIZE } from '../layout';
import { radius, vt } from '../theme';
import { Glyph } from './glyph';

/**
 * How to read the answer: as bars, as a line, or as layers — and the way to
 * dismiss it.
 *
 * It floats over the chart's right edge the way the reference has it. The
 * discs are opaque rather than translucent: over a chart, a translucent
 * control picks up whatever bar is behind it and stops looking like a
 * control.
 */
export function ToolRail() {
  const tools = ['close', 'chart', 'line', 'layers'] as const;

  return (
    <View style={{ position: 'absolute', right: -6, top: 10 }}>
      {tools.map((t, i) => (
        <Pressable key={t} accessibilityRole="button" accessibilityLabel={t}>
          <View
            style={{
              width: RAIL_SIZE,
              height: RAIL_SIZE,
              borderRadius: radius.control,
              backgroundColor: i === 0 ? '#F2F2F3' : vt.sheet,
              alignItems: 'center',
              justifyContent: 'center',
              marginTop: i === 0 ? 0 : 8,
            }}
          >
            <Glyph name={t} size={18} tint={i === 0 ? vt.onCanvas : vt.ink} />
          </View>
        </Pressable>
      ))}
    </View>
  );
}
