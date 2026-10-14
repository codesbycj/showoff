/**
 * Body copy with italic-serif emphasis dropped into it.
 *
 * The serif is set a touch larger than the sans around it. Instrument Serif has
 * a smaller x-height than Geist, so at a matched font-size the italic phrases
 * sit visibly short inside the line — this is the per-element choice between
 * matching the two faces on size and matching them on x-height, made in favour
 * of x-height because these phrases sit mid-sentence.
 */
import type { Phrase } from '@/data/packages';

export function Copy({ parts }: { parts: Phrase[] }) {
  return (
    <>
      {parts.map((part, i) =>
        part.em ? (
          <em key={i} className="font-serif text-[1.12em] italic leading-none">
            {part.text}
          </em>
        ) : (
          <span key={i}>{part.text}</span>
        ),
      )}
    </>
  );
}
