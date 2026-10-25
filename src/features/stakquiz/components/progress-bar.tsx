import { useWindowDimensions, View } from 'react-native';

import { progress } from '../data/quiz';
import { BAR_GAP, BAR_HEIGHT, MARGIN } from '../layout';
import { radius, sk } from '../theme';
import { Hatch } from './glyph';

/**
 * Six questions: the ones behind you solid, the ones ahead hatched.
 *
 * The segment width is measured off the window rather than fixed, so six
 * segments divide whatever the screen is instead of overflowing a narrow one.
 * Hatching rather than a dimmer fill is the same material the answers use for
 * "not this", which is what makes the two read as one system.
 */
export function ProgressBar() {
  const { width } = useWindowDimensions();
  const track = width - MARGIN * 2;
  const seg = (track - BAR_GAP * (progress.total - 1)) / progress.total;

  return (
    <View style={{ flexDirection: 'row' }}>
      {Array.from({ length: progress.total }, (_, i) => (
        <View
          key={i}
          style={{
            width: seg,
            height: BAR_HEIGHT,
            marginLeft: i === 0 ? 0 : BAR_GAP,
            borderRadius: radius.bar,
            backgroundColor: i < progress.done ? sk.acid : 'transparent',
            overflow: 'hidden',
          }}
        >
          {i < progress.done ? null : <Hatch width={seg} height={BAR_HEIGHT} tint={sk.hatch} />}
        </View>
      ))}
    </View>
  );
}
