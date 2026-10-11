---
name: Obsidian Kinetic
colors:
  surface: '#10141a'
  surface-dim: '#10141a'
  surface-bright: '#353940'
  surface-container-lowest: '#0a0e14'
  surface-container-low: '#181c22'
  surface-container: '#1c2026'
  surface-container-high: '#262a31'
  surface-container-highest: '#31353c'
  on-surface: '#dfe2eb'
  on-surface-variant: '#c3c9af'
  inverse-surface: '#dfe2eb'
  inverse-on-surface: '#2d3137'
  outline: '#8d947b'
  outline-variant: '#434935'
  surface-tint: '#a0d816'
  primary: '#f3ffd5'
  on-primary: '#253600'
  primary-container: '#b6f035'
  on-primary-container: '#4c6b00'
  inverse-primary: '#4a6700'
  secondary: '#c0c6d8'
  on-secondary: '#2a313e'
  secondary-container: '#424958'
  on-secondary-container: '#b2b8ca'
  tertiary: '#faf9ff'
  on-tertiary: '#253145'
  tertiary-container: '#d2def8'
  on-tertiary-container: '#566278'
  error: '#ffb4ab'
  on-error: '#690005'
  error-container: '#93000a'
  on-error-container: '#ffdad6'
  primary-fixed: '#bbf53a'
  primary-fixed-dim: '#a0d816'
  on-primary-fixed: '#141f00'
  on-primary-fixed-variant: '#374e00'
  secondary-fixed: '#dce2f5'
  secondary-fixed-dim: '#c0c6d8'
  on-secondary-fixed: '#151c29'
  on-secondary-fixed-variant: '#404755'
  tertiary-fixed: '#d7e3fd'
  tertiary-fixed-dim: '#bbc7e0'
  on-tertiary-fixed: '#0f1c2f'
  on-tertiary-fixed-variant: '#3b475c'
  background: '#10141a'
  on-background: '#dfe2eb'
  surface-variant: '#31353c'
typography:
  headline-xl:
    fontFamily: Space Grotesk
    fontSize: 40px
    fontWeight: '700'
    lineHeight: 48px
    letterSpacing: -0.03em
  headline-xl-mobile:
    fontFamily: Space Grotesk
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 38px
    letterSpacing: -0.03em
  headline-lg:
    fontFamily: Space Grotesk
    fontSize: 28px
    fontWeight: '600'
    lineHeight: 34px
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Space Grotesk
    fontSize: 22px
    fontWeight: '600'
    lineHeight: 28px
    letterSpacing: -0.01em
  headline-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 24px
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
    fontWeight: '600'
    lineHeight: 18px
    letterSpacing: 0.01em
  label-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 12px
    fontWeight: '500'
    lineHeight: 16px
    letterSpacing: 0.02em
  label-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 10px
    fontWeight: '600'
    lineHeight: 14px
    letterSpacing: 0.04em
rounded:
  sm: 0.5rem
  DEFAULT: 1rem
  md: 1.5rem
  lg: 2rem
  xl: 3rem
  full: 9999px
spacing:
  gutter: 1rem
  gutter-sm: 0.75rem
  gutter-lg: 1.5rem
  margin: 1.25rem
  margin-mobile: 1rem
  margin-desktop: 2rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2rem
---

## Brand & Style

This design system embodies an ultra-sleek, progressive dark-mode fintech experience tailored for modern digital-native investors and mobile-first banking users. It couples the confidence, precision, and authority of deep midnight obsidian surfaces with high-energy electric chartreuse accents.

### Visual Aesthetic & Mood
- **Style:** High-contrast Glassmorphic Minimalism infused with kinetic dark-mode aesthetics.
- **Atmosphere:** Exclusive, secure, frictionless, and technologically advanced. It feels less like traditional legacy banking and more like a high-performance financial cockpit.
- **Tone:** Decisive, disciplined, refined, and distinctly premium.

## Colors

The palette establishes an obsidian layered foundation contrasted with electric chartreuse to guide focus and signify primary actions and positive transactional states.

### Palette Application
- **Base Canvas (`#0B0F15`):** The primary ground color across views. Ensures OLED true-black depth while retaining a cold metallic undertone.
- **Surface Elevation 1 (`#111622`):** Primary card background and container foundation.
- **Surface Elevation 2 (`#181F2C`):** Stacked card previews, nested control containers, and floating panels.
- **Surface Border & Dividers (`#243044` with 40–70% opacity):** Hairline structure defining cards, pill tabs, and buttons without visual clutter.
- **Primary Accent (`#B6F035`):** High-voltage chartreuse reserved for primary interactive buttons (Log In, Deposit, Active Navigation Tabs), selected toggles, and positive yield indicators.
- **Text & Content:**
  - Crisp White (`#FFFFFF`): Primary headings, monetary values, and active icons.
  - Slate Medium (`#8E9BAE`): Secondary metadata, subtitles, and inactive tab states.
  - Muted Charcoal (`#627184`): Disabled states, card placeholder numbers, and structural glyphs.

## Typography

The type system blends the geometric authority of `Space Grotesk` for high-impact financial figures and hero headers with the humanistic, legible precision of `Plus Jakarta Sans` for dense balance data, metadata labels, and interactive targets.

### Typographic Principles
- Large currency indicators prioritize clarity and optical weight; tabular numbers ensure balance sums remain steady without horizontal drift.
- Secondary descriptions utilize lowered opacity alongside deliberate slate coloring (`#8E9BAE`) to establish clear hierarchy against bright balance displays.
- All action labels enforce medium-to-semibold weights to maintain readability against high-contrast surfaces.

## Layout & Spacing

A compact, fluid layout rhythm designed specifically for edge-to-edge mobile screens and unified dashboard viewing.

### Rhythm & Alignment
- **Canvas Margins:** Mobile viewport adheres strictly to `margin-mobile` (16px) or standard `margin` (20px), maximizing screen real estate while protecting comfortable finger tapping corridors.
- **Section Grouping:** Functional sections (User Header, Balance Container, Quick Actions, Stacked Credit Portfolio) are separated by `space-lg` (24px) to preserve visual breathing room without fragmentation.
- **Inner Cluster Padding:** Action grids (e.g., Deposit, Withdraw, Transfer) use `space-sm` (8px) between tiles, ensuring four actions sit cleanly on a single horizontal row across narrow mobile viewports.

## Elevation & Depth

Visual hierarchy relies on structural dark layering, frosted translucent backdrops, and selective neon luminescence rather than standard drop shadows.

### Elevation Principles
- **Base Level (Canvas):** Pure dark abyss (`#0B0F15`). Non-elevated, clean slate.
- **Tonal Tiers:** Elevated surfaces utilize stepped backgrounds (`#111622` to `#181F2C`) framed with a 1px ghost border rendered in `rgba(255, 255, 255, 0.08)`.
- **Glassmorphism Backdrop:** Floating modal elements and navigation bars implement a 20px–30px Gaussian background blur (`backdrop-filter: blur(24px)`) coupled with semi-translucent dark fills (`rgba(17, 22, 34, 0.75)`).
- **Chartreuse Glow:** Selected action states and active navigation capsules receive an ambient electric halo: `box-shadow: 0px 8px 24px -4px rgba(182, 240, 53, 0.28)`.

## Shapes

The design system embraces a high-curvature visual geometry (`roundedness: 3`). Action surfaces, input pills, tags, and floating nav items default to fully rounded pill radii, creating an approachable, tactile, and modern mobile feel.

### Geometric Rules
- **Full Pills (`rounded-full` / 9999px):** Primary authentication buttons, active navigation markers, transaction status chips, and quick-action icon containers.
- **Macro Enclosures (`rounded-2xl` to `rounded-3xl` / 24px to 32px):** Primary balance containers, bottom navigation docking bars, and interactive credit card viewports.
- **Avatars & Quick Circles:** Round circle profiles (`rounded-full`) paired with subtle outer ring strokes.

## Components

### Buttons & Interactive Pills
- **Primary Action (Electric Pill):** Filled with solid `#B6F035`, dark text `#0B0F15` (`label-lg`), height 52px. Glow footprint on active press.
- **Secondary Action (Ghost Pill):** Background `rgba(24, 31, 44, 0.8)`, crisp white typography, 1px border `rgba(255, 255, 255, 0.12)`.
- **Micro Quick Actions:** 4-column quick action grid (Deposit, Withdraw, Transfer, Loan). Squircle/rounded-pill surfaces featuring centered glyphs and bottom labels. The primary/featured action defaults to solid chartreuse with dark iconography.

### Cards & Stacked Preview
- **Main Balance Card:** Layered dark canvas container (`#111622`) with subtle radial gradient in top corner, large tabular balance indicator, 24px padding, and top-right glass chip ("View Details ↗").
- **Multi-Card Stacked Preview:** Visual cascading card stack. Upper inactive cards peek through with custom horizontal tab headers displaying card network logos (Visa, Mastercard) and masked card numbers (`**** 8897`), layered over the prominent active card base showing cardholder name and balance.

### Navigation (Floating Bottom Dock)
- Translucent frosted container (`rgba(17, 22, 34, 0.85)`) with full pill rounding, floating above viewport bottom with 16px bottom margin.
- **Active Tab:** Fully encapsulated `#B6F035` pill with dark iconography and label.
- **Inactive Tabs:** Monochromatic slate icons (`#8E9BAE`) evenly distributed.

### Header & Identity
- Left-aligned circular avatar with status indicator accompanied by vertical stack: Greeting ("Good Morning") in muted slate, User Name in bold white.
- Right-aligned circular glass utility trigger (e.g., Notification bell pill) with subtle border outline.

### Input Fields & Controls
- **Inputs:** Dark recessed fill (`#0E131C`) with subtle inset border, crisp placeholder text in `#627184`, turning `#B6F035` on focus.
- **Switches & Checkboxes:** Unchecked in `#243044`, checked in high-visibility `#B6F035` with dark check indicator.