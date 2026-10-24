import { Audience } from '@/after/Audience';
import { CtaBand } from '@/after/CtaBand';
import { Estimator } from '@/after/Estimator';
import { Faq } from '@/after/Faq';
import { Footer } from '@/after/Footer';
import { Hero } from '@/after/Hero';
import { Journal } from '@/after/Journal';
import { Problem } from '@/after/Problem';
import { Process } from '@/after/Process';
import { Schemes } from '@/after/Schemes';
import { Shell } from '@/after/Shell';
import { Trusted } from '@/after/Trusted';
import { Voices } from '@/after/Voices';
import { useWipe } from '@/motion/useWipe';

/**
 * The after: verge as a company that has to be bought by a facilities lead and
 * used by their staff.
 *
 * The order is the argument, and it is the argument a B2B page usually gets
 * wrong by opening on its own solution. Here: what we do (hero), who already
 * runs it (trusted), **why it is a problem at all** (problem), what you can
 * buy (schemes), how hard it is to start (process), what it comes to for you
 * (estimator), what each side gets (audience), who has done it (voices), what
 * we have learned (journal), what finance will ask (faq), and the one ask
 * (cta).
 *
 * The problem section is the one most pages cut. A reader who has not agreed
 * there is something worth fixing is not reading the pricing.
 *
 * There is no scroll library and no tween library in this episode. Every
 * movement on the page is a CSS transition or a keyframe, which is how the
 * reference does it too -- and at this amount of motion it is the right call:
 * a smooth-scroll library is 12kB and a frame budget spent on something the
 * browser already does.
 */
export function AfterPage() {
  const rootRef = useWipe<HTMLDivElement>();

  return (
    <div ref={rootRef} className="bg-bone">
      <Shell />
      <Hero />
      <Trusted />
      <Problem />
      <Schemes />
      <Process />
      <Estimator />
      <Audience />
      <Voices />
      <Journal />
      <Faq />
      <CtaBand />
      <Footer />
    </div>
  );
}
