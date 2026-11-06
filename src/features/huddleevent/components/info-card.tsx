import { View } from 'react-native';

import { INFO_ROW } from '../layout';
import { ct, radius, type } from '../theme';
import { copy } from '../data/event';
import { Glyph, type GlyphName } from './glyph';
import { T } from './text';

/**
 * When and where, as two rows of one card.
 *
 * **The reference's icons are full-colour emoji.** Emoji are the one glyph
 * source that renders differently on Windows, Android and iOS and cannot be
 * checked on the web harness, so both are drawn.
 *
 * The row is as tall as its two text lines plus its padding, not a round
 * number — a row sized by eye is where gaps start drifting down a screen.
 */
function Row({ icon, title, note }: { icon: GlyphName; title: string; note: string }) {
  return (
    <View style={{ flexDirection: 'row', paddingVertical: 14, alignItems: 'flex-start' }}>
      <View style={{ width: 28, alignItems: 'center', paddingTop: 1 }}>
        <Glyph name={icon} size={21} tint={ct.ink} strokeWidth={1.7} />
      </View>
      <View style={{ flex: 1, marginLeft: 10 }}>
        <T variant="rowTitle" color={ct.ink} style={{ height: type.rowTitle.line }}>
          {title}
        </T>
        <T variant="rowNote" color={ct.muted} style={{ marginTop: 2 }}>
          {note}
        </T>
      </View>
    </View>
  );
}

export function InfoCard() {
  return (
    <View
      style={{
        borderRadius: radius.card,
        backgroundColor: ct.card,
        paddingHorizontal: 14,
        minHeight: INFO_ROW * 2,
      }}
    >
      <Row icon="calendar" title={copy.when} note={copy.whenNote} />
      <View style={{ height: 1, backgroundColor: ct.hairline }} />
      <Row icon="pin" title={copy.where} note={copy.whereNote} />
    </View>
  );
}
