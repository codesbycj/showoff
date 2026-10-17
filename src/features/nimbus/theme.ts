/**
 * Nimbus — a soft-grey banking app, screen 2 ("My Cards").
 *
 * The reference is a single 1200x1200 presentation shot with two phones in it.
 * The right-hand phone is 414x894 of that image; its home indicator measures
 * 147px, and iOS draws that indicator at 139dp on every 390dp-wide device, so
 * the phone is a 390x844 screen at **1.0603 px per dp**. Every number in this
 * file and in `layout.ts` is that measurement divided by 1.0603, and the ones
 * that matter are named below with what they were measured off.
 *
 * Colours are modal values of flat regions, which is the one thing a 414px-wide
 * render still reports honestly — JPEG noise averages out over a few thousand
 * pixels even when no edge in the image is sharp.
 */

export const nb = {
  // ---- surfaces ----------------------------------------------------------
  /** The page. Modal of 1707/2000 sampled pixels down the left gutter. */
  canvas: '#ededed',
  /**
   * Everything raised off it — the header buttons, the action tiles, the
   * spend card, the transaction avatars, the floating dock. Not white: a
   * half-step above the canvas, which is what makes the page read as one
   * soft material rather than as cards on grey.
   */
  surface: '#fbfbfb',
  /** The active tab's pill, sunk back into the dock. Modal #e4e4e4. */
  sunken: '#e4e4e4',
  /** The dock, which samples a half-step below the other raised surfaces. */
  dock: '#f6f6f6',
  /** The hairline between transactions. */
  rule: '#e4e4e4',

  // ---- the card stack ----------------------------------------------------
  /**
   * The front card. A near-black with two casts in it: the body is #1d1d1d,
   * the top edge lifts to about #2a2a2a, and the bottom-left corner carries a
   * blue wash (#32485d sampled) — a 3D render's reflected light, rebuilt here
   * as two gradients rather than as an image.
   */
  card: '#1d1d1d',
  /** The blue bounce in the card's bottom-left corner, sampled at #32485d
   *  over the face and solved back to the light doing it. */
  glow: '#3f87c8',
  /** The second card in the stack. Modal #2c3b40. */
  cardMid: '#2c3b40',
  /** The third. Modal #3b533b — the only green on the card. */
  cardBack: '#3b533b',
  /** The translucent plate the hide-balance eye sits on. Modal #797979 on a
   *  #1d1d1d card, which is white at about 36%. */
  cardPlate: 'rgba(255, 255, 255, 0.36)',

  // ---- ink ---------------------------------------------------------------
  /** Headings, amounts, the title. */
  ink: '#0f0f0f',
  /** Tile labels and the spend card's heading — a touch softer than ink. */
  inkSoft: '#1f1f1f',
  /** Section headings, transaction times, the dock's labels. */
  muted: '#777777',
  /** The quieter half of a pair: "/$15,245", "100%". */
  mutedLight: '#9b9b9b',
  /** On the dark card: "Physical Card". */
  onCardMuted: '#a9a9a9',
  /** On the dark card: "Card Holder" / "Expires". The card's blue cast reaches
   *  these two labels, which sample #aeb8c4 rather than a neutral grey. */
  onCardLabel: '#aab6c4',
  onCard: '#ffffff',

  // ---- accents -----------------------------------------------------------
  /** The spend meter's fill. Modal #2fcd83 over 300px. */
  green: '#2fcd83',
  /** The meter's unfilled track, ticked rather than solid. */
  track: '#ededed',
  /**
   * Debits. Small red text on a near-white page never samples its own colour —
   * every pixel is a blend — so this is the most saturated pixel found across
   * the three amounts (#d82948) pulled back to the red the blend implies.
   */
  debit: '#e02741',

  // ---- brand marks -------------------------------------------------------
  /** Apple Music's own red, confirmed against the mark in the reference. */
  appleMusic: '#fa233b',
  /** Amazon's smile blue. */
  prime: '#00a8e1',
} as const;

/**
 * The type ramp. Inter throughout.
 *
 * The reference's face is a neo-grotesque with a tall x-height, flat terminals
 * and a double-storey `a` — SF Pro or something very near it, which is not
 * obtainable. Inter is the closest free face and is already registered in
 * `src/theme/fonts.ts`, so this showcase adds no font file and drifts no other
 * showcase's lock.
 *
 * Inter is **narrower** than the reference face at a matched cap height — the
 * opposite of the usual substitute problem, and by about 8% on digits. Both
 * cannot be matched, so the choice here is per element and was made twice:
 *
 *   * prose is matched on **width**, because a label that runs long is what
 *     collides with the thing next to it;
 *   * the two display numbers are matched on **cap height**, because the
 *     balance is read as a height against the card around it. `amount` at 22.5
 *     is 16.4dp to the cap where the reference is 16.0, and comes out 5%
 *     short across "$15,245" — which no neighbour notices.
 *
 * Every size below is `reference ink width / Inter ink width at 30dp * 30`,
 * measured off a throwaway render of all twenty strings, except `amount` and
 * `spendAmount` which are cap-height matched as above.
 *
 * `line` is explicit everywhere: React Native and the web harness disagree
 * about default leading, and the whole screen is positioned off these boxes.
 */
export const type = {
  /** "My Cards". */
  title: { size: 17, line: 21, tracking: -0.3, family: 'Inter_700Bold' },

  /** "Physical Card". */
  cardKind: { size: 11, line: 14, tracking: 0, family: 'Inter_400Regular' },
  /** "Available Balance". */
  cardCaption: { size: 11, line: 14, tracking: 0, family: 'Inter_400Regular' },
  /** "$15,245" — cap-height matched, see above. */
  amount: { size: 22.5, line: 27, tracking: 1.2, family: 'Inter_700Bold' },
  /** The cents, set small and grey beside it. */
  cents: { size: 11, line: 15, tracking: 1.8, family: 'Inter_700Bold' },
  /** The masked number and its last four. */
  cardNumber: { size: 11, line: 16, tracking: 0.9, family: 'Inter_500Medium' },
  /** "Card Holder", "Expires". */
  cardMetaLabel: { size: 9.2, line: 12, tracking: 0, family: 'Inter_400Regular' },
  /** "Kelly Victor", "05/ 2029". */
  cardMetaValue: { size: 12.5, line: 16, tracking: 0.1, family: 'Inter_600SemiBold' },
  /** The same, for the expiry — digits, which the reference's face sets wider
   *  than Inter does, so they carry their own tracking. */
  cardMetaFigure: { size: 12.5, line: 16, tracking: 0.8, family: 'Inter_600SemiBold' },

  /** "Freeze", "Limits", "Details", "Top up". */
  tileLabel: { size: 11.5, line: 14, tracking: -0.1, family: 'Inter_500Medium' },

  /** "Spent this month". */
  meterHead: { size: 11.5, line: 15, tracking: -0.1, family: 'Inter_500Medium' },
  /** "$8,545" — cap-height matched like `amount`. */
  meterAmount: { size: 14.6, line: 18, tracking: 0, family: 'Inter_700Bold' },
  /** "/$15,245". */
  meterTotal: { size: 12, line: 15, tracking: 0, family: 'Inter_500Medium' },
  /** "42% of your monthly limit", "100%". */
  meterNote: { size: 9.3, line: 12, tracking: 0, family: 'Inter_400Regular' },

  /** "Transactions". */
  sectionHead: { size: 13, line: 17, tracking: -0.1, family: 'Inter_500Medium' },
  /** "See all". */
  link: { size: 13.8, line: 17, tracking: -0.2, family: 'Inter_700Bold' },

  /** "Apple Music". */
  rowTitle: { size: 13.5, line: 17, tracking: -0.2, family: 'Inter_600SemiBold' },
  /** "Today, 1:00 PM". */
  rowMeta: { size: 9.5, line: 13, tracking: 0, family: 'Inter_400Regular' },
  /** "$25.00". */
  rowAmount: { size: 13.5, line: 17, tracking: 0.2, family: 'Inter_600SemiBold' },
  /** "Subscription". */
  rowTag: { size: 9.5, line: 13, tracking: 0, family: 'Inter_400Regular' },

  /** "Home", "Cards", "Analytics", "Settings". */
  tabLabel: { size: 10, line: 13, tracking: -0.1, family: 'Inter_400Regular' },
  /** The selected tab's label, which the reference sets heavier. */
  tabLabelOn: { size: 10, line: 13, tracking: -0.1, family: 'Inter_600SemiBold' },

  /** Inside the brand marks that are set as type rather than drawn. */
  markWord: { size: 5.3, line: 7, tracking: -0.15, family: 'Inter_700Bold' },
  /** One line of the Uber Eats mark, which is set over two. */
  markLine: { size: 5.2, line: 5.9, tracking: -0.2, family: 'Inter_700Bold' },
} as const;

/** Corner radii, read off the corner profiles of each box in the reference. */
export const radius = {
  /** The cards in the stack. */
  card: 26,
  /** Action tiles and the spend card. */
  tile: 14,
  /** The plate behind the eye on the card. */
  plate: 8,
  /** Anything fully round: the header buttons, the dock, the active pill. */
  full: 999,
} as const;

/**
 * The shadows. There are only two, and both are barely there — the reference's
 * surfaces are a half-step off the page and lift with a wide, pale shadow
 * rather than a dark one.
 *
 * `shadow*` and `elevation` travel together in one object rather than behind a
 * `Platform.select`: the keys the running platform ignores are inert, and a
 * select is precisely what the web harness cannot check.
 */
export const shadow = {
  /** Tiles, the spend card, the header buttons, the avatars. */
  soft: {
    shadowColor: '#9a9a9a',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.18,
    shadowRadius: 10,
    elevation: 3,
  },
  /** The floating dock, which sits over scrolling content. */
  dock: {
    shadowColor: '#8f8f8f',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.26,
    shadowRadius: 18,
    elevation: 10,
  },
  /** Under the card stack. Darker, because the card itself is black. */
  card: {
    shadowColor: '#1d1d1d',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.22,
    shadowRadius: 20,
    elevation: 8,
  },
} as const;
