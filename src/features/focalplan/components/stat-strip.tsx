import { ScrollView, View } from 'react-native';

import { copy, tiles } from '../data/start';
import { MARGIN, SECTION_TOP, TILE_HEIGHT, TILE_WIDTH, TILES_TOP } from '../layout';
import { fc, radius, type } from '../theme';
import { T } from './text';

const TONES: Record<string, string> = {
  lilac: fc.lilac,
  lime: fc.lime,
  violetSoft: fc.violetSoft,
  blueSoft: fc.blueSoft,
};

/**
 * The three or four figures above the calendar.
 *
 * A horizontal `ScrollView`, not a wrap. The reference's third tile is
 * clipped by the screen's right edge, and a wrap layout physically cannot
 * reproduce that (AGENTS.md, "A row that runs off the screen edge is a
 * scrolling row").
 *
 * There is a fourth tile here that the reference crops away entirely: a row
 * that scrolls needs somewhere to scroll to, and three tiles at this width
 * very nearly fit.
 */
export function StatStrip() {
  return (
    <View style={{ marginTop: SECTION_TOP }}>
      <T
        variant="sectionTitle"
        color={fc.ink}
        style={{ paddingHorizontal: MARGIN, height: type.sectionTitle.line }}
      >
        {copy.statistics}
      </T>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: MARGIN, paddingTop: TILES_TOP }}
      >
        {tiles.map((t) => (
          <View
            key={t.id}
            style={{
              width: TILE_WIDTH,
              height: TILE_HEIGHT,
              marginRight: 10,
              borderRadius: radius.control,
              backgroundColor: TONES[t.tone],
              paddingHorizontal: 14,
              justifyContent: 'center',
            }}
          >
            <T variant="tileBig" color={fc.ink} style={{ height: type.tileBig.line }}>
              {t.value}
            </T>
            <T variant="tileSub" color={fc.muted} style={{ height: type.tileSub.line }}>
              {t.label}
            </T>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}
