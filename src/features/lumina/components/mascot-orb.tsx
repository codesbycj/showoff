import { View } from 'react-native';

/**
 * The AI mascot — a robot face on a lime disc, inside two concentric halos.
 *
 * `DESIGN.md` calls this "Layer 3 (Aura & AI Pulsing)": a radial glow that
 * visualises the assistant being awake. It is built as three stacked circles
 * rather than a radial gradient, which is what the reference does and what
 * React Native can draw without an SVG — a 176dp ring at 30% over a 144dp disc
 * at 40% over the solid 112dp face reads as one soft falloff.
 *
 * The three circles are absolutely positioned and centred on each other, so the
 * component's own box is the 176dp ring and the screen can centre it as one
 * thing.
 */
export function MascotOrb({ size = 176 }: { size?: number }) {
  const ring = size;
  const halo = size * (144 / 176);
  const face = size * (112 / 176);

  return (
    <View style={{ width: ring, height: ring, alignItems: 'center', justifyContent: 'center' }}>
      {/* Outer ring — a hairline of lime over the palest wash. */}
      <View
        style={{
          position: 'absolute',
          width: ring,
          height: ring,
          borderRadius: ring / 2,
          borderWidth: 1,
          borderColor: 'rgba(190,242,100,0.4)',
          backgroundColor: 'rgba(217,249,157,0.3)',
        }}
      />

      {/* Mid halo. */}
      <View
        style={{
          position: 'absolute',
          width: halo,
          height: halo,
          borderRadius: halo / 2,
          backgroundColor: 'rgba(190,242,100,0.4)',
        }}
      />

      {/* The face disc, carrying its own lime glow. */}
      <View
        style={{
          width: face,
          height: face,
          borderRadius: face / 2,
          backgroundColor: '#a7f043',
          alignItems: 'center',
          justifyContent: 'center',
          shadowColor: '#a3f338',
          shadowOpacity: 0.55,
          shadowRadius: 24,
          shadowOffset: { width: 0, height: 0 },
          elevation: 8,
        }}
      >
        <RobotFace />
      </View>
    </View>
  );
}

/**
 * The robot itself — an antenna over a dark rounded pill holding two eyes and
 * a smile.
 *
 * The smile is a 2dp bar rather than a curve. That is what the reference draws
 * (a `border-b-2` on a 6x2 box), and at 44dp across the face a real arc would
 * be a single anti-aliased pixel of difference.
 */
function RobotFace() {
  const ink = '#111a12';

  return (
    <View style={{ alignItems: 'center' }}>
      {/* Antenna — the bulb overlaps the stalk, exactly as the reference nests them. */}
      <View style={{ width: 6, height: 6, borderRadius: 3, backgroundColor: ink }} />
      <View style={{ width: 3, height: 5, marginTop: -1, backgroundColor: ink }} />

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 7,
          width: 44,
          height: 30,
          borderRadius: 15,
          backgroundColor: ink,
          marginTop: 1,
        }}
      >
        <View style={{ width: 6, height: 9, borderRadius: 3, backgroundColor: '#ffffff' }} />
        <View style={{ width: 7, height: 2, borderRadius: 1, backgroundColor: '#ffffff' }} />
        <View style={{ width: 6, height: 9, borderRadius: 3, backgroundColor: '#ffffff' }} />
      </View>
    </View>
  );
}
