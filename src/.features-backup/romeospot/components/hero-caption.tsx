import { Pressable, View } from 'react-native';

import { spot } from '../data/spot';
import { ct } from '../theme';
import { Glyph, type GlyphName } from './glyph';
import { T } from './text';

/** One of the two glass pills under the restaurant name. */
function Pill({ label, icon, solid }: { label: string; icon: GlyphName; solid?: boolean }) {
  return (
    <Pressable
      accessibilityRole="button"
      accessibilityLabel={label}
      hitSlop={{ top: 6, bottom: 6, left: 4, right: 4 }}
    >
      {({ pressed }) => (
        <View
          style={{
            height: 34,
            paddingHorizontal: 14,
            borderRadius: 17,
            flexDirection: 'row',
            alignItems: 'center',
            gap: 6,
            backgroundColor: solid ? ct.accent : 'rgba(18,20,24,0.55)',
            borderWidth: solid ? 0 : 1,
            borderColor: 'rgba(255,255,255,0.22)',
            opacity: pressed ? 0.75 : 1,
          }}
        >
          <Glyph name={icon} size={14} color={ct.onPhoto} strokeWidth={2} />
          <T variant="pill">{label}</T>
        </View>
      )}
    </Pressable>
  );
}

/**
 * Name, status and the two actions, sitting on the foot of the photograph.
 *
 * This is the screen's dominant element (R8) — the largest type on screen, over
 * the largest block. Everything below it is deliberately subordinate.
 *
 * The pills are 34dp tall against R7's 44: they are a secondary pair inside a
 * photograph and the reference draws them smaller still. `hitSlop` carries them
 * to 46. Named in the handover.
 */
export function HeroCaption({ margin }: { margin: number }) {
  return (
    <View style={{ paddingHorizontal: margin, gap: 10 }}>
      <T variant="heroTitle">
        {spot.name}{' '}
        <T variant="heroTitle" style={{ color: ct.onPhotoDim }}>
          {spot.area}
        </T>
      </T>

      <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
          <View style={{ width: 7, height: 7, borderRadius: 4, backgroundColor: ct.openDot }} />
          <T variant="heroMeta">{spot.openLabel}</T>
        </View>
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
          <Glyph name="star" size={13} color={ct.gold} />
          <T variant="heroMeta">
            {spot.rating} ({spot.reviews})
          </T>
        </View>
      </View>

      <View style={{ flexDirection: 'row', gap: 10, marginTop: 2 }}>
        <Pill label={spot.pills[0]} icon="info" />
        <Pill label={spot.pills[1]} icon="pin" solid />
      </View>
    </View>
  );
}
