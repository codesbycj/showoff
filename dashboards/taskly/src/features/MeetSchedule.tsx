import { useState } from 'react';

import { Avatar, Card, CardHead } from '@/components/Bits';
import { IconButton } from '@/components/Controls';
import { Icon, Wave } from '@/components/Icon';
import { MEETING } from '@/data/deck';
import { cx } from '@/lib/cx';

/**
 * The next meeting, with the host's camera preview.
 *
 * The preview is a photograph of a person, which is the one thing on this
 * screen that must not be drawn (rule 8). It is a free-licensed portrait,
 * bundled and credited, standing in for a video still.
 */
export function MeetSchedule() {
  const [joined, setJoined] = useState(false);
  const [mic, setMic] = useState(true);
  const [cam, setCam] = useState(true);

  return (
    <Card pane="meet" className="min-h-0 p-4">
      <CardHead
        title="Meet Schedule"
        icon="video"
        action={
          <>
            <IconButton icon="bell" label="Meeting reminders" size={30} />
            <IconButton icon="chevron-down" label="More meetings" size={30} />
          </>
        }
      />

      <div className="bg-sunken relative mt-3 min-h-0 flex-1 overflow-hidden rounded-2xl">
        <img
          src={MEETING.host.face}
          alt={MEETING.host.name}
          className={cx(
            'absolute inset-0 h-full w-full object-cover transition-[filter] duration-300',
            !cam && 'brightness-[0.35] grayscale',
          )}
        />

        <span className="bg-fill text-fill-fg absolute top-2.5 left-2.5 rounded-full px-2.5 py-1 text-[11px] font-bold">
          {joined ? 'Live' : 'Preview'}
        </span>

        {!cam ? (
          <span className="absolute inset-0 grid place-items-center">
            <span className="bg-fill text-fill-fg rounded-full px-3 py-1.5 text-[12px] font-semibold">
              Camera off
            </span>
          </span>
        ) : null}

        <div className="absolute inset-x-0 bottom-0 flex items-center justify-center gap-2 p-2.5">
          <RoundToggle
            on={mic}
            onClick={() => setMic((v) => !v)}
            icon="mic"
            label={mic ? 'Mute microphone' : 'Unmute microphone'}
          />
          <RoundToggle
            on={cam}
            onClick={() => setCam((v) => !v)}
            icon="video"
            label={cam ? 'Turn camera off' : 'Turn camera on'}
          />
        </div>
      </div>

      <div className="mt-3 flex items-end justify-between gap-3">
        <div className="min-w-0">
          <p className="text-ink m-0 flex items-center gap-1.5 text-[14px] font-extrabold">
            {MEETING.title}
            <Wave size={16} />
          </p>
          <p className="text-muted m-0 mt-1 flex items-center gap-1.5 text-[11.5px]">
            <Icon name="calendar" size={12} />
            {MEETING.date}
            <span aria-hidden="true" className="bg-line h-3 w-px" />
            <Icon name="clock" size={12} />
            {MEETING.time}
          </p>
        </div>

        <button
          type="button"
          data-join
          onClick={() => setJoined((v) => !v)}
          aria-pressed={joined}
          className={cx(
            'flex h-10 shrink-0 items-center gap-2 rounded-full px-4 text-[12.5px] font-bold transition-colors',
            joined ? 'bg-positive-soft text-positive' : 'bg-fill text-fill-fg hover:bg-fill/88',
          )}
        >
          {joined ? 'In the call' : 'Join Meet'}
          <Icon name={joined ? 'check' : 'video'} size={14} />
        </button>
      </div>

      <div className="mt-3 flex items-center gap-2">
        <div className="flex -space-x-2">
          {MEETING.attendees.map((face, i) => (
            <Avatar key={i} src={face} name={'Attendee ' + (i + 1)} size={24} ring />
          ))}
        </div>
        <span className="text-muted text-[11.5px]">{MEETING.attendees.length} others joining</span>
      </div>
    </Card>
  );
}

function RoundToggle({
  on,
  onClick,
  icon,
  label,
}: {
  on: boolean;
  onClick: () => void;
  icon: 'mic' | 'video';
  label: string;
}) {
  return (
    <button
      type="button"
      data-meet-toggle={icon}
      onClick={onClick}
      aria-pressed={!on}
      aria-label={label}
      className={cx(
        'grid h-9 w-9 place-items-center rounded-full transition-colors',
        on ? 'bg-surface/85 text-ink' : 'bg-pink text-white',
      )}
    >
      <Icon name={icon} size={16} />
    </button>
  );
}
