import { FileText } from 'lucide-react-native';
import { Pressable, Text, View } from 'react-native';

import { PROFILE } from '../data/profile';
import { CARD_SHADOW, FONT, R, jf } from '../theme';

/**
 * The endorsed-skills card and the CV row beneath it.
 *
 * They are one component because they are one card in the design — the divider
 * between them is a hairline inside it, not a gap between two cards — and
 * splitting them would mean a second component whose only job is to be the
 * bottom half of this one.
 */
export function SkillsPanel({ onDownload }: { onDownload?: () => void }) {
  return (
    <View style={[{ backgroundColor: jf.card, borderRadius: 26, padding: 20 }, CARD_SHADOW]}>
      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: 12,
        }}
      >
        <Text
          style={{
            fontFamily: FONT.bold,
            fontSize: 14,
            lineHeight: 19,
            letterSpacing: -0.2,
            color: jf.ink,
          }}
        >
          {PROFILE.skillsTitle}
        </Text>
        <View
          style={{
            paddingHorizontal: 8,
            paddingVertical: 2,
            borderRadius: R.full,
            backgroundColor: '#E2F2E5',
          }}
        >
          <Text
            style={{ fontFamily: FONT.semibold, fontSize: 11, lineHeight: 17, color: '#15803D' }}
          >
            {PROFILE.skillsBadge}
          </Text>
        </View>
      </View>

      <View style={{ flexDirection: 'row', flexWrap: 'wrap', gap: 8 }}>
        {PROFILE.skills.map((s) => (
          <View
            key={s.label}
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              gap: 6,
              paddingHorizontal: 12,
              paddingVertical: 6,
              borderRadius: R.full,
              backgroundColor: '#EDF0EB',
            }}
          >
            {'dot' in s && s.dot ? (
              <View style={{ width: 8, height: 8, borderRadius: 4, backgroundColor: s.dot }} />
            ) : null}
            <Text
              style={{
                fontFamily: 'dot' in s && s.dot ? FONT.semibold : FONT.medium,
                fontSize: 12,
                lineHeight: 17,
                color: jf.ink,
              }}
            >
              {s.label}
            </Text>
          </View>
        ))}
      </View>

      <View
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginTop: 16,
          paddingTop: 16,
          borderTopWidth: 1,
          borderTopColor: '#EDF0EB',
        }}
      >
        <View style={{ flexDirection: 'row', alignItems: 'center', gap: 8 }}>
          <View
            style={{
              width: 32,
              height: 32,
              borderRadius: R.full,
              backgroundColor: '#FAEAE1',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <FileText size={16} color="#C2410C" strokeWidth={2} />
          </View>
          <View>
            <Text style={{ fontFamily: FONT.bold, fontSize: 12, lineHeight: 17, color: jf.ink }}>
              {PROFILE.cv.file}
            </Text>
            <Text
              style={{ fontFamily: FONT.regular, fontSize: 10, lineHeight: 15, color: jf.muted }}
            >
              {PROFILE.cv.meta}
            </Text>
          </View>
        </View>

        <Pressable onPress={onDownload} accessibilityRole="button">
          <View
            style={{
              paddingHorizontal: 12,
              paddingVertical: 6,
              borderRadius: R.full,
              backgroundColor: '#EDF0EB',
            }}
          >
            <Text style={{ fontFamily: FONT.bold, fontSize: 12, lineHeight: 17, color: jf.ink }}>
              {PROFILE.cv.action}
            </Text>
          </View>
        </Pressable>
      </View>
    </View>
  );
}
