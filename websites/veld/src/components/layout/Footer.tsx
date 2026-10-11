import { BgLines } from '@/components/ui/BgLines';
import { Monogram } from '@/components/layout/Monogram';
import { DRIVER, NAV_LINKS, SEASON_YEAR, SOCIALS } from '@/data/home';

export function Footer() {
  return (
    <footer className="bg-ink text-paper relative overflow-hidden pt-24 pb-10">
      <BgLines lag />

      <div className="px-gutter relative z-10 grid grid-cols-12 gap-6">
        <div className="col-span-12 lg:col-span-5">
          <Monogram className="h-10 w-auto" />
          <p className="text-body-sm mt-6 max-w-[20rem] opacity-60">
            {DRIVER.series} · car {DRIVER.number} · {DRIVER.city}, {DRIVER.country}
          </p>
        </div>

        <nav className="col-span-6 lg:col-span-2 lg:col-start-7">
          <p className="text-body-sm mb-4 tracking-[0.16em] uppercase opacity-40">Menu</p>
          <ul className="text-body-sm space-y-2">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <a href={link.href} className="hover:text-signal transition-colors">
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="col-span-6 lg:col-span-2">
          <p className="text-body-sm mb-4 tracking-[0.16em] uppercase opacity-40">Socials</p>
          <ul className="text-body-sm space-y-2">
            {SOCIALS.map((s) => (
              <li key={s.label}>
                <a href={s.href} className="hover:text-signal transition-colors">
                  {s.label}
                </a>
              </li>
            ))}
          </ul>
        </div>

        <div className="col-span-12 lg:col-span-2">
          <p className="text-body-sm mb-4 tracking-[0.16em] uppercase opacity-40">Contact</p>
          <ul className="text-body-sm space-y-2 opacity-80">
            <li>{DRIVER.email}</li>
            <li>{DRIVER.phone}</li>
          </ul>
        </div>

        <p className="text-body-sm border-chalk-10 col-span-12 mt-16 border-t pt-6 opacity-40">
          {DRIVER.fullName} is invented, and so is every result, partner and date on this page. A
          front-end study, season {SEASON_YEAR}.
        </p>
      </div>
    </footer>
  );
}
