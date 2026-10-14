/**
 * The back of a ticket — solid red, and the only thing visible for the first
 * two thirds of the section.
 *
 * It carries no copy worth reading on purpose. The whole point of the beat is
 * that three identical-looking slips come up from below the fold and only turn
 * out to be different once they turn over, so the back is a serial, a mark and
 * a monogram and nothing else.
 */
import { BlockMark, Crosshair, FeedArrows } from '@/components/Marks';
import type { Ticket } from '@/data/packages';

export function TicketBack({ ticket }: { ticket: Ticket }) {
  return (
    <div className="ticket-back text-paper absolute inset-0 flex flex-col gap-[3px]">
      <div className="bg-ink flex min-h-0 flex-1 flex-col rounded-[18px] px-6 pb-5 pt-5">
        <div className="flex items-start justify-between">
          <div>
            <BlockMark seed={ticket.code} className="w-[42px]" />
            <p className="mt-[10px] font-mono text-[10px] uppercase tracking-[0.08em]">
              {ticket.code}
            </p>
          </div>
          <Crosshair className="w-[18px]" />
        </div>

        <div className="mt-auto flex items-end justify-between">
          <span className="font-serif text-[64px] italic leading-none">{ticket.monogram}</span>
          <span className="border-paper flex size-[30px] items-center justify-center rounded-full border font-mono text-[12px]">
            {ticket.monogram[0]}
          </span>
        </div>

        <div className="mt-7 flex items-center gap-3">
          <FeedArrows className="w-[22px]" />
          <span className="font-mono text-[10px] uppercase tracking-[0.12em]">
            Tear here to begin
          </span>
          <FeedArrows className="w-[22px] -scale-x-100" />
        </div>
      </div>

      {/* `.back-bottom` in the reference, and it tears with the front's stub —
          so a card caught mid-flip does not show one half come away and the
          other stay put. */}
      <div className="ticket-stub perforation bg-ink text-sky flex items-center justify-between rounded-[18px] px-6 py-4">
        <Crosshair className="text-paper w-[14px]" />
        <p className="text-paper font-mono text-[10px] uppercase tracking-[0.1em]">
          Keep until handover
        </p>
      </div>
    </div>
  );
}
