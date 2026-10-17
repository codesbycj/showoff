import { View } from 'react-native';

import { T } from './text';
import { el } from '../theme';

/**
 * The headline and the paragraph under it.
 *
 * Both arrive as arrays of lines rather than as one string with a `\n` in it,
 * because where they break is a design decision: the headline's two lines are
 * set to nearly the same width, and the paragraph's are balanced under them.
 * Left to wrap, both would rebreak at every screen width.
 */
export function IntroCopy({ title, body }: { title: readonly string[]; body: readonly string[] }) {
  return (
    <View style={{ alignItems: 'center' }}>
      {/* STEP 1.12 the name, and what it promises
      <View>
        {title.map((line) => (
          <T key={line} variant="title" color={el.ink} style={{ textAlign: 'center' }}>
            {line}
          </T>
        ))}
      </View>
      */}

      {/* STEP 1.13 and the sentence under it
      <View style={{ marginTop: 12 }}>
        {body.map((line) => (
          <T key={line} variant="body" color={el.muted} style={{ textAlign: 'center' }}>
            {line}
          </T>
        ))}
      </View>
      */}
    </View>
  );
}
