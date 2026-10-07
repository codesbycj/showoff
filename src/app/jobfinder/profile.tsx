import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { Pencil, Share } from 'lucide-react-native';
import { useState } from 'react';
import { ScrollView, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// STEP 6.13 a case study
// import { CaseStudyCard } from '@/features/jobfinder/components/case-study-card';
// STEP 6.09 four ways to read a portfolio
// import { FilterPills } from '@/features/jobfinder/components/filter-pills';
import { IconButton } from '@/features/jobfinder/components/icon-button';
// STEP 6.03 the card that says who this is
// import { ProfileCard } from '@/features/jobfinder/components/profile-card';
// STEP 6.01 back, share, edit
// import { ScreenHead } from '@/features/jobfinder/components/screen-head';
// STEP 6.11 name the section
// import { SectionHead } from '@/features/jobfinder/components/section-head';
// STEP 6.17 what he can do, and the CV
// import { SkillsPanel } from '@/features/jobfinder/components/skills-panel';
// STEP 6.19 the dock, on the profile tab
// import { DOCK_CLEARANCE, TabBar } from '@/features/jobfinder/components/tab-bar';
import { TABS } from '@/features/jobfinder/data/jobs';
import { CASE_STUDIES, PROFILE } from '@/features/jobfinder/data/profile';
import { jf, jobfinderTheme } from '@/features/jobfinder/theme';

/**
 * Screen 6 — the portfolio profile.
 *
 * Everything scrolls here, including the header row, which is the difference
 * between this screen and messages: there is nothing on it you need to keep
 * reaching for while you read.
 *
 * The gutter is 24dp throughout rather than the feed's 20dp. That is the
 * reference's own choice and it is what makes the profile read as a document
 * rather than a list.
 */
export default function JobFinderProfile() {
  const insets = useSafeAreaInsets();
  const [tab, setTab] = useState<string>(PROFILE.activeTab);

  return (
    <View style={[jobfinderTheme, { flex: 1, backgroundColor: jf.bg }]}>
      <StatusBar style="dark" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 24,
          paddingTop: insets.top + 12,
          paddingBottom: 24,
        }}
      >
{/* STEP 6.02 label the screen
        <ScreenHead
          title={PROFILE.navTitle}
          caps
          onBack={() => router.back()}
          right={
            <>
              <IconButton icon={Share} accessibilityLabel="Share profile" />
              <IconButton icon={Pencil} accessibilityLabel="Edit profile" />
            </>
          }
        />
*/}

{/* STEP 6.04 drop the card in
        <View style={{ marginTop: 20 }}>
          <ProfileCard photo={require('../../../assets/images/jobfinder/george-profile.jpg')} />
        </View>
*/}

{/* STEP 6.10 the portfolio tabs
        <View style={{ marginTop: 20 }}>
          <FilterPills items={PROFILE.tabs} active={tab} onSelect={setTab} gutter={24} />
        </View>
*/}

{/* STEP 6.12 three of eighteen
        <View style={{ marginTop: 16 }}>
          <SectionHead title={PROFILE.caseStudiesTitle} note={PROFILE.caseStudiesCount} />
        </View>
*/}

{/* STEP 6.14 the work itself
        <View style={{ marginTop: 14, gap: 14 }}>
          {CASE_STUDIES.map((study) => (
            <CaseStudyCard key={study.key} study={study} />
          ))}
        </View>
*/}

{/* STEP 6.18 endorsed, and downloadable
        <View style={{ marginTop: 24 }}>
          <SkillsPanel />
        </View>
*/}
      </ScrollView>

{/* STEP 6.20 float the dock
      <View
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: Math.max(insets.bottom, 12) + 12,
        }}
      >
        <TabBar
          active="profile"
          onSelect={(key) => {
            const next = TABS.find((t) => t.key === key);
            if (next && key !== 'profile') router.push(next.route);
          }}
        />
      </View>
*/}
    </View>
  );
}
