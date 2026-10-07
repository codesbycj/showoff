import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { ScrollView, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// STEP 3.05 a way to narrow it down
// import { FilterChip } from '@/features/lumina/components/filter-chip';
// STEP 3.20 one saved note
// import { NoteRow } from '@/features/lumina/components/note-row';
// STEP 3.26 something to practise
// import { QuizCard } from '@/features/lumina/components/quiz-card';
// STEP 3.01 a way back out
// import { ScreenHead } from '@/features/lumina/components/screen-head';
// STEP 3.03 a way to look things up
// import { SearchField } from '@/features/lumina/components/search-field';
// STEP 3.12 name a section
// import { SectionHead } from '@/features/lumina/components/section-head';
// STEP 3.28 somewhere else to go
// import { DOCK_CLEARANCE, TabDock } from '@/features/lumina/components/tab-dock';
// STEP 3.14 a book on the shelf
// import { TextbookCard } from '@/features/lumina/components/textbook-card';
import { TABS } from '@/features/lumina/data/home';
import { FILTERS, NOTES, QUIZ, SAVED, TEXTBOOKS } from '@/features/lumina/data/saved';
import { SP, ll, luminaTheme } from '@/features/lumina/theme';

/**
 * Screen 3 — the saved library.
 *
 * Four stacked sections under a search field, with the nav dock floating over
 * them. Two of the four run edge to edge: the filter rail and the textbook
 * rail both undo the page's 20dp margin so their last item can be clipped by
 * the right edge, which is how the reference signals that they scroll.
 */
export default function LuminaSaved() {
  const insets = useSafeAreaInsets();

  return (
    <View style={[luminaTheme, { flex: 1, backgroundColor: ll.bg }]}>
      <StatusBar style="dark" />

      <View style={{ paddingTop: insets.top + 8, paddingHorizontal: SP.margin }}>
{/* STEP 3.02 name the screen
        <ScreenHead
          title={SAVED.title}
          action="filter"
          onBack={() => router.back()}
          onAction={() => router.push('/lumina/profile')}
        />
*/}
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingTop: SP.md, paddingBottom: 112 }}
      >
        <View style={{ paddingHorizontal: SP.margin }}>
{/* STEP 3.04 search the shelf
          <SearchField placeholder={SAVED.searchPlaceholder} />
*/}
        </View>

{/* STEP 3.06 a rail for the filters
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{ paddingHorizontal: SP.margin, gap: 10, paddingVertical: 2 }}
          style={{ marginTop: SP.margin }}
        >
          {FILTERS.map((filter) => (
            <FilterChip key={filter.key} filter={filter} selected={filter.key === 'all'} />
          ))}
        </ScrollView>
*/}

        <View style={{ marginTop: SP.margin, paddingHorizontal: SP.margin }}>
{/* STEP 3.13 what they were reading
          <SectionHead title={SAVED.textbooksTitle} action={SAVED.textbooksAction} size={16} />
*/}
        </View>

{/* STEP 3.15 line the books up
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={{
            paddingHorizontal: SP.margin,
            gap: 14,
            paddingVertical: 4,
            // MISTAKE 3.16 the books came in shoved away from the edge
            paddingLeft: 88,
          }}
          style={{ marginTop: SP.sm }}
        >
          {TEXTBOOKS.map((book) => (
            <TextbookCard key={book.key} book={book} />
          ))}
        </ScrollView>
*/}

        <View style={{ marginTop: SP.margin, paddingHorizontal: SP.margin }}>
{/* STEP 3.19 what they wrote down
          <SectionHead title={SAVED.notesTitle} action={SAVED.notesCount} size={16} />
*/}

{/* STEP 3.21 stack the notes
          <View style={{ marginTop: 12, gap: 10 }}>
            {NOTES.map((note) => (
              <NoteRow key={note.key} note={note} />
            ))}
          </View>
*/}
        </View>

        <View style={{ marginTop: SP.margin, paddingHorizontal: SP.margin }}>
{/* STEP 3.25 what they bookmarked
          <SectionHead title={SAVED.quizzesTitle} action={SAVED.quizzesAction} size={16} />
*/}

{/* STEP 3.27 one quiz, ready to go
          <View style={{ marginTop: 12 }}>
            <QuizCard
              title={QUIZ.title}
              meta={QUIZ.meta}
              cta={QUIZ.cta}
              onPress={() => router.push('/lumina/chat')}
            />
          </View>
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
{/* STEP 3.29 the tab bar
        <TabDock
          active="library"
          onSelect={(key) => {
            const tab = TABS.find((t) => t.key === key);
            if (tab && key !== 'library') router.push(tab.route);
          }}
        />
*/}
      </View>
    </View>
  );
}
