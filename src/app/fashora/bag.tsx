import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { ScrollView, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// STEP 3.13 import the address card
// import { AddressCard } from '@/features/fashora/components/address-card';
// STEP 3.01 import the app bar
// import { AppBar } from '@/features/fashora/components/app-bar';
// STEP 3.11 import the applied pill
// import { AppliedPromo } from '@/features/fashora/components/applied-promo';
// STEP 3.03 import the bag head
// import { BagHead } from '@/features/fashora/components/bag-head';
// STEP 3.05 import the line item
// import { CartItem } from '@/features/fashora/components/cart-item';
// STEP 3.27 import the checkout bar
// import { CheckoutBar } from '@/features/fashora/components/checkout-bar';
// STEP 3.21 import the order summary
// import { OrderSummary } from '@/features/fashora/components/order-summary';
// STEP 3.16 import the payment tiles
// import { PaymentOptions } from '@/features/fashora/components/payment-options';
// STEP 3.10 import the promo field
// import { PromoField } from '@/features/fashora/components/promo-field';
import { BAG, ITEMS, PAYMENTS, SUMMARY } from '@/features/fashora/data/bag';
import { SP, fa, fashoraTheme } from '@/features/fashora/theme';

/** Screen 3 — the shopping bag and checkout. */
export default function FashoraBag() {
  const insets = useSafeAreaInsets();
  const [payment, setPayment] = useState('apple');

  return (
    <View style={[fashoraTheme, { flex: 1, backgroundColor: fa.surface }]}>
      <StatusBar style="dark" />

{/* STEP 3.02 the bar, named for the screen
      <AppBar title={BAG.title} action="share" onBack={() => router.back()} inset={insets.top} />
*/}

      <ScrollView showsVerticalScrollIndicator={false}>
{/* STEP 3.04 how much is in the bag
        <BagHead heading={BAG.heading} count={BAG.count} shipping={BAG.shipping} />
*/}

        <View style={{ paddingHorizontal: SP.marginMobile, gap: SP.lg }}>
{/* STEP 3.06 what is in it
          <View style={{ gap: SP.gutterMobile }}>
            {ITEMS.map((item) => (
              <CartItem key={item.key} item={item} />
            ))}
          </View>
*/}

{/* STEP 3.12 a code to enter
          <View style={{ gap: SP.sm }}>
            <PromoField code={BAG.promoCode} apply={BAG.apply} />
            <AppliedPromo code={BAG.promoCode} note={BAG.appliedNote} />
          </View>
*/}

{/* STEP 3.14 where it is going
          <AddressCard
            label={BAG.addressLabel}
            badge={BAG.addressDefault}
            address={BAG.address}
            // MISTAKE 3.15 the saved address labelled as the one being entered
            address={BAG.addressLabel}
            action={BAG.change}
          />
*/}

{/* STEP 3.17 how it gets paid for
          <PaymentOptions
            label={BAG.paymentLabel}
            items={PAYMENTS}
            selected={payment}
            onSelect={setPayment}
          />
*/}

{/* STEP 3.22 and what it comes to
          <OrderSummary
            title={BAG.summaryTitle}
            lines={SUMMARY}
            totalLabel={BAG.totalLabel}
            totalNote={BAG.totalNote}
            total={BAG.total}
          />
*/}
        </View>
      </ScrollView>

{/* STEP 3.28 the button that ends it
      <CheckoutBar label={BAG.checkout} total={BAG.total} inset={insets.bottom} />
*/}
    </View>
  );
}
