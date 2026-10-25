import { Image, View } from 'react-native';

import { TAG_HEIGHT, TAG_PAD, TAG_THUMB } from '../layout';
import { radius, shadow, tb, type } from '../theme';
import { T } from './text';

/**
 * One place, as a tag: a photograph, its name, and why it is worth the trip.
 *
 * **The photograph is a photograph.** It is 30dp square here, which is small
 * enough to be tempting to draw, and that is exactly the mistake the rule is
 * about — a place is a picture of somewhere, so it is out of drawing range
 * however small it lands on screen. Seven free-licensed frames are bundled;
 * `assets/images/tembeastart/CREDITS.md` names them.
 *
 * The `Image` carries explicit `width`/`height` rather than absolute insets.
 * An `Image` sized only by insets paints nothing at all on native, silently,
 * and the web harness cannot see the difference.
 */
export function PlaceTag({
  place,
  note,
  src,
  tone = 'plain',
}: {
  place: string;
  note: string;
  src: number;
  tone?: 'plain' | 'mint' | 'pink';
}) {
  const fill = tone === 'mint' ? tb.tagMint : tone === 'pink' ? tb.tagPink : tb.tag;
  const ink = tone === 'pink' ? tb.onPink : tb.tagInk;
  const sub = tone === 'pink' ? 'rgba(42, 10, 34, 0.6)' : tb.tagMuted;

  return (
    <View
      style={{
        height: TAG_HEIGHT,
        flexDirection: 'row',
        alignItems: 'center',
        paddingLeft: TAG_PAD,
        paddingRight: TAG_PAD + 7,
        borderRadius: radius.tag,
        backgroundColor: fill,
        ...shadow.tag,
      }}
    >
      <Image
        source={src}
        style={{ width: TAG_THUMB, height: TAG_THUMB, borderRadius: radius.thumb }}
        accessibilityLabel={place}
      />
      <View style={{ marginLeft: 8 }}>
        <T variant="tag" color={ink} style={{ height: type.tag.line }}>
          {place}
        </T>
        <T variant="tagSub" color={sub} style={{ height: type.tagSub.line }}>
          {note}
        </T>
      </View>
    </View>
  );
}
