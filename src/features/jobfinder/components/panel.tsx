import { type ReactNode } from 'react';
import { Text, View } from 'react-native';

import { TYPE, jf } from '../theme';

/**
 * A titled block on the job detail screen.
 *
 * Unlike the feed's cards, these sit *into* the page rather than above it — a
 * shade darker than the background, not white — so they carry no shadow. That
 * is the design's own distinction between a thing you can tap and a thing you
 * read, and it is worth keeping.
 */
export function Panel({
  title,
  children,
  gap = 10,
}: {
  title: string;
  children: ReactNode;
  /** Space under the heading. The reference gives the two panels 10 and 16. */
  gap?: number;
}) {
  return (
    <View style={{ backgroundColor: jf.panel, borderRadius: 28, padding: 20 }}>
      <Text style={[TYPE.sectionTitle, { fontSize: 16, color: jf.ink, marginBottom: gap }]}>
        {title}
      </Text>
      {children}
    </View>
  );
}
