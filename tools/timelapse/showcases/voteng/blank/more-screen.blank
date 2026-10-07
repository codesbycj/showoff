import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// STEP 5.03 import the account card
// import { AccountCard } from '@/features/voteng/components/account-card';
// STEP 5.01 import the masthead
// import { PageHead } from '@/features/voteng/components/page-head';
// STEP 5.07 import the section head
// import { SectionHead } from '@/features/voteng/components/section-head';
// STEP 5.08 import the menu row
// import { SettingsGroup, SettingsRow } from '@/features/voteng/components/settings-row';
// STEP 5.29 import the tab bar
// import { TabBar } from '@/features/voteng/components/tab-bar';
// STEP 5.16 import the switch
// import { Toggle } from '@/features/voteng/components/toggle';
// STEP 5.05 import the polling unit
// import { UnitCard } from '@/features/voteng/components/unit-card';
import { NAV } from '@/features/voteng/data/election';
import { ABOUT, ACCOUNT, FOOTER, MORE_PAGE, PREFS, TOOLS, UNIT } from '@/features/voteng/data/more';
import { FONT, SP, vt, votengTheme } from '@/features/voteng/theme';

/**
 * Screen 5 — more.
 *
 * The personal half of the app. Home and results both answer "what is the
 * country doing"; nothing until here answers "what about my vote". So this tab
 * runs identity first — who you are and which unit you are registered at — then
 * the tools that act on that, then what the app may send you, then the
 * paperwork.
 */
export default function VotengMore() {
  const insets = useSafeAreaInsets();
  const [alerts, setAlerts] = useState<Record<string, boolean>>(
    Object.fromEntries(PREFS.map((p) => [p.key, p.on])),
  );

  return (
    <View style={[votengTheme, { flex: 1, backgroundColor: vt.canvas }]}>
      <StatusBar style="dark" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingTop: insets.top, paddingBottom: SP.xl }}
      >
{/* STEP 5.02 name the page
        <PageHead title={MORE_PAGE.title} subtitle={MORE_PAGE.subtitle} />
*/}

{/* STEP 5.04 who is signed in
        <View style={{ paddingHorizontal: SP.margin, marginTop: SP.md }}>
          <AccountCard
            name={ACCOUNT.name}
            meta={ACCOUNT.meta}
            voterId={ACCOUNT.voterId}
            action={ACCOUNT.action}
          />
        </View>
*/}

{/* STEP 5.06 where they vote
        <View style={{ paddingHorizontal: SP.margin, marginTop: SP.md }}>
          <UnitCard
            label={UNIT.label}
            name={UNIT.name}
            code={UNIT.code}
            where={`${UNIT.lga}, ${UNIT.state}`}
            status={UNIT.status}
          />
        </View>
*/}

{/* STEP 5.09 name the tools
        <View style={{ paddingHorizontal: SP.margin, marginTop: SP.lg + 4 }}>
          <SectionHead title={MORE_PAGE.toolsTitle} />
        </View>
*/}

{/* STEP 5.10 room for the menu
        <View style={{ paddingHorizontal: SP.margin, marginTop: 10 }}>
          <SettingsGroup>
            {TOOLS.map((row, i) => (
              <SettingsRow key={row.key} row={row} divided={i > 0} />
            ))}
          </SettingsGroup>
        </View>
*/}

{/* STEP 5.15 name the alerts
        <View style={{ paddingHorizontal: SP.margin, marginTop: SP.lg + 4 }}>
          <SectionHead title={MORE_PAGE.prefsTitle} />
        </View>
*/}

{/* STEP 5.17 room for the switches
        <View style={{ paddingHorizontal: SP.margin, marginTop: 10 }}>
          <SettingsGroup>
            {PREFS.map((p, i) => (
              <SettingsRow
                key={p.key}
                row={{ label: p.label, note: p.note }}
                divided={i > 0}
                right={
                  <Toggle
                    on={alerts[p.key]}
                    onChange={(next) => setAlerts((a) => ({ ...a, [p.key]: next }))}
                  />
                }
              />
            ))}
          </SettingsGroup>
        </View>
*/}

{/* STEP 5.21 name the paperwork
        <View style={{ paddingHorizontal: SP.margin, marginTop: SP.lg + 4 }}>
          <SectionHead title={MORE_PAGE.aboutTitle} />
        </View>
*/}

{/* STEP 5.22 the about rows, uncarded | FIX 5.28 a group needs its card
        <View style={{ paddingHorizontal: SP.margin, marginTop: 10, gap: 2 }}>
          {ABOUT.map((row, i) => (
            <SettingsRow key={row.key} row={row} divided={i > 0} />
          ))}
        </View>
*/}

{/* STEP 5.27 the about group
        <View style={{ paddingHorizontal: SP.margin, marginTop: 10 }}>
          <SettingsGroup>
            {ABOUT.map((row, i) => (
              <SettingsRow key={row.key} row={row} divided={i > 0} />
            ))}
          </SettingsGroup>
        </View>
*/}

{/* STEP 5.30 sign the build
        <Text
          style={{
            marginTop: SP.lg + 4,
            textAlign: 'center',
            fontFamily: FONT.medium,
            fontSize: 10.5,
            lineHeight: 15,
            letterSpacing: 0.2,
            color: vt.faint,
          }}
        >
          {FOOTER}
        </Text>
*/}
      </ScrollView>

{/* STEP 5.31 pin the tab bar
      <TabBar
        items={NAV}
        active="more"
        inset={insets.bottom}
        onSelect={(k) => {
          const item = NAV.find((n) => n.key === k);
          if (item && k !== 'more') router.push(item.route);
        }}
      />
*/}
    </View>
  );
}
