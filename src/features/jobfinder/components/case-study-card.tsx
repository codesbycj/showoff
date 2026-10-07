import { ArrowUpRight } from 'lucide-react-native';
import { Pressable, Text, View } from 'react-native';

import { type CaseStudy, PROJECT_TAG } from '../data/profile';
import { CARD_SHADOW, FONT, TYPE, jf } from '../theme';
import { IconButton } from './icon-button';
import { ProjectGlyph } from './project-glyph';

/**
 * A case study on the profile screen.
 *
 * The arrow points up-right rather than right, because these open something
 * outside the app — the reference draws the same arrow rotated 45°. It is a
 * different icon here rather than a rotation, since rotating an icon in React
 * Native turns about its centre and a 45° turn would push the glyph out of a
 * 36dp disc.
 */
export function CaseStudyCard({ study, onPress }: { study: CaseStudy; onPress?: () => void }) {
  return (
    <Pressable onPress={onPress}>
      <View style={[{ backgroundColor: jf.card, borderRadius: 26, padding: 16 }, CARD_SHADOW]}>
        <View style={{ flexDirection: 'row', alignItems: 'flex-start', gap: 12 }}>
          <View style={{ flex: 1 }}>
            <Text style={[TYPE.eyebrow, { color: jf.muted, marginBottom: 4 }]}>
              {study.eyebrow.toUpperCase()}
            </Text>
            <Text
              style={{
                fontFamily: FONT.bold,
                fontSize: 16,
                lineHeight: 22,
                letterSpacing: -0.3,
                color: jf.ink,
              }}
            >
              {study.title}
            </Text>
            <Text
              style={{
                fontFamily: FONT.medium,
                fontSize: 12,
                lineHeight: 17,
                color: jf.muted,
                marginTop: 4,
              }}
              numberOfLines={1}
            >
              {study.blurb}
            </Text>

            <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 6, marginTop: 12 }}>
              {study.tags.map((t) => {
                const { bg, fg } = PROJECT_TAG[t.tone];
                return (
                  <View
                    key={t.label}
                    style={{
                      paddingHorizontal: 10,
                      paddingVertical: 2,
                      borderRadius: 999,
                      backgroundColor: bg,
                    }}
                  >
                    <Text
                      style={{
                        fontFamily: t.tone === 'stone' ? FONT.medium : FONT.semibold,
                        fontSize: 11,
                        lineHeight: 17,
                        color: fg,
                      }}
                    >
                      {t.label}
                    </Text>
                  </View>
                );
              })}
            </View>
          </View>

          <View style={{ alignItems: 'center', gap: 12 }}>
            <ProjectGlyph glyph={study.glyph} fill={study.glyphBg} size={40} />
            <IconButton
              icon={ArrowUpRight}
              size={36}
              glyph={16}
              tone={jf.ink}
              inkTone={jf.card}
              strokeWidth={2.4}
              onPress={onPress}
              accessibilityLabel={`View ${study.title}`}
            />
          </View>
        </View>
      </View>
    </Pressable>
  );
}
