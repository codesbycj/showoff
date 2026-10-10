import { useState } from 'react';

import { Eyebrow } from '@/components/ui/Eyebrow';
import { PlusButton } from '@/components/ui/PlusButton';
import { Reveal } from '@/components/ui/Reveal';
import { RevealImage } from '@/components/ui/RevealImage';
import { WORK, type Project } from '@/data/home';

/** The project grid, with a filter that narrows it by market. */
export function SelectedWork() {
  const [filter, setFilter] = useState<string>(WORK.filters[0]);
  const projects = WORK.projects.filter((p) => filter === WORK.filters[0] || p.sector === filter);

  return (
    <section className="px-5 pb-24 md:px-10 md:pb-32" aria-labelledby="work-title">
      <div className="mx-auto max-w-[1600px]">
        <Reveal className="flex flex-wrap items-end justify-between gap-6">
          <h2
            id="work-title"
            className="text-[clamp(1.35rem,2.6vw,2.25rem)] font-light tracking-[-0.03em]"
          >
            {WORK.title}
          </h2>
          <Eyebrow className="text-ink-faint">{WORK.cta}</Eyebrow>
        </Reveal>

        <Reveal
          as="div"
          delay={0.05}
          className="border-hairline mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 border-t pt-5"
        >
          {WORK.filters.map((name) => {
            const active = name === filter;
            return (
              <button
                key={name}
                type="button"
                onClick={() => setFilter(name)}
                aria-pressed={active}
                className={`group inline-flex items-center gap-2 text-xs transition-colors duration-[--dur-ui] ease-[--ease-ui] ${
                  active ? 'text-ink' : 'text-ink-faint hover:text-ink'
                }`}
              >
                {name}
                <span
                  aria-hidden
                  className={`grid size-4 place-items-center rounded-full border text-[8px] transition-colors duration-[--dur-ui] ease-[--ease-ui] ${
                    active ? 'border-ink bg-ink text-paper' : 'border-current/40'
                  }`}
                >
                  +
                </span>
              </button>
            );
          })}
        </Reveal>

        {projects.length === 0 ? (
          <p className="text-ink-faint py-20 text-sm">Nothing in this market yet.</p>
        ) : (
          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

/** One project: picture, title, place. */
function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="group">
      <RevealImage
        src={project.image}
        alt={project.alt}
        className={`w-full overflow-hidden ${project.span === 'tall' ? 'aspect-4/5' : 'aspect-4/3'}`}
        imgClassName="h-full w-full object-cover transition-transform duration-[1.2s] ease-[--ease-reveal] group-hover:scale-[1.03]"
      />

      <Reveal className="mt-4 flex items-start justify-between gap-4">
        <div>
          <h3 className="max-w-[30ch] text-sm leading-snug">{project.title}</h3>
          <p className="text-ink-faint mt-1 text-xs">{project.place}</p>
        </div>
        <PlusButton className="text-ink-faint" />
      </Reveal>
    </article>
  );
}
