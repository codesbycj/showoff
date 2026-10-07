import { Text as RNText, type TextProps as RNTextProps } from 'react-native';

const variants = {
  display: 'text-4xl leading-tight font-sans-bold text-fg',
  title: 'text-2xl leading-tight font-sans-bold text-fg',
  heading: 'text-lg leading-snug font-sans-semibold text-fg',
  body: 'text-base leading-relaxed font-sans text-fg',
  label: 'text-sm leading-tight font-sans-medium text-fg',
  caption: 'text-xs leading-tight font-sans text-muted',
  mono: 'text-xs font-mono text-muted',
} as const;

type TextProps = RNTextProps & {
  variant?: keyof typeof variants;
  className?: string;
};

/** Typography primitive. Every string on screen goes through this. */
export function Text({ variant = 'body', className = '', ...rest }: TextProps) {
  return <RNText className={`${variants[variant]} ${className}`} {...rest} />;
}
