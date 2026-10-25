import { useState } from 'react';

import { PROJECTS } from '@/data/deck';
import { ProjectDetail } from '@/features/ProjectDetail';
import { ProjectsTable } from '@/features/ProjectsTable';

/**
 * Projects. Assembly only: a table that filters and sorts, and the detail of
 * whichever row is selected.
 *
 * The pane owns the selection, not the table -- so what selecting a row *does*
 * is one line here rather than a change inside the table (rule 4).
 */
export function ProjectsPane({ query }: { query: string }) {
  const [selected, setSelected] = useState(PROJECTS[0].id);
  const project = PROJECTS.find((p) => p.id === selected) ?? PROJECTS[0];

  return (
    <div
      data-pane="projects"
      className="grid h-full grid-cols-[minmax(0,1fr)_minmax(0,1fr)_minmax(360px,404px)] gap-5"
    >
      <ProjectsTable query={query} selected={selected} onSelect={setSelected} />
      <ProjectDetail key={project.id} project={project} />
    </div>
  );
}
