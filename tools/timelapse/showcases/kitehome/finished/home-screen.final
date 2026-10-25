import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';

import { ActionRow } from '@/features/kitehome/components/action-row';
import { Balance } from '@/features/kitehome/components/balance';
import { FlowCards } from '@/features/kitehome/components/flow-cards';
import { HistoryList } from '@/features/kitehome/components/history-list';
import { PanelHeader } from '@/features/kitehome/components/panel-header';
import { TabBar } from '@/features/kitehome/components/tab-bar';
import { HISTORY_TOP, MARGIN, PANEL_PAD, TABBAR_GAP } from '@/features/kitehome/layout';
import { kt, radius } from '@/features/kitehome/theme';
import { useInsets } from '@/features/kitehome/use-insets';

/**
 * Kite — the wallet.
 *
 * Assembly only: the charcoal panel carrying who is signed in, what is in the
 * wallet, the three things it does and the two flows; then what it has been
 * doing; then where else the app goes.
 *
 * The list sits in a `flex: 1` block between the panel and the floating tab
 * bar, so the bar rides the bottom inset at any screen height and the rows
 * take whatever is left rather than leaving a band of canvas under them.
 */
export default function KitehomeScreen() {
  const insets = useInsets();

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: kt.canvas,
        paddingTop: insets.top,
        paddingHorizontal: MARGIN,
        paddingBottom: insets.bottom,
      }}
    >
      <StatusBar style="light" />

      <View
        style={{
          borderRadius: radius.panel,
          backgroundColor: kt.panel,
          padding: PANEL_PAD,
        }}
      >
        <PanelHeader />
        <Balance />
        <ActionRow onSend={() => router.push('/kitecard')} />
        <FlowCards />
      </View>

      <View style={{ flex: 1, marginTop: HISTORY_TOP }}>
        <HistoryList />
      </View>

      <View style={{ marginTop: TABBAR_GAP }}>
        <TabBar active="home" onSelect={(id) => id === 'cards' && router.push('/kitecard')} />
      </View>
    </View>
  );
}
