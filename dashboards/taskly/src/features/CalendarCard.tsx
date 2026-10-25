import { useState } from 'react';

import { MonthGrid, MonthKey } from '@/charts/MonthGrid';
import { Card, CardHead } from '@/components/Bits';
import { IconButton, SelectPill } from '@/components/Controls';
import { CALENDAR } from '@/data/deck';

const MONTHS = [
  { id: 'Sep', label: 'Sep' },
  { id: 'Oct', label: 'Oct' },
  { id: 'Nov', label: 'Nov' },
];

/** The month, with a key for the tints the reference leaves undecodable. */
export function CalendarCard() {
  const [month, setMonth] = useState(CALENDAR.month);
  const [day, setDay] = useState(12);

  return (
    <Card pane="calendar" className="min-h-0 p-4">
      <CardHead
        title="Calendar"
        icon="calendar"
        action={
          <>
            <SelectPill name="month" value={month} options={MONTHS} onChange={setMonth} />
            <IconButton icon="dots" label="Calendar actions" size={30} />
          </>
        }
      />

      <div className="mt-3 min-h-0 flex-1">
        {month === CALENDAR.month ? (
          <MonthGrid selected={day} onSelect={setDay} />
        ) : (
          <div className="border-line grid h-full place-items-center rounded-2xl border border-dashed px-4 text-center">
            <p className="text-muted m-0 text-[12.5px]">
              Nothing scheduled in {month} yet.
              <br />
              Switch back to {CALENDAR.month} to see the sprint.
            </p>
          </div>
        )}
      </div>

      <div className="border-line mt-3 border-t pt-3">
        <MonthKey />
      </div>
    </Card>
  );
}
