import { ArrowButton } from '@/components/ui/ArrowButton';
import { SPONSOR_GUIDE } from '@/data/home';

/**
 * The download band, over a chequer that is drawn rather than tiled from an
 * image: two `repeating-linear-gradient`s crossed at right angles cost
 * nothing to download and stay crisp at any zoom.
 */
export function SponsorGuide() {
  return (
    <section className="bg-paper text-ink relative overflow-hidden py-32">
      {/*
        A chequered flag, drawn with two offset conic gradients rather than
        two crossed linear ones. Crossing linear gradients and blending them
        with `difference` fills every other cell solid, which at this scale
        reads as a grid of broken image placeholders rather than as a flag.
        Conic quarters tile into a true chequer, and the mask fades it out
        before it reaches the copy.
      */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-[0.06]"
        style={{
          backgroundImage: 'conic-gradient(#000 25%, transparent 0 50%, #000 0 75%, transparent 0)',
          backgroundSize: '3rem 3rem',
          maskImage: 'linear-gradient(0deg, #000, transparent 72%)',
          WebkitMaskImage: 'linear-gradient(0deg, #000, transparent 72%)',
        }}
      />

      <div className="px-gutter relative z-10 mx-auto max-w-[52rem] text-center">
        <h2 data-reveal="words" className="text-h2 mb-6">
          {SPONSOR_GUIDE.title}
        </h2>
        <p data-reveal="lines" className="text-body-md mx-auto mb-10 max-w-[34rem] opacity-70">
          {SPONSOR_GUIDE.body}
        </p>
        <div data-reveal="fade" className="flex justify-center">
          <ArrowButton>{SPONSOR_GUIDE.cta}</ArrowButton>
        </div>
      </div>
    </section>
  );
}
