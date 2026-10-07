import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { ListFilter, Search } from 'lucide-react-native';
import { useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// STEP 4.04 Saved, Applied, Archived
// import { FilterPills } from '@/features/jobfinder/components/filter-pills';
import { IconButton } from '@/features/jobfinder/components/icon-button';
// STEP 4.06 a saved listing
// import { SavedJobCard } from '@/features/jobfinder/components/saved-job-card';
// STEP 4.01 back, and two shortcuts
// import { ScreenHead } from '@/features/jobfinder/components/screen-head';
// STEP 4.11 the dock again, on its own tab
// import { DOCK_CLEARANCE, TabBar } from '@/features/jobfinder/components/tab-bar';
import { TABS } from '@/features/jobfinder/data/jobs';
import { SAVED, SAVED_JOBS } from '@/features/jobfinder/data/saved';
import { FONT, SP, TYPE, jf, jobfinderTheme } from '@/features/jobfinder/theme';

/**
 * Screen 4 — saved jobs.
 *
 * The header block sits outside the scroll and the cards scroll under it, which
 * is why the two carry different gutters: 24dp for the header, 20dp for the
 * cards. That is the reference's own split, and it is what lets the pill row
 * bleed past the header's inset without the cards doing the same.
 *
 * The bookmark on each card toggles for real. It is the one control on this
 * screen that has state, and a saved-jobs screen whose unsave button does
 * nothing is the kind of thing a recording shows up immediately.
 */
export default function JobFinderSaved() {
  const insets = useSafeAreaInsets();
  const [tab, setTab] = useState<string>(SAVED.activeTab);
  const [unsaved, setUnsaved] = useState<readonly string[]>([]);

  return (
    <View style={[jobfinderTheme, { flex: 1, backgroundColor: jf.bg }]}>
      <StatusBar style="dark" />

      <View style={{ paddingTop: insets.top + SP.lg, paddingHorizontal: 24 }}>
{/* STEP 4.02 the controls across the top
        <ScreenHead
          onBack={() => router.back()}
          right={
            <>
              <IconButton icon={Search} accessibilityLabel="Search saved" />
              <IconButton icon={ListFilter} accessibilityLabel="Saved filters" />
            </>
          }
        />
*/}

{/* STEP 4.03 say where we are
        <View
          style={{
            marginTop: 16,
            // MISTAKE 4.13 the heading came in centred
            alignItems: 'center',
          }}
        >
          <Text style={[TYPE.screenTitle, { fontFamily: FONT.extrabold, color: jf.ink }]}>
            {SAVED.title}
          </Text>
          <Text style={[TYPE.bodyMedium, { color: jf.muted, marginTop: 2 }]}>{SAVED.subtitle}</Text>
        </View>
*/}

{/* STEP 4.05 three ways to slice it
        <View style={{ marginTop: 16 }}>
          <FilterPills items={SAVED.tabs} active={tab} onSelect={setTab} gutter={24} />
        </View>
*/}
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: SP.gutter,
          paddingTop: SP.md,
          paddingBottom: 24,
          gap: 14,
        }}
      >
{/* STEP 4.07 the cards you kept
        {SAVED_JOBS.map((job) => (
          <SavedJobCard
            key={job.key}
            job={job}
            saved={!unsaved.includes(job.key)}
            onToggleSave={() =>
              setUnsaved((list) =>
                list.includes(job.key) ? list.filter((k) => k !== job.key) : [...list, job.key],
              )
            }
            onOpen={() => router.push({ pathname: '/jobfinder/job', params: { key: job.detail } })}
          />
        ))}
*/}
      </ScrollView>

{/* STEP 4.12 float the dock
      <View
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: Math.max(insets.bottom, 12) + 12,
        }}
      >
        <TabBar
          active="saved"
          onSelect={(key) => {
            const next = TABS.find((t) => t.key === key);
            if (next && key !== 'saved') router.push(next.route);
          }}
        />
      </View>
*/}
    </View>
  );
}
