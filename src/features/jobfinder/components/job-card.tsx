import { ArrowRight } from 'lucide-react-native';
import { type ReactNode } from 'react';
import { Pressable, Text, View } from 'react-native';

import { type Job } from '../data/jobs';
import { CARD_SHADOW, FONT, TYPE, jf } from '../theme';
import { CompanyBadge } from './company-badge';
import { IconButton } from './icon-button';
import { TagChip } from './tag-chip';

/**
 * One listing in the feed.
 *
 * Two columns: the text on the left flexed, the mark and the arrow on the right
 * at their natural width. The right column is `justify-content: space-between`
 * rather than a fixed gap, so the arrow tracks the bottom of the card as the
 * title wraps to a second line — which it does on the longest two titles.
 *
 * The card takes `onPress` and `onOpen` separately. The whole card is tappable
 * and so is the arrow, and the screen decides whether they go to the same place;
 * the card does not know where either of them leads.
 */
export function JobCard({
  job,
  onPress,
  onOpen,
  /** Slot for the bookmark toggle the saved screen adds beside the arrow. */
  trailing,
}: {
  job: Job;
  onPress?: () => void;
  onOpen?: () => void;
  trailing?: ReactNode;
}) {
  return (
    <Pressable onPress={onPress}>
      <View
        style={[
          {
            flexDirection: 'row',
            justifyContent: 'space-between',
            backgroundColor: jf.card,
            borderRadius: 26,
            padding: 20,
          },
          CARD_SHADOW,
        ]}
      >
        <View style={{ flex: 1, paddingRight: 12, justifyContent: 'space-between' }}>
          <View>
            <Text style={[TYPE.cardTitle, { fontSize: 17, lineHeight: 23, color: jf.ink }]}>
              {job.title}
            </Text>
            <Text style={[TYPE.meta, { color: jf.muted, marginTop: 4 }]}>
              {job.company}
              <Text style={{ color: jf.muted }}>{'   •   '}</Text>
              {job.mode}
            </Text>
          </View>

          <View style={{ flexDirection: 'row', alignItems: 'baseline', marginTop: 16 }}>
            <Text
              style={{
                fontFamily: FONT.extrabold,
                fontSize: 18,
                lineHeight: 27,
                letterSpacing: -0.4,
                color: jf.ink,
              }}
            >
              {job.salary}
            </Text>
            {job.per ? <Text style={[TYPE.meta, { color: jf.muted }]}>{job.per}</Text> : null}
          </View>

          <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginTop: 12 }}>
            {job.tags.map((t) => (
              <TagChip key={t.label} label={t.label} tone={t.tone} />
            ))}
          </View>
        </View>

        <View style={{ alignItems: 'center', justifyContent: 'space-between', paddingLeft: 4 }}>
          <CompanyBadge brand={job.brand} fill={job.brandBg} size={48} />
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
            {trailing}
            <IconButton
              icon={ArrowRight}
              onPress={onOpen}
              size={40}
              glyph={16}
              tone={jf.ink}
              inkTone={jf.card}
              strokeWidth={2.4}
              accessibilityLabel={`View ${job.title}`}
            />
          </View>
        </View>
      </View>
    </Pressable>
  );
}
