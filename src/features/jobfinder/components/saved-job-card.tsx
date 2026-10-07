import { ArrowRight, Bookmark } from 'lucide-react-native';
import { Pressable, Text, View } from 'react-native';

import { type SavedJob } from '../data/saved';
import { CARD_SHADOW, FONT, TYPE, jf } from '../theme';
import { BrandMark, NikitinN } from './brand-mark';
import { IconButton } from './icon-button';
import { TagChip } from './tag-chip';

/**
 * A card on the saved screen.
 *
 * This is not the feed's `JobCard` with extra props. The two cards are laid out
 * differently, not styled differently: the feed splits into two columns with the
 * mark and the arrow stacked down the right, while this one is four stacked rows
 * with the mark floating at the top right and the actions sharing the last row
 * with the tags. The company mark is even a different shape — a 44dp rounded
 * square here, a 48dp disc there. Expressing both from one component would take
 * a layout switch, which is two components wearing a trench coat.
 */
export function SavedJobCard({
  job,
  saved,
  onToggleSave,
  onOpen,
}: {
  job: SavedJob;
  saved: boolean;
  onToggleSave?: () => void;
  onOpen?: () => void;
}) {
  return (
    <Pressable onPress={onOpen}>
      <View style={[{ backgroundColor: jf.card, borderRadius: 24, padding: 20 }, CARD_SHADOW]}>
        <View style={{ flexDirection: 'row', alignItems: 'flex-start' }}>
          <View style={{ flex: 1, paddingRight: 8 }}>
            <Text style={[TYPE.cardTitle, { fontSize: 17, lineHeight: 23, color: jf.ink }]}>
              {job.title}
            </Text>
            <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6, marginTop: 4 }}>
              <Text style={[TYPE.bodyMedium, { fontSize: 13, color: jf.muted }]}>
                {job.company}
              </Text>
              <View style={{ width: 4, height: 4, borderRadius: 2, backgroundColor: '#D4D4D4' }} />
              <Text style={[TYPE.bodyMedium, { fontSize: 13, color: jf.muted }]}>{job.mode}</Text>
            </View>
          </View>

          {/* A rounded square, not a disc — the saved screen's own shape. */}
          <View
            style={{
              width: 44,
              height: 44,
              borderRadius: 16,
              backgroundColor: job.brandBg,
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            {job.brand === 'nikitin' ? (
              <NikitinN size={22} />
            ) : (
              <BrandMark brand={job.brand} size={22} />
            )}
          </View>
        </View>

        <View style={{ flexDirection: 'row', alignItems: 'baseline', marginTop: 10 }}>
          <Text
            style={{
              fontFamily: FONT.extrabold,
              fontSize: 17,
              lineHeight: 24,
              letterSpacing: -0.4,
              color: jf.ink,
            }}
          >
            {job.salary}
          </Text>
          <Text style={[TYPE.meta, { color: jf.muted }]}>{job.per}</Text>
        </View>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
            marginTop: 20,
          }}
        >
          <View style={{ flex: 1, flexDirection: 'row', flexWrap: 'wrap', gap: 6 }}>
            {job.tags.map((t) => (
              <TagChip key={t.label} label={t.label} tone={t.tone} />
            ))}
          </View>

          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8, paddingLeft: 8 }}>
            <IconButton
              icon={Bookmark}
              size={36}
              glyph={16}
              tone="#F4F6F2"
              inkTone={saved ? jf.ink : jf.muted}
              fill={saved ? jf.ink : undefined}
              onPress={onToggleSave}
              accessibilityLabel={saved ? 'Unsave job' : 'Save job'}
            />
            <IconButton
              icon={ArrowRight}
              size={36}
              glyph={16}
              tone={jf.ink}
              inkTone={jf.card}
              strokeWidth={2.4}
              onPress={onOpen}
              accessibilityLabel={`View ${job.title}`}
            />
          </View>
        </View>
      </View>
    </Pressable>
  );
}
