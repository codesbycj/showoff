import { View } from 'react-native';

import { T } from './text';
import { cg } from '../theme';

/**
 * The headline and the sentence under it.
 *
 * Both arrive as arrays of lines rather than one string with a `\n` in it,
 * because where they break is a design decision: the headline's two lines are
 * set to almost the same width, which is what makes the block read as a shape.
 */
export function IntroCopy({ title, body }: { title: readonly string[]; body: readonly string[] }) {
  return (
    <View>
      {/* STEP 1.10 the promise, in two lines
      <View>
        {title.map((line) => (
          <T key={line} variant="title" color={cg.ink}>
            {line}
          </T>
        ))}
      </View>
      */}

      {/* STEP 1.11 and the sentence that backs it up
      <View style={{ marginTop: 12 }}>
        {body.map((line) => (
          <T key={line} variant="body" color={cg.muted}>
            {line}
          </T>
        ))}
      </View>
      */}
    </View>
  );
}
