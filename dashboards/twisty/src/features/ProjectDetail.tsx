import { useState } from 'react';

import { ProgressRing } from '@/charts/ProgressRing';
import { Sparkline } from '@/charts/Sparkline';
import { Avatar } from '@/components/Avatar';
import { Badge, Tag } from '@/components/Badge';
import { Card } from '@/components/Card';
import { Icon } from '@/components/Icon';
import { ProjectTile } from '@/components/ProjectTile';
import { hoursSeries, type Project } from '@/data/deck';
import { cx } from '@/lib/cx';
import { dateLong, usd } from '@/lib/format';

/**
 * The selected project, beside the table.
 *
 * Selecting a row redraws every number in here, which is the point of a
 * two-pane layout and the thing a still picture of a dashboard cannot show.
 * The request resets when the selection changes -- carrying "Payment
 * requested" over to the next project would be a lie about a different
 * invoice.
 */
export function ProjectDetail({ project }: { project: Project }) {
  // No reset effect: the pane gives this component `key={project.id}`, so
  // selecting another project remounts it and the request state starts false
  // by construction. Carrying "Payment requested" across to a different
  // invoice would be a lie, and a key says so in one word.
  const [requested, setRequested] = useState(false);

  const facts: [string, string][] = [
    ['Rate', usd(project.rate) + ' / hour'],
    ['Hours logged', String(project.hours)],
    ['Billed', usd(project.hours * project.rate)],
    ['Due', dateLong(project.due)],
  ];

  return (
    <Card pane="project-detail" className="min-h-0 overflow-hidden p-6">
      <div className="flex items-start gap-3">
        <ProjectTile project={project} size={46} />
        <div className="min-w-0 flex-1">
          <h2 className="text-ink m-0 text-[17px] leading-tight font-semibold tracking-[-0.01em]">
            {project.name}
          </h2>
          <p className="text-muted m-0 mt-1 text-[12.5px]">
            {project.location} · {project.when}
          </p>
        </div>
        <Badge tone={project.pay === 'paid' ? 'ink' : 'quiet'}>
          {project.pay === 'paid' ? 'Paid' : 'Not Paid'}
        </Badge>
      </div>

      <div className="mt-5 grid place-items-center">
        <ProgressRing value={project.progress} label={project.name} size={136} />
      </div>

      <div className="mt-5 flex flex-wrap gap-2">
        {project.tags.map((tag) => (
          <Tag key={tag}>{tag}</Tag>
        ))}
      </div>

      <p className="text-body m-0 mt-3.5 text-[13px] leading-[1.55]">{project.summary}</p>

      <dl className="m-0 mt-5 grid grid-cols-2 gap-x-4 gap-y-3.5">
        {facts.map(([label, value]) => (
          <div key={label}>
            <dt className="text-muted text-[11.5px] font-medium tracking-[0.03em] uppercase">
              {label}
            </dt>
            <dd className="text-ink m-0 mt-1 text-[14px] font-semibold">{value}</dd>
          </div>
        ))}
      </dl>

      <div className="mt-5">
        <Sparkline values={hoursSeries(project.id)} label="Hours, last fortnight" />
      </div>

      <div className="mt-auto pt-5">
        <div className="bg-sunken flex items-center gap-2.5 rounded-2xl p-2.5">
          <Avatar src={project.clientFace} name={project.client} size={36} />
          <div className="min-w-0 flex-1">
            <p className="text-ink m-0 truncate text-[13px] font-semibold">{project.client}</p>
            <p className="text-muted m-0 text-[12px]">Client</p>
          </div>
          <button
            type="button"
            aria-label={'Message ' + project.client}
            className="bg-surface text-body hover:text-ink grid h-9 w-9 place-items-center rounded-full transition-colors"
          >
            <Icon name="send" size={16} />
          </button>
        </div>

        <button
          type="button"
          data-request
          onClick={() => setRequested((v) => !v)}
          aria-pressed={requested}
          className={cx(
            'mt-2.5 flex h-[52px] w-full items-center justify-center gap-2 rounded-full text-[14px] font-semibold transition-colors',
            requested ? 'bg-positive/12 text-positive' : 'bg-ink hover:bg-ink/88 text-white',
          )}
        >
          <Icon name={requested ? 'check' : 'arrow-up-right'} size={17} />
          {requested ? 'Payment requested' : 'Request payment'}
        </button>
      </div>
    </Card>
  );
}
