import type { ReactNode } from 'react';
import { View } from 'react-native';

import { bt, radius } from '../theme';

/**
 * The shell both metadata pods share.
 *
 * `children` is optional because the shell has to stand on its own: during the
 * staged reveal each pod is mounted before anything is put in it, and a shell
 * that cannot render empty makes the blank state a type error rather than a
 * frame of the video.
 *
 * `justify-between` over two children on a fixed 84dp height is what sets the
 * internal spacing — the `mt-2` and `mt-1` the markup puts on the second child
 * of each pod never take effect, because space-between has already pushed it to
 * the bottom. Reproduced as the layout rather than as the margins, which is
 * what the DOM actually resolves to.
 */
export function Pod({ children }: { children?: ReactNode }) {
  return (
    <View
      style={{
        flex: 1,
        height: 84,
        padding: 16,
        borderRadius: radius.lg,
        backgroundColor: bt.container,
        justifyContent: 'space-between',
      }}
    >
      {children}
    </View>
  );
}
