import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { ScrollView, View } from 'react-native';

// STEP 1.01 import footer bar
// import { FooterBar } from '@/features/huddleevent/components/footer-bar';
// STEP 1.02 import going row
// import { GoingRow } from '@/features/huddleevent/components/going-row';
// STEP 1.03 import hero
// import { HeroImage } from '@/features/huddleevent/components/hero';
// STEP 1.04 import info card
// import { InfoCard } from '@/features/huddleevent/components/info-card';
// STEP 1.05 import text
// import { T } from '@/features/huddleevent/components/text';
import { copy } from '@/features/huddleevent/data/event';
import {
  GAP_ABOUT_BODY,
  GAP_BODY_GOING,
  GAP_INFO_ABOUT,
  MARGIN,
  SHEET_PAD,
  useEventLayout,
} from '@/features/huddleevent/layout';
import { ct, radius, type } from '@/features/huddleevent/theme';
import { useInsets } from '@/features/huddleevent/use-insets';

/**
 * Huddle — one hangout.
 *
 * Assembly only: the photograph and what it is, when and where, what it is
 * like, who is going, and the way in.
 *
 * The sheet is pulled up over the foot of the photograph by its own corner
 * radius, which is what makes it read as a sheet rather than as a second
 * block. The page scrolls behind an opaque footer whose height the scroll
 * content pays for, so nothing of the page can end up underneath it.
 */
export default function HuddleeventScreen() {
  const insets = useInsets();
  const { heroH, footerH } = useEventLayout();

  return (
    <View style={{ flex: 1, backgroundColor: ct.page }}>
      <StatusBar style="light" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: footerH + insets.bottom + 10 }}
      >
        {/* STEP 1.06 hero image
        <HeroImage height={heroH} insetTop={insets.top} onBack={() => router.back()} />
        */}

        <View
          style={{
            marginTop: -radius.sheet,
            backgroundColor: ct.page,
            borderTopLeftRadius: radius.sheet,
            borderTopRightRadius: radius.sheet,
            paddingHorizontal: MARGIN,
            paddingTop: SHEET_PAD,
          }}
        >
          {/* STEP 1.07 info card
          <InfoCard />
          */}

          {/* STEP 1.08 about
          <T
            variant="section"
            color={ct.ink}
            style={{ height: type.section.line, marginTop: GAP_INFO_ABOUT }}
          >
            {copy.about}
          </T>
          */}

          {/* STEP 1.09 body
          <T variant="body" color={ct.muted} style={{ marginTop: GAP_ABOUT_BODY }}>
            {copy.body}
          </T>
          */}

          {/* STEP 1.10 going row
          <View style={{ marginTop: GAP_BODY_GOING }}>
            <GoingRow />
          </View>
          */}
        </View>
      </ScrollView>

      {/* STEP 1.11 footer bar
      <FooterBar bottom={insets.bottom} />
      */}
      {/* STEP 1.12 a stray gap under it | FIX 1.13 take the gap back out
      <View style={{ height: 23 }} />
      */}
    </View>
  );
}
