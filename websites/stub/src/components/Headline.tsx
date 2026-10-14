/**
 * `.bg-service-text` — the words behind the cards.
 *
 * Only the sans lines take the blur. Leaving the italic line sharp is what
 * makes the blur read as depth rather than as a defocus: two layers at
 * different distances, with the cards arriving in front of both.
 *
 * The reference has a second blur animation aimed at the italic line too. It is
 * dead code — its target id no longer resolves on the page, and the live site
 * reports `filter: none` there at every scroll position — so it is left out.
 *
 * Sized with `clamp` rather than from the stage scale. This sits behind the
 * cards instead of among them, so it has no geometry to stay in proportion
 * with, and it is better off staying readable on a narrow screen.
 */
import { HEADLINE } from '@/data/packages';
import { STAGE } from '@/motion/motion';

export function Headline() {
  return (
    <div className="pointer-events-none absolute inset-0 z-10 flex items-center justify-center">
      {/* A real heading, not decoration: it is the only one the section has, and
          the blur is a filter rather than a substitution, so it still reads. */}
      <h2
        className="text-paper text-center leading-none"
        style={{
          width: `min(${STAGE.headlineW}px, 86vw)`,
          fontSize: `clamp(38px, 5.3vw, ${STAGE.headlineSize}px)`,
        }}
      >
        <span className="block" style={{ filter: 'blur(var(--headline-blur))' }}>
          {HEADLINE.soft.map((line) => (
            <span key={line} className="block">
              {line}
            </span>
          ))}
        </span>
        <span className="block font-serif italic">{HEADLINE.sharp}</span>
      </h2>
    </div>
  );
}
