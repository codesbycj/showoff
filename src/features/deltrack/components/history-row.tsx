import { Pressable, Text, View } from 'react-native';

import { ParcelDisc } from './parcel-disc';
import { LEVEL, R, SP, TYPE, dt } from '../theme';

/**
 * One line of shipping history.
 *
 * A 46dp white card at the page margin with 10dp of padding, measured at
 * y 628..674 with the next one starting at 686. On white paper it is only its
 * shadow that shows, which is why the gap between two rows reads as a grey
 * band in the reference rather than as an edge.
 *
 * `dimmed` is the second row's state: the dock floats over the foot of the
 * list, and the reference fades the whole row out under it rather than cutting
 * it off. One opacity on the row reproduces every part of that at once — the
 * disc's near-black lands on the grey the reference measures, and the amber
 * tick on its pale version.
 */
export function HistoryRow({
  id,
  note,
  status,
  date,
  dimmed,
  onPress,
}: {
  id: string;
  note: string;
  status: string;
  date: string;
  dimmed?: boolean;
  onPress?: () => void;
}) {
  return (
    <Pressable onPress={onPress} accessibilityRole="button" accessibilityLabel={`${id}, ${status}`}>
      <View
        style={[
          {
            height: 46,
            marginHorizontal: SP.margin,
            borderRadius: R.row,
            backgroundColor: dt.surface,
            flexDirection: 'row',
            alignItems: 'center',
            paddingHorizontal: 10,
            opacity: dimmed ? 0.55 : 1,
          },
          LEVEL.card,
        ]}
      >
        <ParcelDisc size={32} />

        <View style={{ flex: 1, marginLeft: 11 }}>
          <Text style={[TYPE.rowId, { color: dt.ink }]}>{id}</Text>
          <Text style={[TYPE.bodySm, { fontSize: 10.25, color: dt.inkSoft, marginTop: 3 }]}>
            {note}
          </Text>
        </View>

        <View style={{ alignItems: 'flex-end' }}>
          <Text style={[TYPE.valueSoft, { fontSize: 12, color: dt.amber }]}>{status}</Text>
          <Text style={[TYPE.valueSoft, { color: dt.inkSoft, marginTop: 3 }]}>{date}</Text>
        </View>
      </View>
    </Pressable>
  );
}
