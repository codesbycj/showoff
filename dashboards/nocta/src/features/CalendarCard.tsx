import { useState } from 'react';

import { MiniCalendar } from '@/charts/MiniCalendar';
import { DeltaPill } from '@/components/Badge';
import { Card } from '@/components/Card';
import { IconButton } from '@/components/Controls';
import { Icon } from '@/components/Icon';
import { CALENDAR, DAY_TOTALS } from '@/data/deck';
import { usd } from '@/lib/format';

const MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

/**
 * The month, and what moved on the selected day.
 *
 * The reference shows a single figure under a single selected date. Here every
 * marked day carries its own, so picking a date rewrites the chip — and the
 * arrows step the month, which a still picture cannot show either.
 */
export function CalendarCard() {
  const [monthIndex, setMonthIndex] = useState(MONTHS.indexOf(CALENDAR.month));
  const [day, setDay] = useState(CALENDAR.selected);

  const atMonth = monthIndex === MONTHS.indexOf(CALENDAR.month);
  const total = atMonth ? DAY_TOTALS[day] : undefined;

  return (
    <Card pane="calendar" className="min-h-0 p-5">
      <div className="flex items-center justify-between gap-2">
        <IconButton
          icon="chevron-left"
          label="Previous month"
          tone="raised"
          size={32}
          onClick={() => setMonthIndex((m) => (m + 11) % 12)}
        />
        <p data-month className="text-ink m-0 text-[14.5px] font-semibold">
          {MONTHS[monthIndex]}, {CALENDAR.year}
        </p>
        <IconButton
          icon="chevron-right"
          label="Next month"
          tone="raised"
          size={32}
          onClick={() => setMonthIndex((m) => (m + 1) % 12)}
        />
      </div>

      <div className="mt-4 min-h-0 flex-1">
        <MiniCalendar selected={atMonth ? day : -1} onSelect={setDay} />
      </div>

      <div className="bg-raised mt-4 flex items-center gap-3 rounded-full px-3 py-2.5">
        <span className="bg-sunken text-muted grid h-8 w-8 shrink-0 place-items-center rounded-full">
          <Icon name="bars" size={16} />
        </span>
        {total ? (
          <>
            <span
              data-day-total
              className="text-ink text-[20px] leading-none font-semibold tracking-[-0.02em]"
            >
              {usd(total.amount)}
            </span>
            <DeltaPill value={total.delta} className="ml-auto" />
          </>
        ) : (
          <span data-day-total className="text-muted text-[12.5px]">
            {atMonth ? 'Nothing moved on this day' : 'Pick a day in ' + CALENDAR.month}
          </span>
        )}
      </div>
    </Card>
  );
}
