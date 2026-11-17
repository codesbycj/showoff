import { router } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';

// STEP 1.22 import dock
// import { Dock } from '@/features/lumofeed/components/dock';
// STEP 1.14 import featured card
// import { FeaturedCard } from '@/features/lumofeed/components/featured-card';
// STEP 1.02 import feed header
// import { FeedHeader } from '@/features/lumofeed/components/feed-header';
// STEP 1.17 import post card
// import { PostCard } from '@/features/lumofeed/components/post-card';
// STEP 1.07 import story rail
// import { StoryRail } from '@/features/lumofeed/components/story-rail';
// STEP 1.01 import wash ground
// import { WashGround } from '@/features/lumofeed/components/wash-ground';
import { useLayout } from '@/features/lumofeed/layout';
import { ct } from '@/features/lumofeed/theme';

/**
 * Lumora — feed.
 *
 * Assembly, never markup: a list of imports and the blocks they mount, in the
 * order they appear, because `stage.js` reads this file as the description of
 * its own reveal.
 *
 * The purple wash is the page's own ground and may paint in frame one; the
 * post's photograph runs under the dock as the board crops it, so the foot
 * cannot open a band (I3).
 */
export default function LumofeedScreen() {
  const L = useLayout();

  return (
    <View style={{ flex: 1, backgroundColor: ct.page }}>
      <StatusBar style="light" />

      {/* STEP 1.01 wash ground
      <WashGround width={L.W} height={Math.round(L.H * 0.6)} />
      */}

      <View style={{ paddingTop: L.insets.top }} />
      {/* STEP 1.02 feed header
      <FeedHeader margin={L.margin} height={L.headerH} />
      */}

      <View style={{ height: L.gapHeader }} />
      {/* STEP 1.07 story rail
      <StoryRail margin={L.margin} height={L.story.h} size={L.story.size} />
      */}

      <View style={{ height: L.gapStory }} />
      {/* STEP 1.14 featured card
      <FeaturedCard
        margin={L.margin}
        width={L.W - L.margin * 2}
        height={L.featured.h}
        radius={L.featured.radius}
      />
      */}

      <View style={{ height: L.gapFeatured }} />
      {/* STEP 1.17 post card
      <PostCard
        margin={L.margin}
        width={L.W - L.margin * 2}
        imageH={L.post.imageH}
        headH={L.post.headH}
        actionsH={L.post.actionsH}
        captionH={L.post.captionH}
        radius={L.post.radius}
        onOpen={() => router.push('/lumoreel')}
      />
      */}

      {/* STEP 1.27 a stray gap above it | FIX 1.28 take the gap back out
      <View style={{ width: 23, height: 23 }} />
      */}
      {/* STEP 1.22 dock
      <Dock
        height={L.dock.h}
        bottom={L.dock.bottom}
        active="home"
        onProfile={() => router.push('/lumoprofile')}
      />
      */}
    </View>
  );
}
