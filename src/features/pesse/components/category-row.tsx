import { Text, View } from 'react-native';

import { type Category } from '../data/analytics';
import { CATEGORIES } from '../data/analytics';
import { LEVEL, R, TYPE, ps } from '../theme';
import { Symbol } from './symbol';

/**
 * The stacked share bar that sits above the category list.
 *
 * Each segment is flexed by its category's own weight, so the bar and the list
 * cannot disagree: change a percentage in the data and both move. A segment
 * with a hard-coded width is how a chart ends up saying 44% beside a bar that
 * is half the row.
 */
export function ShareBar() {
  return (
    <View style={{ flexDirection: 'row', gap: 4, height: 6 }}>
      {CATEGORIES.map((c) => (
        <View
          key={c.key}
          style={{
            flex: c.weight,
            borderRadius: R.full,
            backgroundColor: c.barTone,
          }}
        />
      ))}
    </View>
  );
}

/**
 * One category: an icon well, the name and what is in it, and the amount with
 * its share under it.
 *
 * The flagged category takes a lime well and a lime share — the design marks
 * one row as the thing to look at, and it marks it twice.
 */
export function CategoryRow({ category: c }: { category: Category }) {
  return (
    <View
      style={[
        {
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          backgroundColor: ps.surfaceLowest,
          borderRadius: R.lg,
          padding: 12,
        },
        LEVEL.container,
      ]}
    >
      <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', gap: 12 }}>
        <View
          style={{
            width: 44,
            height: 44,
            borderRadius: R.full,
            backgroundColor: c.flagged ? ps.lime : ps.surfaceContainer,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Symbol name={c.icon} size={22} color={c.flagged ? ps.onLime : ps.onSurface} />
        </View>

        <View style={{ flex: 1, minWidth: 0 }}>
          <Text style={[TYPE.labelLg, { color: ps.onSurface }]} numberOfLines={1}>
            {c.title}
          </Text>
          <Text style={[TYPE.bodySm, { color: ps.secondary }]} numberOfLines={1}>
            {c.subtitle}
          </Text>
        </View>
      </View>

      <View style={{ alignItems: 'flex-end', paddingLeft: 8 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 4 }}>
          {c.flagged ? (
            <View style={{ width: 6, height: 6, borderRadius: 3, backgroundColor: ps.lime }} />
          ) : null}
          <Text style={[TYPE.labelLg, { color: ps.onSurface }]}>{c.amount}</Text>
        </View>
        <Text style={[TYPE.bodySm, { color: c.flagged ? ps.olive : ps.secondary, marginTop: 2 }]}>
          {c.share}
        </Text>
      </View>
    </View>
  );
}
