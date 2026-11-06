import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Pressable, View } from 'react-native';
import Svg, { Circle, Path, Rect } from 'react-native-svg';

// STEP 1.01 import text
// import { T } from '@/features/gluwhy/components/text';
import { copy, features } from '@/features/gluwhy/data/why';
import { ct, radius, type } from '@/features/gluwhy/theme';
import { useGluWhyLayout } from '@/features/gluwhy/layout';
import { useInsets } from '@/features/gluwhy/use-insets';

const MARGIN = 24;

function Glyph({
  name,
  size = 22,
}: {
  name: 'pulse' | 'brain' | 'person' | 'bars';
  size?: number;
}) {
  const s = {
    stroke: ct.green,
    strokeWidth: 1.8,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    fill: 'none',
  };
  return (
    <Svg width={size} height={size} viewBox="0 0 24 24">
      {name === 'pulse' && <Path {...s} d="M2.8 12h3.6l2.2-6 3.4 12 2.6-8 1.8 2h4.8" />}
      {name === 'brain' && (
        <>
          <Circle {...s} cx="12" cy="12" r="8" />
          <Path {...s} d="M12 4.6v14.8M7 7.2c2 1.6 2.6 3.6 2.6 4.8M17 7.2c-2 1.6-2.6 3.6-2.6 4.8" />
        </>
      )}
      {name === 'person' && (
        <>
          <Circle {...s} cx="12" cy="8.6" r="3.2" />
          <Path {...s} d="M6.2 19.4a5.8 5.8 0 0 1 11.6 0" />
        </>
      )}
      {name === 'bars' && (
        <>
          <Rect {...s} x="4.6" y="12.6" width="3.6" height="7" rx="1.6" />
          <Rect {...s} x="10.2" y="7.6" width="3.6" height="12" rx="1.6" />
          <Rect {...s} x="15.8" y="10.2" width="3.6" height="9.4" rx="1.6" />
        </>
      )}
    </Svg>
  );
}

/**
 * Glu — why.
 *
 * Assembly only: the eyebrow, the promise, four reasons, and the way on.
 *
 * The rows take their height from what the screen has left between the
 * headline and the button, so the fourth reason ends on the button rather
 * than halfway up to it.
 */
export default function GluwhyScreen() {
  const insets = useInsets();
  const { rowH } = useGluWhyLayout(insets, features.length);

  return (
    <View style={{ flex: 1, backgroundColor: ct.page }}>
      <StatusBar style="dark" />

      <View
        style={{
          flex: 1,
          paddingTop: insets.top + 18,
          paddingBottom: insets.bottom + 12,
          paddingHorizontal: MARGIN,
        }}
      >
        {/* STEP 1.02 eyebrow
        <T
          variant="pillNote"
          color={ct.faint}
          style={{ height: type.pillNote.line, letterSpacing: 1.2 }}
        >
          {copy.eyebrow}
        </T>
        */}

        {/* STEP 1.03 headline
        <T variant="display" color={ct.ink} style={{ marginTop: 8 }}>
          {copy.headline}
        </T>
        */}

        {/* STEP 1.04 title
        <View style={{ marginTop: 18 }}>
          {features.map((f, i) => (
            <View
              key={f.id}
              style={{
                height: rowH,
                flexDirection: 'row',
                alignItems: 'center',
                borderTopWidth: i === 0 ? 0 : 1,
                borderTopColor: ct.hairline,
              }}
            >
              <View style={{ flex: 1, paddingRight: 16 }}>
                <T variant="rowTitle" color={ct.ink} style={{ height: type.rowTitle.line }}>
                  {f.title}
                </T>
                <T variant="rowBody" color={ct.muted} style={{ marginTop: 3 }}>
                  {f.body}
                </T>
              </View>
              <View
                style={{
                  width: 46,
                  height: 46,
                  borderRadius: 23,
                  backgroundColor: ct.greenSoft,
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Glyph name={f.icon} />
              </View>
            </View>
          ))}
        </View>
        */}

        <View style={{ flex: 1 }} />

        {/* STEP 1.05 cta
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={copy.cta}
          onPress={() => router.push('/gluhome')}
        >
          {({ pressed }) => (
            <View
              style={{
                height: 58,
                borderRadius: radius.cta,
                backgroundColor: ct.black,
                alignItems: 'center',
                justifyContent: 'center',
                opacity: pressed ? 0.9 : 1,
              }}
            >
              <T variant="cta" color={ct.onBlack} style={{ height: type.cta.line }}>
                {copy.cta}
              </T>
            </View>
          )}
        </Pressable>
        */}
        {/* STEP 1.06 a stray gap under it | FIX 1.07 take the gap back out
        <View style={{ height: 23 }} />
        */}
      </View>
    </View>
  );
}
