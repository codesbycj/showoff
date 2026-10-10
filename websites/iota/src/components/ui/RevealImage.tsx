import { Reveal, type RevealVariant } from './Reveal';

type RevealImageProps = {
  src: string;
  alt: string;
  className?: string;
  imgClassName?: string;
  variant?: RevealVariant;
  delay?: number;
  priority?: boolean;
};

/** A photograph whose frame unmasks while the picture inside settles back to size. */
export function RevealImage({
  src,
  alt,
  className,
  imgClassName,
  variant = 'image',
  delay,
  priority = false,
}: RevealImageProps) {
  return (
    <Reveal as="figure" variant={variant} delay={delay} className={className}>
      <img
        src={src}
        alt={alt}
        loading={priority ? 'eager' : 'lazy'}
        decoding="async"
        fetchPriority={priority ? 'high' : 'auto'}
        className={imgClassName ?? 'h-full w-full object-cover'}
      />
    </Reveal>
  );
}
