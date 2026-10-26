import { Pressable, View } from 'react-native';

import { ACTIONS_TOP, ACTION_DISC } from '../layout';
import { ne, radius } from '../theme';
import { Action } from './glyphs';

const FILL = {
  sign: ne.ink,
  send: ne.ink,
  add: ne.olive,
  save: ne.card,
} as const;

const INK = {
  sign: ne.onDock,
  send: ne.onDock,
  add: ne.onDock,
  save: ne.ink,
} as const;

/** One disc. Written out in `ActionDiscs` so the reveal lands them singly. */
function Disc({
  id,
  label,
  onPress,
}: {
  id: keyof typeof FILL;
  label: string;
  onPress?: () => void;
}) {
  return (
    <Pressable onPress={onPress} accessibilityRole="button" accessibilityLabel={label}>
      <View
        style={{
          width: ACTION_DISC,
          height: ACTION_DISC,
          borderRadius: radius.pill,
          backgroundColor: FILL[id],
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Action id={id} tint={INK[id]} />
      </View>
    </Pressable>
  );
}

/**
 * The four things the wallet does.
 *
 * Each carries an accessible name: the reference's four are glyphs in discs
 * with nothing to say what any of them is.
 */
export function ActionDiscs({ onAdd }: { onAdd?: () => void }) {
  return (
    <View
      style={{
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: ACTIONS_TOP,
      }}
    >
{/* STEP 1.13 sign something
      <Disc id="sign" label="Sign a transaction" />
*/}
{/* STEP 1.14 send something
      <Disc id="send" label="Send" />
*/}
{/* STEP 1.15 add to it
      <Disc id="add" label="Add funds" onPress={onAdd} />
*/}
{/* STEP 1.16 or keep it
      <Disc id="save" label="Saved" />
*/}
    </View>
  );
}
