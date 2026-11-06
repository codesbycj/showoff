import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Pressable, View } from 'react-native';

// STEP 1.01 import category tiles
// import { CategoryTiles } from '@/features/wanderhome/components/category-tiles';
// STEP 1.02 import dock
// import { Dock } from '@/features/wanderhome/components/dock';
// STEP 1.03 import search field
// import { SearchField } from '@/features/wanderhome/components/search-field';
// STEP 1.04 import stay card
// import { StayCard } from '@/features/wanderhome/components/stay-card';
// STEP 1.05 import text
// import { T } from '@/features/wanderhome/components/text';
// STEP 1.06 import top row
// import { TopRow } from '@/features/wanderhome/components/top-row';
import { copy, page, pages, stay } from '@/features/wanderhome/data/home';
import {
  CTA_H,
  GAP_CARD_PRICE,
  GAP_CTA_DOCK,
  GAP_FIELD_TILES,
  GAP_PRICE_CTA,
  GAP_SECTION_CARD,
  GAP_TILES_SHEET,
  GAP_TOP_FIELD,
  MARGIN,
  PAD_TOP,
  SHEET_PAD,
  useWanderLayout,
} from '@/features/wanderhome/layout';
import { ct, radius, type } from '@/features/wanderhome/theme';
import { useInsets } from '@/features/wanderhome/use-insets';

/**
 * Wander — where to next.
 *
 * Assembly only: who you are, the search, the three kinds of place, and the
 * stay the app is pushing.
 *
 * The black page runs behind a white sheet that reaches the bottom edge. The
 * photograph inside the sheet is sized from what the sheet has left over, so
 * the card grows on a tall phone rather than leaving white under the button
 * — the one failure this whole batch was rebuilt to avoid.
 */
export default function WanderhomeScreen() {
  const insets = useInsets();
  const { sheetH, tileW, cardH } = useWanderLayout(insets);

  return (
    <View style={{ flex: 1, backgroundColor: ct.page }}>
      <StatusBar style="light" />

      {/* STEP 1.07 top row
      <View style={{ paddingTop: insets.top + PAD_TOP, paddingHorizontal: MARGIN }}>
        <TopRow />

        <View style={{ marginTop: GAP_TOP_FIELD }}>
          <SearchField />
        </View>

        <View style={{ marginTop: GAP_FIELD_TILES }}>
          <CategoryTiles tileW={tileW} />
        </View>
      </View>
      */}

      <View
        style={{
          marginTop: GAP_TILES_SHEET,
          height: sheetH,
          paddingHorizontal: MARGIN,
          paddingTop: SHEET_PAD,
        }}
      >
        {/* STEP 1.08 the next block

        */}
        {/* STEP 1.09 view
        <View
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: ct.sheet,
            borderTopLeftRadius: radius.sheet,
            borderTopRightRadius: radius.sheet,
          }}
        />
        */}

        {/* STEP 1.10 trending
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <T variant="section" color={ct.ink} style={{ flex: 1, height: type.section.line }}>
            {copy.trending}
          </T>
          <View style={{ flexDirection: 'row', alignItems: 'center' }}>
            {Array.from({ length: pages }).map((_, i) => (
              <View
                key={i}
                style={{
                  width: i === page ? 22 : 6,
                  height: 6,
                  borderRadius: 3,
                  marginLeft: 5,
                  backgroundColor: i === page ? ct.blue : ct.hairline,
                }}
              />
            ))}
          </View>
        </View>
        */}

        {/* STEP 1.11 stay card
        <View style={{ marginTop: GAP_SECTION_CARD }}>
          <StayCard height={cardH} onPress={() => router.push('/wanderstay')} />
        </View>
        */}

        {/* STEP 1.12 price
        <View
          style={{
            marginTop: GAP_CARD_PRICE,
            flexDirection: 'row',
            alignItems: 'flex-end',
          }}
        >
          <T variant="price" color={ct.ink} style={{ height: type.price.line }}>
            {stay.price}
          </T>
          <T
            variant="priceUnit"
            color={ct.muted}
            style={{ height: type.priceUnit.line, marginLeft: 5, marginBottom: 3 }}
          >
            {copy.priceUnit}
          </T>
          <View style={{ flex: 1 }} />
          <T
            variant="stayMeta"
            color={ct.muted}
            style={{ height: type.stayMeta.line, marginBottom: 3 }}
          >
            {copy.stayMeta}
          </T>
        </View>
        */}

        {/* STEP 1.13 cta
        <Pressable
          accessibilityRole="button"
          accessibilityLabel={copy.cta}
          onPress={() => router.push('/wanderstay')}
          style={{ marginTop: GAP_PRICE_CTA }}
        >
          {({ pressed }) => (
            <View
              style={{
                height: CTA_H,
                borderRadius: radius.cta,
                backgroundColor: ct.blue,
                alignItems: 'center',
                justifyContent: 'center',
                opacity: pressed ? 0.9 : 1,
              }}
            >
              <T variant="cta" color={ct.onBlue} style={{ height: type.cta.line }}>
                {copy.cta}
              </T>
            </View>
          )}
        </Pressable>
        */}

        {/* STEP 1.14 dock
        <View style={{ marginTop: GAP_CTA_DOCK }}>
          <Dock active={0} bottom={insets.bottom} />
        </View>
        */}
        {/* STEP 1.15 a stray gap under it | FIX 1.16 take the gap back out
        <View style={{ height: 23 }} />
        */}
      </View>
    </View>
  );
}
