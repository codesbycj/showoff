import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { ScrollView, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// STEP 1.08 somewhere to type a question
// import { AskBar } from '@/features/lumina/components/ask-bar';
// STEP 1.06 ask what they came for
// import { HeroGreeting } from '@/features/lumina/components/hero-greeting';
// STEP 1.04 three little bars
// import { MenuGlyph } from '@/features/lumina/components/menu-glyph';
// STEP 1.10 the upsell
// import { PromoBanner } from '@/features/lumina/components/promo-banner';
// STEP 1.03 round buttons
// import { RoundButton } from '@/features/lumina/components/round-button';
// STEP 1.18 name a section
// import { SectionHead } from '@/features/lumina/components/section-head';
// STEP 1.26 somewhere else to go
// import { DOCK_CLEARANCE, TabDock } from '@/features/lumina/components/tab-dock';
// STEP 1.22 one thing to do today
// import { TaskRow } from '@/features/lumina/components/task-row';
// STEP 1.12 the shortcut tiles
// import { ToolCard } from '@/features/lumina/components/tool-card';
// STEP 1.01 say hello
// import { UserPill } from '@/features/lumina/components/user-pill';
import { HOME, TABS, TASKS, TOOLS } from '@/features/lumina/data/home';
import { SP, ll, luminaTheme } from '@/features/lumina/theme';

/**
 * Screen 1 — the home dashboard.
 *
 * One scrolling column inside the page's 20dp margin, with the status bar
 * pinned above it and the nav dock floating over it, which is the reference's
 * own structure: a fixed header, a `flex-1 overflow-y-auto` body, and an
 * absolutely positioned nav.
 *
 * The reference draws its own iOS status bar in markup; here the OS draws the
 * real one and the column insets below it, which is what every other showcase
 * in this repo does and the only thing that is correct on the emulator.
 */
export default function LuminaHome() {
  const insets = useSafeAreaInsets();

  return (
    <View style={[luminaTheme, { flex: 1, backgroundColor: ll.bg }]}>
      <StatusBar style="dark" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: SP.margin,
          paddingTop: insets.top + 12,
          paddingBottom: 112,
        }}
      >
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: SP.xs,
          }}
        >
{/* STEP 1.02 whose phone this is
          <UserPill
            greeting={HOME.greeting}
            name={HOME.name}
            photo={require('../../../assets/images/lumina/student.jpg')}
            onPress={() => router.push('/lumina/profile')}
          />
*/}

{/* STEP 1.05 two shortcuts up top
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: SP.sm }}>
            <RoundButton
              icon="wand"
              tone="lime"
              iconSize={15}
              label="Quick AI magic"
              onPress={() => router.push('/lumina/chat')}
            />
            <RoundButton glyph={<MenuGlyph size={15} />} label="Open menu" />
          </View>
*/}
        </View>

        <View style={{ marginTop: SP.md, marginBottom: SP.margin }}>
{/* STEP 1.07 need help studying today?
          <HeroGreeting top={HOME.headlineTop} bottom={HOME.headlineBottom} />
*/}
        </View>

{/* STEP 1.09 the ask bar
        <AskBar
          placeholder={HOME.askPlaceholder}
          onAsk={() => router.push('/lumina/chat')}
          onScreen={() => router.push('/lumina/chat')}
          onCamera={() => router.push('/lumina/chat')}
          onMic={() => router.push('/lumina/chat')}
        />
*/}

        <View style={{ marginTop: SP.margin }}>
{/* STEP 1.11 unlock study pro
          <PromoBanner title={HOME.promo.title} body={HOME.promo.body} cta={HOME.promo.cta} />
*/}
        </View>

{/* STEP 1.13 a row for the tools
        <View
          style={{
            flexDirection: 'row',
            gap: 10,
            marginTop: SP.margin,
            // MISTAKE 1.14 the three tiles came in stacked on top of each other
            flexDirection: 'column',
          }}
        >
          {TOOLS.map((tool) => (
            <ToolCard
              key={tool.key}
              tool={tool}
              onPress={() => router.push(tool.key === 'books' ? '/lumina/saved' : '/lumina/chat')}
            />
          ))}
        </View>
*/}

        <View style={{ marginTop: SP.lg, paddingHorizontal: SP.xs }}>
{/* STEP 1.20 a heading nobody asked for | FIX 1.21 take it back out
          <SectionHead title="Recently Viewed" />
*/}

{/* STEP 1.19 what is due today
          <SectionHead
            title={HOME.tasksTitle}
            action={HOME.tasksAction}
            onAction={() => router.push('/lumina/saved')}
          />
*/}
        </View>

        <View style={{ marginTop: 12, gap: 12 }}>
{/* STEP 1.23 line the tasks up
          {TASKS.map((task) => (
            <TaskRow key={task.key} task={task} onPress={() => router.push('/lumina/chat')} />
          ))}
*/}
        </View>
      </ScrollView>

      <View
        style={{
          position: 'absolute',
          left: SP.margin,
          right: SP.margin,
          bottom: Math.max(insets.bottom, 16) + 8,
        }}
      >
{/* STEP 1.27 the tab bar
        <TabDock
          active="home"
          onSelect={(key) => {
            const tab = TABS.find((t) => t.key === key);
            if (tab && key !== 'home') router.push(tab.route);
          }}
        />
*/}
      </View>
    </View>
  );
}
