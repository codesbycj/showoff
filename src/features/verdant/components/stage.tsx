import { View } from 'react-native';

import { useStage } from '../layout';
import { Pedestal, pedestalBox } from './pedestal';
import { Wallet, walletBox } from './wallet';

/**
 * The hero: the wallet standing on its lit disc.
 *
 * The two are composed here rather than nested inside one another so each can
 * be revealed on its own — the disc arrives, the wallet lands on it.
 *
 * The wallet is sunk a little below the disc's top face rather than balanced
 * on its rim. An object resting on a surface overlaps the near edge of that
 * surface; set exactly on the rim it reads as hovering, which is the one tell
 * that gives away a drawn stage.
 *
 * It also stands left of the disc's centre and leans a few degrees out of the
 * light, which comes from the lower right in `backdrop.tsx`. React Native
 * rotates about an element's centre whatever `transformOrigin` says, and that
 * is what is wanted here: the wallet tips on its own axis rather than swinging
 * off the disc.
 */
export function Stage() {
  const { wallet, pedestal } = useStage();

  const disc = pedestalBox(pedestal);
  const box = walletBox(wallet);

  /** How far the wallet's base sinks past the disc's top face. */
  const sink = wallet * 0.07;
  /** The wallet's top is the stage's top, so the stage is as tall as both. */
  const height = box.height + (disc.height - disc.faceCy - sink);

  return (
    <View style={{ width: disc.width, height }}>
      {/* STEP 1.22 the disc it stands on
      <View style={{ position: 'absolute', left: 0, bottom: 0 }}>
        <Pedestal width={pedestal} contact={-0.05} />
      </View>
      */}

      {/* STEP 1.27 and the wallet on top of it
      <View
        style={{
          position: 'absolute',
          top: 0,
          left: (disc.width - box.width) / 2 - wallet * 0.05,
          // MISTAKE 1.28 the wallet came in sunk into the disc
          marginTop: 52,
          transform: [{ rotate: '-4deg' }],
        }}
      >
        <Wallet width={wallet} />
      </View>
      */}
    </View>
  );
}
