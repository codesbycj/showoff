import { Image, Pressable, ScrollView, View } from 'react-native';

import { upcoming } from '../data/home';
import { ct } from '../theme';
import { T } from './text';

type Props = { margin: number; width: number; height: number; radius: number };

/**
 * The jobs in the queue.
 *
 * A horizontal scroller, not a wrap: the board crops its second card at the
 * frame, which a wrap cannot reproduce (R2). The rail runs under the floating
 * dock as the board crops it, which keeps the foot closed (I3).
 */
export function UpcomingRail({ margin, width, height, radius }: Props) {
  return (
    <View style={{ height }}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{ paddingHorizontal: margin, gap: 12 }}
      >
        {upcoming.map((job) => (
          <Pressable key={job.id} accessibilityRole="button" accessibilityLabel={job.title}>
            <View style={{ width, height, borderRadius: radius, overflow: 'hidden' }}>
              <Image source={job.image} style={{ width, height }} resizeMode="cover" />

              <View style={{ position: 'absolute', left: 10, top: 10 }}>
                <View
                  style={{
                    height: 26,
                    paddingHorizontal: 11,
                    borderRadius: 13,
                    backgroundColor: ct.dark,
                    justifyContent: 'center',
                  }}
                >
                  <T variant="chip">{job.chip}</T>
                </View>
              </View>
            </View>
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
}
