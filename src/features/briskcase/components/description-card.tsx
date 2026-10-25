import { View } from 'react-native';

import { copy } from '../data/start';
import { CARD_PAD, DESC_MIN } from '../layout';
import { br, radius, type } from '../theme';
import { T } from './text';

/**
 * What the task actually asks for.
 *
 * The body is left to wrap rather than given a fixed height: this is the one
 * block on the screen whose length is genuinely the copy's, and pinning it
 * would clip the last line on a narrow phone.
 */
export function DescriptionCard() {
  return (
    <View
      style={{
        minHeight: DESC_MIN,
        borderRadius: radius.card,
        backgroundColor: br.surface,
        padding: CARD_PAD,
      }}
    >
      <T variant="panelTitle" color={br.ink} style={{ height: type.panelTitle.line }}>
        {copy.description}
      </T>
      <T variant="body" color={br.muted} style={{ marginTop: 8 }}>
        {copy.body}
      </T>
    </View>
  );
}
