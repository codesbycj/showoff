import { useId } from 'react';
import { Pressable, View } from 'react-native';
import Svg, { Circle, Defs, Ellipse, LinearGradient, Path, Rect, Stop } from 'react-native-svg';

import { ct, type } from '../theme';
import { copy } from '../data/home';
import { T } from './text';

/**
 * The reward, drawn.
 *
 * **The reference's illustration is a rendered 3D wallet spilling notes and
 * coins.** That cannot be reproduced and must not be traced badly, so the
 * rules give two routes: stand in free-licensed stock, or rebuild the *idea*
 * in-app. A photograph of a wallet on a flat green card would read as a
 * sticker, so this is the idea — a note and two coins, drawn as the shapes
 * they are. It expresses "there is money waiting" without pretending to be
 * someone else's render.
 */
function Reward({ size = 86 }: { size?: number }) {
  const id = `fernCoin-${useId()}`;
  return (
    <Svg width={size} height={size} viewBox="0 0 100 100">
      <Defs>
        <LinearGradient id={id} x1="0" y1="0" x2="1" y2="1">
          <Stop offset="0" stopColor="#FFD873" />
          <Stop offset="1" stopColor="#E0A32B" />
        </LinearGradient>
      </Defs>

      <Rect x="14" y="26" width="62" height="38" rx="7" fill="#2C6B35" />
      <Rect x="20" y="32" width="50" height="26" rx="4" fill="#4E9E52" />
      <Circle cx="45" cy="45" r="9" fill="#BFE8A6" />

      <Circle cx="68" cy="62" r="18" fill={`url(#${id})`} />
      <Ellipse cx="68" cy="62" rx="11" ry="12" fill="none" stroke="#B7801E" strokeWidth="2.4" />
      <Path
        d="M68 52v20M63 57h8a3.6 3.6 0 0 1 0 7h-6a3.6 3.6 0 0 0 0 7h8"
        stroke="#8F6412"
        strokeWidth="2.6"
        fill="none"
        strokeLinecap="round"
      />

      <Circle cx="30" cy="72" r="11" fill={`url(#${id})`} />
      <Ellipse cx="30" cy="72" rx="6.6" ry="7.4" fill="none" stroke="#B7801E" strokeWidth="1.8" />
    </Svg>
  );
}

/** The promo strip: what it is, how long it lasts, and the way to take it. */
export function PromoCard({ height, onClaim }: { height: number; onClaim?: () => void }) {
  const id = `fernPromo-${useId()}`;

  return (
    <View style={{ height, borderRadius: 20, overflow: 'hidden', flexDirection: 'row' }}>
      <Svg width="100%" height={height} style={{ position: 'absolute' }}>
        <Defs>
          <LinearGradient id={id} x1="0" y1="0" x2="1" y2="0.6">
            <Stop offset="0" stopColor="#C8ECB2" />
            <Stop offset="0.6" stopColor={ct.leaf} />
            <Stop offset="1" stopColor="#4CAE4E" />
          </LinearGradient>
        </Defs>
        <Rect x="0" y="0" width="100%" height={height} fill={`url(#${id})`} />
      </Svg>

      <View style={{ flex: 1, padding: 16, justifyContent: 'center', zIndex: 1 }}>
        <T variant="promoTitle" color={ct.onLeaf} style={{ height: type.promoTitle.line }}>
          {copy.promoTitle}
        </T>
        <T
          variant="promoNote"
          color="rgba(13,34,16,0.78)"
          style={{ height: type.promoNote.line, marginTop: 2 }}
        >
          {copy.promoNote}
        </T>

        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 12 }}>
          <View
            style={{
              height: 34,
              paddingHorizontal: 14,
              borderRadius: 17,
              borderWidth: 1,
              borderColor: 'rgba(13,34,16,0.3)',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <T variant="promoPill" color={ct.onLeaf} style={{ height: type.promoPill.line }}>
              {copy.promoLeft}
            </T>
          </View>

          <Pressable
            accessibilityRole="button"
            accessibilityLabel={copy.promoCta}
            onPress={onClaim}
            style={{ marginLeft: 10, paddingVertical: 5 }}
          >
            <View
              style={{
                height: 34,
                paddingHorizontal: 20,
                borderRadius: 17,
                backgroundColor: '#14210F',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <T variant="promoPill" color="#FFFFFF" style={{ height: type.promoPill.line }}>
                {copy.promoCta}
              </T>
            </View>
          </Pressable>
        </View>
      </View>

      <View style={{ width: 96, alignItems: 'center', justifyContent: 'center', zIndex: 1 }}>
        <Reward size={Math.min(92, height - 14)} />
      </View>
    </View>
  );
}
