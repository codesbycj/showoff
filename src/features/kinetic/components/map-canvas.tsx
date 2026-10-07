import { type ReactNode } from 'react';
import { Text, View } from 'react-native';
import Svg, { Defs, G, Path, Pattern, Rect } from 'react-native-svg';

import { Symbol } from './symbol';
import { FONT, LEVEL, kc } from '../theme';

/**
 * The stylised city map the tracking screen sits on.
 *
 * This is the export's own SVG, carried across: a tiled `pattern` of rounded
 * city blocks with a cross road through each tile, four white arterial roads
 * over it, and the charcoal delivery route with a dashed white overlay.
 *
 * It is drawn rather than rendered from tiles because that is what the
 * reference does — the tracking screen's map is vector, not a screenshot, and
 * a real map view would need a network key and would not match the design's
 * flat palette anyway.
 *
 * The viewBox is 400x360 and the SVG stretches to the panel, which is the
 * `preserveAspectRatio="none"` the original relies on.
 */
export function MapCanvas({
  height = 360,
  children,
}: {
  height?: number;
  /** Pins and controls, positioned by the caller against the same box. */
  children?: ReactNode;
}) {
  return (
    <View style={{ height, backgroundColor: kc.surfaceLow, overflow: 'hidden' }}>
      <Svg
        width="100%"
        height={height}
        viewBox="0 0 400 360"
        preserveAspectRatio="none"
        style={{ position: 'absolute', top: 0, left: 0 }}
      >
        <Defs>
          <Pattern id="blocks" width={70} height={70} patternUnits="userSpaceOnUse">
            <Rect width={64} height={64} rx={6} fill="#e8eaed" />
            <Path
              d="M 0 35 L 70 35 M 35 0 L 35 70"
              stroke="#f2f4f6"
              strokeWidth={4}
              strokeLinecap="round"
            />
          </Pattern>
        </Defs>

        <Rect width="100%" height="100%" fill="url(#blocks)" />

        {/* arterial roads */}
        <G stroke="#ffffff" fill="none" strokeLinecap="round">
          <Path d="M -20 110 C 60 120, 110 90, 170 140 S 260 210, 420 180" strokeWidth={20} />
          <Path d="M 80 -10 L 130 380" strokeWidth={16} />
          <Path d="M 280 -20 L 260 380" strokeWidth={14} />
          <Path d="M 10 260 L 390 270" strokeWidth={16} />
        </G>

        {/* the delivery route, and its dashed centre line */}
        <Path
          d="M 120 280 C 130 200, 190 210, 210 160 S 270 120, 295 90"
          fill="none"
          stroke={kc.inverseSurface}
          strokeWidth={6}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <Path
          d="M 120 280 C 130 200, 190 210, 210 160 S 270 120, 295 90"
          fill="none"
          stroke="#ffffff"
          strokeWidth={2}
          strokeLinecap="round"
          strokeDasharray="4 6"
          opacity={0.6}
        />
      </Svg>

      {children}
    </View>
  );
}

/**
 * The destination pin — a coral dot inside two soft halos.
 *
 * The reference animates the outer halo with `animate-ping`. It is static here:
 * the showcase is filmed as a build-up rather than an interaction, and a pulse
 * that never resolves is a distraction in a still frame.
 */
export function DestinationPin({ top, left }: { top: number; left: number }) {
  return (
    <View
      style={{
        position: 'absolute',
        top: top - 24,
        left: left - 24,
        width: 48,
        height: 48,
        alignItems: 'center',
        justifyContent: 'center',
      }}
      pointerEvents="none"
    >
      <View
        style={{
          position: 'absolute',
          width: 48,
          height: 48,
          borderRadius: 24,
          backgroundColor: kc.coral,
          opacity: 0.2,
        }}
      />
      <View
        style={{
          position: 'absolute',
          width: 32,
          height: 32,
          borderRadius: 16,
          backgroundColor: kc.coral,
          opacity: 0.3,
        }}
      />
      <View
        style={{
          width: 20,
          height: 20,
          borderRadius: 10,
          backgroundColor: kc.coral,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: kc.surface }} />
      </View>
    </View>
  );
}

/** The courier marker — a charcoal disc with a heading arrow and a time tag. */
export function CourierMarker({
  top,
  left,
  label,
  icon = 'navigation',
  rotate = -35,
}: {
  top: number;
  left: number;
  label: string;
  icon?: Parameters<typeof Symbol>[0]['name'];
  rotate?: number;
}) {
  return (
    <View style={{ position: 'absolute', top: top - 22, left: left - 22, alignItems: 'center' }}>
      <View
        style={{
          position: 'absolute',
          bottom: 50,
          backgroundColor: kc.inverseSurface,
          paddingHorizontal: 8,
          paddingVertical: 3,
          borderRadius: 999,
        }}
      >
        <Text
          numberOfLines={1}
          style={{
            fontFamily: FONT.semibold,
            fontSize: 10,
            lineHeight: 14,
            color: kc.inverseOnSurface,
          }}
        >
          {label}
        </Text>
      </View>

      <View
        style={[
          {
            width: 44,
            height: 44,
            borderRadius: 22,
            backgroundColor: kc.inverseSurface,
            alignItems: 'center',
            justifyContent: 'center',
            borderWidth: 4,
            borderColor: 'rgba(255,255,255,0.9)',
          },
          LEVEL.dock,
        ]}
      >
        <View style={{ transform: [{ rotate: `${rotate}deg` }] }}>
          <Symbol name={icon} size={20} color={kc.onCoral} />
        </View>
      </View>
    </View>
  );
}

/** The stacked map controls in the top-right corner. */
export function MapControls({
  top = 16,
  onRecenter,
  onLayers,
}: {
  top?: number;
  onRecenter?: () => void;
  onLayers?: () => void;
}) {
  return (
    <View style={{ position: 'absolute', top, right: 20, gap: 4 }}>
      <MapButton icon="myLocation" onPress={onRecenter} label="Recentre map" />
      <MapButton icon="layers" onPress={onLayers} label="Route layers" />
    </View>
  );
}

function MapButton({
  icon,
  onPress,
  label,
}: {
  icon: Parameters<typeof Symbol>[0]['name'];
  onPress?: () => void;
  label: string;
}) {
  return (
    <View
      style={[
        {
          width: 36,
          height: 36,
          borderRadius: 18,
          backgroundColor: kc.surface,
          alignItems: 'center',
          justifyContent: 'center',
        },
        LEVEL.card,
      ]}
      accessibilityRole="button"
      accessibilityLabel={label}
      onTouchEnd={onPress}
    >
      <Symbol name={icon} size={20} color={kc.ink} />
    </View>
  );
}
