import { StatusBar } from 'expo-status-bar';
import { ScrollView, View } from 'react-native';

// STEP 1.16 a way to start another
// import { AddButton } from '@/features/sugarjourneys/components/add-button';
// STEP 1.07 the journeys
// import { JourneyCard } from '@/features/sugarjourneys/components/journey-card';
import { T } from '@/features/sugarjourneys/components/text';
// STEP 1.01 the header
// import { TopBar } from '@/features/sugarjourneys/components/top-bar';
import { header, journeys } from '@/features/sugarjourneys/data/journeys';
import {
  CARD_GAP,
  CARDS_TOP,
  FAB_BOTTOM,
  FAB_SIZE,
  HEADER_TOP,
  MARGIN,
  TITLE_TOP,
} from '@/features/sugarjourneys/layout';
import { sg } from '@/features/sugarjourneys/theme';
import { useInsets } from '@/features/sugarjourneys/use-insets';

/**
 * Sugar CRM — Customer Journeys.
 *
 * Assembly only: the product's header, what the screen is, and the journeys
 * themselves, with a button to start another floating over them.
 *
 * The list runs past the bottom of the phone on purpose — the reference's
 * second card is cut by the edge, which is what says there are more.
 *
 * Every handler is empty on purpose. The other two screens of this design are
 * their own showcases with their own slugs, so there is nothing to push to
 * yet; what matters is that the decision is made here.
 */
export default function SugarJourneys() {
  const insets = useInsets();

  return (
    <View style={{ flex: 1, backgroundColor: sg.canvas }}>
      <StatusBar style="dark" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: MARGIN,
          paddingTop: insets.top + HEADER_TOP,
          paddingBottom: FAB_SIZE + FAB_BOTTOM + insets.bottom + 12,
        }}
      >
        {/* STEP 1.02 across the top
        <TopBar />
        */}

        {/* STEP 1.06 what the screen is
        <View style={{ marginTop: TITLE_TOP }}>
          <T variant="title" color={sg.ink}>
            {header.one}
          </T>
          <T variant="title" color={sg.ink}>
            {header.two}
          </T>
        </View>
        */}

        {/* STEP 1.08 one card each
        <View style={{ marginTop: CARDS_TOP, gap: CARD_GAP }}>
          {journeys.map((j) => (
            <JourneyCard
              key={j.key}
              title={j.title}
              team={j.team}
              allocation={j.allocation}
              stats={j.stats}
              footer={j.footer}
            />
          ))}
        </View>
        */}
      </ScrollView>

      <View
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: insets.bottom + FAB_BOTTOM,
          alignItems: 'center',
        }}
        pointerEvents="box-none"
      >
        {/* STEP 1.17 floating over the lot
        <AddButton />
        */}
      </View>
    </View>
  );
}
