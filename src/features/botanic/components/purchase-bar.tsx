import { useEffect, useRef, useState } from 'react';
import { Pressable, Text, View } from 'react-native';

import { CTA } from '../data/product';
import { BAR_CONTROL, BAR_PAD_Y, MARGIN } from '../layout';
import { alpha, bt, radius, type as t } from '../theme';
import { useBotanicInsets } from '../use-insets';
import { DrawnIcon } from './drawn-icon';
import { Symbol } from './symbol';

/**
 * The dock: a favourite toggle and the buy button.
 *
 * Both of the export's micro-interactions are wired, because the recording
 * should be able to use the screen rather than mime it:
 *
 *   * the heart fills and turns to `error` on tap — and the filled heart is a
 *     `FILL 1` glyph, so it comes from `drawn-icon.tsx` while the outline comes
 *     from the symbol font;
 *   * the CTA swaps its label for 1800ms and brightens from `primary-container`
 *     to `primary`, then puts itself back.
 *
 * The confirmation text drops the export's party-popper emoji. An emoji is
 * drawn by whichever font claims the codepoint, so it differs across Windows,
 * Android and iOS — and the web harness renders on one of them and cannot show
 * the difference, which is exactly the class of bug this project designs out
 * rather than catches.
 */
export function PurchaseBar() {
  const { bottom } = useBotanicInsets();
  const [faved, setFaved] = useState(false);
  const [added, setAdded] = useState(false);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Clear on unmount, so a tap just before leaving the screen cannot set state
  // on a component that is gone.
  useEffect(() => () => void (timer.current && clearTimeout(timer.current)), []);

  const add = () => {
    setAdded(true);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => setAdded(false), CTA.confirmMs);
  };

  return (
    <View
      style={{
        position: 'absolute',
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 40,
        paddingHorizontal: MARGIN,
        paddingTop: BAR_PAD_Y,
        paddingBottom: BAR_PAD_Y + bottom,
        flexDirection: 'row',
        alignItems: 'center',
        gap: 12,
        backgroundColor: alpha.purchaseBar,
      }}
    >
      <Pressable
        onPress={() => setFaved((v) => !v)}
        accessibilityRole="button"
        accessibilityLabel="Save to favorites"
        accessibilityState={{ selected: faved }}
      >
        <View
          style={{
            width: BAR_CONTROL,
            height: BAR_CONTROL,
            borderRadius: radius.full,
            backgroundColor: bt.containerHigh,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {faved ? (
            <DrawnIcon name="favorite" size={24} color={bt.error} />
          ) : (
            <Symbol name="favorite" size={24} color={bt.ink} />
          )}
        </View>
      </Pressable>

      <Pressable style={{ flex: 1 }} onPress={add} accessibilityRole="button">
        <View
          style={{
            height: BAR_CONTROL,
            borderRadius: radius.full,
            backgroundColor: added ? bt.accent : bt.accentFill,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            gap: 8,
          }}
        >
          <Symbol name="shoppingBag" size={22} color={bt.onAccent} />
          <Text
            style={{
              fontFamily: t.labelLg.family,
              fontSize: t.labelLg.size,
              lineHeight: t.labelLg.line,
              letterSpacing: t.labelLg.tracking,
              color: bt.onAccent,
            }}
          >
            {(added ? CTA.added : CTA.label).toUpperCase()}
          </Text>
        </View>
      </Pressable>
    </View>
  );
}
