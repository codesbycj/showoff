---
name: Aura Financial
colors:
  surface: '#faf8ff'
  surface-dim: '#d2d9f4'
  surface-bright: '#faf8ff'
  surface-container-lowest: '#ffffff'
  surface-container-low: '#f2f3ff'
  surface-container: '#eaedff'
  surface-container-high: '#e2e7ff'
  surface-container-highest: '#dae2fd'
  on-surface: '#131b2e'
  on-surface-variant: '#4a4455'
  inverse-surface: '#283044'
  inverse-on-surface: '#eef0ff'
  outline: '#7b7487'
  outline-variant: '#ccc3d8'
  surface-tint: '#732ee4'
  primary: '#630ed4'
  on-primary: '#ffffff'
  primary-container: '#7c3aed'
  on-primary-container: '#ede0ff'
  inverse-primary: '#d2bbff'
  secondary: '#855300'
  on-secondary: '#ffffff'
  secondary-container: '#fea619'
  on-secondary-container: '#684000'
  tertiary: '#5d25c7'
  on-tertiary: '#ffffff'
  tertiary-container: '#7645e0'
  on-tertiary-container: '#ece1ff'
  error: '#ba1a1a'
  on-error: '#ffffff'
  error-container: '#ffdad6'
  on-error-container: '#93000a'
  primary-fixed: '#eaddff'
  primary-fixed-dim: '#d2bbff'
  on-primary-fixed: '#25005a'
  on-primary-fixed-variant: '#5a00c6'
  secondary-fixed: '#ffddb8'
  secondary-fixed-dim: '#ffb95f'
  on-secondary-fixed: '#2a1700'
  on-secondary-fixed-variant: '#653e00'
  tertiary-fixed: '#e9ddff'
  tertiary-fixed-dim: '#d0bcff'
  on-tertiary-fixed: '#23005c'
  on-tertiary-fixed-variant: '#5516be'
  background: '#faf8ff'
  on-background: '#131b2e'
  surface-variant: '#dae2fd'
typography:
  display-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 40px
    fontWeight: '700'
    lineHeight: 48px
    letterSpacing: -0.03em
  display-lg-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 32px
    fontWeight: '700'
    lineHeight: 38px
    letterSpacing: -0.025em
  headline-lg:
    fontFamily: Plus Jakarta Sans
    fontSize: 28px
    fontWeight: '700'
    lineHeight: 34px
    letterSpacing: -0.02em
  headline-md:
    fontFamily: Plus Jakarta Sans
    fontSize: 22px
    fontWeight: '600'
    lineHeight: 28px
    letterSpacing: -0.015em
  headline-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 18px
    fontWeight: '600'
    lineHeight: 24px
    letterSpacing: -0.01em
  body-lg:
    fontFamily: Inter
    fontSize: 16px
    fontWeight: '400'
    lineHeight: 24px
  body-md:
    fontFamily: Inter
    fontSize: 14px
    fontWeight: '400'
    lineHeight: 20px
  body-sm:
    fontFamily: Inter
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
    fontWeight: '600'
    lineHeight: 16px
    letterSpacing: 0.02em
  label-sm:
    fontFamily: Plus Jakarta Sans
    fontSize: 10px
    fontWeight: '700'
    lineHeight: 12px
    letterSpacing: 0.04em
  numeric-hero:
    fontFamily: Plus Jakarta Sans
    fontSize: 48px
    fontWeight: '800'
    lineHeight: 52px
    letterSpacing: -0.04em
  numeric-hero-mobile:
    fontFamily: Plus Jakarta Sans
    fontSize: 36px
    fontWeight: '800'
    lineHeight: 40px
    letterSpacing: -0.03em
rounded:
  sm: 0.5rem
  DEFAULT: 1rem
  md: 1.5rem
  lg: 2rem
  xl: 3rem
  full: 9999px
spacing:
  gutter: 1rem
  gutter-tablet: 1.5rem
  gutter-desktop: 2rem
  margin: 1.25rem
  margin-tablet: 2rem
  margin-desktop: 3rem
  space-xs: 0.25rem
  space-sm: 0.5rem
  space-md: 1rem
  space-lg: 1.5rem
  space-xl: 2rem
---

## Brand & Style

This design system embodies a modern, ultra-refined fintech experience that balances institutional trust with forward-leaning digital vitality. Designed primarily for mobile-first personal wealth management, generational spending, and digital assets, the aesthetic merges crisp architectural minimalism with soft, tactile ergonomics.

The visual direction centers on airy structural compositions, generous breathing room, and dynamic punctuation via vibrant electric purple and warm amber accents. Interfaces must evoke an immediate sense of control, clarity, and delight—stripping away visual clutter, dense financial grids, and clinical corporate stiffness in favor of fluid, hyper-readable surfaces.

## Colors

The palette establishes an ultra-clean, high-contrast visual hierarchy anchored by luminous surfaces and rich obsidian text.

- **Primary (`#7C3AED` / Electric Purple):** Used for primary conversion triggers, key balance states, dynamic charts, and active interaction states.
- **Secondary (`#F59E0B` / Warm Golden Yellow):** Reserved for contextual insights, yield markers, high-priority notifications, and premium tier signifiers.
- **Tertiary (`#8B5CF6` / Violet Glow):** Deployed for subtle gradients, soft focus states, icon fills, and accent backgrounds when paired with low-opacity alpha layers.
- **Neutral (`#0F172A` / Obsidian Dark):** Defines primary typographic elements, dark floating navigational hulls, and grounded baseline iconography.
- **Canvas & Card Architecture:** The canvas background defaults to `#FAFAFA` (or `#FFFFFF` in full-bleed overlays). Layered surfaces utilize a soft slate tint (`#F1F5F9`) to define structural boundaries without needing harsh borders.

## Typography

The typography structure uses two complementary typefaces:
- **Plus Jakarta Sans** delivers warmth, approachability, and contemporary precision across headlines, subheadings, labels, and numeric monetary displays.
- **Inter** ensures supreme clarity, structural neutrality, and maximum legibility across dense body copy, transaction ledgers, descriptions, and metadata.

Financial figures and metrics should always use tabular numbers (`tnum`) to keep decimal points and digits aligned across vertical rows.

## Layout & Spacing

The design system is structured around an 8px spatial grid, optimized for fluid mobile viewport rendering with a single-column content rail.

- **Mobile (< 640px):** Single-column layout framed by `1.25rem` screen margins. Internal cards and section modules stretch edge-to-edge relative to internal safe margins.
- **Tablet (640px - 1024px):** 6-column fluid grid system with `1.5rem` gutters and `2rem` margins, allowing side-by-side transaction tables, quick-transfer rails, and portfolio overviews.
- **Desktop (> 1024px):** 12-column layout centered at a maximum canvas width of 1200px with `2rem` gutters and `3rem` margins.

## Elevation & Depth

Depth is established through soft, multi-layered ambient shadowing and subtle tonal shifts rather than sharp structural outlines:

- **Level 0 (Flat Canvas):** `#FAFAFA` base background.
- **Level 1 (Surface Cards):** `#FFFFFF` or `#F1F5F9` surfaces floating over base canvas with ultra-soft ambient diffusion: `0px 8px 24px -4px rgba(15, 23, 42, 0.04), 0px 2px 6px -1px rgba(15, 23, 42, 0.02)`.
- **Level 2 (Interactive Floating Modules & Modals):** `0px 16px 36px -6px rgba(15, 23, 42, 0.08), 0px 4px 12px -2px rgba(15, 23, 42, 0.03)`.
- **Level 3 (Floating Pill Navigation):** Floating Obsidian dock (`#0F172A`) elevated via a deep, warm ambient drop shadow: `0px 20px 40px -8px rgba(15, 23, 42, 0.25)`.
- **Level 4 (Action Button Focus / Glow):** Circular primary action buttons feature a color-tinted ambient glow: `0px 10px 20px -3px rgba(124, 58, 237, 0.35)`.

## Shapes

The geometric signature uses expressive curvature, emphasizing pill forms and pronounced card corners (`rounded-3xl` equivalent to 24px–32px corner radius).

- **Cards & Data Modules:** Enclosed within `rounded-3xl` (1.5rem to 2rem) radii to soften informational density and create an approachable visual frame.
- **Action Buttons & Badges:** Strict circular geometries (`50%` radius) for quick actions (Send, Request, Scan) and full pill profiles (`9999px`) for contextual badges, segmented controls, and text buttons.
- **Form Controls:** Generous pill and rounded-2xl radii to maintain tactile continuity across touch points.

## Components

### Buttons
- **Circular Action Buttons:** Floating or inline circular triggers (`56px x 56px` or `48px x 48px`) styled with the primary electric purple (`#7C3AED`) background, pure white icon/label, and a tinted purple shadow. Secondary actions use `#F1F5F9` with `#0F172A` icons.
- **Primary Pill Buttons:** Full pill geometry (`rounded-full`), minimum height of `48px`, `#7C3AED` background with `#FFFFFF` text in `label-lg`.
- **Secondary Buttons:** Translucent slate or `#F1F5F9` background with `#0F172A` text; zero border.

### Floating Pill Navigation Bar
- A detached bottom navigation bar floating 24px above the mobile viewport bottom edge.
- **Container:** Dark Obsidian pill (`#0F172A`), padded `6px`, with frosted edge blur and soft drop shadow.
- **Active Indicator:** Smooth white pill (`#FFFFFF`) sliding beneath active icons, rendering the selected icon in `#0F172A` while inactive icons remain muted slate (`#94A3B8`).

### Cards & Content Containers
- Styled with `rounded-3xl` (24px corner radius) on `#F1F5F9` or pure white with subtle ambient drop shadows.
- No heavy divider strokes; separate internal list rows with `12px` to `16px` vertical gaps or soft `#E2E8F0` hairline rules.

### Input Fields
- Heights set to `52px` with full pill or `rounded-2xl` contouring.
- Surface background set to `#F1F5F9` with inset text in `#0F172A`.
- Active focus state translates the background to `#FFFFFF` with a crisp `2px` focus halo in `#7C3AED`.

### Lists & Transaction Feeds
- Grouped inside unified `rounded-3xl` cards.
- Each transaction row features a circular merchant/category avatar (`40px`), primary label and timestamp in vertical stack, and amount aligned right (`numeric-hero-mobile` scaled down or `headline-sm` with tabular numerals).

### Chips & Status Badges
- Pill-shaped badges using soft tinted fills:
  - **Success / Yield:** `#FEF3C7` background with `#B45309` or `#F59E0B` text.
  - **Transfer / System:** `#F5F3FF` background with `#7C3AED` text.

### Segmented Controls & Toggles
- Recessed pill container (`#F1F5F9`) housing floating active white pill tabs with micro-shadowing, providing tactile reassurance during period switching (1D, 1W, 1M, 1Y).