import { useEffect, useRef, useState } from 'react';

import { FAQ } from '@/content/site';

/**
 * The accordion, rebuilt as jQuery's `slideToggle` behaved: 400ms of linear
 * height and nothing else.
 *
 * No easing curve, no opacity, no icon rotation -- a `+` becomes a `-` the
 * instant you click, because the plugin swapped a background image and there
 * was nothing to tween. Side by side with the modern page's answer, which
 * opens on a cubic-bezier and fades its text in, the difference is not the
 * duration. Both take about 400ms. It is that one of them has a shape and the
 * other is a straight line.
 *
 * The height is measured rather than animated to `auto`, for the same reason the
 * modern one is: `auto` has never been animatable. jQuery read `scrollHeight`
 * off the element and stepped the inline style; this reads the same number off
 * the same box and hands it to a transition.
 *
 * One row is open on arrival, which the era did by default.
 */
export function FaqList() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <div id="faq">
      <h2>Frequently Asked Questions</h2>

      <div className="b-acc">
        {FAQ.items.map((item, i) => (
          <Row
            key={item.q}
            item={item}
            index={i}
            isOpen={open === i}
            onToggle={() => setOpen(open === i ? null : i)}
          />
        ))}
      </div>

      <p className="b-more">
        Still not sure? <a href="#contact">E-mail your question to our team</a> and we will normally
        reply within 1&ndash;2 working days.
      </p>
    </div>
  );
}

function Row({
  item,
  index,
  isOpen,
  onToggle,
}: {
  item: { q: string; a: string };
  index: number;
  isOpen: boolean;
  onToggle: () => void;
}) {
  const innerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    const inner = innerRef.current;
    if (!inner) return;
    const ro = new ResizeObserver(() => setHeight(inner.offsetHeight));
    ro.observe(inner);
    setHeight(inner.offsetHeight);
    return () => ro.disconnect();
  }, []);

  return (
    <div>
      <button
        type="button"
        className="b-acc-q"
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={`b-faq-${index}`}
      >
        <b>{isOpen ? '–' : '+'}</b> {index + 1}. {item.q}
      </button>
      <div
        id={`b-faq-${index}`}
        className="b-acc-a"
        style={{ height: isOpen ? `${height}px` : '0px' }}
      >
        <div className="b-acc-a-in" ref={innerRef}>
          {item.a}
        </div>
      </div>
    </div>
  );
}
