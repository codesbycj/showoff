import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';

/** Screen 1 — built component by component. */
export default function OrbitoverScreen() {
  return (
    <View className="flex-1 bg-white">
      <StatusBar style="dark" />
    </View>
  );
}
