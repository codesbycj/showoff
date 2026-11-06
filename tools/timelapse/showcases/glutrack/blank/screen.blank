import { Image } from 'expo-image';
import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Pressable, View } from 'react-native';
import Svg, { Circle, Path } from 'react-native-svg';

// STEP 1.01 import text
// import { T } from '@/features/glutrack/components/text';
import { copy, page, pages, photo } from '@/features/glutrack/data/track';
import { ct, radius, type } from '@/features/glutrack/theme';
import { useInsets } from '@/features/glutrack/use-insets';

const MARGIN = 24;

function Drop({ tint }: { tint: string }) {
  return (
    <Svg width={16} height={16} viewBox="0 0 24 24">
      <Path
        fill={tint}
        d="M12 2.6c4 4.6 6.6 8.2 6.6 11.6a6.6 6.6 0 1 1-13.2 0C5.4 10.8 8 7.2 12 2.6Z"
      />
    </Svg>
  );
}

function Tick() {
  return (
    <Svg width={38} height={38} viewBox="0 0 38 38">
      <Circle cx="19" cy="19" r="19" fill={ct.black} />
      <Path
        d="m12.6 19.4 4.2 4.2 8.6-9"
        stroke="#FFFFFF"
        strokeWidth={2.2}
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </Svg>
  );
}

/**
 * Glu — tracking.
 *
 * Assembly only: the photograph with a reading laid over it, the promise,
 * where you are in the sequence, and the way on.
 *
 * The photograph takes the screen's one flexible band, so the slack has a
 * single place to go and the button sits on the safe area at any height.
 */
export default function GlutrackScreen() {
  const insets = useInsets();

  return (
    <View style={{ flex: 1, backgroundColor: ct.page }}>
      <StatusBar style="dark" />

      <View
        style={{
          flex: 1,
          paddingTop: insets.top + 10,
          paddingBottom: insets.bottom + 12,
          paddingHorizontal: MARGIN,
        }}
      >
        {/* STEP 1.02 pill title
        <View
          style={{
            flex: 1,
            minHeight: 240,
            borderRadius: radius.card,
            overflow: 'hidden',
            justifyContent: 'flex-end',
          }}
        >
          <Image
            source={photo}
            style={{ position: 'absolute', width: '100%', height: '100%' }}
            contentFit="cover"
          />

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              margin: 14,
              padding: 10,
              borderRadius: radius.pill,
              backgroundColor: 'rgba(255,255,255,0.94)',
            }}
          >
            <View
              style={{
                width: 34,
                height: 34,
                borderRadius: 12,
                backgroundColor: ct.greenSoft,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Drop tint={ct.green} />
            </View>
            <View style={{ flex: 1, marginLeft: 10 }}>
              <T variant="pillTitle" color={ct.ink} style={{ height: type.pillTitle.line }}>
                {copy.pillTitle}
              </T>
              <T
                variant="pillNote"
                color={ct.muted}
                numberOfLines={1}
                style={{ height: type.pillNote.line }}
              >
                {copy.pillNote}
              </T>
            </View>
            <Tick />
          </View>
        </View>
        */}

        {/* STEP 1.03 headline
        <T variant="display" color={ct.ink} style={{ marginTop: 26 }}>
          {copy.headline}
        </T>
        */}

        {/* STEP 1.04 body
        <T variant="body" color={ct.muted} style={{ marginTop: 10 }}>
          {copy.body}
        </T>
        */}

        {/* STEP 1.05 view
        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 22 }}>
          {Array.from({ length: pages }).map((_, i) => (
            <View
              key={i}
              style={{
                width: i === page ? 18 : 6,
                height: 6,
                borderRadius: 3,
                marginRight: 5,
                backgroundColor: i === page ? ct.ink : ct.hairline,
              }}
            />
          ))}
        </View>
        */}

        {/* STEP 1.06 next
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={copy.next}
          onPress={() => router.push('/gluask')}
          style={{ marginTop: 22 }}
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
                {copy.next}
              </T>
            </View>
          )}
        </Pressable>
        */}
        {/* STEP 1.07 a stray gap under it | FIX 1.08 take the gap back out
        <View style={{ height: 23 }} />
        */}
      </View>
    </View>
  );
}
