import { Image, Pressable, View } from 'react-native';

import { BAR_HEIGHT, CARD_FACE, CARD_PAD } from '../layout';
import { radius, shadow, tp, type } from '../theme';
import { Glyph } from './glyph';
import { T } from './text';

/**
 * One task: what it is, what it is for, who is on it and how far along.
 *
 * The bar is two stacked `View`s rather than a percentage width on a single
 * one. A percentage resolves against the parent, and inside a row sized by
 * its content that parent has no definite width — the track would collapse or
 * inflate depending on what sat beside it. A `flex` pair cannot.
 */
export function TaskCard({
  title,
  body,
  faces,
  more,
  progress,
  onPress,
}: {
  title: string;
  body: string;
  faces: readonly number[];
  more: string;
  progress: number;
  onPress?: () => void;
}) {
  return (
    <Pressable onPress={onPress} accessibilityRole="button" accessibilityLabel={title}>
      <View
        style={{
          borderRadius: radius.card,
          backgroundColor: tp.card,
          padding: CARD_PAD,
          ...shadow.card,
        }}
      >
        <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
          <T variant="cardTitle" color={tp.ink} style={{ flex: 1, height: type.cardTitle.line }}>
            {title}
          </T>
          <Glyph name="dots" size={18} tint={tp.muted} />
        </View>

        <T variant="cardBody" color={tp.body} style={{ marginTop: 6 }}>
          {body}
        </T>

        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 14 }}>
          {faces.map((f, i) => (
            <Image
              key={i}
              source={f}
              style={{
                width: CARD_FACE,
                height: CARD_FACE,
                borderRadius: radius.control,
                borderWidth: 1.8,
                borderColor: tp.card,
                marginLeft: i === 0 ? 0 : -7,
              }}
            />
          ))}
          <T
            variant="cardMeta"
            color={tp.body}
            style={{ marginLeft: 8, height: type.cardMeta.line }}
          >
            {more}
          </T>
        </View>

        <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 12 }}>
          <View
            style={{
              flex: 1,
              height: BAR_HEIGHT,
              borderRadius: radius.bar,
              backgroundColor: tp.hair,
              flexDirection: 'row',
              overflow: 'hidden',
            }}
          >
            <View style={{ flex: progress, backgroundColor: tp.green }} />
            <View style={{ flex: 1 - progress }} />
          </View>
          <T
            variant="cardMeta"
            color={tp.body}
            style={{ marginLeft: 10, height: type.cardMeta.line }}
          >
            {Math.round(progress * 100)}%
          </T>
        </View>
      </View>
    </Pressable>
  );
}
