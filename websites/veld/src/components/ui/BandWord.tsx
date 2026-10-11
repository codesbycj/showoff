/**
 * The oversized word that sits behind a band and is cropped by it.
 *
 * Sized in `vw` rather than `rem` on purpose: this is the one thing on the
 * page that should always be wider than the screen, whatever the root font
 * size is doing. It is `aria-hidden` because the band already has a real
 * heading saying the same thing, and announcing it twice helps nobody.
 */
export function BandWord({
  children,
  solid = false,
  className = '',
}: {
  children: string;
  solid?: boolean;
  className?: string;
}) {
  return (
    <span
      aria-hidden="true"
      className={`band-word ${solid ? 'band-word--solid' : ''} bottom-0 left-0 text-[18vw] ${className}`}
    >
      {children}
    </span>
  );
}
