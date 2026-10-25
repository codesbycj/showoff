import { cx } from '@/lib/cx';

/**
 * A person's face.
 *
 * Always a photograph (rule 8). The `alt` is the person's name, because these
 * are real portraits standing in rows that mean something -- a client, a
 * suggestion, a payer -- and an empty alt would drop the only identification a
 * screen reader gets in a row whose name is also shown.
 */
export function Avatar({
  src,
  name,
  size = 40,
  className,
}: {
  src: string;
  name: string;
  size?: number;
  className?: string;
}) {
  return (
    <img
      src={src}
      alt={name}
      width={size}
      height={size}
      style={{ width: size, height: size }}
      className={cx('bg-sunken shrink-0 rounded-full object-cover', className)}
    />
  );
}
