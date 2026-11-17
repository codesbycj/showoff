import { View } from 'react-native';

import { notes } from '../data/cycle';
import { ct } from '../theme';
import { Glyph } from './glyph';
import { T } from './text';

import { NoteProps } from './_cycle-parts-shared';

/** Two small cards. Labels, never prose (R5). */
export function NoteRow({ margin, height, radius, gap }: NoteProps) {
  return (
    <View style={{ marginHorizontal: margin, height, flexDirection: 'row', gap }}>
      {/* STEP 1.25 title
      {notes.map((n) => (
        <View
          key={n.id}
          style={{
            flex: 1,
            borderRadius: radius,
            backgroundColor: ct.white,
            padding: 12,
            justifyContent: 'center',
            gap: 4,
          }}
        >
          <Glyph name={n.glyph} size={16} color={ct.accentDeep} />
          <T variant="noteTitle">{n.title}</T>
          <T variant="noteLine">{n.line}</T>
        </View>
      ))}
      */}
    </View>
  );
}
