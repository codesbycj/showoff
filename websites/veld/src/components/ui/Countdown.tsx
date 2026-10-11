import { useEffect, useRef } from 'react';

import { formatCountdown } from '@/data/race';
import { COUNTDOWN } from '@/motion/motion';

type Props = {
  target: Date | null;
  label: string;
  /** False while the loader still owns the page. */
  running: boolean;
  className?: string;
  align?: 'left' | 'right';
};

/**
 * The value element is deliberately uncontrolled — React renders it empty and
 * only ever effects write into it.
 *
 * Two things want that one text node: the loader, which rolls it digit by
 * digit like every other statistic, and the clock, which replaces it every
 * second. If React also owned it, its next render would patch against a text
 * node the odometer had already replaced with a stack of spans. Letting the
 * DOM be the single source of truth costs one ref and removes the whole class
 * of problem.
 */
export function Countdown({ target, label, running, className = '', align = 'right' }: Props) {
  const value = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = value.current;
    if (!el) return;

    // Before the loader hands over, show a frozen value: it is what the loader
    // reads to know what to roll to, and a target that ticks while it rolls
    // lands on the wrong number.
    if (!running) {
      if (!el.textContent) el.textContent = formatCountdown(target) ?? COUNTDOWN.noRaceText;
      return;
    }

    const write = () => {
      el.textContent = formatCountdown(target) ?? COUNTDOWN.noRaceText;
    };
    write();
    const id = window.setInterval(write, 1000);
    return () => window.clearInterval(id);
  }, [target, running]);

  return (
    <div
      className={`flex flex-col gap-2.5 ${align === 'right' ? 'items-end text-right' : 'items-start text-left'} ${className}`}
    >
      <p className="text-body-sm opacity-80">{label}</p>
      <div ref={value} data-odometer-element className="font-display text-h3 tabular-nums" />
    </div>
  );
}
