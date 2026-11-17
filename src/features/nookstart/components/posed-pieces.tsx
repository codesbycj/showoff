import { Image, View } from 'react-native';

import { pieces } from '../data/start';
import { ct } from '../theme';

type Props = { width: number; height: number; big: number; small: number; margin: number };

/**
 * The three pieces, each posed on its own disc.
 *
 * The piece sits **wholly inside** its disc rather than spilling over the rim.
 * Two boxes that overlap only in part is the shape an accident has, and
 * `audit.js` reports it as COVERED; a photograph on its own coloured ground is
 * layering by design and is ignored (R3). The board lets its furniture
 * overhang; this keeps the composition and loses the straddle.
 *
 * **The disc is drawn and the furniture is photographed** (I4) — the circle is
 * an idea, the chair is a picture of a chair. Each product is a cut-out with
 * an alpha channel, lifted off its backdrop by `cutout.py`, so it overlaps the
 * disc exactly as the board poses it.
 *
 * Each piece is positioned absolutely rather than laid out in flow: the board
 * scatters them, and a row or a column cannot reproduce a scatter. The
 * positions are fractions of the field, so they hold at other widths (I2).
 */
export function PosedPieces({ width, height, big, small, margin }: Props) {
  const tints = { green: ct.green, blue: ct.blue, sand: ct.sand } as const;

  /** left/top as fractions of the field, and which disc size each takes. */
  const spots = [
    { x: 0.04, y: 0.0, size: big },
    { x: 0.5, y: 0.3, size: small },
    // The last piece sits so its foot reaches the bottom of the field: left
    // higher it opened a 51dp hole between the field and the action, which is
    // what `audit.js` reports as GAP (R1).
    { x: 0.08, y: 0.56, size: big },
  ];

  return (
    <View style={{ width, height, marginHorizontal: 0 }}>
      {pieces.map((piece, i) => {
        const spot = spots[Math.min(i, spots.length - 1)];
        const left = margin + (width - margin * 2) * spot.x;
        const top = height * spot.y;

        return (
          <View key={piece.id} style={{ position: 'absolute', left, top }}>
            <View
              style={{
                width: spot.size,
                height: spot.size,
                borderRadius: spot.size / 2,
                backgroundColor: tints[piece.tint],
              }}
            />

            <Image
              source={piece.image}
              style={{
                position: 'absolute',
                left: 0,
                top: 0,
                width: spot.size,
                height: spot.size,
              }}
              resizeMode="contain"
            />
          </View>
        );
      })}
    </View>
  );
}
