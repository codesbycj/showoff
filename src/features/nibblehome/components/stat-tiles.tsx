import { View } from 'react-native';
import Svg, { Path, Polyline } from 'react-native-svg';

import { copy, trend, weekAvg, weekDelta, weight, weightDelta, weightPct } from '../data/start';
import { TILES_TOP, TILE_HEIGHT } from '../layout';
import { nb, radius, type } from '../theme';
import { T } from './text';

/** The small glyph in a tile's corner. */
function Corner({ kind }: { kind: 'bolt' | 'cup' }) {
  return (
    <View
      style={{
        width: 28,
        height: 28,
        borderRadius: 9,
        backgroundColor: nb.card,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Svg width={14} height={14} viewBox="0 0 24 24">
        {kind === 'bolt' ? (
          <Path d="M13.4 2.6 5.6 13.4h5.2l-.6 8 7.8-10.8h-5.2Z" fill={nb.ink} />
        ) : (
          <Path
            d="M6 8.4h10.4v5.2a5.2 5.2 0 0 1-5.2 5.2A5.2 5.2 0 0 1 6 13.6Zm10.4 1.4h1.4a2.2 2.2 0 0 1 0 4.4h-1.4"
            stroke={nb.ink}
            strokeWidth={1.7}
            strokeLinejoin="round"
            fill="none"
          />
        )}
      </Svg>
    </View>
  );
}

/** A down arrow in a ring, the shape the reference uses for a fall. */
function Delta({ text }: { text: string }) {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <Svg width={15} height={15} viewBox="0 0 24 24">
        <Path
          d="M12 3.6a8.4 8.4 0 1 1 0 16.8 8.4 8.4 0 0 1 0-16.8Z"
          stroke={nb.ink}
          strokeWidth={1.6}
          fill="none"
        />
        <Path
          d="M12 8v8m0 0-3-3m3 3 3-3"
          stroke={nb.ink}
          strokeWidth={1.6}
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
      </Svg>
      <T variant="tileDelta" color={nb.ink} style={{ marginLeft: 6, height: type.tileDelta.line }}>
        {text}
      </T>
    </View>
  );
}

/** What the body weighs. */
export function WeightTile() {
  return (
    <View
      style={{
        flex: 1,
        height: TILE_HEIGHT,
        borderRadius: radius.tile,
        padding: 14,
        justifyContent: 'space-between',
      }}
    >
{/* STEP 1.17 the grey
      <View
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          borderRadius: radius.tile,
          backgroundColor: nb.well,
        }}
      />
*/}

{/* STEP 1.18 what it is
      <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
        <T variant="tileLabel" color={nb.ink} style={{ flex: 1 }}>
          {copy.weight}
        </T>
        <Corner kind="bolt" />
      </View>
*/}

{/* STEP 1.19 and what the body weighs
      <View>
        <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
          <T variant="tileValue" color={nb.ink} style={{ height: type.tileValue.line }}>
            {weight.toFixed(1)}
          </T>
          <T
            variant="tileUnit"
            color={nb.faint}
            style={{ marginLeft: 4, marginBottom: 3, height: type.tileUnit.line }}
          >
            {copy.kg}
          </T>
        </View>
        <Delta text={`${Math.abs(weightDelta)} Kg (${weightPct}%)`} />
      </View>
*/}
    </View>
  );
}

/**
 * What the day has come to, with the week behind it.
 *
 * The sparkline is a `Polyline` in the Svg's own user space, scaled off the
 * box it is given — not a path copied at one size.
 *
 * **It reads the week's average, not today's.** The reference labels this
 * tile "Today's Calories" and prints a figure the ring two inches above it
 * contradicts; two tiles cannot both be today. The percentage is this week
 * against last.
 *
 * The sparkline is a strip along the foot of the tile rather than a shape
 * floating behind the text — at the reference's size it lands across the
 * figure it is supposed to illustrate.
 */
export function CaloriesTile() {
  const h = 32;

  return (
    <View
      style={{
        flex: 1,
        height: TILE_HEIGHT,
        borderRadius: radius.tile,
        padding: 14,
        overflow: 'hidden',
      }}
    >
{/* STEP 1.21 the grey
      <View
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          borderRadius: radius.tile,
          backgroundColor: nb.well,
        }}
      />
*/}

{/* STEP 1.22 what it is
      <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
        <T variant="tileLabel" color={nb.ink} style={{ flex: 1 }}>
          {copy.weekAvg}
        </T>
        <Corner kind="cup" />
      </View>
*/}

{/* STEP 1.23 the average
      <View style={{ flex: 1, justifyContent: 'flex-end' }}>
        <View style={{ flexDirection: 'row', alignItems: 'flex-end' }}>
          <T variant="tileValue" color={nb.ink} style={{ height: type.tileValue.line }}>
            {weekAvg.toLocaleString('en-US')}
          </T>
          <T
            variant="tileUnit"
            color={nb.faint}
            style={{ marginLeft: 4, marginBottom: 3, height: type.tileUnit.line }}
          >
            {copy.kcal}
          </T>
        </View>
        <Delta text={`${Math.abs(weekDelta)}%`} />
      </View>
*/}

{/* STEP 1.24 and the week behind it
      <View style={{ height: h, marginTop: 8, marginHorizontal: -14, marginBottom: -14 }}>
        <Svg width="100%" height={h} viewBox={`0 0 160 ${h}`} preserveAspectRatio="none">
          <Polyline
            points={trend
              .map((v, i) => `${(i / (trend.length - 1)) * 160},${h - 4 - v * (h - 10)}`)
              .join(' ')}
            stroke={nb.mintDeep}
            strokeWidth={2}
            strokeLinejoin="round"
            fill="none"
          />
        </Svg>
      </View>
*/}
    </View>
  );
}

/** The two of them, side by side. */
export function StatTiles() {
  return (
    <View style={{ flexDirection: 'row', gap: 12, marginTop: TILES_TOP }}>
{/* STEP 1.16 the body
      <WeightTile />
*/}
{/* STEP 1.20 and the week
      <CaloriesTile />
*/}
    </View>
  );
}
