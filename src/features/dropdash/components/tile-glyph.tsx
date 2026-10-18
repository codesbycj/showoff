import Svg, { G, Path, Rect } from 'react-native-svg';

import type { TileGlyph as GlyphName } from '../data/dashboard';
import { dd } from '../theme';

/**
 * The little object in the corner of a stat tile.
 *
 * The reference uses 3D emoji — a parcel, a stack of notes, a shopfront, a bar
 * chart. **This project does not ship emoji as UI.** Windows, Android and iOS
 * each draw a different glyph for the same codepoint, Windows has none at all
 * for some of them, and the harness renders whichever the build machine
 * happens to have — which is exactly the difference a web render cannot catch.
 *
 * So each is drawn: four flat objects in the same dialect, two tones apiece,
 * no gradients. They are the same mark on every platform and ship no font.
 *
 * Drawn in a 24-unit viewBox, so every number is a twenty-fourth of the glyph
 * box rather than a dp.
 */
export function TileGlyph({ name, size }: { name: GlyphName; size: number }) {
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      {name === 'box' ? (
        <G>
          <Path d="M12 2.4 L21.6 7 L12 11.6 L2.4 7 Z" fill={dd.box} />
          <Path d="M2.4 7 L12 11.6 V21.6 L2.4 17 Z" fill={dd.boxDeep} />
          <Path d="M21.6 7 L12 11.6 V21.6 L21.6 17 Z" fill="#a97b40" />
        </G>
      ) : null}

      {name === 'note' ? (
        <G>
          <Rect x={2.2} y={6.4} width={19.6} height={11.2} rx={2} fill={dd.note} />
          <Rect x={4.6} y={8.6} width={14.8} height={6.8} rx={1.4} fill="#3b7f53" />
          <Rect x={9.4} y={10.2} width={5.2} height={3.6} rx={1.8} fill="#9fd6b2" />
        </G>
      ) : null}

      {name === 'shop' ? (
        <G>
          <Path d="M3 7.6 L5 3.4 H19 L21 7.6 Z" fill={dd.shop} />
          <Rect x={4.2} y={7.6} width={15.6} height={13} rx={1.6} fill="#e9e3d8" />
          <Rect x={8.4} y={12} width={7.2} height={8.6} rx={1} fill={dd.shop} />
        </G>
      ) : null}

      {name === 'chart' ? (
        <G>
          <Rect x={3} y={4} width={18} height={16.4} rx={2.4} fill="#e9eef7" />
          <Rect x={6} y={12} width={3.2} height={5.4} rx={1.1} fill={dd.chart} />
          <Rect x={10.4} y={8.8} width={3.2} height={8.6} rx={1.1} fill="#f0a63c" />
          <Rect x={14.8} y={10.6} width={3.2} height={6.8} rx={1.1} fill="#e2574c" />
        </G>
      ) : null}
    </Svg>
  );
}
