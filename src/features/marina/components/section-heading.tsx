import { T } from './text';
import { mr } from '../theme';

/**
 * One of the three headings down the page.
 *
 * `Amenities` is blue in the reference while `Description` and `Contact Agent`
 * are black, which is easy to read as an inconsistency. It is not: the blue
 * one heads the only section whose content is interactive, and the colour is
 * what says so. Kept, with the choice exposed as a prop rather than hidden
 * inside the component.
 */
export function SectionHeading({ children, accent = false }: { children: string; accent?: boolean }) {
  return (
    <T variant="heading" color={accent ? mr.accent : mr.ink}>
      {children}
    </T>
  );
}
