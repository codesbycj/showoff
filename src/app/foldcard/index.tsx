import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Pressable, View } from 'react-native';

// STEP 1.03 import card face
// import { CardFace } from '@/features/foldcard/components/card-face';
// STEP 1.22 import country row
// import { CountryRow } from '@/features/foldcard/components/country-row';
// STEP 1.16 import field list
// import { FieldList } from '@/features/foldcard/components/field-list';
// STEP 1.02 import glyph
// import { Glyph } from '@/features/foldcard/components/glyph';
// STEP 1.01 import text
// import { T } from '@/features/foldcard/components/text';
import { header } from '@/features/foldcard/data/card';
import { useLayout } from '@/features/foldcard/layout';
import { ct } from '@/features/foldcard/theme';

/**
 * Fold - the new card.
 *
 * Assembly, never markup: a list of imports and the blocks they mount, in the
 * order they appear, because `stage.js` reads this file as the description of
 * its own reveal.
 *
 * The slack lands above the pinned Save, so the screen ends on it (I3).
 */
export default function FoldcardScreen() {
  const L = useLayout();

  return (
    <View style={{ flex: 1, backgroundColor: ct.page }}>
      <StatusBar style="dark" />

      <View style={{ paddingTop: L.insets.top }} />
      <View style={{ marginHorizontal: L.margin, height: L.topH, justifyContent: 'center' }}>
        {/* STEP 1.01 title
        <View style={{ position: 'absolute', left: 0, right: 0, alignItems: 'center' }}>
          <T variant="section">{header.title}</T>
        </View>
        */}

        {/* STEP 1.02 "Back"
        <Pressable
          accessibilityRole="button"
          accessibilityLabel="Back"
          onPress={() => router.push('/foldhome')}
        >
          <View
            style={{
              width: 44,
              height: 44,
              borderRadius: 22,
              backgroundColor: ct.card,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Glyph name="back" size={18} color={ct.ink} strokeWidth={1.9} />
          </View>
        </Pressable>
        */}
      </View>

      <View style={{ height: L.gapTop }} />
      {/* STEP 1.03 card face
      <CardFace margin={L.margin} width={L.face.w} height={L.face.h} />
      */}

      <View style={{ height: L.gapFace }} />
      {/* STEP 1.13 section
      <View style={{ marginHorizontal: L.margin, height: L.sectionH }}>
        <T variant="section">{header.section}</T>
      </View>
      */}

      <View style={{ height: L.gapSection }} />
      {/* STEP 1.16 field list
      <FieldList
        margin={L.margin}
        width={L.field.w}
        height={L.field.h}
        gap={L.field.gap}
        radius={L.field.radius}
      />
      */}

      <View style={{ height: L.gapFields }} />
      {/* STEP 1.22 country row
      <CountryRow margin={L.margin} width={L.field.w} height={L.field.h} radius={L.field.radius} />
      */}

      <View style={{ flex: 1 }} />
      {/* STEP 1.28 cta
      <Pressable
        accessibilityRole="button"
        accessibilityLabel={header.cta}
        onPress={() => router.push('/foldspend')}
      >
        <View
          style={{
            marginHorizontal: L.margin,
            height: L.cta.h,
            borderRadius: L.cta.radius,
            backgroundColor: ct.yellow,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <T variant="fieldValue">{header.cta}</T>
        </View>
      </Pressable>
      */}

      {/* STEP 1.11 a stray rule | FIX 1.12 take the rule back out
      <View style={{ position: 'absolute', left: 14, top: 162, width: 120, height: 7, backgroundColor: '#8F8F8F', zIndex: 9 }} />
      */}
      {/* STEP 1.14 a stray rule | FIX 1.15 take the rule back out
      <View style={{ position: 'absolute', left: 22, top: 186, width: 120, height: 11, backgroundColor: '#8F8F8F', zIndex: 9 }} />
      */}
      {/* STEP 1.20 a stray rule | FIX 1.21 take the rule back out
      <View style={{ position: 'absolute', left: 18, top: 174, width: 120, height: 9, backgroundColor: '#8F8F8F', zIndex: 9 }} />
      */}
      {/* STEP 1.26 a stray rule | FIX 1.27 take the rule back out
      <View style={{ position: 'absolute', left: 26, top: 198, width: 120, height: 13, backgroundColor: '#8F8F8F', zIndex: 9 }} />
      */}
      <View style={{ height: L.padBottom }} />
    </View>
  );
}
