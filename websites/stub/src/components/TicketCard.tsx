/**
 * One ticket: a face and a back sharing a box, moved by two custom properties
 * and nothing else.
 *
 * The card reads its own index out of the variable name rather than taking
 * numbers as props, so adding a fourth ticket is a row in the data file and a
 * keyframe in `DEAL.lands` — never a change here.
 */
import { TicketBack } from '@/components/TicketBack';
import { TicketFace } from '@/components/TicketFace';
import type { Ticket } from '@/data/packages';
import { STAGE } from '@/motion/motion';

type Props = { ticket: Ticket; index: number; stacked: boolean };

export function TicketCard({ ticket, index, stacked }: Props) {
  return (
    <div
      className={['ticket', stacked ? 'absolute' : 'relative'].join(' ')}
      style={{
        width: STAGE.cardW,
        height: STAGE.cardH,
        // Offsets, not transforms: the timeline owns `transform` on this
        // element, and a resting offset folded into it would have to be
        // re-applied on every frame by the one function that is meant to know
        // nothing about layout.
        left: stacked ? index * STAGE.stackOffsetX : undefined,
        top: stacked ? index * STAGE.stackOffsetY : undefined,
        // Stacked, the later cards have to land on top of the earlier ones —
        // which is also the order they arrive in, so the deal still reads as a
        // deal rather than as three cards appearing under a lid.
        zIndex: index + 1,
        transform: `translateY(var(--card-y-${index})) rotateY(var(--card-rot-${index}))`,
      }}
    >
      <TicketFace ticket={ticket} />
      <TicketBack ticket={ticket} />
    </div>
  );
}
