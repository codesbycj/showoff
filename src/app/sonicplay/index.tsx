import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';

// STEP 1.06 import cover art
// import { CoverArt } from '@/features/sonicplay/components/cover-art';
// STEP 1.25 import lyrics handle
// import { LyricsHandle } from '@/features/sonicplay/components/lyrics-handle';
// STEP 1.07 import now playing
// import { NowPlaying } from '@/features/sonicplay/components/now-playing';
// STEP 1.01 import player bar
// import { PlayerBar } from '@/features/sonicplay/components/player-bar';
// STEP 1.13 import scrubber
// import { Scrubber } from '@/features/sonicplay/components/scrubber';
// STEP 1.19 import transport
// import { Transport } from '@/features/sonicplay/components/transport';
import { useLayout } from '@/features/sonicplay/layout';
import { ct } from '@/features/sonicplay/theme';

/**
 * Sonic — player.
 *
 * Assembly, never markup: a list of imports and the blocks they mount, in the
 * order they appear, because `stage.js` reads this file as the description of
 * its own reveal.
 *
 * The sleeve takes the screen's slack (see `layout.ts`), so the foot cannot
 * open a band. It is free-licensed photography standing in for a fictional
 * release — the board's own is a real album cover.
 */
export default function SonicplayScreen() {
  const L = useLayout();

  return (
    <View style={{ flex: 1, backgroundColor: ct.page }}>
      <StatusBar style="light" />

      <View style={{ paddingTop: L.insets.top }}>
        {/* STEP 1.01 player bar
        <PlayerBar
          margin={L.margin}
          height={L.barH}
          control={L.control}
          onBack={() => router.back()}
        />
        */}

        <View style={{ height: L.gapBar }} />
        {/* STEP 1.06 cover art
        <CoverArt margin={L.margin} size={L.cover.size} radius={L.cover.radius} />
        */}

        <View style={{ height: L.gapCover }} />
        {/* STEP 1.07 now playing
        <NowPlaying margin={L.margin} height={L.titleH} control={L.control} />
        */}
        {/* STEP 1.11 a stray gap under it | FIX 1.12 take the gap back out
        <View style={{ height: 11 }} />
        */}

        <View style={{ height: L.gapTitle }} />
        {/* STEP 1.13 scrubber
        <Scrubber margin={L.margin} height={L.scrubH} />
        */}
        {/* STEP 1.17 a stray gap under it | FIX 1.18 take the gap back out
        <View style={{ height: 17 }} />
        */}

        <View style={{ height: L.gapScrub }} />
        {/* STEP 1.19 transport
        <Transport
          margin={L.margin}
          height={L.transport.h}
          play={L.transport.play}
          item={L.transport.item}
        />
        */}

        <View style={{ height: L.gapTransport }} />
        {/* STEP 1.25 lyrics handle
        <LyricsHandle margin={L.margin} height={L.lyricsH} />
        */}
        {/* STEP 1.28 a stray gap under it | FIX 1.29 take the gap back out
        <View style={{ height: 23 }} />
        */}
      </View>
    </View>
  );
}
