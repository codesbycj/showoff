import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { ScrollView, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// STEP 3.01 the shared kit
// import { AppHeader, Chip, PrimaryCta, TabBar } from '@/features/redbrew/components/bits';
// STEP 3.02 the cart parts
// import { CartRow, DropoffRow, SummaryCard } from '@/features/redbrew/components/cart-parts';
import { OrderToggle } from '@/features/redbrew/components/home-cards';
import { CART, ITEMS } from '@/features/redbrew/data/cart';
import { TABS } from '@/features/redbrew/data/nav';
import { HOME } from '@/features/redbrew/data/home';
import { SP, TYPE, rb, redbrewTheme } from '@/features/redbrew/theme';

/**
 * Screen 3 — my cart.
 *
 * The same segmented toggle as the menu screen, with Delivery selected instead
 * of Pickup — which is the whole reason that component takes its mode as a prop
 * rather than owning it.
 *
 * The CTA scrolls with the content rather than floating: the reference puts it
 * after the summary card, above the tab bar, and nothing overlaps it.
 */
export default function RedbrewCart() {
  const insets = useSafeAreaInsets();

  return (
    <View style={[redbrewTheme, { flex: 1, backgroundColor: rb.bg }]}>
      <StatusBar style="dark" />

      <View style={{ paddingTop: insets.top, paddingHorizontal: SP.margin }}>
{/* STEP 3.03 name the screen
        <AppHeader
          section={CART.section}
          store={HOME.store}
          avatar={require('../../../assets/images/redbrew/alex.jpg')}
          onBell={() => router.push('/redbrew/orders')}
          onAvatar={() => router.push('/redbrew/profile')}
          onStore={() => router.push('/redbrew/profile')}
        />
*/}
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: SP.margin,
          paddingBottom: SP.lg,
          gap: SP.lg,
        }}
      >
{/* STEP 3.04 how much is in it
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: 12,
          }}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
            <Text style={[TYPE.headlineLg, { color: rb.ink }]}>{CART.title}</Text>
            <Chip label={CART.count} tone="crimson" caps />
          </View>

          <Chip label={CART.live} tone="mint" icon="localFireDepartment" />
        </View>
*/}

{/* STEP 3.05 delivery this time
        <OrderToggle mode="delivery" />
*/}

{/* STEP 3.06 stack the cups
        <View
          style={{
            gap: SP.md,
            // MISTAKE 3.07 the cups came in inset from both edges
            marginHorizontal: 40,
          }}
        >
          {ITEMS.map((item) => (
            <CartRow
              key={item.key}
              item={item}
              onRemove={() => router.push('/redbrew')}
              onFavourite={() => router.push('/redbrew')}
            />
          ))}
        </View>
*/}

{/* STEP 3.11 where to leave it
        <DropoffRow onEdit={() => router.push('/redbrew/profile')} />
*/}

{/* STEP 3.12 add it up
        <SummaryCard />
*/}

{/* STEP 3.13 and pay
        <PrimaryCta
          label={CART.cta}
          price={CART.total}
          trailingIcon="arrowForward"
          onPress={() => router.push('/redbrew/tracking')}
        />
*/}
      </ScrollView>

      <View style={{ paddingBottom: Math.max(insets.bottom, 8) }}>
{/* STEP 3.14 the tab bar
        <TabBar
          active="cart"
          onSelect={(key) => {
            const tab = TABS.find((t) => t.key === key);
            if (tab && key !== 'cart') router.push(tab.route);
          }}
        />
*/}
      </View>
    </View>
  );
}
