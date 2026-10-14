import { AUTHOR } from '@/data/projects';

/** The page furniture: a name, a couple of links, and the view switch. */
export function Chrome() {
  return (
    <div className="pointer-events-none fixed inset-0 z-10 flex flex-col justify-between p-6 text-xs tracking-[0.12em] uppercase md:p-10">
      <div className="flex items-start justify-between">
        <span className="font-medium">{AUTHOR}</span>
        <a className="pointer-events-auto hover:opacity-60" href="#work">
          Profile
        </a>
      </div>

      <div className="flex items-end justify-between">
        <p className="flex gap-2" id="work">
          <span>Featured</span>
          <span className="opacity-40">/</span>
          <span className="opacity-40">Full</span>
        </p>
        <a className="pointer-events-auto hover:opacity-60" href="#work">
          Newsletter
        </a>
      </div>
    </div>
  );
}
