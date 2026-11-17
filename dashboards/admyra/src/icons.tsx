/**
 * Every glyph in the reference, drawn as inline SVG on one 24 grid at one
 * stroke width. No icon font and no emoji: emoji differ across Windows,
 * Android and iOS, and half this set has no emoji anyway.
 */
import type { ReactNode, SVGProps } from 'react';

interface IconProps extends SVGProps<SVGSVGElement> {
  size?: number;
}

/** Outlined: the default idiom here, 1.7 on 24. */
function S({ size = 18, children, ...rest }: IconProps & { children: ReactNode }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.7}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...rest}
    >
      {children}
    </svg>
  );
}

/** Filled: for the few marks the reference draws solid. */
function F({ size = 18, children, ...rest }: IconProps & { children: ReactNode }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden="true"
      focusable="false"
      {...rest}
    >
      {children}
    </svg>
  );
}

/* ---------------------------------------------------------------- brand -- */

/**
 * The wordless brand mark: an infinity loop, stroked rather than filled so it
 * keeps its weight at the 28px the header draws it at.
 */
export function Logo({ size = 28, ...rest }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      focusable="false"
      {...rest}
    >
      {/* Two open loops that overlap, so the strokes cross in the middle.
          One closed lemniscate meets at a point instead and reads as "OO". */}
      <path d="M13.2 9.6C11 6.6 8.9 5.2 6.6 5.2 3.6 5.2 1.6 8.1 1.6 12s2 6.8 5 6.8c2.5 0 4.6-1.8 6.6-4.4" />
      <path d="M10.8 9.6C13 6.6 15.1 5.2 17.4 5.2c3 0 5 2.9 5 6.8s-2 6.8-5 6.8c-2.5 0-4.6-1.8-6.6-4.4" />
    </svg>
  );
}

/* --------------------------------------------------------------- chrome -- */

export const Caret = ({ size = 12, ...r }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 12 12"
    aria-hidden="true"
    focusable="false"
    fill="currentColor"
    {...r}
  >
    <path d="M1.8 4h8.4L6 9.2Z" />
  </svg>
);

export const ChevronDown = (p: IconProps) => (
  <S {...p}>
    <path d="m6 9 6 6 6-6" />
  </S>
);

export const Refresh = (p: IconProps) => (
  <S {...p}>
    <path d="M20 11.5a8 8 0 0 0-13.7-5L3.5 9.2" />
    <path d="M4 12.5a8 8 0 0 0 13.7 5l2.8-2.7" />
    <path d="M3.4 4.9v4.3h4.3M20.6 19.1v-4.3h-4.3" />
  </S>
);

export const Trash = (p: IconProps) => (
  <S {...p}>
    <path d="M4 6.5h16M9.5 6.5V4.8c0-.6.5-1.1 1.1-1.1h2.8c.6 0 1.1.5 1.1 1.1v1.7" />
    <path d="M6.3 6.5l.9 12.1c0 .9.8 1.7 1.7 1.7h6.2c.9 0 1.7-.8 1.7-1.7l.9-12.1" />
    <path d="M10.3 10.2v6.4M13.7 10.2v6.4" />
  </S>
);

export const Ellipsis = (p: IconProps) => (
  <F {...p}>
    <circle cx="5.5" cy="12" r="1.7" />
    <circle cx="12" cy="12" r="1.7" />
    <circle cx="18.5" cy="12" r="1.7" />
  </F>
);

export const Plus = (p: IconProps) => (
  <S {...p}>
    <path d="M12 5v14M5 12h14" />
  </S>
);

export const Search = (p: IconProps) => (
  <S {...p}>
    <circle cx="10.8" cy="10.8" r="6.3" />
    <path d="m15.4 15.4 4.1 4.1" />
  </S>
);

export const Info = (p: IconProps) => (
  <F {...p}>
    <path d="M12 2.6a9.4 9.4 0 1 0 0 18.8 9.4 9.4 0 0 0 0-18.8Zm1 14.3h-2v-6.4h2v6.4Zm0-8.2h-2v-2h2v2Z" />
  </F>
);

/* ------------------------------------------------------------ view bar --- */

export const FolderFill = (p: IconProps) => (
  <F {...p}>
    <path d="M3 6.6c0-1 .8-1.9 1.9-1.9h3.8c.6 0 1.2.3 1.5.8l.9 1.3h7c1 0 1.9.8 1.9 1.9v8.7c0 1-.8 1.9-1.9 1.9H4.9c-1 0-1.9-.8-1.9-1.9V6.6Z" />
  </F>
);

export const ActionsIcon = (p: IconProps) => (
  <S {...p}>
    <circle cx="12" cy="12" r="8.6" />
    <path d="M12 16V8.4M12 8.4 9.2 11.2M12 8.4l2.8 2.8" />
  </S>
);

export const Plane = (p: IconProps) => (
  <S {...p}>
    <path d="M20.6 4.1 3.9 10.5c-.5.2-.5.9 0 1.1l6.3 2.3 2.3 6.3c.2.5.9.5 1.1 0L20.6 4.1Z" />
    <path d="m10.2 13.9 4.6-4.6" />
  </S>
);

export const Envelope = (p: IconProps) => (
  <S {...p}>
    <path d="M3.4 9.6c0-.6.3-1.1.8-1.4l7-4.1c.5-.3 1.1-.3 1.6 0l7 4.1c.5.3.8.8.8 1.4v8.1c0 .9-.8 1.7-1.7 1.7H5.1c-.9 0-1.7-.8-1.7-1.7V9.6Z" />
    <path d="m3.6 9.2 7.6 4.5c.5.3 1.1.3 1.6 0l7.6-4.5" />
  </S>
);

export const Sliders = (p: IconProps) => (
  <S {...p}>
    <path d="M4 8.2h10.3M18.3 8.2H20M4 15.8h3.7M11.7 15.8H20" />
    <circle cx="16.3" cy="8.2" r="2" />
    <circle cx="9.7" cy="15.8" r="2" />
  </S>
);

export const Calendar = (p: IconProps) => (
  <S {...p}>
    <rect x="3.4" y="5.2" width="17.2" height="15.4" rx="2.1" />
    <path d="M3.4 9.8h17.2M8.2 3.4v3.6M15.8 3.4v3.6" />
  </S>
);

/* ------------------------------------------------------------ account ---- */

export const BizTile = (p: IconProps) => (
  <S {...p}>
    <rect x="3.3" y="5.1" width="17.4" height="13.8" rx="2" />
    <path d="M8.9 5.1v13.8M12.3 9.4h5.2M12.3 12.7h5.2" />
  </S>
);

export const Person = (p: IconProps) => (
  <F {...p}>
    <path d="M12 12.4a4.3 4.3 0 1 0 0-8.6 4.3 4.3 0 0 0 0 8.6Zm0 1.8c-4 0-7.2 2.2-7.2 4.9v1.1h14.4v-1.1c0-2.7-3.2-4.9-7.2-4.9Z" />
  </F>
);

/* -------------------------------------------------------------- levels --- */

/** The active level's mark: a solid tile, white shape knocked out of it. */
export function LevelTile({ size = 18, ...rest }: IconProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
      fill="currentColor"
      {...rest}
    >
      <rect x="2.6" y="2.6" width="18.8" height="18.8" rx="5" />
      <path d="M8.4 7.6h7.2L12 16.8 8.4 7.6Z" fill="#fff" />
    </svg>
  );
}

export const AdSetsIcon = (p: IconProps) => (
  <S {...p}>
    <rect x="3.2" y="3.2" width="7.6" height="7.6" rx="1.6" />
    <rect x="13.2" y="3.2" width="7.6" height="7.6" rx="1.6" />
    <rect x="3.2" y="13.2" width="7.6" height="7.6" rx="1.6" />
    <path d="M13.2 17h7.6M17 13.2v7.6" />
  </S>
);

export const AdsIcon = (p: IconProps) => (
  <S {...p}>
    <rect x="3.2" y="4.6" width="17.6" height="14.8" rx="2.1" />
    <path d="M3.2 8.9h17.6" />
  </S>
);

/* ------------------------------------------------------------- toolbar --- */

export const Duplicate = (p: IconProps) => (
  <S {...p}>
    <rect x="8.4" y="3.4" width="12.2" height="12.2" rx="2" />
    <path d="M15.6 19.1c0 .8-.7 1.5-1.5 1.5H4.9c-.8 0-1.5-.7-1.5-1.5V9.9c0-.8.7-1.5 1.5-1.5" />
  </S>
);

export const Pencil = (p: IconProps) => (
  <S {...p}>
    <path d="M16.4 3.9a2.2 2.2 0 0 1 3.1 0l.6.6a2.2 2.2 0 0 1 0 3.1L8.6 19.1l-4.5 1.3 1.3-4.5L16.4 3.9Z" />
    <path d="m14.8 5.5 3.7 3.7" />
  </S>
);

/** Analyze: the reference draws this one in colour, a ring of plum petals. */
export function Analyze({ size = 18, ...rest }: IconProps) {
  const petals = [0, 45, 90, 135, 180, 225, 270, 315];
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      aria-hidden="true"
      focusable="false"
      {...rest}
    >
      {petals.map((a, i) => (
        <circle
          key={a}
          cx={12 + 6.6 * Math.cos((a * Math.PI) / 180)}
          cy={12 + 6.6 * Math.sin((a * Math.PI) / 180)}
          r={i % 2 ? 2 : 2.7}
          fill="var(--color-plum)"
        />
      ))}
      <circle cx="12" cy="12" r="2.1" fill="var(--color-plum)" opacity="0.45" />
    </svg>
  );
}

export const Flask = (p: IconProps) => (
  <S {...p}>
    <path d="M9.6 3.4v5.9L4.5 17.8c-.7 1.2.1 2.8 1.5 2.8h12c1.4 0 2.2-1.6 1.5-2.8l-5.1-8.5V3.4" />
    <path d="M8.3 3.4h7.4M7.1 14.4h9.8" />
  </S>
);

export const ColumnsIcon = (p: IconProps) => (
  <F {...p}>
    <rect x="3.6" y="4.4" width="3.8" height="15.2" rx="1.1" />
    <rect x="10.1" y="4.4" width="3.8" height="15.2" rx="1.1" />
    <rect x="16.6" y="4.4" width="3.8" height="15.2" rx="1.1" />
  </F>
);

export const BreakdownIcon = (p: IconProps) => (
  <F {...p}>
    <rect x="3.6" y="4.6" width="16.8" height="2.6" rx="1.3" />
    <rect x="3.6" y="10.7" width="11.6" height="2.6" rx="1.3" />
    <rect x="3.6" y="16.8" width="16.8" height="2.6" rx="1.3" />
  </F>
);

export const Layers = (p: IconProps) => (
  <S {...p}>
    <path d="m12 3.4 8.6 4.4-8.6 4.4-8.6-4.4L12 3.4Z" />
    <path d="m3.4 12.4 8.6 4.4 8.6-4.4" />
    <path d="m3.4 16.6 8.6 4.4 8.6-4.4" />
  </S>
);

export const Reports = (p: IconProps) => (
  <S {...p}>
    <path d="M6.9 3.4h7.3l5.1 5.1v12.1c0 .6-.5 1-1 1H6.9c-.6 0-1-.5-1-1V4.4c0-.6.5-1 1-1Z" />
    <path d="M14 3.6v5.1h5.1M9.1 13.2h5.8M9.1 16.7h5.8" />
  </S>
);

export const Download = (p: IconProps) => (
  <S {...p}>
    <path d="M12 3.6v11.2M7.9 10.9 12 15l4.1-4.1" />
    <path d="M4.3 17v2.3c0 .6.5 1.1 1.1 1.1h13.2c.6 0 1.1-.5 1.1-1.1V17" />
  </S>
);

export const Expand = (p: IconProps) => (
  <S {...p}>
    <rect x="3.4" y="4.6" width="17.2" height="14.8" rx="2.1" />
    <path d="M14.2 9.8h3.6v3.6M17.6 10 12 15.6" />
  </S>
);

/* ------------------------------------------------------------- sorting --- */

/** Unsorted: the paired arrows the reference puts beside every sortable head. */
export const SortBoth = ({ size = 13, ...r }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 16 16"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.5}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    focusable="false"
    {...r}
  >
    <path d="M4.6 10.2V3.1M2.5 5.2l2.1-2.1 2.1 2.1" />
    <path d="M11.4 5.8v7.1M13.5 10.8l-2.1 2.1-2.1-2.1" />
  </svg>
);

export const SortDown = ({ size = 13, ...r }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 16 16"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.8}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    focusable="false"
    {...r}
  >
    <path d="M8 2.6v10.8M4.4 9.8 8 13.4l3.6-3.6" />
  </svg>
);

export const SortUp = ({ size = 13, ...r }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 16 16"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.8}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    focusable="false"
    {...r}
  >
    <path d="M8 13.4V2.6M4.4 6.2 8 2.6l3.6 3.6" />
  </svg>
);

/* ------------------------------------------------------- row furniture --- */

/** "In draft": an open ring, not a filled dot. */
export const Ring = ({ size = 13, ...r }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 16 16"
    fill="none"
    stroke="currentColor"
    strokeWidth={2.1}
    aria-hidden="true"
    focusable="false"
    {...r}
  >
    <circle cx="8" cy="8" r="5.2" />
  </svg>
);

export const Dot = ({ size = 13, ...r }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 16 16"
    fill="currentColor"
    aria-hidden="true"
    focusable="false"
    {...r}
  >
    <circle cx="8" cy="8" r="5.2" />
  </svg>
);

export const BarChart = (p: IconProps) => (
  <S {...p}>
    <path d="M4.6 20.1V13M9.5 20.1V8.4M14.5 20.1v-5.2M19.4 20.1V5.1" />
  </S>
);

export const Check = ({ size = 13, ...r }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 16 16"
    fill="none"
    stroke="currentColor"
    strokeWidth={2.4}
    strokeLinecap="round"
    strokeLinejoin="round"
    aria-hidden="true"
    focusable="false"
    {...r}
  >
    <path d="m3.2 8.4 3.3 3.3 6.3-7.4" />
  </svg>
);

export const Dash = ({ size = 13, ...r }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 16 16"
    fill="none"
    stroke="currentColor"
    strokeWidth={2.2}
    strokeLinecap="round"
    aria-hidden="true"
    focusable="false"
    {...r}
  >
    <path d="M3.6 8h8.8" />
  </svg>
);

export const Close = ({ size = 12, ...r }: IconProps) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 16 16"
    fill="none"
    stroke="currentColor"
    strokeWidth={1.9}
    strokeLinecap="round"
    aria-hidden="true"
    focusable="false"
    {...r}
  >
    <path d="m4 4 8 8M12 4l-8 8" />
  </svg>
);

export const Sparkle = (p: IconProps) => (
  <F {...p}>
    <path d="M12 2.8l1.9 5.4 5.4 1.9-5.4 1.9-1.9 5.4-1.9-5.4-5.4-1.9 5.4-1.9L12 2.8Z" />
  </F>
);
