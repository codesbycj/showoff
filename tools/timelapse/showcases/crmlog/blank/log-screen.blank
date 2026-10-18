import { StatusBar } from 'expo-status-bar';
import { ScrollView, View } from 'react-native';

// STEP 1.01 the header
// import { AppBar } from '@/features/crmlog/components/app-bar';
// STEP 1.05 the deals
// import { DealCard } from '@/features/crmlog/components/deal-card';
import { entries, header } from '@/features/crmlog/data/history';
import { CARD_GAP, CARDS_TOP, HEADER_TOP, MARGIN } from '@/features/crmlog/layout';
import { cl } from '@/features/crmlog/theme';
import { useInsets } from '@/features/crmlog/use-insets';

/**
 * A sales CRM — the interaction history.
 *
 * Assembly only: a header and a stack of deals, each one a card in its own
 * colour.
 *
 * The colours come from the data rather than from the card, so adding a fifth
 * deal is a line in `data/history.ts` and not a new variant of a component.
 *
 * Every handler is empty on purpose. The other two screens of this design are
 * their own showcases with their own slugs, so there is nothing to push to
 * yet; what matters is that the decision is made here.
 */
export default function CrmLog() {
  const insets = useInsets();

  return (
    <View style={{ flex: 1, backgroundColor: cl.canvas }}>
      <StatusBar style="light" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: MARGIN,
          paddingTop: insets.top + HEADER_TOP,
          paddingBottom: insets.bottom + 16,
        }}
      >
        {/* STEP 1.02 across the top
        <AppBar one={header.one} two={header.two} />
        */}

        {/* STEP 1.06 stacked down the page
        <View style={{ marginTop: CARDS_TOP, gap: CARD_GAP }}>
          {entries.map((entry) => (
            <DealCard
              key={entry.key}
              date={entry.date}
              one={entry.one}
              two={entry.two}
              amount={entry.amount}
              color={entry.color}
            />
          ))}
        </View>
        */}
      </ScrollView>
    </View>
  );
}
