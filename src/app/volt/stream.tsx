import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { ScrollView, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

// STEP 3.03 import the match panel
// import { MatchPanel } from '@/features/volt/components/match-panel';
// STEP 3.09 import the social strip
// import { SocialPulse } from '@/features/volt/components/social-pulse';
// STEP 3.01 import the player
// import { StreamPlayer } from '@/features/volt/components/stream-player';
// STEP 3.14 import the dock
// import { TabBar } from '@/features/volt/components/tab-bar';
import { NAV } from '@/features/volt/data/home';
import {
  MARKETS,
  PANEL,
  PLAYER,
  PULSE,
  PULSE_FACES,
  SLIP,
  SWIPE,
} from '@/features/volt/data/stream';
import { SP, voltTheme, vt } from '@/features/volt/theme';

/**
 * Screen 3 — the live stream and in-play markets.
 *
 * The only screen that runs edge-to-edge: the player bleeds to both sides and
 * under the status bar, so the scroll view carries no horizontal padding and the
 * panel below supplies its own. The player's own controls are inset instead.
 *
 * The panel overlaps the player by 16dp, which is the export's `-mt-4`, so it
 * reads as a sheet lying over the broadcast.
 */
export default function VoltStream() {
  const insets = useSafeAreaInsets();
  const [market, setMarket] = useState<string>('next');

  return (
    <View style={[voltTheme, { flex: 1, backgroundColor: vt.surface }]}>
      <StatusBar style="light" />

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: insets.bottom + 110 }}
      >
        <View style={{ paddingTop: insets.top }}>
{/* STEP 3.02 the broadcast
          <StreamPlayer
            still={PLAYER.still}
            quality={PLAYER.quality}
            viewers={PLAYER.viewers}
            half={PLAYER.half}
            clock={PLAYER.clock}
            progress={PLAYER.progress}
            onBack={() => router.back()}
          />
*/}
        </View>

        <View
          style={{
            paddingHorizontal: SP.margin,
            marginTop: -SP.gutter,
            gap: SP.lg,
          }}
        >
{/* STEP 3.04 the sheet over it | FIX 3.16 Liverpool are the home side, not the away one
          <MatchPanel
            league={PANEL.league}
            tag={PANEL.tag}
            home={PANEL.away}
            away={PANEL.home}
            score={PANEL.score}
            marketsTitle={PANEL.marketsTitle}
            marketsAction={PANEL.marketsAction}
            markets={MARKETS}
            activeMarket={market}
            slip={SLIP}
            swipeLabel={SWIPE.label}
            onMarket={setMarket}
            onAllMarkets={() => router.push('/volt/slip')}
          />
*/}

{/* STEP 3.05 the sheet, with the sides the right way round
          <MatchPanel
            league={PANEL.league}
            tag={PANEL.tag}
            home={PANEL.home}
            away={PANEL.away}
            score={PANEL.score}
            marketsTitle={PANEL.marketsTitle}
            marketsAction={PANEL.marketsAction}
            markets={MARKETS}
            activeMarket={market}
            slip={SLIP}
            swipeLabel={SWIPE.label}
            onMarket={setMarket}
            onAllMarkets={() => router.push('/volt/slip')}
          />
*/}

{/* STEP 3.10 what everyone else is backing
          <SocialPulse
            title={PULSE.title}
            meta={PULSE.meta}
            blurb={PULSE.blurb}
            faces={PULSE_FACES}
          />
*/}
        </View>
      </ScrollView>

{/* STEP 3.15 pin the dock
      <TabBar
        items={NAV}
        active="reels"
        inset={insets.bottom}
        onSelect={(item) => {
          if (item.key !== 'reels') router.push(item.route as never);
        }}
      />
*/}
    </View>
  );
}
