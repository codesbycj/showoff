import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// STEP 2.07 import the thumbnails
// import { AngleThumbs } from '@/features/fashora/components/angle-thumbs';
// STEP 2.01 import the app bar
// import { AppBar } from '@/features/fashora/components/app-bar';
// STEP 2.34 import the buy bar
// import { BuyBar } from '@/features/fashora/components/buy-bar';
// STEP 2.18 import the colour picker
// import { ColorPicker } from '@/features/fashora/components/color-picker';
// STEP 2.30 import the highlight row
// import { HighlightRow } from '@/features/fashora/components/highlight-row';
// STEP 2.12 import the title block
// import { ProductHeadline } from '@/features/fashora/components/product-headline';
// STEP 2.03 import the stage
// import { ProductStage } from '@/features/fashora/components/product-stage';
// STEP 2.14 import the rating row
// import { RatingRow } from '@/features/fashora/components/rating-row';
// The sheet's import stays live: its opening and closing tags wrap every step
// below, and a block comment cannot straddle them. It paints nothing until it
// has a child, so the panel still arrives with step 2.13 rather than at frame
// one.
import { Sheet } from '@/features/fashora/components/sheet';
// STEP 2.19 import the size picker
// import { SizePicker } from '@/features/fashora/components/size-picker';
// STEP 2.05 import the turntable
// import { Turntable } from '@/features/fashora/components/turntable';
import { ANGLES, COLORS, DETAIL, HIGHLIGHTS, SIZES } from '@/features/fashora/data/detail';
import { SP, TYPE, fa, fashoraTheme } from '@/features/fashora/theme';

/** Screen 2 — the product detail sheet. */
export default function FashoraDetail() {
  const insets = useSafeAreaInsets();
  const [angle, setAngle] = useState('zipper');
  const [color, setColor] = useState('solar');
  const [size, setSize] = useState('m');

  return (
    <View style={[fashoraTheme, { flex: 1, backgroundColor: fa.surface }]}>
      <StatusBar style="dark" />

{/* STEP 2.02 the bar, with a way back
      <AppBar title={DETAIL.title} action="share" onBack={() => router.back()} inset={insets.top} />
*/}

      <ScrollView showsVerticalScrollIndicator={false}>
        <View style={{ paddingTop: SP.sm, alignItems: 'center' }}>
{/* STEP 2.04 the hero frame
          <ProductStage hero={DETAIL.hero} />
*/}

{/* STEP 2.06 the turntable it stands on
          <Turntable angle={String(ANGLES.findIndex((a) => a.key === angle) + 1)} />
*/}

{/* STEP 2.08 three angles to pick from
          <AngleThumbs items={ANGLES} selected={angle} onSelect={setAngle} />
*/}
        </View>

        <View style={{ height: SP.lg }} />

        <Sheet>
{/* STEP 2.13 name it and price it
          <ProductHeadline kicker={DETAIL.kicker} name={DETAIL.name} price={DETAIL.price} />
*/}

{/* STEP 2.15 how it has been rated
          <RatingRow rating={DETAIL.rating} reviews={DETAIL.reviews} stock={DETAIL.stock} />
*/}

{/* STEP 2.16 what it is
          <Text
            style={{
              ...TYPE.bodyMd,
              lineHeight: 22.75,
              color: fa.onSurfaceVariant,
              // MISTAKE 2.17 the description left on the label scale's leading
              lineHeight: 14,
              marginTop: SP.gutterMobile,
            }}
          >
            {DETAIL.blurb}
          </Text>
*/}

{/* STEP 2.20 colour and size, side by side
          <View style={{ flexDirection: 'row', gap: SP.md, marginTop: SP.lg }}>
            <View style={{ flex: 1 }}>
              <ColorPicker
                label={DETAIL.colorLabel}
                items={COLORS}
                selected={color}
                onSelect={setColor}
              />
            </View>
            <View style={{ flex: 1 }}>
              <SizePicker
                label={DETAIL.sizeLabel}
                guide={DETAIL.guide}
                items={SIZES}
                selected={size}
                onSelect={setSize}
              />
            </View>
          </View>
*/}

{/* STEP 2.31 delivery and returns
          <View style={{ gap: SP.xs, marginTop: SP.lg }}>
            {HIGHLIGHTS.map((h) => (
              <HighlightRow key={h.key} item={h} />
            ))}
          </View>
*/}
        </Sheet>
      </ScrollView>

{/* STEP 2.35 the bar that closes the sale
      <BuyBar
        cta={DETAIL.buy}
        inset={insets.bottom}
        onBag={() => router.push('/fashora/bag')}
        onBuy={() => router.push('/fashora/bag')}
      />
*/}
    </View>
  );
}
