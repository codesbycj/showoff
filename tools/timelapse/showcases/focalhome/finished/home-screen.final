import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';

import { ChipRow } from '@/features/focalhome/components/chip-row';
import { CreateButton } from '@/features/focalhome/components/create-button';
import { GreetRow } from '@/features/focalhome/components/greet-row';
import { ProjectList } from '@/features/focalhome/components/project-list';
import { StatCards } from '@/features/focalhome/components/stat-cards';
import { MARGIN } from '@/features/focalhome/layout';
import { fc } from '@/features/focalhome/theme';
import { useInsets } from '@/features/focalhome/use-insets';

/**
 * Focal — the task overview.
 *
 * Assembly only: who is signed in, the one thing the screen asks you to do,
 * which day to show, how much has been done, and the projects.
 *
 * The chip row is outside the padded column so a chip can scroll off the
 * right edge; it carries the margin itself. The project list takes the slack,
 * so the page reaches the bottom inset at any screen height.
 */
export default function FocalhomeScreen() {
  const insets = useInsets();

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: fc.canvas,
        paddingTop: insets.top,
        paddingBottom: insets.bottom,
      }}
    >
      <StatusBar style="dark" />

      <View style={{ paddingHorizontal: MARGIN }}>
        <GreetRow />
        <CreateButton onPress={() => router.push('/focalplan')} />
      </View>

      <ChipRow onSeeAll={() => router.push('/focalplan')} />

      <View style={{ paddingHorizontal: MARGIN }}>
        <StatCards />
      </View>

      <View style={{ flex: 1, paddingHorizontal: MARGIN }}>
        <ProjectList onAdd={() => router.push('/focalstart')} />
      </View>
    </View>
  );
}
