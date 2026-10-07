/**
 * The job detail screen's copy, keyed by the same job keys the feed uses.
 *
 * The reference only writes a detail page for the Dropbox listing, but every
 * card in the feed opens this screen, so the other three are written out too —
 * a card that opens a page about a different job is a worse showcase than one
 * extra paragraph of invented copy.
 *
 * Two deliberate departures from the reference's own page:
 *
 * - Its description ends in three emoji. They are dropped. Emoji are the one
 *   glyph class guaranteed to differ between the machine this is built on and
 *   the device it is recorded on, and the web harness cannot see that.
 * - Its salary is $1,700-$2,100 while the same job's feed card says
 *   $1,200-$1,500. Each screen keeps its own reference's number; the detail
 *   page is the one that quotes the range for the role rather than the listing
 *   preview, which is a reading the design supports.
 */
export type JobDetail = {
  salary: string;
  tags: readonly string[];
  description: string;
  /** The follow-up line, with its link rendered underlined and in full ink. */
  note: string;
  link: string;
  responsibilities: readonly string[];
};

export const JOB_DETAILS: Record<string, JobDetail> = {
  ux: {
    salary: '$1,700 - $2,100',
    tags: ['Canada', 'Toronto', 'IT', 'Remote'],
    description: 'Dropbox is looking for a talented designer, illustrator to expand our team',
    note: 'No experience - come to us for practice, do tasks of our link - ',
    link: 'https://www.dropbox.com/tasks',
    responsibilities: [
      'Developing original designs and illustrations for promotional materials, websites, social media, email newsletters, and other company projects',
      "Creating visual concepts and designs for the company's products and brands",
      'Editing and optimizing graphic elements for publication',
      'Ensuring visual consistency across brand assets and marketing materials',
    ],
  },
  js: {
    salary: '$1,400 - $1,900',
    tags: ['Remote', 'Frontend', 'JS', 'Office'],
    description:
      'Poker Stars is looking for a front-end developer to work on our live table clients',
    note: 'Take-home task before the first call - the brief lives at - ',
    link: 'https://www.pokerstars.com/careers',
    responsibilities: [
      'Building and maintaining the React interfaces behind the live table and lobby clients',
      'Working with the design team to turn Figma files into components that survive a redesign',
      'Profiling and fixing render performance on low-end devices',
      'Reviewing pull requests and keeping the shared component library honest',
    ],
  },
  smm: {
    salary: '$55/h - $75/h',
    tags: ['Marketing', 'Part-time', 'Office', 'Content'],
    description: 'Apple is looking for a content manager to run our regional social channels',
    note: 'Send three campaigns you are proud of, plus the brief they answered - ',
    link: 'https://www.apple.com/jobs/marketing',
    responsibilities: [
      'Planning and publishing the regional content calendar across every social channel',
      'Writing copy that survives translation into eleven languages without losing its point',
      'Briefing designers and editors, and signing off the work that ships',
      'Reporting on reach and engagement monthly, and saying what you would change',
    ],
  },
  art: {
    salary: '$2,400 - $2,800',
    tags: ['Design', 'Senior', 'Remote', 'Office'],
    description: 'NIKITIN Agency is looking for an art director to lead campaign work end to end',
    note: 'Portfolio first, conversation second - upload it at - ',
    link: 'https://www.nikitin.agency/hiring',
    responsibilities: [
      'Setting the visual direction for campaigns and defending it through production',
      'Directing photographers, illustrators and motion designers on shoots and edits',
      'Presenting work to clients, and taking the notes that are worth taking',
      'Mentoring two mid-weight designers and reviewing everything that leaves the studio',
    ],
  },
};

export const DETAIL = {
  cta: 'Send Resume',
  descriptionTitle: 'Job Description',
  responsibilitiesTitle: 'Responsibilities',
} as const;
