import { Pressable, View } from 'react-native';

import { fields } from '../data/card';
import { ct } from '../theme';
import { T } from './text';

type Props = { margin: number; width: number; height: number; gap: number; radius: number };

/**
 * The form.
 *
 * The halves are paired by **walking the list**, not by hard-coding which two
 * sit on a row: a reveal fills `fields` one entry at a time, and a layout that
 * assumed four rows would break at two (I7).
 *
 * Each field's fill sits on an absolutely-filled child so an emptied field
 * paints nothing in frame one of the reveal (I9).
 */
export function FieldList({ margin, width, height, gap, radius }: Props) {
  const rows: (typeof fields)[] = [];
  for (const field of fields) {
    const last = rows[rows.length - 1];
    if (field.half && last && last.length === 1 && last[0].half) last.push(field);
    else rows.push([field]);
  }

  const halfW = (width - gap) / 2;

  return (
    <View style={{ marginHorizontal: margin, gap }}>
      {rows.map((row) => (
        <View key={row[0].id} style={{ flexDirection: 'row', gap }}>
          {row.map((field) => (
            <Pressable key={field.id} accessibilityRole="button" accessibilityLabel={field.label}>
              <View
                style={{
                  width: field.half ? halfW : width,
                  height,
                  borderRadius: radius,
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  paddingHorizontal: 18,
                }}
              >
                <View
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    backgroundColor: ct.card,
                    borderRadius: radius,
                  }}
                />

                <T variant="filter">{field.label}</T>
                {field.scheme ? <T variant="wordmarkDark">VOLTA</T> : null}
              </View>
            </Pressable>
          ))}
        </View>
      ))}
    </View>
  );
}
