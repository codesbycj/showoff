import { Pressable, View } from 'react-native';

import { CHIP_HEIGHT, TOOL_SIZE } from '../layout';
import { radius, vt, type } from '../theme';
import { Glyph } from './glyph';
import { T } from './text';

/**
 * A saved prompt, and the two things you can do to it.
 *
 * The chip is the prompt and the two discs act on it, so they are separate
 * targets at a real size rather than glyphs tucked against the chip's end —
 * delete and edit sitting 6dp apart at 14dp each is how you delete the thing
 * you meant to rename.
 */
export function PromptHead({ label }: { label: string }) {
  const tool = {
    width: TOOL_SIZE,
    height: TOOL_SIZE,
    borderRadius: radius.control,
    borderWidth: 1.3,
    borderColor: '#E3E4E6',
    alignItems: 'center' as const,
    justifyContent: 'center' as const,
  };

  return (
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
{/* STEP 1.09 what it asks
      <View
        style={{
          height: CHIP_HEIGHT,
          paddingHorizontal: 12,
          borderRadius: radius.control,
          backgroundColor: vt.acid,
          flexDirection: 'row',
          alignItems: 'center',
        }}
      >
        <Glyph name="bolt" size={14} tint={vt.onAcid} />
        <T variant="chip" color={vt.onAcid} style={{ marginLeft: 6, height: type.chip.line }}>
          {label}
        </T>
      </View>
*/}

      <View style={{ flex: 1 }} />

{/* STEP 1.10 a way to drop it
      <Pressable accessibilityRole="button" accessibilityLabel={`Delete "${label}"`}>
        <View style={tool}>
          <Glyph name="trash" size={16} tint={vt.onCanvas} />
        </View>
      </Pressable>
*/}
{/* STEP 1.11 and a way to rename it
      <Pressable accessibilityRole="button" accessibilityLabel={`Edit "${label}"`}>
        <View style={[tool, { marginLeft: 8 }]}>
          <Glyph name="edit" size={16} tint={vt.onCanvas} />
        </View>
      </Pressable>
*/}
    </View>
  );
}
