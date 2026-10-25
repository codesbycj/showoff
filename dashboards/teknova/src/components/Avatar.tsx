import { cx } from '@/lib/cx';

/**
 * A person's face. Always a photograph (rule 8), and the alt is the person's
 * name — these rows are customers, and the face is the only identification a
 * screen reader would otherwise lose.
 */
export function Avatar({
  src,
  name,
  size = 32,
  ring = false,
  className,
}: {
  src: string;
  name: string;
  size?: number;
  ring?: boolean;
  className?: string;
}) {
  return (
    <img
      src={src}
      alt={name}
      width={size}
      height={size}
      style={{ width: size, height: size }}
      className={cx(
        'bg-sunken shrink-0 rounded-full object-cover',
        ring && 'ring-surface ring-2',
        className,
      )}
    />
  );
}

/** The overlapping team stack in the top bar, with the remainder as a count. */
export function AvatarStack({
  faces,
  extra,
  size = 32,
}: {
  faces: string[];
  extra: number;
  size?: number;
}) {
  return (
    <div className="flex items-center">
      <div className="flex -space-x-2.5">
        {faces.map((face, i) => (
          <Avatar key={i} src={face} name={'Team member ' + (i + 1)} size={size} ring />
        ))}
      </div>
      <span className="text-body ml-2 text-[13px] font-semibold">+{extra}</span>
    </div>
  );
}
