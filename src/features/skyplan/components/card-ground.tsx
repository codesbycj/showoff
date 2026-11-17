import { View } from 'react-native';

import { ct } from '../theme';

type Props = { radius: number };

/**
 * The search card's own fill.
 *
 * **It is an absolutely-filled child, and it carries the shadow** (§5.5, I9).
 * Left on the block that holds the fields, the fill — and the shadow under it
 * — would paint in frame one, and the take would open on an empty white card
 * instead of the sky.
 *
 * `@not-a-ground`: it fills the SEARCH CARD, not the page - the sky behind
 * it is the screen's own ground - so this surface is a step of the reveal.
 * `stage.js` reads a component's own root to decide, and an absolute fill
 * looks the same whether it covers a card or the frame (SS5.5).
 */
export function CardGround({ radius }: Props) {
  return (
    <View
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        borderRadius: radius,
        backgroundColor: ct.surface,
        shadowColor: '#0B1220',
        shadowOpacity: 0.1,
        shadowRadius: 22,
        shadowOffset: { width: 0, height: 10 },
        elevation: 6,
      }}
    />
  );
}
