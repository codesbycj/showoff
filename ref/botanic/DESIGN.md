---
name: Organic Botanic Dark
colors:
  surface: '#111411'
  surface-dim: '#111411'
  surface-bright: '#373a36'
  surface-container-lowest: '#0c0f0c'
  surface-container-low: '#191c19'
  surface-container: '#1d201d'
  surface-container-high: '#282b27'
  surface-container-highest: '#333632'
  on-surface: '#e1e3de'
  on-surface-variant: '#c1c9b6'
  inverse-surface: '#e1e3de'
  inverse-on-surface: '#2e312e'
  outline: '#8c9381'
  outline-variant: '#42493a'
  surface-tint: '#98d867'
  primary: '#b0f27d'
  on-primary: '#183800'
  primary-container: '#95d564'
  on-primary-container: '#2c5c00'
  inverse-primary: '#346b00'
  secondary: '#efc146'
  on-secondary: '#3e2e00'
  secondary-container: '#b38b0b'
  on-secondary-container: '#362800'
  tertiary: '#ffd7cc'
  on-tertiary: '#5b1a06'
  tertiary-container: '#ffb19b'
  on-tertiary-container: '#863a23'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#b3f57f'
  primary-fixed-dim: '#98d867'
  on-primary-fixed: '#0b2000'
  on-primary-fixed-variant: '#265100'
  secondary-fixed: '#ffdf96'
  secondary-fixed-dim: '#efc146'
  on-secondary-fixed: '#251a00'
  on-secondary-fixed-variant: '#5a4400'
  tertiary-fixed: '#ffdbd1'
  tertiary-fixed-dim: '#ffb5a0'
  on-tertiary-fixed: '#3b0a00'
  on-tertiary-fixed-variant: '#79301a'
  background: '#111411'
  on-background: '#e1e3de'
  surface-variant: '#333632'
typography:
  headline-xl:
    fontFamily: Oswald
    fontSize: 44px
    fontWeight: '700'
    lineHeight: 48px
  headline-xl-mobile:
    fontFamily: Oswald
    fontSize: 34px
    fontWeight: '700'
    lineHeight: 38px
  headline-lg:
    fontFamily: Oswald
    fontSize: 28px
    fontWeight: '600'
    lineHeight: 32px
  headline-md:
    fontFamily: Oswald
    fontSize: 22px
    fontWeight: '600'
    lineHeight: 26px
  headline-sm:
    fontFamily: Oswald
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 22px
  body-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  body-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 12px
    fontWeight: '400'
    lineHeight: 16px
  label-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 14px
    fontWeight: '700'
    lineHeight: 18px
  label-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 12px
    fontWeight: '600'
    lineHeight: 16px
  label-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 10px
    fontWeight: '700'
    lineHeight: 14px
rounded:
  sm: 0.5rem
  DEFAULT: 1rem
  md: 1.5rem
  lg: 2rem
  xl: 3rem
  full: 9999px
spacing:
  gutter: 1rem
  margin: 1.25rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2rem
---

## Brand & Style

This design system expresses a vibrant, artisanal culinary aesthetic tailored for contemporary fresh grocery, curated pantry provisions, and chef-crafted ready-to-eat meals. The design combines an earthy, nocturnal backdrop with energetic botanical accents and warm food-centric tints, rejecting the sterile, clinical feel of legacy e-commerce.

The design movement synthesizes modern organic minimalism with tactile editorial elements:
- **Atmospheric Nocturnal Canvas:** Deep forest greens and rich charcoal bases ground the experience, allowing fresh produce and meal imagery to illuminate the interface naturally.
- **Bold Editorial Presence:** Impactful, condensed grotesque typography anchors key dishes and featured selections with the confidence of an independent culinary publication.
- **Organic Softness & Tactility:** Generous, pill-shaped interactive components, frosted floating navigation bars, and soft, pastel meal backdrops (warm mustard, blush pink, matcha green) establish an approachable, premium touch.

## Colors

The palette draws directly from botanical and fresh-market ingredients:
- **Primary (`#95D564` / `#A3D977`):** Fresh matcha lime green serving as the primary interactive catalyst. Used for primary CTAs ("Add to Basket"), critical badges, and active state highlights.
- **Secondary (`#F9CA4F`):** Warm buttercup/mustard yellow used for high-impact curated story cards, hero product backgrounds, and spotlight promotional messaging.
- **Tertiary (`#E08064`):** Earthy clay/terracotta accent for secondary highlights, cuisine category tagging, and sale pricing badges.
- **Neutral Canvas (`#141714` to `#1B221B`):** Deep botanical charcoal and forest shade for page backgrounds, with elevated surface containers resting at `#222A22` and `#2A332A`.
- **Text & Accents:** High-legibility crisp cream (`#F4F6F0`) for headline typography, soft sage/mineral grey (`#9EAAA0`) for secondary metadata, and muted border outlines at 8–12% white opacity.

## Typography

The typography pairs a condensed, robust display voice with an open, humanist sans-serif:
- **Display Headlines (Oswald):** Rendered in uppercase for featured product headers, curated title cards, and punchy promotional teasers. The condensed proportion allows dramatic scale without awkward text wrapping on mobile devices.
- **Body & Functional Copy (Plus Jakarta Sans):** Provides warm, open geometry with high legibility for ingredient listings, nutritional facts, and review content against dark backgrounds.
- **Price Tags & Key Numerical Data:** Styled in semi-bold to bold weights with tight tracking to ensure rapid scanning during checkout and shopping flows.

## Layout & Spacing

The layout is built around mobile-first utility, supporting fluid vertical scanning with tight, cohesive card grouping:
- **Margins & Safe Zones:** A standard 20px (`1.25rem`) outer margin ensures touch targets do not crowd the edge of edge-to-edge mobile screens. Top header elements preserve dynamic island and camera safe areas.
- **Grids & Columns:** Primary listing surfaces leverage a 2-column symmetric card layout with 16px (`1rem`) gutters. Hero featured product showcases span full viewport width minus canvas margins.
- **Vertical Rhythm:** Consistent 16px (`space-md`) vertical gaps separate related functional sections, while major transitions (e.g., Hero Spotlight to Category Carousel) use 24px–32px (`space-lg` to `space-xl`).
- **Floating Overlays:** The persistent navigation dock is suspended 16px above the home indicator, requiring an extra 80px bottom padding on scroll containers to prevent content obscuration.

## Elevation & Depth

Visual hierarchy uses tonal surface layering and translucent frosted glass rather than heavy structural drop shadows:
- **Tonal Layers:** The base page sits on `#141714`. Card surfaces sit on elevated containers (`#1D241D` or `#232B23`). Interactive metadata tiles (e.g., ratings and nutritional macros) nest within cards at `#2A342A`.
- **Glassmorphism:** The floating primary bottom navigation bar and sticky card overlay tags utilize a dark semi-transparent fill (`rgba(30, 36, 30, 0.72)`) backed by a `24px` backdrop blur (`backdrop-filter: blur(24px)`) and a subtle `1px` translucent boundary (`rgba(255, 255, 255, 0.08)`).
- **Ambient Product Illumination:** Hero food assets feature soft, diffused under-glow shadows tinted to the product's natural color scheme (opacity 20%, blur 32px), creating physical detachment without harsh black shadows.

## Shapes

The design system embraces an organic, rounded design language that feels friendly, edible, and natural:
- **Full Pill Curvature:** All primary action buttons, search fields, floating navigation bars, and category filter chips adopt continuous pill silhouettes (`border-radius: 9999px`).
- **Curved Product Canvases:** Major product display cards and editorial modules feature large corner radii (`24px` to `32px`), complementing the rounded container forms of ready-to-eat meal packaging.
- **Inner Containers:** Secondary nested elements (such as rating and nutrition blocks) use soft `16px` corners to preserve organic rhythm without feeling blocky.

## Components

### Buttons
- **Primary Action (CTA):** Full-pill matcha green (`#95D564`) fill, dark charcoal bold text (`#141714`), 52px height for thumb accessibility. In pressed states, scales down to 98% with a slight brightness dip.
- **Secondary / Floating Icon Buttons:** Circular (40px or 48px), frosted dark surface (`rgba(255, 255, 255, 0.12)`), housing minimal iconography in cream (`#F4F6F0`).

### Category Chips
- Pill-shaped horizontally scrollable elements with dark subtle fills (`#212821`).
- Feature an organic circular icon badge on the left housing miniature fruit, vegetable, or dietary icons.
- Selected state adopts a crisp light border (`rgba(149, 213, 100, 0.4)`) with high-contrast text.

### Product & Editorial Cards
- **Featured Hero Card:** Expansive mustard yellow (`#F9CA4F`) or organic cream canvas with condensed display titles, isolated food or lifestyle photography, and an embedded translucent pill pill-card displaying title, price, and instant "+" quick-add action.
- **Standard Product Grid Card:** Subtle dark forest container (`#1D241D`) topped with a soft-colored organic circular or rounded square backdrop behind the product cutout. Includes headline title, size/volume descriptor, discount strike-through, and bright green price tag.

### Metadata & Rating Badges
- Paired two-column information pods for detail screens:
  - **Rating Pod:** Displays average rating (e.g., `4.2/5`), mini star cluster, and review count in muted text.
  - **Nutrition Pod:** Displays key dietary split (e.g., `FCP: 35 · 64 · 22`) over dark card fill.

### Floating Bottom Navigation Bar
- Centered floating glass pill dock with frosted background blur (`rgba(22, 28, 22, 0.75)`).
- Houses clean geometric navigation icons (Home, Explore/Ticket, Basket, Search).
- Active item receives an ambient glow or a solid soft circular indicator backing.