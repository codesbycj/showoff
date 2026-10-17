import { type ReactNode } from 'react';
import { View, type ViewProps } from 'react-native';
import { SafeAreaView, type Edge } from 'react-native-safe-area-context';

type ScreenProps = ViewProps & {
  children: ReactNode;
  /** Which safe-area edges to inset. Defaults to top + bottom. */
  edges?: readonly Edge[];
  /** Set false to paint the screen edge-to-edge (hero images, full-bleed art). */
  safe?: boolean;
  className?: string;
};

/**
 * Root wrapper for every showcase screen. Owns the background colour and the
 * safe-area contract so individual components never have to think about it.
 */
export function Screen({
  children,
  edges = ['top', 'bottom'],
  safe = true,
  className = '',
  ...rest
}: ScreenProps) {
  if (!safe) {
    return (
      <View className={`flex-1 bg-bg ${className}`} {...rest}>
        {children}
      </View>
    );
  }

  return (
    <SafeAreaView edges={edges} className="flex-1 bg-bg">
      <View className={`flex-1 ${className}`} {...rest}>
        {children}
      </View>
    </SafeAreaView>
  );
}