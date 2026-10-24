import { StatusBar } from 'expo-status-bar';
import X from 'lucide-react-native/icons/x';
import { Pressable, View } from 'react-native';

import { ActivityCard } from '@/features/hookdash/components/activity-card';
import { FindTile } from '@/features/hookdash/components/find-tile';
import { LeaderboardCard } from '@/features/hookdash/components/leaderboard-card';
import { MemoriesCard } from '@/features/hookdash/components/memories-card';
import { ProfileTile } from '@/features/hookdash/components/profile-tile';
import { CLOSE, CLOSE_TOP, GRID_GAP, GRID_TOP, MARGIN } from '@/features/hookdash/layout';
import { hk } from '@/features/hookdash/theme';
import { useInsets } from '@/features/hookdash/use-insets';

/**
 * Hook — the profile dashboard.
 *
 * Assembly only: who this is, how to meet people, where they stand, what has
 * been happening, and a picture from last year.
 *
 * The memories card is taller than it needs to be and runs off the foot of
 * the page, which is what the reference shows. A spacer above it instead would
 * leave a band of flat black between the stack and the card on a tall phone.
 */
export default function HookDash() {
  const insets = useInsets();

  return (
    <View style={{ flex: 1, backgroundColor: hk.canvas }}>
      <StatusBar style="light" />

      <View style={{ flex: 1, paddingTop: insets.top + CLOSE_TOP }}>
        <View style={{ alignItems: 'center' }}>
          <Pressable accessibilityRole="button" accessibilityLabel="Close">
            <X size={CLOSE} color={hk.muted} strokeWidth={2} />
          </Pressable>
        </View>

        <View style={{ marginTop: GRID_TOP, paddingHorizontal: MARGIN, gap: GRID_GAP }}>
          <View style={{ flexDirection: 'row', gap: GRID_GAP }}>
            <View style={{ flex: 1 }}>
              <ProfileTile />
            </View>
            <View style={{ flex: 1 }}>
              <FindTile />
            </View>
          </View>

          <LeaderboardCard />
          <ActivityCard />
        </View>

        <View style={{ marginTop: GRID_GAP, paddingHorizontal: MARGIN }}>
          <MemoriesCard />
        </View>
      </View>
    </View>
  );
}
