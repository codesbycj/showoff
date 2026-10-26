import { View } from 'react-native';

import { gauges } from '../data/start';
import { GAUGES_TOP, GAUGE_MIN, KNOB } from '../layout';
import { nb, radius, type } from '../theme';
import { T } from './text';

/**
 * One capsule.
 *
 * The mint fills from the foot to `share`, and the white knob rides on top of
 * it carrying the figure — so the height of the fill *is* the number in the
 * knob. The reference fills all five to roughly the same height over five
 * unrelated numbers, which is a row of gauges that cannot be compared.
 *
 * The fill is two flex boxes rather than a percentage: a percentage height
 * needs a definite parent, and a `flex: 1` column inside a row is not one.
 */
function Gauge({ i }: { i: number }) {
  const g = gauges[i];

  return (
    <View style={{ flex: 1, alignItems: 'center' }}>
      <View
        style={{
          flex: 1,
          alignSelf: 'stretch',
          borderRadius: radius.gauge,
          backgroundColor: nb.well,
          // MISTAKE 1.39 the capsules came in squared off at the foot
          borderBottomLeftRadius: 0,
          overflow: 'hidden',
          justifyContent: 'flex-end',
        }}
      >
        <View style={{ flex: 1 - g.share }} />
        <View style={{ flex: g.share, backgroundColor: nb.mint, alignItems: 'center' }}>
          <View
            style={{
              width: KNOB,
              height: KNOB,
              marginTop: -KNOB / 2,
              borderRadius: radius.pill,
              backgroundColor: nb.card,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <T variant="gaugeValue" color={nb.ink} style={{ height: type.gaugeValue.line }}>
              {g.value}
            </T>
          </View>
        </View>
      </View>

      <T variant="gaugeName" color={nb.muted} style={{ marginTop: 8, height: type.gaugeName.line }}>
        {g.name}
      </T>
    </View>
  );
}

/** The five of them. */
export function GaugeRow() {
  return (
    <View
      style={{
        flex: 1,
        minHeight: GAUGE_MIN,
        flexDirection: 'row',
        gap: 10,
        marginTop: GAUGES_TOP,
      }}
    >
{/* STEP 1.23 calories
      <Gauge i={0} />
*/}
{/* STEP 1.24 protein
      <Gauge i={1} />
*/}
{/* STEP 1.25 carbs
      <Gauge i={2} />
*/}
{/* STEP 1.26 fat
      <Gauge i={3} />
*/}
{/* STEP 1.27 and the whole day
      <Gauge i={4} />
*/}
    </View>
  );
}
