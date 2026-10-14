import { Chrome } from '@/components/Chrome';
import { Stage } from '@/components/Stage';

export function App() {
  return (
    <main className="h-svh w-full overflow-hidden bg-black text-white">
      <Stage />
      <Chrome />
    </main>
  );
}
