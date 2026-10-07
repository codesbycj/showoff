import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { SquarePen } from 'lucide-react-native';
import { useState } from 'react';
import { ScrollView, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// STEP 5.01 a face and a title
// import { Avatar } from '@/features/jobfinder/components/avatar';
// STEP 5.05 All, Unread, Recruiters
// import { FilterPills } from '@/features/jobfinder/components/filter-pills';
import { IconButton } from '@/features/jobfinder/components/icon-button';
// STEP 5.07 one conversation
// import { MessageCard } from '@/features/jobfinder/components/message-card';
// STEP 5.03 somewhere to type
// import { SearchField } from '@/features/jobfinder/components/search-field';
// STEP 5.12 the dock, on the mail tab
// import { DOCK_CLEARANCE, TabBar } from '@/features/jobfinder/components/tab-bar';
import { TABS } from '@/features/jobfinder/data/jobs';
import { CONVERSATIONS, MESSAGES } from '@/features/jobfinder/data/messages';
import { FONT, SP, TYPE, jf, jobfinderTheme } from '@/features/jobfinder/theme';

/**
 * Screen 5 — messages.
 *
 * Header, search and filters are fixed; only the conversation list scrolls. That
 * is the reference's structure — the three fixed sections are `shrink-0` and the
 * list is the `flex-1` — and it matters on a phone, because a search box that
 * scrolls away is a search box you cannot reach while reading the list.
 */
export default function JobFinderMessages() {
  const insets = useSafeAreaInsets();
  const [filter, setFilter] = useState<string>(MESSAGES.activeFilter);

  return (
    <View style={[jobfinderTheme, { flex: 1, backgroundColor: jf.bg }]}>
      <StatusBar style="dark" />

      <View style={{ paddingTop: insets.top + SP.sm, paddingHorizontal: SP.gutter }}>
{/* STEP 5.02 who you are, and what this is
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}
        >
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 12 }}>
            <Avatar
              source={require('../../../assets/images/jobfinder/msg-me.jpg')}
              size={44}
              ring={2}
              dot={jf.online}
              onPress={() => router.push('/jobfinder/profile')}
            />
            <View>
              <Text
                style={{
                  fontFamily: FONT.extrabold,
                  fontSize: 20,
                  lineHeight: 25,
                  letterSpacing: -0.5,
                  color: jf.ink,
                }}
              >
                {MESSAGES.title}
              </Text>
              <Text style={[TYPE.meta, { color: jf.muted }]}>{MESSAGES.subtitle}</Text>
            </View>
          </View>

          <IconButton icon={SquarePen} accessibilityLabel="New message" />
        </View>
*/}

{/* STEP 5.04 search the thread list
        <View
          style={{
            marginTop: 12,
            // MISTAKE 5.14 the search box came in half the width
            paddingHorizontal: 64,
          }}
        >
          <SearchField placeholder={MESSAGES.searchPlaceholder} />
        </View>
*/}

{/* STEP 5.06 and filter it
        <View style={{ marginTop: 12 }}>
          <FilterPills
            items={MESSAGES.filters}
            active={filter}
            onSelect={setFilter}
            paddingVertical={9}
          />
        </View>
*/}
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: SP.gutter,
          paddingTop: 12,
          paddingBottom: 24,
          gap: 12,
        }}
      >
{/* STEP 5.08 the threads themselves
        {CONVERSATIONS.map((c) => (
          <MessageCard key={c.key} conversation={c} />
        ))}
*/}
      </ScrollView>

{/* STEP 5.13 float the dock
      <View
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: Math.max(insets.bottom, 12) + 12,
        }}
      >
        <TabBar
          active="messages"
          onSelect={(key) => {
            const next = TABS.find((t) => t.key === key);
            if (next && key !== 'messages') router.push(next.route);
          }}
        />
      </View>
*/}
    </View>
  );
}
