import { useState } from 'react';
import { Image, Pressable, View } from 'react-native';

import { bike } from '../data/bikes';
import { GAUGE_HEIGHT, GAUGE_WIDTH, MARGIN, STAGE_MIN } from '../layout';
import { radius, sp, type } from '../theme';
import { Glyph } from './glyph';
import { T } from './text';

/**
 * The bike itself, with its charge beside it.
 *
 * The photograph is a photograph: a bicycle is a large specific subject and
 * out of drawing range. The reference's own hero carries two component
 * makers' wordmarks across the frame and the tyre, which is exactly what this
 * one was picked to avoid — see `assets/images/spokebike/CREDITS.md`.
 *
 * The gauge fills from the bottom by `flex`, not by a percentage height: a
 * percentage resolves against a parent with no definite height here and the
 * fill would collapse to nothing. `charge` out of 100 against `100 - charge`
 * cannot.
 */
export function BikeStage() {
  const [box, setBox] = useState({ width: 0, height: 0 });

  return (
    <View style={{ flex: 1, minHeight: STAGE_MIN }}>
      {/*
        The bike sits ON the page, letterboxed, rather than filling the stage.
        `cover` crops to the middle of the frame, which on a photograph of a
        bike rack is a wall and a saddle; `contain` shows the whole bicycle and
        the grey either side of it is the page's own colour, which is what the
        reference has. It needs a *numeric* size to paint at all — an Image
        sized only by absolute insets renders nothing on native, silently — so
        the box measures itself and hands the number down.
      */}
      <View
        style={{ flex: 1, marginRight: GAUGE_WIDTH + 6 }}
        onLayout={(e) => setBox(e.nativeEvent.layout)}
      >
        {box.width > 0 ? (
          <Image
            source={bike.src}
            resizeMode="contain"
            style={{ width: box.width + MARGIN, height: box.height, marginLeft: -MARGIN }}
          />
        ) : null}
      </View>

      <View style={{ position: 'absolute', right: 0, top: 0, alignItems: 'center' }}>
        <Pressable accessibilityRole="button" accessibilityLabel="Charging">
          <View
            style={{
              width: GAUGE_WIDTH,
              height: GAUGE_WIDTH,
              borderRadius: radius.control,
              backgroundColor: sp.card,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Glyph name="bolt" size={18} tint={sp.ink} />
          </View>
        </Pressable>

        <View
          style={{
            width: GAUGE_WIDTH,
            height: GAUGE_HEIGHT,
            marginTop: 10,
            borderRadius: radius.pill,
            backgroundColor: sp.card,
            overflow: 'hidden',
            alignItems: 'center',
          }}
        >
          <T variant="gauge" color={sp.ink} style={{ marginTop: 9, height: type.gauge.line }}>
            {bike.charge + '%'}
          </T>
          <View style={{ flex: 1, width: '100%', justifyContent: 'flex-end' }}>
            <View style={{ flex: 100 - bike.charge }} />
            <View
              style={{ flex: bike.charge, backgroundColor: sp.lime, borderRadius: radius.pill }}
            />
          </View>
        </View>
      </View>

      <View
        style={{
          position: 'absolute',
          right: GAUGE_WIDTH + 14,
          bottom: 0,
          flexDirection: 'row',
        }}
      >
        {(['plus', 'minus'] as const).map((n, i) => (
          <Pressable
            key={n}
            accessibilityRole="button"
            accessibilityLabel={n === 'plus' ? 'Zoom in' : 'Zoom out'}
          >
            <View
              style={{
                width: 42,
                height: 42,
                marginLeft: i === 0 ? 0 : 10,
                borderRadius: radius.control,
                backgroundColor: sp.card,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Glyph name={n} size={17} tint={sp.ink} />
            </View>
          </Pressable>
        ))}
      </View>
    </View>
  );
}
