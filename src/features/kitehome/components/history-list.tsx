import { Image, Pressable, View } from 'react-native';

import { copy, faces, history, money } from '../data/start';
import { ROW_DISC, ROW_HEIGHT } from '../layout';
import { kt, radius, type } from '../theme';
import { T } from './text';

/**
 * What the wallet has been doing.
 *
 * The faces are photographs, per AGENTS.md: these are people, and a disc of
 * initials is the state a real app falls back to rather than the design.
 *
 * Each row takes an equal share of what the panel and the tab bar leave, so
 * the list fills the gap between them at any screen height instead of
 * stacking at fixed heights and leaving a band of canvas above the bar.
 *
 * Money in and money out are signed in the data and coloured here, so a row
 * cannot be green and negative. The reference colours only the status line,
 * which leaves "$1,090.00" ambiguous about which way it went.
 */
export function HistoryList() {
  return (
    <View style={{ flex: 1 }}>
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <T
          variant="sectionTitle"
          color={kt.onCanvas}
          style={{ flex: 1, height: type.sectionTitle.line }}
        >
          {copy.history}
        </T>
        <Pressable accessibilityRole="button" accessibilityLabel={copy.seeAll}>
          <T variant="seeAll" color={kt.coral} style={{ height: type.seeAll.line }}>
            {copy.seeAll}
          </T>
        </Pressable>
      </View>

      {history.map((h) => (
        <Pressable
          key={h.id}
          style={{ flex: 1 }}
          accessibilityRole="button"
          accessibilityLabel={h.name}
        >
          <View
            style={{
              flex: 1,
              minHeight: ROW_HEIGHT,
              flexDirection: 'row',
              alignItems: 'center',
            }}
          >
            <Image
              source={faces[h.face]}
              style={{ width: ROW_DISC, height: ROW_DISC, borderRadius: radius.pill }}
              accessibilityIgnoresInvertColors
            />
            <View style={{ flex: 1, marginLeft: 11 }}>
              <T variant="rowName" color={kt.onCanvas} style={{ height: type.rowName.line }}>
                {h.name}
              </T>
              <T variant="rowSub" color={kt.onCanvasDim} style={{ height: type.rowSub.line }}>
                {h.on}
              </T>
            </View>
            <View style={{ alignItems: 'flex-end' }}>
              <T
                variant="rowAmount"
                color={h.amount > 0 ? kt.green : kt.onCanvas}
                style={{ height: type.rowAmount.line }}
              >
                {(h.amount > 0 ? '+' : '-') + money(h.amount)}
              </T>
              <T variant="rowState" color={kt.green} style={{ height: type.rowState.line }}>
                {copy.state}
              </T>
            </View>
          </View>
        </Pressable>
      ))}
    </View>
  );
}
