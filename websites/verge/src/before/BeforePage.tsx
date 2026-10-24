import { Body } from '@/before/Body';
import { Chrome } from '@/before/Chrome';
import { Footer } from '@/before/Footer';
import '@/before/before.css';

/**
 * The before: the same company, on a bought theme.
 *
 * **This episode's angle is the template clash.** Nothing here is dated and
 * nothing is broken: every block is a current, competent component of the kind
 * that ships in a multipurpose theme with forty demo layouts. The failure is
 * that eleven of them are on one page and none was drawn for this company.
 *
 * Three typefaces (Georgia headings, Trebuchet body, Arial Black counters),
 * five button styles, four accent colours of which none is the logo's, section
 * paddings that never repeat, and stock photography of a meeting room, a
 * skyline and a boardroom selling a cycle-to-work scheme.
 *
 * It carries the entire content deck — all three schemes with their prices,
 * the process, the statistics, every testimonial, the journal and the full
 * FAQ. The information is all here. It is wearing nine different costumes.
 */
export function BeforePage() {
  return (
    <div className="b">
      <Chrome />
      <Body />
      <Footer />
    </div>
  );
}
