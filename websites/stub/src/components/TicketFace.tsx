/**
 * The face of a ticket: the part that is worth reading, and the priced stub
 * under the perforation.
 *
 * Two blocks with a 3px gap rather than one block with a line drawn across it —
 * which is how the reference builds it, and it is the gap that sells the tear.
 * A single rounded rectangle with a dashed rule through the middle reads as a
 * card with a line on it; two rounded rectangles almost touching read as one
 * thing about to come apart.
 */
import { Barcode } from '@/components/Barcode';
import { Copy } from '@/components/Copy';
import { ListBullet } from '@/components/Marks';
import { CTA, type Ticket } from '@/data/packages';

export function TicketFace({ ticket }: { ticket: Ticket }) {
  return (
    <div className="ticket-face absolute inset-0 flex flex-col gap-[3px]">
      <div className="bg-paper flex min-h-0 flex-1 flex-col rounded-[18px] px-6 pb-6 pt-5">
        <h3 className="font-serif text-[34px] italic leading-none">{ticket.name}</h3>

        <p className="mt-3 text-[14px] leading-[1.35]">
          <Copy parts={ticket.blurb} />
        </p>

        <ul className="mt-auto space-y-[7px] text-[14px] leading-none">
          {ticket.includes.map((line, i) => (
            <li key={i} className="flex items-center gap-[9px]">
              <ListBullet index={i} className="w-[8px] shrink-0" />
              <span>
                <Copy parts={line} />
              </span>
            </li>
          ))}
        </ul>
      </div>

      <div className="ticket-stub perforation bg-paper text-sky rounded-[18px] px-6 pb-4 pt-4 shadow-[10px_10px_60px_#08324414]">
        <div className="text-ink flex items-baseline justify-between">
          <span className="font-mono text-[11px] uppercase tracking-[0.06em]">
            Price starts at:
          </span>
          <span className="font-mono text-[15px] font-medium">{ticket.price}</span>
        </div>

        {/* The barcode is the button. At rest it is bars and the label is
            invisible; closed, it is one block with the label on it. Both states
            are the same element, which is why the link wraps the whole thing
            rather than appearing on hover — there is nothing to appear. */}
        <a
          href="#enquire"
          className="barcode-wrap text-ink relative mt-3 flex h-[46px] w-full items-center justify-center"
        >
          <Barcode seed={ticket.code} className="absolute inset-0 h-full w-full" />
          <span className="button-text text-paper relative font-serif text-[18px] italic">
            {CTA}
          </span>
        </a>

        <p className="text-ink mt-3 font-mono text-[10px] uppercase tracking-[0.12em]">
          {ticket.footnote}
        </p>
      </div>
    </div>
  );
}
