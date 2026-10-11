/**
 * The vertical hairlines behind several bands.
 *
 * Eight items spread edge to edge, the outer two invisible, which puts six
 * visible lines at exact sevenths of the viewport without any of them sitting
 * on the screen edge. They grow out of the floor during the loading sequence
 * and lag behind the scroll afterwards, so each one is its own element rather
 * than a repeating background.
 */
type Props = {
  /** Dark lines for the white bands. */
  dark?: boolean;
  /** Let them lag behind the scroll by a per-line amount. */
  lag?: boolean;
  className?: string;
};

const COUNT = 6;

export function BgLines({ dark = false, lag = false, className = '' }: Props) {
  return (
    <div
      className={`bg-lines ${className}`}
      aria-hidden="true"
      {...(lag ? { 'data-line-scroll': '' } : {})}
    >
      <div className="flex h-full w-full justify-between">
        <span className="w-px" />
        {Array.from({ length: COUNT }, (_, i) => (
          // Two separate class names, joined with an array rather than
          // interpolated into one template: the Tailwind formatter rewrites
          // class strings and has already swallowed the space between them
          // once, which silently produced `bg-linebg-line--dark`.
          <span
            key={i}
            data-bg-line
            className={['bg-line', dark && 'bg-line--dark'].filter(Boolean).join(' ')}
          />
        ))}
        <span className="w-px" />
      </div>
    </div>
  );
}
