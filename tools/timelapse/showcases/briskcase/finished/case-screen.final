import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';

import { AttachmentsCard } from '@/features/briskcase/components/attachments-card';
import { CaseHead } from '@/features/briskcase/components/case-head';
import { ChecklistCard } from '@/features/briskcase/components/checklist-card';
import { CompleteButton } from '@/features/briskcase/components/complete-button';
import { DateRail } from '@/features/briskcase/components/date-rail';
import { DescriptionCard } from '@/features/briskcase/components/description-card';
import { BUTTON_TOP, CARD_TOP, MARGIN } from '@/features/briskcase/layout';
import { br } from '@/features/briskcase/theme';
import { useInsets } from '@/features/briskcase/use-insets';

/**
 * Brisk — the task detail.
 *
 * Assembly only: what the task is and how long it has taken, where today sits
 * between its dates, what it asks for, what came with it, the subtasks, and
 * the one thing the screen is for.
 *
 * The checklist takes the slack, so the button rides the bottom inset at any
 * screen height instead of leaving a band of canvas under it.
 */
export default function BriskcaseScreen() {
  const insets = useInsets();

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: br.canvas,
        paddingTop: insets.top,
        paddingHorizontal: MARGIN,
        paddingBottom: insets.bottom,
      }}
    >
      <StatusBar style="dark" />

      <CaseHead />

      <DateRail />

      <View style={{ marginTop: CARD_TOP }}>
        <DescriptionCard />
      </View>

      <View style={{ marginTop: CARD_TOP }}>
        <AttachmentsCard />
      </View>

      <View style={{ flex: 1, marginTop: CARD_TOP }}>
        <ChecklistCard />
      </View>

      <View style={{ marginTop: BUTTON_TOP }}>
        <CompleteButton onPress={() => router.back()} />
      </View>
    </View>
  );
}
