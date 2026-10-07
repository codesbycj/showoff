import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { Image } from 'expo-image';
import { Pressable, ScrollView, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// STEP 5.07 import the booking card
// import { BookingCard } from '@/features/travelexa/components/booking-card';
// STEP 5.21 import the dock
// import { Dock } from '@/features/travelexa/components/dock';
// STEP 5.01 import the identity card
// import { ProfileCard } from '@/features/travelexa/components/profile-card';
// STEP 5.06 import the section head
// import { SectionHead } from '@/features/travelexa/components/section-head';
// STEP 5.13 import the settings row
// import { SettingsRow } from '@/features/travelexa/components/settings-row';
import { Symbol } from '@/features/travelexa/components/symbol';
import { NAV } from '@/features/travelexa/data/home';
import {
  BOOKING,
  BOOKINGS_HEAD,
  DREAMS,
  DREAMS_HEAD,
  LOGOUT,
  PROFILE,
  SETTINGS,
  SETTINGS_HEAD,
  STATS,
} from '@/features/travelexa/data/profile';
import { ELEV, R, SP, TYPE, travelexaTheme, tx } from '@/features/travelexa/theme';

/**
 * Screen 5 — profile and bookings.
 *
 * The settings rows share one card with hairlines between them rather than
 * sitting in five separate cards, which is how the export groups them — the
 * dividers are drawn by the list, not by the row, so the last row has none.
 *
 * The log-out control is the only terracotta text on the screen, which is the
 * design system's rule for that colour: used sparingly, for status rather than
 * decoration.
 */
export default function TravelexaProfile() {
  const insets = useSafeAreaInsets();
  const [savedBooking, setSavedBooking] = useState(false);

  return (
    <View style={[travelexaTheme, { flex: 1, backgroundColor: tx.surface }]}>
      <StatusBar style="dark" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingTop: insets.top + SP.md,
          paddingBottom: insets.bottom + 112,
          gap: SP.lg,
        }}
      >
{/* STEP 5.02 who this is
        <ProfileCard
          name={PROFILE.name}
          handle={PROFILE.handle}
          level={PROFILE.level}
          photo={PROFILE.photo}
          stats={STATS}
        />
*/}

{/* STEP 5.08 what is already booked
        <View style={{ gap: SP.md }}>
          <SectionHead
            title={BOOKINGS_HEAD.title}
            action={BOOKINGS_HEAD.action}
            tone="ink"
            onAction={() => router.push('/travelexa/saved')}
          />

          <BookingCard
            status={BOOKING.status}
            place={BOOKING.place}
            tour={BOOKING.tour}
            dates={BOOKING.dates}
            gate={BOOKING.gate}
            reference={BOOKING.reference}
            image={BOOKING.image}
            saved={savedBooking}
            onToggleSave={() => setSavedBooking((v) => !v)}
          />
        </View>
*/}

{/* STEP 5.09 room for the wishlist
        <View style={{ gap: SP.md }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'space-between',
              paddingHorizontal: SP.margin,
            }}
          >
            <Text style={{ ...TYPE.headlineSm, color: tx.onSurface }}>{DREAMS_HEAD.title}</Text>
            <Text style={{ ...TYPE.labelSm, color: tx.onSurfaceVariant }}>{DREAMS_HEAD.count}</Text>
          </View>

          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{
              paddingHorizontal: SP.margin,
              gap: SP.md,
              paddingBottom: SP.sm,
            }}
          >
            {DREAMS.map((d) => (
              <View
                key={d.key}
                style={{
                  width: 140,
                  borderRadius: R.DEFAULT,
                  backgroundColor: tx.surfaceContainerLowest,
                  padding: SP.sm,
                  ...ELEV.card,
                }}
              >
                <View style={{ height: 110, borderRadius: 12, overflow: 'hidden' }}>
                  <Image
                    source={d.image}
                    style={{ width: '100%', height: '100%' }}
                    contentFit="cover"
                  />
                  <View
                    style={{
                      position: 'absolute',
                      top: 6,
                      right: 6,
                      width: 24,
                      height: 24,
                      borderRadius: R.full,
                      backgroundColor: tx.surfaceContainerLowest,
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Symbol name="favorite" size={14} color={tx.secondary} />
                  </View>
                </View>
                <Text
                  numberOfLines={1}
                  style={{ ...TYPE.labelMd, marginTop: SP.sm, color: tx.onSurface }}
                >
                  {d.name}
                </Text>
                <Text style={{ ...TYPE.labelSm, color: tx.onSurfaceVariant }}>{d.country}</Text>
              </View>
            ))}
          </ScrollView>
        </View>
*/}

{/* STEP 5.14 room for the settings
        <View style={{ gap: SP.sm }}>
          <Text style={{ ...TYPE.headlineSm, paddingHorizontal: SP.margin, color: tx.onSurface }}>
            {SETTINGS_HEAD}
          </Text>

          <View
            style={{
              marginHorizontal: SP.margin,
              borderRadius: R.md,
              backgroundColor: tx.surfaceContainerLowest,
              paddingVertical: SP.xs,
              ...ELEV.card,
            }}
          >
            {SETTINGS.map((s, i) => (
              <View key={s.key}>
                {i > 0 ? (
                  <View
                    style={{
                      height: 1,
                      marginLeft: SP.md + 44 + SP.md,
                      backgroundColor: tx.surfaceContainer,
                    }}
                  />
                ) : null}
                <SettingsRow item={s} />
              </View>
            ))}
          </View>
        </View>
*/}

{/* STEP 5.20 the way out
        <Pressable style={{ marginHorizontal: SP.margin }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              gap: SP.sm,
              height: 52,
              borderRadius: R.full,
              backgroundColor: tx.secondaryFixed,
              // MISTAKE 5.23 log out filled black, which reads as the primary action
              backgroundColor: tx.primary,
            }}
          >
            <Symbol name="logout" size={18} color={tx.secondary} />
            <Text style={{ ...TYPE.labelLg, color: tx.secondary }}>{LOGOUT}</Text>
          </View>
        </Pressable>
*/}
      </ScrollView>

{/* STEP 5.22 pin the dock
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
