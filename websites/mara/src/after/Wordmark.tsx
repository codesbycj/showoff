import { useFitText } from '@/motion/useFitText';

/**
 * The wordmark, fitted to its measure — see `useFitText`.
 *
 * It appears twice on the page at this size, once at the foot of the first
 * screen and once at the foot of the last, and nothing in between is bigger
 * than 48px. That bracket is the whole typographic structure of the design.
 */
export function Wordmark({ text, className = '' }: { text: string; className?: string }) {
  const { boxRef, textRef, size } = useFitText<HTMLParagraphElement>(text);

  return (
    <div className="w-full" ref={boxRef}>
      <p
        className={['m-0 whitespace-nowrap font-normal uppercase leading-[1.2]', className].join(
          ' ',
        )}
        ref={textRef}
        style={{ fontSize: size, letterSpacing: '-0.005em' }}
      >
        <span className="inline-block">{text}</span>
      </p>
    </div>
  );
}
