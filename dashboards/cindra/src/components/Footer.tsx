/**
 * The reference's footer, with its own invented copyright.
 *
 * The links are real anchors with a real focus ring and a 44px-tall tap target
 * — an `<a>` is only as tall as its line box, so the padding is on the anchor
 * and the underline is on an inner span.
 */
const LINKS = ['Privacy Policy', 'Term and conditions', 'Contact'];

const SOCIALS: { id: string; label: string; d: string }[] = [
  {
    id: 'feed',
    label: 'Feed',
    d: 'M5 19a2 2 0 1 0 0-4 2 2 0 0 0 0 4M5 5a14 14 0 0 1 14 14M5 10a9 9 0 0 1 9 9',
  },
  { id: 'notes', label: 'Notes', d: 'M5 5h14v14H5zM8.5 9h7M8.5 12.5h7M8.5 16h4' },
  {
    id: 'photos',
    label: 'Photos',
    d: 'M5 5h14v14H5zM9 11a2 2 0 1 0 0-4 2 2 0 0 0 0 4M5 17l5-5 4 4 2-2 3 3',
  },
  {
    id: 'watch',
    label: 'Watch',
    d: 'M3.5 7.5a3 3 0 0 1 3-3h11a3 3 0 0 1 3 3v9a3 3 0 0 1-3 3h-11a3 3 0 0 1-3-3zM10 9.5l5 2.5-5 2.5z',
  },
  {
    id: 'work',
    label: 'Work',
    d: 'M5 5h14v14H5zM8.5 10.5v6M8.5 8h.01M12.5 16.5v-6M12.5 13a2.5 2.5 0 0 1 5 0v3.5',
  },
];

export function Footer() {
  return (
    <footer className="text-muted flex h-[44px] shrink-0 items-center gap-5 text-[11.5px]">
      <span>Copyright &copy; 2029 Corvane</span>

      <nav aria-label="Legal" className="flex items-center gap-1">
        {LINKS.map((l) => (
          <a
            key={l}
            href="#top"
            className="hover:text-ink flex h-11 items-center rounded-lg px-2 transition-colors"
          >
            <span className="underline-offset-2 hover:underline">{l}</span>
          </a>
        ))}
      </nav>

      <ul className="m-0 ml-auto flex list-none items-center gap-1 p-0">
        {SOCIALS.map((s) => (
          <li key={s.id}>
            <a
              href="#top"
              aria-label={s.label}
              title={s.label}
              className="hover:text-ink hover:bg-sunken grid h-9 w-9 place-items-center rounded-full transition-colors"
            >
              <svg
                width="15"
                height="15"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.7"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <path d={s.d} />
              </svg>
            </a>
          </li>
        ))}
      </ul>
    </footer>
  );
}
