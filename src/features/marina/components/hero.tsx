import { Image, View } from 'react-native';

import { RoundButton } from './round-button';
import { T } from './text';
import { BOAT } from '../data/boat';
import { HERO_HEIGHT, MARGIN, ROUND_BUTTON } from '../layout';
import { radius, mr } from '../theme';

/**
 * The photograph at the top, and the chrome that sits on it.
 *
 * The darkening along the top edge is **baked into the asset**, not laid over
 * at runtime — see `tools/bake/marina.py`. A drone shot of bright water gives
 * white type nothing to sit against.
 */
export function Hero({ topInset }: { topInset: number }) {
  return (
    <View style={{ height: HERO_HEIGHT }}>
      {/* STEP 1.03 the boat, from the air
      <Image
        source={BOAT.hero}
        style={{ width: '100%', height: '100%' }}
        resizeMode="cover"
        accessibilityIgnoresInvertColors
        accessible
        accessibilityRole="image"
        accessibilityLabel={`${BOAT.name}, ${BOAT.hull}, seen from the air`}
      />
      */}

      <View
        style={{
          position: 'absolute',
          top: topInset + 6,
          left: MARGIN,
          right: MARGIN,
          flexDirection: 'row',
          alignItems: 'flex-start',
          justifyContent: 'space-between',
        }}
      >
        {/* STEP 1.04 a way back out
        <RoundButton name="back" label="Go back" size={ROUND_BUTTON} />
        */}

        {/* STEP 1.05 its name over the water
        <View style={{ flex: 1, alignItems: 'center', paddingTop: 2 }}>
          <T variant="heroTitle" color={mr.onHero}>
            {BOAT.name}
          </T>
          <T variant="heroSub" color={mr.onHeroDim}>
            {BOAT.hull}
          </T>
        </View>
        */}

        {/* STEP 1.06 and a way to keep it
        <RoundButton
          name="heart"
          label={BOAT.saved ? 'Remove from saved' : 'Save this boat'}
          size={ROUND_BUTTON}
          color={mr.heart}
          filled={BOAT.saved}
        />
        */}
      </View>

      {/* STEP 1.07 which photograph of the set this is
      <View
        style={{
          position: 'absolute',
          bottom: 14,
          left: 0,
          right: 0,
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 6,
        }}
        pointerEvents="none"
      >
        {Array.from({ length: BOAT.gallery.count }, (_, i) => {
          const on = i === BOAT.gallery.active;
          return (
            <View
              key={i}
              style={{
                width: on ? 9 : 6,
                height: on ? 9 : 6,
                borderRadius: radius.circle,
                backgroundColor: on ? mr.onHero : mr.onHeroDim,
              }}
            />
          );
        })}
      </View>
      */}
    </View>
  );
}
