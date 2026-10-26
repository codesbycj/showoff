import { View } from 'react-native';
import Svg, { Circle } from 'react-native-svg';

import { burnShare, burned, copy, waterDays, waterTarget } from '../data/start';
import { RING, TILES_TOP, TILE_HEIGHT } from '../layout';
import { nb, radius, type } from '../theme';
import { T } from './text';

/**
 * Calories burned, as a ring.
 *
 * The arc is `burnShare` — burned over the day's target — so it cannot drift
 * away from the figure in the middle of it. It is rotated on the Circle
 * itself rather than on a wrapping `<G origin=…>`, which emits an invalid DOM
 * prop on web.
 */
export function CaloriesTile() {
  const r = (RING - 13) / 2;
  const c = 2 * Math.PI * r;

  return (
    <View
      style={{
        flex: 1,
        height: TILE_HEIGHT,
        borderRadius: radius.tile,
        padding: 14,
      }}
    >
{/* STEP 1.14 the grey
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

{/* STEP 1.15 what it is
      <T variant="tileName" color={nb.ink} style={{ height: type.tileName.line }}>
        {copy.calories}
      </T>
*/}

{/* STEP 1.16 and the ring
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        <Svg width={RING} height={RING} style={{ position: 'absolute' }}>
          <Circle cx={RING / 2} cy={RING / 2} r={r} stroke={nb.card} strokeWidth={11} fill="none" />
          <Circle
            cx={RING / 2}
            cy={RING / 2}
            r={r}
            stroke={nb.coral}
            strokeWidth={11}
            strokeLinecap="round"
            fill="none"
            strokeDasharray={`${c * burnShare} ${c}`}
            transform={`rotate(135 ${RING / 2} ${RING / 2})`}
          />
        </Svg>

        <T variant="ringBig" color={nb.ink} style={{ height: type.ringBig.line }}>
          {burned.toLocaleString('en-US')}
        </T>
        <T variant="ringLabel" color={nb.muted} style={{ height: type.ringLabel.line }}>
          {copy.kcal}
        </T>
      </View>
*/}
    </View>
  );
}

/**
 * Water, as seven columns.
 *
 * Each column is that day's glasses over the target, drawn as a rounded bar
 * growing from the foot — the reference's version is seven identical white
 * lines with a letter behind them, which carries no reading at all.
 */
/** The tallest a column can be: the tile less its padding, title and letters. */
const BAR_MAX = TILE_HEIGHT - 28 - 18 - 8 - 19;

export function WaterTile() {
  return (
    <View
      style={{
        flex: 1,
        height: TILE_HEIGHT,
        borderRadius: radius.tile,
        padding: 14,
      }}
    >
{/* STEP 1.18 the blue
      <View
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          borderRadius: radius.tile,
          backgroundColor: nb.blue,
        }}
      />
*/}

{/* STEP 1.19 what it is
      <T variant="tileName" color={nb.ink} style={{ height: type.tileName.line }}>
        {copy.water}
      </T>
*/}

      {/*
        The bar heights are numbers, not percentages. A percentage height
        needs a definite parent, and a column inside a row with
        `alignItems: 'flex-end'` is sized by its own content — the percentage
        resolves against nothing and the row inflates instead.
      */}
{/* STEP 1.20 and the week
      <View style={{ flex: 1, flexDirection: 'row', alignItems: 'flex-end', marginTop: 8, gap: 5 }}>
        {waterDays.map((d) => (
          <View key={d.letter + d.glasses} style={{ flex: 1, alignItems: 'center' }}>
            <View
              style={{
                width: 6,
                height: Math.round((d.glasses / waterTarget) * BAR_MAX),
                borderRadius: 3,
                backgroundColor: nb.card,
              }}
            />
            <T
              variant="waterDay"
              color={nb.blueInk}
              style={{ marginTop: 6, height: type.waterDay.line }}
            >
              {d.letter}
            </T>
          </View>
        ))}
      </View>
*/}
    </View>
  );
}

/** The two boards, side by side. */
export function BoardTiles() {
  return (
    <View style={{ flexDirection: 'row', gap: 12, marginTop: TILES_TOP }}>
{/* STEP 1.13 what was burned
      <CaloriesTile />
*/}
{/* STEP 1.17 and what was drunk
      <WaterTile />
*/}
    </View>
  );
}
