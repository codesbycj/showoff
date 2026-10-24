import { useWindowDimensions, View } from 'react-native';

import { tags } from '../data/signin';
import { MARGIN, TAG_GAP, TAG_HEIGHT } from '../layout';
import { PlaceTag } from './place-tag';

/**
 * The throw of places at the foot of the panel.
 *
 * Four lanes, each started at a share of the panel's width so the rows do not
 * line up — that offset is what makes it read as a handful of tags dropped on
 * the panel rather than a list. Tags run off both edges on purpose; the panel
 * clips them, which is what says there are more places than fit.
 *
 * The offsets are a *share* of the measured width rather than a dp figure, so
 * the throw keeps its shape on a narrow phone and on a wide one. The reference
 * is a photograph of one phone at an angle, so there is no grid in it to take
 * dp offsets from even if that were the point.
 *
 * Each lane leans by a fraction of a degree. React Native rotates about an
 * element's centre whatever `transformOrigin` says, which is fine here: the
 * rows are the full width of the panel, so a small rotation about the middle
 * keeps both ends inside the box they were given.
 */
const LEAN = [-1.4, 0.9, -0.7, 1.2];

export function TagCluster() {
  const { width } = useWindowDimensions();
  const panel = width - MARGIN * 2;

  const lanes = [0, 1, 2, 3].map((n) => tags.filter((t) => t.lane === n));

  return (
    <View style={{ justifyContent: 'flex-end' }}>
      {lanes.map((lane, i) => (
        <View
          key={lane[0]?.place ?? i}
          style={{
            flexDirection: 'row',
            height: TAG_HEIGHT,
            marginTop: i === 0 ? 0 : TAG_GAP,
            marginLeft: (lane[0]?.shift ?? 0) * panel - panel * 0.035,
            transform: [{ rotate: `${LEAN[i]}deg` }],
          }}
        >
          {lane.map((t, j) => (
            <View key={t.place} style={{ marginLeft: j === 0 ? 0 : TAG_GAP }}>
              <PlaceTag place={t.place} note={t.note} src={t.src} tone={t.tone} />
            </View>
          ))}
        </View>
      ))}
    </View>
  );
}
