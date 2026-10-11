import { useState } from 'react';

import { ArrowButton } from '@/components/ui/ArrowButton';
import { BandWord } from '@/components/ui/BandWord';
import { CONTACT, DRIVER } from '@/data/home';

/**
 * The contact band.
 *
 * The form is real markup with real labels and a real submit, but there is
 * nothing behind it — this is a study, not a mailbox. It says so on submit
 * rather than silently doing nothing, which is the one thing a form must
 * never do.
 */
export function Contact() {
  const [sent, setSent] = useState(false);

  return (
    <section id="contact" className="bg-ink text-paper relative overflow-hidden py-28">
      <BandWord>{CONTACT.title}</BandWord>

      <div className="px-gutter relative z-10 grid grid-cols-12 gap-6">
        <div className="col-span-12 lg:col-span-4">
          <h2 data-reveal="words" className="text-h2 mb-6">
            {CONTACT.title}
          </h2>
          <p data-reveal="lines" className="text-body-sm mb-8 max-w-[22rem] opacity-70">
            {CONTACT.intro}
          </p>
          <ul className="text-body-sm space-y-1 opacity-70">
            <li>{DRIVER.email}</li>
            <li>{DRIVER.phone}</li>
            <li>
              {DRIVER.city}, {DRIVER.country}
            </li>
          </ul>
        </div>

        <form
          data-reveal="fade"
          className="bg-paper text-ink col-span-12 rounded-sm p-8 lg:col-span-7 lg:col-start-6"
          onSubmit={(e) => {
            e.preventDefault();
            setSent(true);
          }}
        >
          <div className="grid grid-cols-2 gap-5">
            <Field name="first" label={CONTACT.fields.firstName} />
            <Field name="last" label={CONTACT.fields.lastName} />
            <Field name="email" label={CONTACT.fields.email} type="email" className="col-span-2" />
            <Field name="message" label={CONTACT.fields.message} multiline className="col-span-2" />
          </div>

          <div className="mt-7 flex items-center gap-5">
            <ArrowButton>{CONTACT.cta}</ArrowButton>
            <p aria-live="polite" className="text-body-sm opacity-60">
              {sent ? 'Nothing is sent — this page is a front-end study.' : ''}
            </p>
          </div>
        </form>
      </div>
    </section>
  );
}

function Field({
  name,
  label,
  type = 'text',
  multiline = false,
  className = '',
}: {
  name: string;
  label: string;
  type?: string;
  multiline?: boolean;
  className?: string;
}) {
  const shared =
    'border-soot-20 text-body-sm focus:border-ink w-full border-b bg-transparent py-2 outline-none transition-colors';
  return (
    <label className={`block ${className}`}>
      <span className="text-body-sm mb-1 block tracking-[0.12em] uppercase opacity-50">
        {label}
      </span>
      {multiline ? (
        <textarea name={name} rows={4} className={`${shared} resize-none`} />
      ) : (
        <input name={name} type={type} className={shared} />
      )}
    </label>
  );
}
