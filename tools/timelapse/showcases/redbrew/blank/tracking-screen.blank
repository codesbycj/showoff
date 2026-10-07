import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { ScrollView, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// STEP 4.01 a header to reuse
// import { DetailHeader } from '@/features/redbrew/components/product-parts';
// STEP 4.02 the tracking parts
// import { AddressRow, DispatchCard, OrderCard, ProgressCard, SupportBar, } from '@/features/redbrew/components/tracking-parts';
import { TRACKING } from '@/features/redbrew/data/tracking';
import { SP, rb, redbrewTheme } from '@/features/redbrew/theme';

/**
 * Screen 4 — live order tracking.
 *
 * Four stacked cards with the crimson support bar pinned to the bottom. The bar
 * sits outside the scroller because the reference keeps it reachable however
 * far the timeline runs — it is the one element on this screen that never
 * scrolls away.
 *
 * No tab bar: the reference replaces it with the support bar.
 */
export default function RedbrewTracking() {
  const insets = useSafeAreaInsets();

  return (
    <View style={[redbrewTheme, { flex: 1, backgroundColor: rb.bg }]}>
      <StatusBar style="dark" />

      <View style={{ paddingTop: insets.top, paddingHorizontal: SP.margin }}>
{/* STEP 4.03 name the screen
        <DetailHeader
          title={TRACKING.title}
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
          paddingTop: SP.sm,
          paddingBottom: SP.lg,
          gap: SP.md,
        }}
      >
{/* STEP 4.04 what they ordered
        <OrderCard />
*/}
{/* STEP 4.05 which order it is
        <DispatchCard />
*/}
{/* STEP 4.06 how far along
        <View
          style={{
            // MISTAKE 4.07 the timeline came in pushed off to one side
            paddingLeft: 64,
          }}
        >
          <ProgressCard />
        </View>
*/}
{/* STEP 4.12 where it is going
        <AddressRow onEdit={() => router.push('/redbrew/profile')} />
*/}
      </ScrollView>

      <View
        style={{
          paddingHorizontal: SP.margin,
          paddingBottom: Math.max(insets.bottom, 12) + 8,
        }}
      >
{/* STEP 4.13 someone to ask
        <SupportBar
          onChat={() => router.push('/redbrew/orders')}
          onCall={() => router.push('/redbrew/profile')}
        />
*/}
      </View>
    </View>
  );
}
