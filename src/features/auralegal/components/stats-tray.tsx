import { Text, View } from 'react-native';

import { type Stat } from '../data/explore';
import { SP, TYPE, al, alpha } from '../theme';

/**
 * The three-up metrics tray under the deck.
 *
 * The captions are `scale-90` on an 11dp label in the export. A transform scale
 * on text is not reproduced here — it would blur the glyphs on Android, where
 * the text is rasterised before the transform — so the caption is set at 10dp
 * instead, which is what 11 at 90% resolves to.
 */
export function StatsTray({ stats }: { stats: readonly Stat[] }) {
  return (
    <View
      style={{
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: al.surfaceContainer,
        borderRadius: 22,
        padding: SP.md,
        marginBottom: SP.lg,
      }}
    >
      {stats.map((s, i) => (
        <View key={s.key} style={{ flexDirection: 'row', alignItems: 'center', flex: 1 }}>
          {i > 0 ? (
            <View style={{ width: 1, height: 32, backgroundColor: al.surfaceContainerHighest }} />
          ) : null}

          <View style={{ flex: 1, alignItems: 'center' }}>
            <Text style={{ ...TYPE.labelSm, color: al.onSurfaceVariant }}>{s.label}</Text>
            <Text
              style={{
                ...TYPE.headlineMd,
                fontFamily: TYPE.headlineXl.fontFamily,
                marginTop: 2,
                color: s.tone === 'secondary' ? al.secondary : al.primary,
              }}
            >
              {s.value}
            </Text>
            <Text
              style={{
                ...TYPE.labelSm,
                fontSize: 10,
                lineHeight: 13,
                color: alpha(al.onSurface, 0.6),
              }}
            >
              {s.caption}
            </Text>
          </View>
        </View>
      ))}
    </View>
  );
}
