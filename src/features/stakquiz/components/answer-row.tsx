import { Image, Pressable, View } from 'react-native';

import { OPTION_DISC, OPTION_FACE, OPTION_HEIGHT } from '../layout';
import { radius, sk, type } from '../theme';
import { Glyph } from './glyph';
import { T } from './text';

/**
 * One answer: what it is, how many people said it, and who they were.
 *
 * The chosen one is the acid fill *and* a filled check disc — two signals, not
 * a colour on its own, because a quiz that marks the selected answer only by
 * hue is unreadable to anyone who cannot separate these two.
 *
 * The faces are photographs. They overlap by a fixed dp rather than a share,
 * so the stack keeps its rhythm whatever the row is given.
 */
export function AnswerRow({
  label,
  share,
  count,
  faces,
  picked,
  onPress,
}: {
  label: string;
  share: string;
  count: string;
  faces: readonly number[];
  picked: boolean;
  onPress?: () => void;
}) {
  const ink = picked ? sk.onAcid : sk.ink;

  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="radio"
      accessibilityState={{ selected: picked }}
      accessibilityLabel={`${label}, ${share}`}
    >
      <View
        style={{
          height: OPTION_HEIGHT,
          borderRadius: radius.pill,
          backgroundColor: picked ? sk.acid : sk.slab,
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 11,
        }}
      >
        <View
          style={{
            width: OPTION_DISC,
            height: OPTION_DISC,
            borderRadius: radius.control,
            backgroundColor: picked ? sk.ink : sk.disc,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Glyph name="check" size={20} tint={picked ? sk.onAcid : sk.muted} />
        </View>

        <View style={{ flex: 1, marginLeft: 12 }}>
          <T
            variant="answer"
            color={picked ? sk.onAcid : sk.body}
            style={{ height: type.answer.line }}
          >
            {label}
          </T>
          <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 2 }}>
            <T variant="share" color={ink} style={{ height: type.share.line }}>
              {share}
            </T>
            <View style={{ flexDirection: 'row', marginLeft: 10 }}>
              {faces.map((f, i) => (
                <Image
                  key={i}
                  source={f}
                  style={{
                    width: OPTION_FACE,
                    height: OPTION_FACE,
                    borderRadius: radius.control,
                    borderWidth: 2,
                    borderColor: picked ? sk.acid : sk.slab,
                    marginLeft: i === 0 ? 0 : -10,
                  }}
                />
              ))}
            </View>
            <View
              style={{
                marginLeft: 8,
                paddingHorizontal: 9,
                paddingVertical: 4,
                borderRadius: radius.pill,
                backgroundColor: sk.chip,
              }}
            >
              <T variant="count" color={sk.onChip} style={{ height: type.count.line }}>
                {count}
              </T>
            </View>
          </View>
        </View>
      </View>
    </Pressable>
  );
}
