import { AvatarStack, Badge } from '@/components/Bits';
import { Icon } from '@/components/Icon';
import { PROJECTS, workspace } from '@/data/deck';

/**
 * The breadcrumb, the project title and the people on it.
 *
 * It takes the project rather than reading it, so the sidebar's tree and this
 * heading stay in step through the shell rather than through each other.
 */
export function BoardHeader({ projectId, onAdd }: { projectId: string; onAdd: () => void }) {
  const project = PROJECTS.find((p) => p.id === projectId) ?? PROJECTS[0];

  return (
    <div className="shrink-0">
      <div className="flex items-center justify-between gap-4">
        <nav
          aria-label="Breadcrumb"
          className="text-muted flex min-w-0 items-center gap-1.5 text-[12px]"
        >
          <span>Workspace</span>
          <Icon name="chevron-right" size={11} />
          <span className="flex items-center gap-1">
            <Icon name="folder" size={12} />
            {project.group}
          </span>
          <Icon name="chevron-right" size={11} />
          <span className="text-body truncate font-semibold">{project.name}</span>
        </nav>

        <p className="text-muted m-0 flex shrink-0 items-center gap-1.5 text-[12px]">
          <span aria-hidden="true" className="bg-positive h-2 w-2 rounded-full" />
          Last update on {workspace.updated}
        </p>
      </div>

      <div className="mt-2.5 flex items-center justify-between gap-4">
        <div className="flex min-w-0 items-center gap-2.5">
          <h1
            data-project-title
            className="text-ink m-0 truncate text-[24px] leading-tight font-extrabold tracking-[-0.025em]"
          >
            {project.name}
          </h1>
          <Badge tone="accent" icon={<Icon name="check" size={11} strokeWidth={2.6} />}>
            {project.badge}
          </Badge>
        </div>

        <div className="flex shrink-0 items-center gap-3">
          <AvatarStack faces={workspace.members} extra={workspace.extra} size={30} />
          <button
            type="button"
            data-add
            onClick={onAdd}
            className="bg-fill text-fill-fg hover:bg-fill/88 flex h-10 items-center gap-2 rounded-full px-4 text-[13px] font-bold transition-colors"
          >
            Add
            <Icon name="user-plus" size={15} />
          </button>
        </div>
      </div>
    </div>
  );
}
