import { useEffect, useRef, useState } from 'react';

import { Icon, Flame } from '@/components/Icon';
import { NOTE, TIMER } from '@/data/deck';
import { cx } from '@/lib/cx';

const mmss = (total: number) =>
  String(Math.floor(total / 60)).padStart(2, '0') + ':' + String(total % 60).padStart(2, '0');

/**
 * The timer tile.
 *
 * It starts **paused**. The reference draws a stop button, which implies it is
 * running — but a clock that ticks on first paint means every frame of every
 * capture differs from the last, and the numeric diff that proves the take
 * would report a change on every beat. Paused is the honest resting state for
 * something that is filmed; the take presses start.
 */
export function TimerTile() {
  const [left, setLeft] = useState(TIMER.startSeconds);
  const [running, setRunning] = useState(false);
  const tick = useRef<number | null>(null);

  // An interval is an external system, which is exactly what an effect is for.
  useEffect(() => {
    if (!running) return;
    tick.current = window.setInterval(() => {
      setLeft((v) => (v <= 1 ? 0 : v - 1));
    }, 1000);
    return () => {
      if (tick.current !== null) window.clearInterval(tick.current);
    };
  }, [running]);

  return (
    <div
      data-card="timer"
      className="bg-tile-timer flex min-h-0 flex-col justify-between rounded-[var(--radius-card)] p-4"
    >
      <p className="text-ink m-0 flex items-center gap-2 text-[14px] font-extrabold">
        <Icon name="clock" size={16} />
        {TIMER.label}
      </p>

      <div className="mt-3 flex items-center justify-between gap-3">
        <p
          data-timer
          className="text-ink m-0 text-[34px] leading-none font-extrabold tracking-[-0.03em] tabular-nums"
        >
          {mmss(left)}
        </p>
        <button
          type="button"
          data-timer-toggle
          onClick={() => setRunning((v) => !v)}
          aria-pressed={running}
          aria-label={running ? 'Stop the timer' : 'Start the timer'}
          className={cx(
            'grid h-11 w-11 shrink-0 place-items-center rounded-full text-white transition-colors',
            running ? 'bg-status-urgent' : 'bg-fill text-fill-fg',
          )}
        >
          <Icon name={running ? 'stop' : 'clock'} size={17} />
        </button>
      </div>
    </div>
  );
}

/** The pinned note. */
export function NoteTile() {
  const [done, setDone] = useState(false);

  return (
    <div
      data-card="note"
      className="bg-tile-notes flex min-h-0 flex-col justify-between rounded-[var(--radius-card)] p-4"
    >
      <p className="text-ink m-0 flex items-center gap-2 text-[14px] font-extrabold">
        <Icon name="note" size={16} />
        Notes
      </p>

      <p
        className={cx(
          'text-ink m-0 mt-2.5 flex items-start gap-1.5 text-[13px] leading-[1.45] font-bold',
          done && 'line-through opacity-60',
        )}
      >
        <span className="min-w-0">{NOTE.title}</span>
        <Flame size={15} />
      </p>

      <div className="mt-3 flex items-center justify-between gap-2">
        <span className="text-ink/75 text-[11.5px] font-semibold">{NOTE.when}</span>
        <button
          type="button"
          data-note-done
          onClick={() => setDone((v) => !v)}
          aria-pressed={done}
          className={cx(
            'flex h-8 items-center gap-1.5 rounded-full px-3 text-[11.5px] font-bold transition-colors',
            done ? 'bg-positive-soft text-positive' : 'bg-surface/70 text-ink hover:bg-surface',
          )}
        >
          <Icon name="check" size={13} />
          {done ? 'Done' : 'Mark done'}
        </button>
      </div>
    </div>
  );
}
