import { Image, Pressable, ScrollView, View } from 'react-native';
import Svg, { Path, Rect } from 'react-native-svg';

import { copy, openRow, rows } from '../data/start';
import { COLS_TOP, FACE, ROW_HEIGHT } from '../layout';
import { ne, radius, type } from '../theme';
import { CoinMark } from './coin-mark';
import { T } from './text';

/** What the three columns are. */
export function ColumnHead() {
  return (
    // The same 10dp the rows carry, so the Amount heading sits over the
    // figures rather than 10dp to the right of them.
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: COLS_TOP,
        paddingHorizontal: 10,
      }}
    >
      <T variant="col" color={ne.faint} style={{ width: 54, height: type.col.line }}>
        {copy.colInfo}
      </T>
      <T variant="col" color={ne.faint} style={{ flex: 1, height: type.col.line }}>
        {copy.colUser}
      </T>
      <T variant="col" color={ne.faint} style={{ textAlign: 'right', height: type.col.line }}>
        {copy.colAmount}
      </T>
    </View>
  );
}

/**
 * One movement.
 *
 * **A hidden amount is hidden, not blurred.** The reference blurs its
 * figures, and a blur of a short string still shows how long the string is.
 * Here the figure is simply not in the tree: there is a padlock and a
 * redacted bar, and nothing to recover from either.
 */
function Row({ i, onPress }: { i: number; onPress?: (id: string) => void }) {
  const r = rows[i];
  const open = r.id === openRow;

  return (
    <Pressable
      onPress={() => onPress?.(r.id)}
      accessibilityRole="button"
      accessibilityLabel={open ? `${r.user}, ${r.amount}` : `${r.user}, amount hidden`}
    >
      <View
        style={{
          height: ROW_HEIGHT,
          marginBottom: 6,
          paddingHorizontal: 10,
          borderRadius: radius.card,
          backgroundColor: open ? ne.green : 'transparent',
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
{/* STEP 1.11 which coin
        <CoinMark id={r.coin} />
*/}

{/* STEP 1.12 who it was
        <Image
          source={r.photo}
          style={{
            width: FACE,
            height: FACE,
            marginLeft: -10,
            borderRadius: radius.pill,
            borderWidth: 2,
            borderColor: open ? ne.green : ne.canvas,
          }}
        />
*/}

{/* STEP 1.13 their name
        <T
          variant="rowUser"
          color={ne.ink}
          style={{ flex: 1, marginLeft: 14, height: type.rowUser.line }}
        >
          {r.user}
        </T>
*/}

{/* STEP 1.14 and how much, if it is open
        {open ? (
          <T variant="rowAmount" color={ne.greenInk} style={{ height: type.rowAmount.line }}>
            {r.amount}
          </T>
        ) : (
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            <Svg width={15} height={15} viewBox="0 0 24 24">
              <Rect
                x={5.4}
                y={10.4}
                width={13.2}
                height={9.2}
                rx={2.6}
                stroke={ne.faint}
                strokeWidth={1.8}
                fill="none"
              />
              <Path
                d="M8.6 10.4V8a3.4 3.4 0 0 1 6.8 0v2.4"
                stroke={ne.faint}
                strokeWidth={1.8}
                fill="none"
              />
            </Svg>
            <View
              style={{
                width: 62,
                height: 9,
                marginLeft: 8,
                borderRadius: radius.pill,
                backgroundColor: ne.well,
              }}
            />
          </View>
        )}
*/}
      </View>
    </Pressable>
  );
}

/**
 * Everything that has moved.
 *
 * The list scrolls under the dock, so its last row runs off the bottom edge
 * rather than stopping short of it — which is what the reference crops.
 */
export function ActionList({ onPress }: { onPress?: (id: string) => void }) {
  return (
    <ScrollView showsVerticalScrollIndicator={false} style={{ flex: 1, marginTop: 10 }}>
{/* STEP 1.10 the first
      <Row i={0} onPress={onPress} />
*/}
{/* STEP 1.15 the one that is open
      <Row i={1} onPress={onPress} />
*/}
{/* STEP 1.16 another
      <Row i={2} onPress={onPress} />
*/}
{/* STEP 1.17 another
      <Row i={3} onPress={onPress} />
*/}
{/* STEP 1.18 two more
      <Row i={4} onPress={onPress} />
      <Row i={5} onPress={onPress} />
*/}
{/* STEP 1.19 and the last two
      <Row i={6} onPress={onPress} />
      <Row i={7} onPress={onPress} />
*/}
    </ScrollView>
  );
}
