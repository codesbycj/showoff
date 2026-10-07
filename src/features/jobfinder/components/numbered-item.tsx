import { Text, View } from 'react-native';

import { FONT, R, jf } from '../theme';

/**
 * One responsibility: a white numbered disc, then the line.
 *
 * The disc is nudged down 2dp rather than aligned to the top of the paragraph,
 * because the design centres it on the first line's ink rather than on its line
 * box — a 20dp disc against a 17dp line box sits low by exactly that much.
 */
export function NumberedItem({ n, children }: { n: number; children: string }) {
  return (
    <View style={{ flexDirection: 'row', alignItems: 'flex-start', gap: 12 }}>
      <View
        style={{
          width: 20,
          height: 20,
          borderRadius: R.full,
          backgroundColor: jf.card,
          alignItems: 'center',
          justifyContent: 'center',
          marginTop: 2,
        }}
      >
        <Text style={{ fontFamily: FONT.bold, fontSize: 11, lineHeight: 14, color: jf.ink }}>
          {n}
        </Text>
      </View>
      <Text
        style={{
          flex: 1,
          fontFamily: FONT.regular,
          fontSize: 12.5,
          lineHeight: 17,
          color: 'rgba(25,26,30,0.85)',
        }}
      >
        {children}
      </Text>
    </View>
  );
}
