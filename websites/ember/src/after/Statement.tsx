import chip1 from '@/assets/img/intro-chip-1.webp';
import chip2 from '@/assets/img/intro-chip-2.webp';
import chip3 from '@/assets/img/intro-chip-3.webp';
import { STATEMENT } from '@/content/site';

/**
 * One sentence, centred, with three photographs set into it as if they were
 * words.
 *
 * The chips are 39x26 at a 40px radius and sit on the text baseline -- small
 * enough to read as punctuation rather than as images, which is the whole idea:
 * the sentence is about bodies, and the bodies are in the sentence.
 *
 * The emphasis runs the other way round from the obvious: the *first* clause is
 * full black and the rest is black at 30%. The claim is the quiet half.
 *
 * Measured: 24px/28.8 over a 489px measure, 180px of air above and 90 below.
 * It is the same size as a section heading rather than a display line, which is
 * what keeps a sentence this bold from reading as a slogan -- and the 2:1 split
 * of the padding is what makes it land as the first thing under the fold
 * instead of floating in the middle of its own section.
 */
export function Statement() {
  return (
    <section className="px-5 pb-[90px] pt-[180px]">
      <p className="reveal mx-auto max-w-[489px] text-center text-[24px] font-medium leading-[120%] tracking-[-0.01em]">
        <span className="text-ink">{STATEMENT.lead}</span>{' '}
        <span className="text-ink/30">
          Your VO<sub className="text-[0.62em]">2</sub> max, <Chip src={chip1} /> your rate of
          ageing, HRV <Chip src={chip2} /> and your body fat <Chip src={chip3} /> will.
        </span>
      </p>
    </section>
  );
}

function Chip({ src }: { src: string }) {
  return (
    <img
      src={src}
      alt=""
      aria-hidden="true"
      width={39}
      height={26}
      className="mx-0.5 inline-block h-[0.72em] w-[1.08em] translate-y-[0.04em] rounded-[40px] object-cover align-baseline"
    />
  );
}
