import { useState } from 'react';

import { Badge, Tag } from '@/components/Badge';
import { Card, CardHead, SeeAll } from '@/components/Card';
import { Icon } from '@/components/Icon';
import { ProjectTile } from '@/components/ProjectTile';
import { PROJECTS, type Project } from '@/data/deck';
import { cx } from '@/lib/cx';
import { usd } from '@/lib/format';

/**
 * The right-hand column: an accordion of projects, one open at a time.
 *
 * The reference draws it with the first row already open, so the open row is
 * the design rather than a state the user has to find. Opening a second one
 * closes the first -- the card is 300px of room and two open rows would push
 * the third off the bottom, which is the kind of thing a presentation board
 * never has to deal with.
 */
export function RecentProjects({ query }: { query: string }) {
  const [open, setOpen] = useState<string | null>(PROJECTS[0].id);

  const q = query.trim().toLowerCase();
  const shown = q
    ? PROJECTS.filter((p) =>
        (p.name + ' ' + p.client + ' ' + p.location + ' ' + p.tags.join(' '))
          .toLowerCase()
          .includes(q),
      )
    : PROJECTS;

  return (
    <Card pane="recent" className="row-span-1 min-h-0 p-6 pr-4">
      <CardHead
        title="Your Recent Projects"
        action={<SeeAll>See all Project</SeeAll>}
        className="pr-2"
      />

      <div
        data-scroller="projects"
        className="scroll-region mt-1 -mr-2 min-h-0 flex-1 pr-2"
        tabIndex={-1}
      >
        {shown.length === 0 ? (
          <p className="text-muted mt-10 text-center text-[13px]">
            No project matches <span className="text-ink font-semibold">{query}</span>.
          </p>
        ) : (
          <ul className="m-0 list-none p-0">
            {shown.map((project, i) => (
              <li key={project.id} className={cx(i > 0 && 'border-line border-t')}>
                <Row
                  project={project}
                  open={open === project.id}
                  onToggle={() => setOpen((cur) => (cur === project.id ? null : project.id))}
                />
              </li>
            ))}
          </ul>
        )}
      </div>
    </Card>
  );
}

function Row({
  project,
  open,
  onToggle,
}: {
  project: Project;
  open: boolean;
  onToggle: () => void;
}) {
  return (
    <div data-project={project.id} className="py-3.5">
      <div className="flex items-center gap-3">
        <ProjectTile project={project} />
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-2">
            <h3 className="text-ink m-0 truncate text-[14px] font-semibold">{project.name}</h3>
            <Badge tone={project.pay === 'paid' ? 'ink' : 'quiet'}>
              {project.pay === 'paid' ? 'Paid' : 'Not Paid'}
            </Badge>
          </div>
          <p className="text-muted m-0 mt-1 text-[13px]">{usd(project.rate)}/hour</p>
        </div>
        <button
          type="button"
          data-expand={project.id}
          onClick={onToggle}
          aria-expanded={open}
          aria-label={(open ? 'Collapse ' : 'Expand ') + project.name}
          className="bg-sunken text-body hover:bg-sunken-deep hover:text-ink grid h-9 w-9 shrink-0 place-items-center rounded-full transition-colors"
        >
          <Icon name={open ? 'chevron-up' : 'chevron-down'} size={16} />
        </button>
      </div>

      {open ? (
        <div data-detail={project.id} className="pt-3.5 pl-[56px]">
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag) => (
              <Tag key={tag}>{tag}</Tag>
            ))}
          </div>
          <p className="text-body m-0 mt-3 text-[13px] leading-[1.5]">{project.summary}</p>
          <div className="text-muted mt-3 flex items-center gap-3 text-[12px]">
            <span className="inline-flex items-center gap-1.5">
              <Icon name="pin" size={14} />
              {project.location}
            </span>
            <span aria-hidden="true" className="bg-line h-3 w-px" />
            <span>{project.when}</span>
          </div>
        </div>
      ) : null}
    </div>
  );
}
