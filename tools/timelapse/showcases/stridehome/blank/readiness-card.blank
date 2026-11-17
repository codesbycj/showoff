import { View } from 'react-native';

import { metrics, readiness, tiles } from '../data/home';
import { ct } from '../theme';
import { Glyph } from './glyph';
import { ReadinessRing } from './readiness-ring';
import { T } from './text';

type Props = { margin: number; height: number; radius: number; ring: number };

/**
 * How recovered the athlete is.
 *
 * The card's fill is an absolutely-filled child so that an emptied card paints
 * nothing in frame one (§5.5), and each metric's delta carries its own arrow
 * so the direction survives a greyscale render rather than relying on colour.
 */
export function ReadinessCard({ margin, height, radius, ring }: Props) {
  return (
    <View style={{ marginHorizontal: margin, height }}>
      {/* STEP 1.05 view
      <View
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          borderRadius: radius,
          backgroundColor: ct.card,
          borderWidth: 1,
          borderColor: ct.line,
        }}
      />
      */}

      {/* STEP 1.06 label
      <View style={{ flex: 1, padding: 16 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <T variant="label" style={{ flex: 1 }}>
            {readiness.label}
          </T>
          <View
            style={{
              height: 24,
              paddingHorizontal: 11,
              borderRadius: 12,
              backgroundColor: ct.limeSoft,
              flexDirection: 'row',
              alignItems: 'center',
              gap: 6,
            }}
          >
            <View style={{ width: 6, height: 6, borderRadius: 3, backgroundColor: ct.lime }} />
            <T variant="chipOff" style={{ color: ct.lime }}>
              {readiness.state}
            </T>
          </View>
        </View>

        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 16, marginTop: 10 }}>
          <ReadinessRing size={ring} />

          <View style={{ flex: 1 }}>
            {metrics.map((metric, i) => (
              <View
                key={metric.id}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  paddingVertical: 9,
                  borderTopWidth: i === 0 ? 0 : 1,
                  borderTopColor: ct.line,
                  gap: 8,
                }}
              >
                <T variant="label" style={{ flex: 1 }}>
                  {metric.label}
                </T>
                <T variant="metric">{metric.value}</T>
                <T variant="unit">{metric.unit}</T>

                {metric.delta !== undefined ? (
                  <View
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                      gap: 3,
                      paddingHorizontal: 6,
                      height: 18,
                      borderRadius: 9,
                      backgroundColor: metric.delta >= 0 ? ct.limeSoft : ct.violetSoft,
                    }}
                  >
                    <Glyph
                      name={metric.delta >= 0 ? 'up' : 'down'}
                      size={9}
                      color={metric.delta >= 0 ? ct.lime : ct.down}
                    />
                    <T variant="delta" style={{ color: metric.delta >= 0 ? ct.lime : ct.down }}>
                      {Math.abs(metric.delta)}
                    </T>
                  </View>
                ) : null}

                {metric.share ? (
                  <View
                    style={{
                      paddingHorizontal: 7,
                      height: 18,
                      borderRadius: 9,
                      backgroundColor: ct.cardSoft,
                      justifyContent: 'center',
                    }}
                  >
                    <T variant="delta" style={{ color: ct.muted }}>
                      {metric.share}
                    </T>
                  </View>
                ) : null}
              </View>
            ))}
          </View>
        </View>

        <View style={{ flexDirection: 'row', gap: 1, marginTop: 12 }}>
          {tiles.map((tile, i) => (
            <View
              key={tile.id}
              style={{
                flex: 1,
                height: 62,
                alignItems: 'center',
                justifyContent: 'center',
                backgroundColor: ct.page,
                borderTopLeftRadius: i === 0 ? 14 : 0,
                borderBottomLeftRadius: i === 0 ? 14 : 0,
                borderTopRightRadius: i === tiles.length - 1 ? 14 : 0,
                borderBottomRightRadius: i === tiles.length - 1 ? 14 : 0,
              }}
            >
              <View style={{ flexDirection: 'row', alignItems: 'flex-end', gap: 1 }}>
                <T variant="tile">{tile.value}</T>
                <T variant="tileLabel">{tile.unit}</T>
              </View>
              <T variant="tileLabel">{tile.label}</T>
            </View>
          ))}
        </View>
      </View>
      */}
    </View>
  );
}
