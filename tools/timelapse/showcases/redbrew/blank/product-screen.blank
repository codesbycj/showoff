import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// STEP 2.01 the shared kit
// import { Chip, PrimaryCta } from '@/features/redbrew/components/bits';
// STEP 2.02 the detail parts
// import { DeliveryRow, DetailHeader, MilkPicker, ProductHero, RoastRow, SizePicker, } from '@/features/redbrew/components/product-parts';
import { Symbol } from '@/features/redbrew/components/symbol';
import { MILKS, PRODUCT, SIZES } from '@/features/redbrew/data/product';
import { SP, TYPE, rb, redbrewTheme } from '@/features/redbrew/theme';

/**
 * Screen 2 — product detail.
 *
 * One scrolling column with the CTA sitting at the end of it rather than pinned:
 * the reference puts the order button inline after the delivery strip, with the
 * "Brew another cup" text button below, and nothing floats over the content.
 *
 * No tab bar. The reference does not draw one here — the back button is the way
 * out — which is also why the header carries its own back control.
 *
 * The size and milk pickers are presentational: the reference wires them with
 * inline JS that swaps classes and rewrites the price. The recording never taps
 * them, so the selected state is fixed at the reference's default (12 oz, oat)
 * and the price matches.
 */
export default function RedbrewProduct() {
  const insets = useSafeAreaInsets();
  const size = SIZES[1];

  return (
    <View style={[redbrewTheme, { flex: 1, backgroundColor: rb.bg }]}>
      <StatusBar style="dark" />

      <View style={{ paddingTop: insets.top, paddingHorizontal: SP.margin }}>
{/* STEP 2.03 name the screen
        <DetailHeader
          title={PRODUCT.title}
          avatar={require('../../../assets/images/redbrew/alex.jpg')}
          onBack={() => router.back()}
          onMore={() => router.push('/redbrew/orders')}
          onAvatar={() => router.push('/redbrew/profile')}
        />
*/}
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: SP.margin,
          paddingBottom: Math.max(insets.bottom, 16) + SP.lg,
          gap: SP.lg,
        }}
      >
{/* STEP 2.04 a way back
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <Pressable onPress={() => router.back()} accessibilityRole="button">
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
              <Symbol name="arrowBack" size={17} color={rb.secondary} />
              <Text style={[TYPE.labelLg, { color: rb.secondary }]}>{PRODUCT.back}</Text>
            </View>
          </Pressable>

          <Chip label={PRODUCT.dispatch} tone="mint" icon="bolt" />
        </View>
*/}

{/* STEP 2.05 say what it is
        <View style={{ gap: SP.sm }}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
            <Text style={[TYPE.labelMd, { color: rb.crimson }]}>{PRODUCT.eyebrow}</Text>
            <Text style={[TYPE.labelMd, { color: rb.surfaceDim }]}>•</Text>
            <Text style={[TYPE.labelMd, { color: rb.secondary }]}>{PRODUCT.batch}</Text>
          </View>

          <Text style={[TYPE.headlineXlMobile, { color: rb.ink, textTransform: 'uppercase' }]}>
            {PRODUCT.name}
          </Text>

          <Text style={[TYPE.bodyLg, { color: rb.secondary }]}>{PRODUCT.body}</Text>
        </View>
*/}

{/* STEP 2.06 show the cup
        <View
          style={{
            // MISTAKE 2.07 the cup came in tipped over
            transform: [{ rotate: '-6deg' }],
          }}
        >
          <ProductHero />
        </View>
*/}

{/* STEP 2.08 pick a size
        <View style={{ gap: SP.md }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Text style={[TYPE.titleMd, { color: rb.ink }]}>{PRODUCT.sizeLabel}</Text>
            <Text style={[TYPE.labelMd, { color: rb.crimson }]}>{size.full}</Text>
          </View>

          <SizePicker sizes={SIZES} selected={size.key} />
        </View>
*/}

{/* STEP 2.09 and a milk
        <View style={{ gap: SP.md }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
            }}
          >
            <Text style={[TYPE.titleMd, { color: rb.ink }]}>{PRODUCT.milkLabel}</Text>
            <Text style={[TYPE.labelMd, { color: rb.secondary }]}>{PRODUCT.milkNote}</Text>
          </View>

          <MilkPicker milks={MILKS} selected={MILKS[0]} />
        </View>
*/}

{/* STEP 2.10 how dark it runs
        <RoastRow />
*/}

{/* STEP 2.11 how fast it arrives
        <DeliveryRow />
*/}

{/* STEP 2.12 order it
        <PrimaryCta
          label={PRODUCT.cta.toUpperCase()}
          price={size.price}
          onPress={() => router.push('/redbrew/cart')}
        />
*/}

{/* STEP 2.13 or start again
        <Pressable onPress={() => router.back()} accessibilityRole="button">
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 4,
            }}
          >
            <Text style={[TYPE.labelLg, { color: rb.ink }]}>{PRODUCT.another}</Text>
            <Symbol name="chevronRight" size={17} color={rb.ink} />
          </View>
        </Pressable>
*/}
      </ScrollView>
    </View>
  );
}
