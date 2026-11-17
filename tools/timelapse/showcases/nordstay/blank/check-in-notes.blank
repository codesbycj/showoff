import { View } from 'react-native';

import { notes } from '../data/stay';
import { ct } from '../theme';
import { Glyph } from './glyph';
import { T } from './text';

type Props = { margin: number; rowH: number; gap: number };

/** How guests get in, and what other guests made of it. */
export function CheckInNotes({ margin, rowH, gap }: Props) {
  return (
    <View
      style={{
        marginHorizontal: margin,
        borderTopWidth: 1,
        borderTopColor: ct.line,
        paddingTop: gap,
        gap,
      }}
    >
      {notes.map((note) => (
        <View
          key={note.id}
          style={{ height: rowH, flexDirection: 'row', alignItems: 'center', gap: 13 }}
        >
          <Glyph name={note.glyph} size={23} color={ct.ink} strokeWidth={1.6} />
          <View style={{ flex: 1 }}>
            <T variant="rowTitle">{note.title}</T>
            <T variant="meta" numberOfLines={1}>
              {note.body}
            </T>
          </View>
        </View>
      ))}
    </View>
  );
}
