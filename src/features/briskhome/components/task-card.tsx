import { Image, Pressable, View } from 'react-native';

import { cards, copy, extraPeople, stack } from '../data/start';
import { CARD_PAD, TASK_MIN } from '../layout';
import { br, radius, type } from '../theme';
import { T } from './text';

/**
 * One task, as a card.
 *
 * "+ 2 people" is counted from the card's `people` minus the faces shown, so
 * adding a face to the stack moves the number beside it — and the label is
 * dropped entirely when the faces are everyone, rather than printing
 * "+ 0 people". The faces are
 * photographs, per AGENTS.md.
 *
 * The card carries `shadow*` and `elevation` together in one object — a
 * `Platform.select` here is exactly what the web harness cannot check — and
 * no `overflow: 'hidden'`, because the pair is unreliable on Android.
 */
export function TaskCard({
  item,
  onDetails,
}: {
  item: (typeof cards)[number];
  onDetails?: () => void;
}) {
  const disc = 30;

  return (
    <View
      style={{
        flex: 1,
        minHeight: TASK_MIN,
        borderRadius: radius.card,
        backgroundColor: br.surface,
        padding: CARD_PAD,
        justifyContent: 'space-between',
        shadowColor: '#0B1031',
        shadowOpacity: 0.07,
        shadowRadius: 20,
        shadowOffset: { width: 0, height: 8 },
        elevation: 5,
      }}
    >
      <View style={{ flexDirection: 'row' }}>
        {item.tags.map((tag, i) => (
          <View
            key={tag}
            style={{
              marginRight: 8,
              paddingHorizontal: 12,
              paddingVertical: 6,
              borderRadius: radius.chip,
              backgroundColor: i === 0 ? br.blue : br.blueSoft,
            }}
          >
            <T
              variant="tag"
              color={i === 0 ? br.onBlue : br.blue}
              style={{ height: type.tag.line }}
            >
              {tag}
            </T>
          </View>
        ))}
      </View>

      <View>
        <T variant="cardTitle" color={br.ink} style={{ height: type.cardTitle.line }}>
          {item.title}
        </T>
        <T variant="cardSub" color={br.muted} style={{ marginTop: 2, height: type.cardSub.line }}>
          {item.sub}
        </T>
      </View>

      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        {stack.map((f, i) => (
          <Image
            key={i}
            source={f}
            style={{
              width: disc,
              height: disc,
              marginLeft: i === 0 ? 0 : -9,
              borderRadius: radius.pill,
              borderWidth: 2,
              borderColor: br.surface,
            }}
            accessibilityIgnoresInvertColors
          />
        ))}
        {extraPeople(item.people) > 0 ? (
          <T variant="people" color={br.muted} style={{ marginLeft: 10, height: type.people.line }}>
            {'+ ' + extraPeople(item.people) + ' people'}
          </T>
        ) : null}

        <View style={{ flex: 1 }} />

        <Pressable onPress={onDetails} accessibilityRole="button" accessibilityLabel={copy.details}>
          <View
            style={{
              height: 38,
              paddingHorizontal: 20,
              borderRadius: radius.chip,
              backgroundColor: br.navy,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <T variant="action" color={br.onNavy} style={{ height: type.action.line }}>
              {copy.details}
            </T>
          </View>
        </Pressable>
      </View>
    </View>
  );
}
