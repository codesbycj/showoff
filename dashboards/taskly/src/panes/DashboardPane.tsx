import { BoardHeader } from '@/features/BoardHeader';
import { CalendarCard } from '@/features/CalendarCard';
import { MeetSchedule } from '@/features/MeetSchedule';
import { TaskBoard } from '@/features/TaskBoard';
import { TeamChat } from '@/features/TeamChat';
import { NoteTile, TimerTile } from '@/features/TimerAndNote';

/**
 * The screen that was dropped. Assembly only (rule 4): six imports and a grid.
 *
 * The arrangement is the reference's own — the board across two columns, the
 * month down the right, and the meeting, the chat and the two tinted tiles
 * underneath — laid out in fractions of the viewport rather than at the board's
 * pixel sizes.
 */
export function DashboardPane({ projectId, query }: { projectId: string; query: string }) {
  return (
    <div
      data-pane="dashboard"
      className="grid h-full grid-cols-[minmax(0,1fr)_minmax(0,1fr)_minmax(290px,330px)] grid-rows-[auto_minmax(0,1.15fr)_minmax(0,1fr)] gap-4"
    >
      <div className="col-span-3">
        <BoardHeader projectId={projectId} onAdd={() => {}} />
      </div>

      <div className="col-span-2 flex min-h-0 min-w-0 flex-col">
        <TaskBoard projectId={projectId} query={query} />
      </div>
      <div className="row-span-2 flex min-h-0 min-w-0 flex-col gap-4">
        <CalendarCard />
        <div className="grid shrink-0 grid-rows-2 gap-4" style={{ height: 248 }}>
          <TimerTile />
          <NoteTile />
        </div>
      </div>

      <MeetSchedule />
      <TeamChat />
    </div>
  );
}
