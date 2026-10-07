import { ChevronDown, MapPin } from 'lucide-react-native';
import { Pressable, Text, View } from 'react-native';

import { FONT, R, SP, vt } from '../theme';

/**
 * The results masthead: the page title with the election picker under it, and
 * the geographic scope as a pill on the right.
 *
 * The two controls are not the same shape on purpose — the election is the
 * page's subject and reads as part of the title, so it is bare text with a
 * caret; the scope is a filter applied to it, so it is a chip. Drawing both as
 * chips would make them look like siblings, which they are not.
 */
export function ResultsHead({
  title,
  election,
  scope,
  onElection,
  onScope,
}: {
  title: string;
  election: string;
  scope: string;
  onElection?: () => void;
  onScope?: () => void;
}) {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'flex-start',
        justifyContent: 'space-between',
        paddingHorizontal: SP.margin,
        paddingTop: 12,
        paddingBottom: SP.xs,
      }}
    >
      <View style={{ flex: 1 }}>
        <Text
          style={{
            fontFamily: FONT.black,
            fontSize: 34,
            lineHeight: 40,
            letterSpacing: -1.02,
            color: vt.ink,
          }}
        >
          {title}
        </Text>

        <Pressable onPress={onElection} hitSlop={6}>
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 6 }}>
            <Text
              numberOfLines={1}
              style={{ fontFamily: FONT.semibold, fontSize: 15, lineHeight: 22, color: vt.inkSoft }}
            >
              {election}
            </Text>
            <ChevronDown size={16} color={vt.body} strokeWidth={2.5} />
          </View>
        </Pressable>
      </View>

      <Pressable onPress={onScope} hitSlop={6} style={{ marginTop: 6 }}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            gap: 6,
            backgroundColor: vt.fillPill,
            borderRadius: R.full,
            borderWidth: 1,
            borderColor: vt.lineStrong,
            paddingHorizontal: SP.md,
            paddingVertical: 6,
          }}
        >
          <MapPin size={14} color={vt.ink} fill={vt.ink} strokeWidth={0} />
          <Text
            style={{ fontFamily: FONT.semibold, fontSize: 12, lineHeight: 16, color: vt.inkSoft }}
          >
            {scope}
          </Text>
          <ChevronDown size={12} color={vt.body} strokeWidth={2.5} />
        </View>
      </Pressable>
    </View>
  );
}
