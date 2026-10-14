import { Header } from '@/components/Header';
import { SquircleDefs } from '@/components/SquircleDefs';
import { Lead, Tail } from '@/sections/Bookends';
import { StatementTimeline } from '@/sections/StatementTimeline';

export function App() {
  return (
    <>
      <SquircleDefs />
      <Header />
      <main>
        <Lead />
        <StatementTimeline />
        <Tail />
      </main>
    </>
  );
}
