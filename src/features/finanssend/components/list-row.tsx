import { Pressable, View } from 'react-native';

import { ROW_AVATAR, ROW_HEIGHT } from '../layout';
import { fn } from '../theme';
import { Avatar } from './avatar';
import { Icon } from './icon';
import { T } from './text';

/**
 * One saved payee: who, which account, which bank.
 *
 * The name and number share a column that takes the slack, so a long name
 * shortens rather than pushing the bank off the row — the bank is the thing
 * that disambiguates two people with the same name.
 */
export function ListRow({
  name,
  number,
  bank,
  face,
  onPress,
}: {
  name: string;
  number: string;
  bank: string;
  face: number;
  onPress?: () => void;
}) {
  return (
    <Pressable onPress={onPress} accessibilityRole="button" accessibilityLabel={`${name}, ${bank}`}>
      <View style={{ height: ROW_HEIGHT, flexDirection: 'row', alignItems: 'center' }}>
        {/* STEP 1.22 a face for the payee
        <Avatar face={face} size={ROW_AVATAR} />
        */}

        {/* STEP 1.23 their name and number
        <View style={{ flex: 1, marginLeft: 11 }}>
          <T variant="rowTitle" color={fn.ink} numberOfLines={1}>
            {name}
          </T>
          <T variant="rowMeta" color={fn.faint} numberOfLines={1}>
            {number}
          </T>
        </View>
        */}

        {/* STEP 1.24 which bank
        <T variant="rowBank" color={fn.muted} style={{ marginRight: 10 }}>
          {bank}
        </T>
        */}
        {/* STEP 1.25 and a way into it
        <Icon name="more" size={16} color={fn.muted} />
        */}
      </View>
    </Pressable>
  );
}
