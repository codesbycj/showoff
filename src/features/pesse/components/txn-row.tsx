import { Image } from 'expo-image';
import { Text, View } from 'react-native';

import { type Txn } from '../data/wallet';
import { LEVEL, R, TYPE, ps } from '../theme';
import { NetworkBadge } from './network-badge';
import { Symbol } from './symbol';

/**
 * One line of the ledger: a 44dp well on the left holding either a category
 * glyph or a portrait, the title and timestamp stacked beside it, and the
 * amount right-aligned.
 *
 * `credit` drives the amount's colour and nothing else drives it — a row cannot
 * end up lime with a minus sign, because the sign is in the same string the
 * flag is chosen for.
 */
export function TxnRow({ txn }: { txn: Txn }) {
  return (
    <View
      style={[
        {
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: 8,
          borderRadius: R.lg,
          backgroundColor: ps.surfaceLowest,
        },
        LEVEL.container,
      ]}
    >
      <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center', gap: 16 }}>
        <View>
          {txn.photo ? (
            <Image
              source={txn.photo}
              style={{
                width: 44,
                height: 44,
                borderRadius: 22,
                backgroundColor: ps.surfaceContainer,
              }}
              contentFit="cover"
              transition={0}
            />
          ) : (
            <View
              style={{
                width: 44,
                height: 44,
                borderRadius: R.full,
                backgroundColor: ps.surfaceContainer,
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Symbol name={txn.icon ?? 'payments'} size={22} color={ps.onSurface} />
            </View>
          )}
          {txn.badge ? <NetworkBadge badge={txn.badge} /> : null}
        </View>

        <View style={{ flex: 1, minWidth: 0 }}>
          <Text style={[TYPE.headlineSm, { color: ps.onSurface }]} numberOfLines={1}>
            {txn.title}
          </Text>
          <Text style={[TYPE.bodySm, { color: ps.secondary, marginTop: 2 }]} numberOfLines={1}>
            {txn.when}
          </Text>
        </View>
      </View>

      <Text style={[TYPE.headlineSm, { color: txn.credit ? ps.olive : ps.error, paddingLeft: 8 }]}>
        {txn.amount}
      </Text>
    </View>
  );
}
