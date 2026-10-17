import { ScrollView, View } from 'react-native';
import { StatusBar } from 'expo-status-bar';

// STEP 1.26 who to talk to
// import { AgentRow } from '@/features/marina/components/agent-row';
// STEP 1.18 what comes with it
// import { AmenityChips } from '@/features/marina/components/amenity-chips';
// STEP 1.30 the prices, and the way to book
// import { BookingBar } from '@/features/marina/components/booking-bar';
// STEP 1.01 the boat, from the air
// import { Hero } from '@/features/marina/components/hero';
// STEP 1.15 a section needs a name
// import { SectionHeading } from '@/features/marina/components/section-heading';
import { T } from '@/features/marina/components/text';
// STEP 1.12 what it is called
// import { TitleBlock } from '@/features/marina/components/title-block';
// STEP 1.08 what kind of boat, and how it rates
// import { TypeRow } from '@/features/marina/components/type-row';
import { AGENT, AMENITIES, BOAT, PRICE, SECTIONS } from '@/features/marina/data/boat';
import { MARGIN, SCROLL_BOTTOM_PAD, SECTION_GAP } from '@/features/marina/layout';
import { mr } from '@/features/marina/theme';
import { useInsets } from '@/features/marina/use-insets';

/**
 * Marina — boat detail.
 *
 * Assembly only. Every band is a component and this file stacks them: the
 * full-bleed hero, then a scrolling body at the page margin, then the booking
 * bar fixed over the foot of the screen.
 */
export default function MarinaDetail() {
  const insets = useInsets();

  return (
    <View style={{ flex: 1, backgroundColor: mr.canvas }}>
      <StatusBar style="light" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: SCROLL_BOTTOM_PAD + insets.bottom }}
      >
        {/* STEP 1.02 lay it across the top
        <Hero topInset={insets.top} />
        */}

        <View style={{ padding: MARGIN, gap: SECTION_GAP }}>
          {/* STEP 1.09 say what it is
          <TypeRow kind={BOAT.kind} rating={BOAT.rating} reviews={BOAT.reviews} />
          */}

          {/* STEP 1.13 and what it is called
          <TitleBlock name={BOAT.name} hull={BOAT.hull} capacity={BOAT.capacity} />
          */}

          {/*
            Each section is a heading and its content, staged as two blocks
            inside an uncommented wrapper. One STEP block cannot be nested
            inside another — the inner block's closing marker would end the
            outer one early and the file would stop parsing.
          */}
          <View style={{ gap: 12 }}>
            {/* STEP 1.16 name the amenities
            <SectionHeading accent>{SECTIONS.amenities}</SectionHeading>
            */}

            {/* STEP 1.19 and list them
            <AmenityChips amenities={AMENITIES} />
            */}
          </View>

          <View style={{ gap: 8 }}>
            {/* STEP 1.23 name the description
            <SectionHeading>{SECTIONS.description}</SectionHeading>
            */}

            {/* STEP 1.24 and write it
            <T variant="body" color={mr.muted}>
              {BOAT.description}
            </T>
            */}
          </View>

          <View style={{ gap: 14 }}>
            {/* STEP 1.25 name the agent
            <SectionHeading>{SECTIONS.agent}</SectionHeading>
            */}

            {/* STEP 1.27 and introduce him
            <AgentRow name={AGENT.name} role={AGENT.role} avatar={AGENT.avatar} />
            */}
          </View>
        </View>
      </ScrollView>

      {/* STEP 1.31 pin the booking bar to the foot
      <BookingBar
        label={PRICE.label}
        rates={PRICE.rates}
        cta={PRICE.cta}
        bottomInset={insets.bottom}
      />
      */}
    </View>
  );
}
