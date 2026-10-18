import { View } from 'react-native';

import { labels } from '../data/journeys';
import {
  AVATAR_OVERLAP,
  BAR_GAP,
  BAR_HEIGHT,
  CARD_AVATAR,
  CARD_BUTTON,
  CARD_PAD,
  STAT_GAP,
  STATS_TOP,
} from '../layout';
import { radius, sg, shadow } from '../theme';
import { Avatar } from './avatar';
import { Icon } from './icon';
import { T } from './text';

type Member = { face: number; badge: string; color: string };
type Stat = { key: string; value: string; unit: string; label: string };
type Footer = { key: string; value: string; label: string; glyph: 'people' | null };

/**
 * One customer journey, as a card.
 *
 * The allocation bar is four segments whose widths come from the data, so the
 * bar always sums to the full width however the split changes — four fixed
 * widths would leave a gap the first time somebody edited the numbers.
 *
 * The team row overlaps its photographs by a quarter. Each avatar carries its
 * own open-task badge, which is what makes the row worth the space: five
 * faces alone say who, and the badges say how much.
 */
export function JourneyCard({
  title,
  team,
  allocation,
  stats,
  footer,
  onOpen,
}: {
  title: string;
  team: readonly Member[];
  allocation: readonly number[];
  stats: readonly Stat[];
  footer: readonly Footer[];
  onOpen?: () => void;
}) {
  return (
    <View
      style={{
        borderRadius: radius.card,
        backgroundColor: sg.surface,
        padding: CARD_PAD,
        ...shadow.card,
      }}
    >
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <T variant="cardTitle" color={sg.ink} style={{ flex: 1 }}>
          {title}
        </T>
        <RoundChip name="edit" />
        <View style={{ width: 8 }} />
        <RoundChip name="calendar" />
      </View>

      <View style={{ flexDirection: 'row', marginTop: 14 }}>
        {team.map((m, i) => (
          <View
            key={`${m.face}-${i}`}
            style={{ marginLeft: i === 0 ? 0 : -CARD_AVATAR * AVATAR_OVERLAP }}
          >
            <Avatar face={m.face} size={CARD_AVATAR} badge={m.badge} badgeColor={m.color} />
          </View>
        ))}
      </View>

      <T variant="cardLabel" color={sg.muted} style={{ marginTop: 12 }}>
        {labels.allocation}
      </T>

      <View style={{ flexDirection: 'row', gap: BAR_GAP, marginTop: 7 }}>
        {allocation.map((share, i) => (
          <View
            key={sg.bars[i]}
            style={{
              flex: share,
              height: BAR_HEIGHT,
              borderRadius: radius.bar,
              backgroundColor: sg.bars[i],
            }}
          />
        ))}
      </View>

      <View style={{ flexDirection: 'row', marginTop: STATS_TOP, gap: STAT_GAP }}>
        {stats.map((s) => (
          <View key={s.key} style={{ flex: 1 }}>
            <View style={{ flexDirection: 'row', alignItems: 'baseline', gap: 3 }}>
              <T variant="statValue" color={sg.ink}>
                {s.value}
              </T>
              <T variant="statUnit" color={sg.muted}>
                {s.unit}
              </T>
            </View>
            <T variant="statLabel" color={sg.muted}>
              {s.label}
            </T>
          </View>
        ))}
      </View>

      <View style={{ flexDirection: 'row', alignItems: 'flex-end', marginTop: 14 }}>
        {footer.map((f) => (
          <View key={f.key} style={{ flex: 1 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 5 }}>
              {f.glyph ? <Icon name={f.glyph} size={14} color={sg.ink} /> : null}
              <T variant="statValue" color={sg.ink}>
                {f.value}
              </T>
            </View>
            <T variant="statLabel" color={sg.muted}>
              {f.label}
            </T>
          </View>
        ))}

        <View
          style={{
            width: CARD_BUTTON,
            height: CARD_BUTTON,
            borderRadius: radius.full,
            backgroundColor: sg.chip,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Icon name="next" size={17} color={sg.ink} strokeWidth={2.2} />
        </View>
      </View>
    </View>
  );
}

/** The two small round controls in a card's top-right. */
function RoundChip({ name }: { name: 'edit' | 'calendar' }) {
  return (
    <View
      style={{
        width: CARD_BUTTON,
        height: CARD_BUTTON,
        borderRadius: radius.full,
        backgroundColor: sg.chip,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Icon name={name} size={15} color={sg.ink} />
    </View>
  );
}
