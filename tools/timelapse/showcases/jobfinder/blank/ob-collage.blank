import { Text, View } from 'react-native';

import { COLLAGE_HEIGHT, COLLAGE_PHOTOS, ONBOARDING } from '../data/onboarding';
import { FONT, jf } from '../theme';
import { BrandMark, NikitinN } from './brand-mark';
import { CollageItem, CollagePhoto } from './collage-item';

/**
 * The onboarding hero: nine portraits and four brand tiles scattered over a
 * 475dp band, with a "+12k" counter floating at the right.
 *
 * Stacking order is the order they are written, and it matters in two places:
 * the 98dp hero avatar has to land over the 32dp blonde beside it, and the
 * Slack tile has to sit under the 64dp portrait that overlaps its corner. So the
 * photos are drawn in their listed order and the tiles interleaved by hand
 * rather than the whole set being sorted by size.
 *
 * `trim` shortens the band from the bottom. The reference frame draws no status
 * bar, so its 475dp band starts at y=0; a real device gives that space to the
 * notch instead. Trimming by the top inset puts everything below the collage —
 * the headline, the paragraph, the button — back at the y the design gives it,
 * and costs nothing, because the lowest item in the band ends at 308dp.
 */
export function HeroCollage({ trim = 0 }: { trim?: number }) {
  return (
    <View style={{ height: COLLAGE_HEIGHT - trim, overflow: 'hidden' }}>
{/* STEP 1.12 a tab hanging off the edge
      <CollageItem top={16} right={-8} size={32} width={64} radius={16} fill={jf.coral}>
        <View
          style={{
            position: 'absolute',
            left: 10,
            flexDirection: 'row',
            gap: 4,
            alignItems: 'center',
          }}
        >
          <Bar />
          <Bar />
          <Bar />
        </View>
      </CollageItem>
*/}

      {COLLAGE_PHOTOS.filter((p) => p.top < 140).map(({ key, ...p }) => (
        <CollagePhoto key={key} {...p} />
      ))}

{/* STEP 1.13 a lime tile
      <CollageItem top={48} left={196} size={36} radius={13} fill={jf.lime}>
        <BrandMark brand="ghost" size={18} tone={jf.ink} />
      </CollageItem>
*/}

{/* STEP 1.14 and a plum one, under the face that clips it
      <CollageItem top={148} left={40} size={62} radius={22} fill={jf.slack} shadow="lifted">
        <BrandMark brand="slack" size={28} />
      </CollageItem>
*/}

      {COLLAGE_PHOTOS.filter((p) => p.top >= 140).map(({ key, ...p }) => (
        <CollagePhoto key={key} {...p} />
      ))}

{/* STEP 1.15 an N in a black circle
      <CollageItem top={198} right={82} size={44} fill={jf.ink}>
        <NikitinN size={20} />
      </CollageItem>
*/}

{/* STEP 1.16 one last badge
      <CollageItem top={266} left={102} size={26} fill={jf.skype}>
        <BrandMark brand="skype" size={14} />
      </CollageItem>
*/}

{/* STEP 1.17 count the crowd
      <View style={{ position: 'absolute', top: 252, right: 40 }}>
        <Text
          style={{
            fontFamily: FONT.bold,
            fontSize: 24,
            lineHeight: 26,
            letterSpacing: -0.6,
            color: jf.ink,
          }}
        >
          {ONBOARDING.counter}
        </Text>
      </View>
*/}
    </View>
  );
}

/** One of the three bars inside the coral pill. */
function Bar() {
  return (
    <View
      style={{
        width: 4,
        height: 14,
        borderRadius: 2,
        backgroundColor: 'rgba(255,255,255,0.7)',
      }}
    />
  );
}
