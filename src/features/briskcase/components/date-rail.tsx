import { View } from 'react-native';

import { end, label, progress, start } from '../data/start';
import { RAIL_HEIGHT, RAIL_TOP } from '../layout';
import { br, radius, type } from '../theme';
import { T } from './text';

/**
 * Where today sits between the two dates.
 *
 * The filled run is `flex: progress` against `flex: 1 - progress`, not a
 * percentage width: a percentage needs a definite parent, and the rail sits
 * in a `flex: 1` row that is not one on web.
 *
 * Both labels are formatted from the same `Date`s the share is computed from,
 * so the bar cannot be at 50% between dates it does not name.
 */
export function DateRail() {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: RAIL_TOP }}>
      <T variant="rail" color={br.ink} style={{ height: type.rail.line }}>
        {label(start)}
      </T>

      <View
        style={{
          flex: 1,
          height: RAIL_HEIGHT,
          marginHorizontal: 12,
          borderRadius: radius.pill,
          backgroundColor: br.hairline,
          flexDirection: 'row',
          overflow: 'hidden',
        }}
      >
        <View style={{ flex: progress, backgroundColor: br.lime }} />
        <View style={{ flex: 1 - progress }} />
      </View>

      <T variant="rail" color={br.ink} style={{ height: type.rail.line }}>
        {label(end)}
      </T>
    </View>
  );
}
