import type { ReactNode } from 'react';

/** A text link with a circled arrow. A button, because this build has nowhere to navigate to. */
export function ArrowLink({
  children,
  className = '',
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <button
      type="button"
      className={`group inline-flex items-center gap-3 text-sm font-medium ${className}`}
    >
      <span className="link-underline">{children}</span>
      <span
        aria-hidden
        className="grid size-6 place-items-center rounded-full border border-current/40 transition-transform duration-[--dur-ui] ease-[--ease-ui] group-hover:translate-x-0.5"
      >
        <svg
          viewBox="0 0 12 12"
          className="size-2.5"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.2"
        >
          <path d="M1 6h9M6 2l4 4-4 4" />
        </svg>
      </span>
    </button>
  );
}
