/** The hairline circle with a + that marks every card. Pass `label` to make it a real control. */
export function PlusButton({ label, className = '' }: { label?: string; className?: string }) {
  const Tag = label ? 'button' : 'span';

  return (
    <Tag
      {...(label ? { type: 'button' as const, 'aria-label': label } : { 'aria-hidden': true })}
      className={
        'grid size-8 shrink-0 place-items-center rounded-full border border-current/35 ' +
        'transition-[background-color,color,transform] duration-[--dur-ui] ease-[--ease-ui] ' +
        'group-hover:scale-110 group-hover:border-current ' +
        className
      }
    >
      <svg viewBox="0 0 12 12" className="size-3" fill="none" stroke="currentColor" strokeWidth="1">
        <path d="M6 1v10M1 6h10" />
      </svg>
    </Tag>
  );
}
