import { LinearGradient } from 'expo-linear-gradient';
import { Pressable, Text, View } from 'react-native';
import Svg, { Path } from 'react-native-svg';

import { Archive, Plus } from './icons';
import { TransitProgress } from './transit-progress';
import { FONT, LEVEL, R, TYPE, dt } from '../theme';

/**
 * The in-transit card: the dark panel inside the hero.
 *
 * Its fill is a left-to-right ramp from slate to near-black navy, tipped far
 * enough down that the bottom corners are a shade darker than the top ones —
 * which is what the reference's four corners measure.
 *
 * 20dp of padding across, but 8 at the top and 5 at the foot: the id row
 * starts 12dp under the card's edge and the dates finish 12 above it, and a
 * glyph box and a line box each carry some of that themselves.
 */

/** The bite out of the card's foot that the page dots sit under. */
const NOTCH = { width: 67, height: 8 };

/**
 * The archive glyph's ink sits 2dp inside its box, so it is pulled back by
 * that much to stand flush with the card's 20dp pad.
 */
const GLYPH_NUDGE = -2;

function Notch() {
  return (
    <View
      style={{
        position: 'absolute',
        bottom: 0,
        left: '50%',
        marginLeft: -NOTCH.width / 2,
      }}
      pointerEvents="none"
    >
      <Svg width={NOTCH.width} height={NOTCH.height} viewBox="0 0 67 8">
        {/* 49dp across at the top, 67 at the foot, with soft shoulders — the
            reference's notch widens as it comes down. */}
        <Path
          d="M0 8c4 0 6-1 9-4.5C11 1 13 0 16 0h35c3 0 5 1 7 3.5C61 7 63 8 67 8Z"
          fill={dt.heroFoot}
        />
      </Svg>
    </View>
  );
}

export function TransitCard({
  id,
  status,
  done,
  at,
  originLabel,
  originDate,
  destLabel,
  destDate,
  onAdd,
  onPress,
}: {
  id: string;
  status: string;
  done: readonly number[];
  at: number;
  originLabel: string;
  originDate: string;
  destLabel: string;
  destDate: string;
  onAdd?: () => void;
  onPress?: () => void;
}) {
  return (
    // The add button inside carries the button role; this wrapper must not,
    // or the static web build nests two <button> elements and the parser
    // pulls the inner one out of the card. See shipment-card.tsx.
    <Pressable onPress={onPress} accessibilityLabel={`${id} ${status}`}>
      <LinearGradient
        // Six stops rather than a straight ramp: the reference's fill is
        // measurably convex, holding slate across the first third and
        // bottoming out by 92% of the way across. The axis is tipped only
        // slightly, because its bottom corners are barely darker than its
        // top ones.
        colors={['#848A9B', '#676C7E', '#4C5268', '#252C49', '#020B2D', '#000828']}
        locations={[0, 0.2, 0.39, 0.67, 0.92, 1]}
        start={{ x: 0, y: 0.2 }}
        end={{ x: 1, y: 0.42 }}
        style={[
          {
            borderRadius: R.card,
            paddingHorizontal: 20,
            paddingTop: 8,
            paddingBottom: 8,
          },
          LEVEL.transit,
        ]}
      >
{/* STEP 1.13 the parcel's number
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Archive size={23} color={dt.onDark} style={{ marginLeft: GLYPH_NUDGE }} />
          <Text style={[TYPE.valueSoft, { color: dt.onDark, marginLeft: 7 }]}>{id}</Text>
        </View>
*/}

{/* STEP 1.14 say what is happening to it
        <Text
          style={{
            fontFamily: FONT.medium,
            fontSize: 20.5,
            lineHeight: 26,
            color: dt.onDark,
            marginTop: 3,
            // MISTAKE 1.15 the status came in at label size
            fontSize: 13,
          }}
        >
          {status}
        </Text>
*/}

{/* STEP 1.16 how far along it is
        <View style={{ marginTop: 5 }}>
          <TransitProgress done={done} at={at} />
        </View>
*/}

{/* STEP 1.17 when it left, and when it lands
        <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 10 }}>
          <View>
            <Text style={[TYPE.micro, { color: dt.onDarkMuted }]}>{originLabel}</Text>
            <Text
              style={{
                fontFamily: FONT.medium,
                fontSize: 10.75,
                lineHeight: 14,
                color: '#E6E9F2',
                marginTop: 1,
              }}
            >
              {originDate}
            </Text>
          </View>

          <View style={{ alignItems: 'flex-end' }}>
            <Text style={[TYPE.micro, { color: dt.onDarkMuted }]}>{destLabel}</Text>
            <Text
              style={{
                fontFamily: FONT.medium,
                fontSize: 10.75,
                lineHeight: 14,
                color: '#E6E9F2',
                marginTop: 1,
              }}
            >
              {destDate}
            </Text>
          </View>
        </View>
*/}

{/* STEP 1.18 the bite the dots sit in
        <Notch />
*/}
      </LinearGradient>

      {/* The add button straddles the id row's right end, 22dp in from both
          the card's top and its side rather than sitting on the 20dp pad. */}
{/* STEP 1.19 track another one
      <Pressable
        onPress={onAdd}
        accessibilityRole="button"
        accessibilityLabel="Track another package"
        style={{ position: 'absolute', top: 22, right: 22 }}
      >
        <View
          style={{
            width: 21,
            height: 21,
            borderRadius: 10.5,
            backgroundColor: dt.surface,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Plus size={13} color={dt.blue} />
        </View>
      </Pressable>
*/}
    </Pressable>
  );
}
