import { StatusBar } from 'expo-status-bar';
import { useState } from 'react';
import { View } from 'react-native';

// STEP 1.01 import feed bar
// import { FeedBar } from '@/features/twirlfeed/components/feed-bar';
// STEP 1.28 import next post
// import { NextPost } from '@/features/twirlfeed/components/next-post';
// STEP 1.25 import post actions
// import { PostActions } from '@/features/twirlfeed/components/post-actions';
// STEP 1.12 import post author
// import { PostAuthor } from '@/features/twirlfeed/components/post-author';
// STEP 1.19 import post collage
// import { PostCollage } from '@/features/twirlfeed/components/post-collage';
// STEP 1.16 import post copy
// import { PostCopy } from '@/features/twirlfeed/components/post-copy';
// STEP 1.22 import post stats
// import { PostStats } from '@/features/twirlfeed/components/post-stats';
// STEP 1.04 import story rail
// import { StoryRail } from '@/features/twirlfeed/components/story-rail';
// STEP 1.32 import tab bar
// import { TabBar } from '@/features/twirlfeed/components/tab-bar';
import { useLayout } from '@/features/twirlfeed/layout';
import { ct } from '@/features/twirlfeed/theme';

/**
 * Twirlo — feed.
 *
 * Assembly, never markup: a list of imports and the blocks they mount, in the
 * order they appear, because `stage.js` reads this file as the description of
 * its own reveal.
 *
 * The collage takes the screen's slack (see `layout.ts`) and the next post's
 * header sits above the tab bar, which is what the board does and what tells
 * you the feed continues (R6) — so the foot cannot open a band.
 */
export default function TwirlfeedScreen() {
  const L = useLayout();
  const [tab, setTab] = useState('feeds');

  return (
    <View style={{ flex: 1, backgroundColor: ct.page, paddingTop: L.insets.top }}>
      <StatusBar style="dark" />

      {/* STEP 1.01 feed bar
      <FeedBar margin={L.margin} height={L.barH} control={L.control} />
      */}

      <View style={{ height: L.gapBar }} />
      {/* STEP 1.04 story rail
      <StoryRail margin={L.margin} height={L.story.h} avatar={L.story.avatar} />
      */}

      <View style={{ height: L.gapStory }} />
      {/* STEP 1.12 post author
      <PostAuthor margin={L.margin} height={L.authorH} avatar={L.avatar} />
      */}

      <View style={{ height: L.gapAuthor }} />
      {/* STEP 1.16 post copy
      <PostCopy margin={L.margin} titleH={L.titleH} bodyH={L.bodyH} />
      */}

      <View style={{ height: L.gapCopy }} />
      {/* STEP 1.19 post collage
      <PostCollage
        margin={L.margin}
        height={L.collage.h}
        gap={L.collage.gap}
        radius={L.collage.radius}
        big={L.collage.big}
        small={L.collage.small}
      />
      */}

      <View style={{ height: L.gapCollage }} />
      {/* STEP 1.22 post stats
      <PostStats margin={L.margin} height={L.statsH} />
      */}

      {/* STEP 1.25 post actions
      <PostActions margin={L.margin} height={L.actionsH} />
      */}

      {/* STEP 1.28 next post
      <NextPost margin={L.margin} height={L.next.h} avatar={L.next.avatar} />
      */}

      {/* STEP 1.32 tab bar
      <TabBar height={L.tabs.h} bottomInset={L.insets.bottom} value={tab} onSelect={setTab} />
      */}
      {/* STEP 1.38 a stray gap under it | FIX 1.39 take the gap back out
      <View style={{ height: 23 }} />
      */}
    </View>
  );
}
