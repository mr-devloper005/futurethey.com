import type { TaskKey } from '@/lib/site-config'

export const siteContent = {
  navbar: {
    tagline: 'Future They · editorial desk',
  },
  footer: {
    tagline: 'Independent journalism & slow reads',
  },
  hero: {
    badge: 'Published weekly',
    title: ['Stories that stay', 'with you after the tab closes.'],
    description:
      'Future They is a small desk in Mumbai and remote contributors worldwide. We chase one good question per story—whether it is about housing, hiring, or how culture moves online.',
    primaryCta: {
      label: 'Read this week’s cover',
      href: '/articles',
    },
    secondaryCta: {
      label: 'See what we are filing next',
      href: '/about',
    },
    searchPlaceholder: 'Search essays, profiles, PDFs, and archives…',
    focusLabel: 'Focus',
    featureCardBadge: 'From the desk',
    featureCardTitle: 'Every edition opens with one lead story.',
    featureCardDescription:
      'The rest of the issue stacks essays, photo reports, and reader mail—so you always know where to start.',
  },
  home: {
    metadata: {
      title: 'Future They — essays, culture, and the next decade',
      description:
        'Independent magazine-style writing on work, cities, and technology—edited for readers who still read to the end.',
      openGraphTitle: 'Future They — essays, culture, and the next decade',
      openGraphDescription:
        'Long-form reporting and essays from Mumbai and friends abroad. Subscribe for new issues.',
      keywords: [
        'Future They',
        'magazine',
        'essays India',
        'culture writing',
        'longform journalism',
        'Mumbai editorial',
      ],
    },
    introBadge: 'About Future They',
    introTitle: 'We are stubborn about clarity.',
    introParagraphs: [
      'Future They started as a weekend newsletter between friends in Bandra and Bangalore. Today it is a full site for slower stories: explainers, reported features, and the occasional rant that survived three edits.',
      'We still fact-check phone numbers, call people back, and link to primary sources when we can. If a line feels clever but untrue, it does not ship.',
      'Listings, classifieds, PDFs, and profiles live here too—mostly because readers asked for one place to find everything after they finish an essay.',
    ],
    sideBadge: 'Desk notes',
    sidePoints: [
      'Typographic layout tuned for 18–22 minute reads on phone or laptop.',
      'Cover story + reading index on the homepage every refresh.',
      'Motion is minimal: fades only, no scroll-jacking.',
      'Search spans every format when you need a needle in the archive.',
    ],
    primaryLink: {
      label: 'Start with articles',
      href: '/articles',
    },
    secondaryLink: {
      label: 'Meet the team',
      href: '/team',
    },
  },
  cta: {
    badge: 'Write with us',
    title: 'Pitch a story or subscribe for the next drop.',
    description:
      'Send a one-paragraph idea, two clips you are proud of, and how you would report it. We reply within five working days when the desk is staffed.',
    primaryCta: {
      label: 'Create free account',
      href: '/register',
    },
    secondaryCta: {
      label: 'Talk with the team',
      href: '/contact',
    },
  },
  taskSectionHeading: 'Latest {label}',
  taskSectionDescriptionSuffix: 'New entries from this desk, refreshed often.',
} as const

export const taskPageMetadata: Record<Exclude<TaskKey, 'comment' | 'org' | 'social'>, { title: string; description: string }> = {
  article: {
    title: 'Articles & essays',
    description: 'Reported features, explainers, and opinion filed by our writers and contributors.',
  },
  listing: {
    title: 'Places & studios',
    description: 'Print shops, cafés, archives, and small businesses we have called or visited.',
  },
  classified: {
    title: 'Classifieds',
    description: 'Housing, gear, gigs, and short notices from readers and partner desks.',
  },
  image: {
    title: 'Photo desk',
    description: 'Photo essays, contact sheets, and visual reporting from the field.',
  },
  profile: {
    title: 'People & bylines',
    description: 'Staff, freelancers, interns, and collaborators behind the stories.',
  },
  sbm: {
    title: 'Reading shelf',
    description: 'Links, PDFs, and rabbit holes we are saving for the next issue.',
  },
  pdf: {
    title: 'Documents & downloads',
    description: 'Style drafts, data drops, and printable companions to our reporting.',
  },
}

export const taskIntroCopy: Record<
  TaskKey,
  { title: string; paragraphs: string[]; links: { label: string; href: string }[] }
> = {
  listing: {
    title: 'Studios, venues, and small businesses',
    paragraphs: [
      'These listings are the physical world behind our stories: letterpress shops, running clubs, archives, and neighbourhood cafés where interviews happen.',
      'We verify phone numbers when we can and note last-checked dates in the listing body—this is dummy data for now, but the workflow mirrors how we work.',
      'Jump from a listing to related essays, photo essays, or classifieds when the same beat overlaps.',
    ],
    links: [
      { label: 'Read articles', href: '/articles' },
      { label: 'Explore classifieds', href: '/classifieds' },
      { label: 'View profiles', href: '/profile' },
    ],
  },
  article: {
    title: 'The main magazine',
    paragraphs: [
      'This is where Future They lives: 2,000–6,000 word pieces with editors, line edits, and legal read when needed.',
      'Browse by category or search the archive; slugs stay stable so you can cite us in newsletters and footnotes.',
    ],
    links: [],
  },
  classified: {
    title: 'Short notices & gigs',
    paragraphs: [
      'Classifieds are reader-sourced: sublets, gear, micro-gigs, and the odd “looking for a co-author” post.',
      'We moderate for scams and duplicate posts; response times are faster on weekdays.',
      'Pair classifieds with listings when someone is hiring inside a studio we already profiled.',
    ],
    links: [
      { label: 'Places & studios', href: '/listings' },
      { label: 'Read articles', href: '/articles' },
      { label: 'View profiles', href: '/profile' },
    ],
  },
  image: {
    title: 'Photo essays & contact sheets',
    paragraphs: [
      'Our photographers file sequences, not single hero shots—captions carry legal names, locations, and consent notes.',
      'Image posts often pair with a long article; start here when you want the story told through light and colour first.',
      'Dummy galleries below mimic how we tag beats: cities, labour, climate, culture.',
    ],
    links: [
      { label: 'Read articles', href: '/articles' },
      { label: 'Places & studios', href: '/listings' },
      { label: 'Classifieds', href: '/classifieds' },
    ],
  },
  profile: {
    title: 'Bylines & partner desks',
    paragraphs: [
      'Staff pages list beats and contact routes; freelancer profiles show recent clips and time zones.',
      'We treat profiles as accountability surfaces—you always know who edited a line or took a portrait.',
      'Partner desks (guilds, wires, archives) appear here when we co-publish or share syndication.',
    ],
    links: [
      { label: 'Places & studios', href: '/listings' },
      { label: 'Read articles', href: '/articles' },
      { label: 'Photo desk', href: '/images' },
    ],
  },
  sbm: {
    title: 'The reading shelf',
    paragraphs: [
      'Editors dump primary sources, court filings, rival reporting, and stray PDFs here while a story is in motion.',
      'Once an issue ships, we prune dead links and add a one-line note on what changed.',
      'Think of it as the bibliography tab—still dummy data, but structured like a real newsroom.',
    ],
    links: [
      { label: 'Browse articles', href: '/articles' },
      { label: 'Places & studios', href: '/listings' },
      { label: 'Open PDFs', href: '/pdf' },
    ],
  },
  pdf: {
    title: 'Downloads & data drops',
    paragraphs: [
      'FOI responses, flatplans, survey tabs, and redlined style guides land as PDFs so lawyers and designers share one file.',
      'We watermark sensitive drafts “internal” even on staging—habit beats regret.',
      'Pair a PDF with its parent article when numbers or maps are easier to print than scroll.',
    ],
    links: [
      { label: 'Read articles', href: '/articles' },
      { label: 'See listings', href: '/listings' },
      { label: 'Explore profiles', href: '/profile' },
    ],
  },
  social: {
    title: 'Newsroom wire & desk notes',
    paragraphs: [
      'Short posts mirror Slack announcements: deadline shifts, correction flags, hiring calls.',
      'They age quickly—do not treat them as canonical; the essay or correction note is the record.',
      'Use this feed when you want the pulse of the desk without opening social apps.',
    ],
    links: [
      { label: 'Places & studios', href: '/listings' },
      { label: 'Read articles', href: '/articles' },
      { label: 'View PDFs', href: '/pdf' },
    ],
  },
  comment: {
    title: 'Letters & threaded replies',
    paragraphs: [
      'We publish letters that add reporting, dispute a framing, or share first-person context—edited for length and clarity.',
      'Threads stay attached to the originating article so context does not float away.',
      'Aggressive or anonymous pile-ons get cut; this section is for good-faith argument.',
    ],
    links: [
      { label: 'Explore articles', href: '/articles' },
      { label: 'View listings', href: '/listings' },
      { label: 'See classifieds', href: '/classifieds' },
    ],
  },
  org: {
    title: 'Guilds, clubs, and partner orgs',
    paragraphs: [
      'Future They sits inside a wider ecosystem of unions, press clubs, and nonprofit archives.',
      'Organisation pages list how we collaborate: syndication rules, shared bylines, joint events.',
      'Dummy orgs below are named after real institution types—swap in live partners when contracts allow.',
    ],
    links: [
      { label: 'Places & studios', href: '/listings' },
      { label: 'Read articles', href: '/articles' },
      { label: 'PDF library', href: '/pdf' },
    ],
  },
}
