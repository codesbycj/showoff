import { useState } from 'react';

import { ACCOUNT } from '@/data/deck';
import { AnalyticsCard } from '@/features/AnalyticsCard';
import { BalanceStats } from '@/features/BalanceStats';
import { BankCardPanel } from '@/features/BankCardPanel';
import { ContactsStrip } from '@/features/ContactsStrip';
import { FlowCard } from '@/features/FlowCard';
import { LastTransactions } from '@/features/LastTransactions';
import { PremiumCard } from '@/features/PremiumCard';

/**
 * The reference screen. Assembly only (rule 4).
 *
 * Three rows of `fr` rather than fixed heights, so the lower row takes
 * whatever is left and the cards reach the bottom of the shell at 900px and at
 * 1080px alike.
 */
export function HomePane({
  query,
  cardId,
  onCard,
  onNavigate,
}: {
  query: string;
  cardId: string;
  onCard: (id: string) => void;
  onNavigate: (tab: 'wallet') => void;
}) {
  const [contact, setContact] = useState<string | null>(null);
  const [openTxn, setOpenTxn] = useState<string | null>(null);
  const [premium, setPremium] = useState(false);

  return (
    <div data-pane="home" className="flex h-full flex-col gap-3.5">
      <div className="grid shrink-0 grid-cols-[1.4fr_0.92fr] items-center gap-3.5">
        <div className="min-w-0">
          <h1 className="text-ink m-0 truncate text-[42px] leading-[1.1] font-bold tracking-[-0.035em]">
            Hello, <span className="text-accent">{ACCOUNT.holder}</span>
          </h1>
          <p className="text-muted m-0 mt-1 text-[14px]">View and control your finances here!</p>
        </div>

        <ContactsStrip
          selected={contact}
          onSelect={setContact}
          onSend={() => onNavigate('wallet')}
        />
      </div>

      <div className="grid min-h-0 flex-1 grid-cols-[1.12fr_1.3fr_0.95fr] gap-3.5">
        <BalanceStats />
        <BankCardPanel cardId={cardId} onCard={onCard} />
        <AnalyticsCard />
      </div>

      <div className="grid min-h-0 flex-[1.08] grid-cols-[1.25fr_1fr] gap-3.5">
        <LastTransactions query={query} open={openTxn} onOpen={setOpenTxn} />
        <div className="flex min-h-0 flex-col gap-3.5">
          <FlowCard />
          <PremiumCard taken={premium} onTake={() => setPremium((v) => !v)} />
        </div>
      </div>
    </div>
  );
}
