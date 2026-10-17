import type { Service } from '@/data/services';

/**
 * One card: a photograph, a scrim over its bottom half, a label and an arrow.
 *
 * Nothing here moves itself. The card is a box with a transform on it, and the
 * deck owns that transform — which is what lets six of them share one timeline
 * and one 3D context without any of them knowing about the others.
 *
 * It is a link rather than a div with a click handler: it goes somewhere, and
 * the keyboard has to be able to get there. `focus-visible` drives the same
 * arrow nudge as hover, so tabbing through the deck looks like using it.
 */
export function ServiceCard({ service, index }: { service: Service; index: number }) {
  return (
    <a
      data-card
      data-card-index={index}
      href={`#${service.id}`}
      aria-label={service.label}
      className="card group absolute inset-0 flex items-end overflow-clip rounded-[var(--radius-card)] p-[1.4rem] outline-offset-4 focus-visible:outline-2 focus-visible:outline-[var(--color-flare)]"
    >
      <img
        src={service.image}
        alt={service.alt}
        width={900}
        height={1125}
        loading={index >= 4 ? 'eager' : 'lazy'}
        className="absolute inset-0 h-full w-full object-cover"
      />

      <div className="card-scrim pointer-events-none absolute inset-x-0 bottom-0 h-1/2" />

      <div className="relative flex w-full items-center justify-between gap-4">
        <h3 className="font-display text-[clamp(18px,1.9vw,28px)] font-extrabold uppercase leading-none tracking-[-0.01em] text-white">
          {service.label}
        </h3>
        <svg
          className="card-arrow w-[clamp(26px,2.4vw,38px)] shrink-0 text-[var(--color-flare)]"
          viewBox="0 0 40 12"
          fill="none"
          aria-hidden="true"
        >
          <path
            d="M0 6h36M30 1l6 5-6 5"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
    </a>
  );
}
