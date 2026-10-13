import { OneStandard } from '@/sections/OneStandard';
import { PALETTE } from '@/motion/motion';

/**
 * One section, and just enough page above it to arrive at.
 *
 * The lead-in is not decoration: the headline's wipe fires when the line scrolls
 * into view, so a page that opened with the section already on screen would play
 * it before anyone was looking at it.
 */
export function App() {
  return (
    <main>
      <header
        style={{
          // A full viewport, not a fraction of one. The wipe fires at 30%
          // visibility, and at a short window anything less leaves the headline
          // already on screen at load — it then plays to an empty room.
          minHeight: '100svh',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: 20,
          padding: '0 clamp(20px, 4vw, 64px)',
        }}
      >
        <p
          style={{
            fontFamily: 'var(--font-mono)',
            fontWeight: 500,
            fontSize: 'clamp(10px, 0.9vw, 13px)',
            letterSpacing: '0.18em',
            textTransform: 'uppercase',
            color: PALETTE.accent,
          }}
        >
          Motion study
        </p>
        <p
          style={{
            maxWidth: '38ch',
            textAlign: 'center',
            fontSize: 'clamp(15px, 1.2vw, 18px)',
            lineHeight: 1.6,
            color: PALETTE.ink,
          }}
        >
          A product row that arcs across the stage and dresses the figure it passes. Scroll.
        </p>
        <span
          aria-hidden
          style={{
            width: 1,
            height: 'clamp(48px, 7vw, 88px)',
            background: PALETTE.hairline,
            marginTop: 8,
          }}
        />
      </header>

      <OneStandard />
    </main>
  );
}
