import type { SitePost } from '@/lib/site-connector'

/**
 * Placeholder articles for the editorial homepage (and article routes) when no
 * live posts are returned from the master panel yet.
 *
 * Replace or remove entries here as you publish real pieces through your site;
 * once the feed returns articles, these samples are no longer shown.
 */
export const HOME_ARTICLE_SAMPLES: SitePost[] = [
  {
    id: 'sample-home-1',
    slug: 'letters-from-the-morning-train',
    title: 'Letters from the morning train',
    summary:
      'Why slow journalism still wins when everyone commutes with a phone full of tabs—and how we edit for readers who will finish one story before they reach Churchgate.',
    authorName: 'Editorial desk',
    publishedAt: '2026-03-12T10:00:00.000Z',
    tags: ['Essay', 'Reading'],
    content: {
      type: 'article',
      category: 'news',
      excerpt:
        'A short note on typography, margins, and the quiet pleasure of finishing something worth the time.',
      body: `<p>Readers rarely complain about generous line height or a headline that breathes. They notice when the opposite is true—when every paragraph feels squeezed into the same grey box as the last site they visited.</p><p>This space is built the other way around: room for context, then evidence, then a conclusion you can actually use.</p>`,
    },
    media: [{ url: 'https://picsum.photos/seed/futurethey-read-1/1600/900', type: 'IMAGE' }],
  },
  {
    id: 'sample-home-2',
    slug: 'sketching-the-next-decade',
    title: 'Sketching the next decade without hype',
    summary:
      'A framework for thinking about the future that favors scenarios and trade-offs over buzzwords—useful for teams planning beyond the next quarter.',
    authorName: 'Maya Chen',
    publishedAt: '2026-03-08T14:30:00.000Z',
    tags: ['Strategy', 'Future'],
    content: {
      type: 'article',
      category: 'digital',
      excerpt: 'Move from prediction to preparation with a few grounded questions.',
      body: `<p>The hardest part of “future” work is not guessing what happens next; it is choosing what you will do when several futures remain plausible.</p><p>Here is a lightweight way to stress-test plans without pretending certainty you do not have.</p><p>Start with constraints, add two divergent scenarios, and ask what has to be true in each for your bet to still make sense.</p>`,
    },
    media: [{ url: 'https://picsum.photos/seed/futurethey-read-2/1600/900', type: 'IMAGE' }],
  },
  {
    id: 'sample-home-3',
    slug: 'the-craft-of-the-lede',
    title: 'The craft of the lede',
    summary:
      'Opening lines are not decoration. They set pace, promise, and trust—especially when the reader has dozens of tabs competing for attention.',
    authorName: 'Jordan Ellis',
    publishedAt: '2026-02-26T09:15:00.000Z',
    tags: ['Writing', 'Editorial'],
    content: {
      type: 'article',
      category: 'blog',
      excerpt: 'What a strong first screen owes the reader before the fold.',
      body: `<p>Your first sentence should answer two questions: who this is for, and why now. Everything else can wait a beat.</p><p>If you cannot state the stake in plain language, the design cannot save the piece—no matter how beautiful the template.</p>`,
    },
    media: [{ url: 'https://picsum.photos/seed/futurethey-read-3/1600/900', type: 'IMAGE' }],
  },
  {
    id: 'sample-home-4',
    slug: 'archives-worth-returning-to',
    title: 'Archives worth returning to',
    summary:
      'How independent publishers keep back issues feeling alive—search, context, and cross-links that reward curiosity instead of punishing it.',
    authorName: 'Sam Rivera',
    publishedAt: '2026-02-18T16:45:00.000Z',
    tags: ['Publishing', 'Product'],
    content: {
      type: 'article',
      category: 'arts',
      excerpt: 'Treat older stories as part of the product, not attic storage.',
      body: `<p>Most sites bury their best work after a week. A better model treats every story as a node: related reads, refreshed intros where facts age, and clear dates without shame.</p><p>Readers who trust your archive come back more often than readers who only chase the newest headline.</p>`,
    },
    media: [{ url: 'https://picsum.photos/seed/futurethey-read-4/1600/900', type: 'IMAGE' }],
  },
  {
    id: 'sample-home-5',
    slug: 'type-on-the-local-line',
    title: 'Type on the local line',
    summary:
      'How we set body copy for one-handed reading in harsh light: measure, contrast, and why we still test on a three-year-old Android before shipping a redesign.',
    authorName: 'Ava Moreno',
    publishedAt: '2026-02-02T11:00:00.000Z',
    tags: ['Design', 'Accessibility'],
    content: {
      type: 'article',
      category: 'photography',
      excerpt: 'Readable beats pretty when the reader is standing in a doorway.',
      body: `<p>We start with a single column width that survives narrow viewports, then add colour only where it signals structure—not decoration.</p><p>Secondary labels that vanish in direct sun get demoted or removed; if a label does not survive a Worli platform glance, it is not doing work.</p>`,
    },
    media: [{ url: 'https://picsum.photos/seed/futurethey-read-5/1600/900', type: 'IMAGE' }],
  },
  {
    id: 'sample-home-6',
    slug: 'contributor-notes',
    title: 'Contributor notes: pitching us',
    summary:
      'What we look for in essays and reported pieces—voice, specificity, and respect for the reader’s time—plus a simple checklist before you hit send.',
    authorName: 'Future They',
    publishedAt: '2026-01-20T08:00:00.000Z',
    tags: ['Guidelines', 'Community'],
    content: {
      type: 'article',
      category: 'education',
      excerpt: 'Straightforward guidance for writers who want to collaborate.',
      body: `<p>Send a tight paragraph on the thesis, who it serves, and why you are the right author now. Attach one sample link to your best related work.</p><p>We read everything, but we reply faster when the subject line names the topic and the angle in plain language.</p><p>No simultaneous pitches to ten desks—if it is a fit here, say so in one sentence.</p>`,
    },
    media: [{ url: 'https://picsum.photos/seed/futurethey-read-6/1600/900', type: 'IMAGE' }],
  },
]

export function getHomeArticleSamplesForFeed(): SitePost[] {
  return HOME_ARTICLE_SAMPLES
}

export function getHomeArticleSampleBySlug(slug: string): SitePost | null {
  return HOME_ARTICLE_SAMPLES.find((post) => post.slug === slug) || null
}
