import { Pressable, View } from 'react-native';
import Svg, { Path, Rect } from 'react-native-svg';

import { copy, files } from '../data/start';
import { ATTACH_HEIGHT, CARD_PAD } from '../layout';
import { br, radius, type } from '../theme';
import { T } from './text';

/**
 * The files the task came with, and the way to add one.
 *
 * Each file is a real 34dp pill rather than a label, and the "+" is its own
 * 34dp disc — the reference's are 24dp and 20dp, which is a third of a thumb
 * each.
 *
 * The document glyph is drawn: an emoji here would differ between Windows,
 * Android and iOS and cannot be shipped as UI.
 */
export function AttachmentsCard({ onAdd }: { onAdd?: () => void }) {
  return (
    <View
      style={{
        height: ATTACH_HEIGHT,
        borderRadius: radius.card,
        backgroundColor: br.blue,
        padding: CARD_PAD,
        justifyContent: 'space-between',
      }}
    >
      <T variant="panelTitle" color={br.onBlue} style={{ height: type.panelTitle.line }}>
        {copy.attachments}
      </T>

      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        {files.map((f) => (
          <Pressable key={f} accessibilityRole="button" accessibilityLabel={f}>
            <View
              style={{
                height: 34,
                marginRight: 8,
                paddingHorizontal: 12,
                borderRadius: radius.chip,
                backgroundColor: br.surface,
                flexDirection: 'row',
                alignItems: 'center',
              }}
            >
              <Svg width={13} height={13} viewBox="0 0 24 24">
                <Rect
                  x={5}
                  y={3.2}
                  width={14}
                  height={17.6}
                  rx={2.6}
                  stroke={br.blue}
                  strokeWidth={1.8}
                  fill="none"
                />
                <Path
                  d="M8.6 9.2h6.8M8.6 13h6.8"
                  stroke={br.blue}
                  strokeWidth={1.8}
                  strokeLinecap="round"
                />
              </Svg>
              <T variant="file" color={br.ink} style={{ marginLeft: 6, height: type.file.line }}>
                {f}
              </T>
            </View>
          </Pressable>
        ))}

        <View style={{ flex: 1 }} />

        <Pressable onPress={onAdd} accessibilityRole="button" accessibilityLabel="Add a file">
          <View
            style={{
              width: 34,
              height: 34,
              borderRadius: radius.pill,
              backgroundColor: 'rgba(255,255,255,0.22)',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Svg width={15} height={15} viewBox="0 0 24 24">
              <Path
                d="M12 5.6v12.8M5.6 12h12.8"
                stroke={br.onBlue}
                strokeWidth={2.2}
                strokeLinecap="round"
              />
            </Svg>
          </View>
        </Pressable>
      </View>
    </View>
  );
}
