import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { ScrollView, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// STEP 4.01 import the app bar
// import { AppBar } from '@/features/fashora/components/app-bar';
// STEP 4.21 import the delivery card
// import { DeliveryCard } from '@/features/fashora/components/delivery-card';
// STEP 4.33 import the dock
// import { Dock } from '@/features/fashora/components/dock';
// STEP 4.05 import the identity card
// import { IdentityCard } from '@/features/fashora/components/identity-card';
// STEP 4.31 import the sign-out
// import { LogoutButton } from '@/features/fashora/components/logout-button';
// STEP 4.15 import the order states
// import { OrderStatus } from '@/features/fashora/components/order-status';
// STEP 4.03 import the page title
// import { ScreenTitle } from '@/features/fashora/components/screen-title';
// STEP 4.13 import the section head
// import { SectionHead } from '@/features/fashora/components/section-head';
// STEP 4.24 import the settings list
// import { SettingsList } from '@/features/fashora/components/settings-list';
// STEP 4.08 import the stat tiles
// import { StatTiles } from '@/features/fashora/components/stat-tiles';
import { NAV } from '@/features/fashora/data/chrome';
import { DELIVERY, ORDER_STATES, PROFILE, SETTINGS, STATS } from '@/features/fashora/data/profile';
import { SP, fa, fashoraTheme } from '@/features/fashora/theme';

/** Screen 4 — the profile and order hub. */
export default function FashoraProfile() {
  const insets = useSafeAreaInsets();

  return (
    <View style={[fashoraTheme, { flex: 1, backgroundColor: fa.surface }]}>
      <StatusBar style="dark" />

{/* STEP 4.02 the brand bar again
      <AppBar action="notifications" inset={insets.top} />
*/}

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: SP.marginMobile,
          paddingBottom: insets.bottom + 112,
          gap: SP.md,
        }}
      >
{/* STEP 4.04 name the page
        <ScreenTitle title={PROFILE.title} />
*/}

{/* STEP 4.06 who is signed in
        <IdentityCard
          name={PROFILE.name}
          email={PROFILE.email}
          tier={PROFILE.tier}
          // MISTAKE 4.07 the membership tier reading back the account's email
          tier={PROFILE.email}
          portrait={PROFILE.portrait}
        />
*/}

{/* STEP 4.09 three counts
        <StatTiles items={STATS} />
*/}

        <View style={{ gap: SP.sm }}>
{/* STEP 4.14 name the orders section
          <View style={{ paddingHorizontal: SP.xs }}>
            <SectionHead title={PROFILE.orders} action={PROFILE.viewAll} accent />
          </View>
*/}

{/* STEP 4.16 the four states an order can be in
          <OrderStatus items={ORDER_STATES} />
*/}

{/* STEP 4.22 the one order in flight
          <DeliveryCard
            reference={DELIVERY.reference}
            placed={DELIVERY.placed}
            from={DELIVERY.from}
            to={DELIVERY.to}
            progress={DELIVERY.progress}
            thumbs={DELIVERY.thumbs}
            extra={DELIVERY.extra}
            cta={DELIVERY.cta}
          />
*/}
        </View>

        <View style={{ gap: SP.sm, paddingTop: SP.sm }}>
{/* STEP 4.23 name the account section
          <View style={{ paddingHorizontal: SP.xs }}>
            <SectionHead title={PROFILE.account} />
          </View>
*/}

{/* STEP 4.25 the rows under it
          <SettingsList items={SETTINGS} />
*/}
        </View>

{/* STEP 4.32 the way out
        <LogoutButton label={PROFILE.logout} />
*/}
      </ScrollView>

{/* STEP 4.34 pin the dock, lit on this tab
      <Dock
        items={NAV}
        active="profile"
        inset={insets.bottom}
        onSelect={(item) => {
          if (item.key !== 'profile') router.push(item.route as never);
        }}
      />
*/}
    </View>
  );
}
