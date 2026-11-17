import { View } from 'react-native';

import { body, headline } from '../data/start';
import { T } from './text';

type HeadProps = { margin: number; height: number };

/** The headline. Three lines, as the board sets them — the dominant element
 *  on the screen (R8), at 31dp against 14dp body. */
export function Headline({ margin, height }: HeadProps) {
  return (
    <View style={{ marginHorizontal: margin, height, justifyContent: 'center' }}>
      {headline.map((line) => (
        <T key={line} variant="headline">
          {line}
        </T>
      ))}
    </View>
  );
}

/** The body. One run, 97 characters — R5's ceiling is 110, and the board's own
 *  run is 114 and repeats a word from the headline above it. */
export function Body({ margin, height }: HeadProps) {
  return (
    <View style={{ marginHorizontal: margin, height }}>
      <T variant="body">{body}</T>
    </View>
  );
}
