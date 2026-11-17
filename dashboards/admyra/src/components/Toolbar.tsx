/**
 * The table's own toolbar. Duplicate, Edit and the delete control are disabled
 * until something is ticked, which is what the reference shows: in image 1
 * nothing is selected and both read grey.
 */
import {
  Analyze,
  BreakdownIcon,
  ColumnsIcon,
  Download,
  Duplicate,
  Expand,
  Flask,
  Layers,
  Pencil,
  Plus,
  Reports,
  Trash,
} from '@/icons';
import { Button, IconButton } from '@/components/ui';

export function Toolbar({ selected }: { selected: number }) {
  const none = selected === 0;

  return (
    <div className="border-line flex h-14 shrink-0 items-center gap-2 border-b px-3">
      <Button variant="go" icon={<Plus size={17} />}>
        Create
      </Button>

      <Button icon={<Duplicate size={16} />} disabled={none}>
        Duplicate
      </Button>
      <Button icon={<Pencil size={16} />} disabled={none}>
        Edit
      </Button>
      <IconButton icon={<Trash size={17} />} aria-label="Delete" disabled={none} />

      <Button icon={<Analyze size={17} />}>Analyze</Button>
      <Button icon={<Flask size={16} />}>A/B test</Button>
      <Button variant="plain" caret>
        More
      </Button>

      <div className="ml-auto flex items-center gap-2">
        <Button icon={<ColumnsIcon size={16} />} caret>
          Columns: Performance
        </Button>
        <IconButton icon={<BreakdownIcon size={16} />} caret aria-label="Breakdown" />
        <IconButton icon={<Layers size={16} />} caret aria-label="Compare" />
        <IconButton icon={<Reports size={16} />} caret aria-label="Reports" />
        <IconButton icon={<Download size={16} />} caret aria-label="Export" />
        <IconButton icon={<Expand size={16} />} aria-label="Full screen" />
      </div>
    </div>
  );
}
