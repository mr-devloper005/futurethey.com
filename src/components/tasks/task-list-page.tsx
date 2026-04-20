import Link from 'next/link'
import { ArrowRight, Building2, FileText, Image as ImageIcon, LayoutGrid, Tag, User } from 'lucide-react'
import { NavbarShell } from '@/components/shared/navbar-shell'
import { Footer } from '@/components/shared/footer'
import { TaskListClient } from '@/components/tasks/task-list-client'
import { SchemaJsonLd } from '@/components/seo/schema-jsonld'
import { fetchTaskPosts } from '@/lib/task-data'
import { SITE_CONFIG, getTaskConfig, type TaskKey } from '@/lib/site-config'
import { CATEGORY_OPTIONS, normalizeCategory } from '@/lib/categories'
import { taskIntroCopy } from '@/config/site.content'
import { getFactoryState } from '@/design/factory/get-factory-state'
import { TASK_LIST_PAGE_OVERRIDE_ENABLED, TaskListPageOverride } from '@/overrides/task-list-page'

const taskIcons: Record<TaskKey, any> = {
  listing: Building2,
  article: FileText,
  image: ImageIcon,
  profile: User,
  classified: Tag,
  sbm: LayoutGrid,
  social: LayoutGrid,
  pdf: FileText,
  org: Building2,
  comment: FileText,
}

const variantShells = {
  'listing-directory':
    'bg-[radial-gradient(ellipse_80%_55%_at_0%_-10%,rgba(56,189,248,0.1),transparent_40%),linear-gradient(180deg,#f3f8ff_0%,#ffffff_55%,#eef4fb_100%)]',
  'listing-showcase': 'bg-[linear-gradient(180deg,#ffffff_0%,#e8f2ff_100%)]',
  'article-editorial':
    'bg-[radial-gradient(circle_at_18%_-8%,rgba(155,15,6,0.08),transparent_32%),linear-gradient(180deg,#fffdf8_0%,#f6ecdf_100%)]',
  'article-journal':
    'bg-[radial-gradient(ellipse_70%_45%_at_100%_0%,rgba(213,62,15,0.07),transparent_42%),linear-gradient(165deg,#fffdfb_0%,#f3e6d8_52%,#faf6f0_100%)]',
  'image-masonry': 'bg-[linear-gradient(180deg,#050a12_0%,#121e32_100%)] text-white',
  'image-portfolio': 'bg-[linear-gradient(145deg,#040814_0%,#0f1a2e_55%,#1a2740_100%)] text-white',
  'profile-creator': 'bg-[linear-gradient(180deg,#060d18_0%,#142236_100%)] text-white',
  'profile-business':
    'bg-[radial-gradient(circle_at_80%_0%,rgba(94,0,6,0.06),transparent_35%),linear-gradient(180deg,#f7fbff_0%,#ffffff_100%)]',
  'classified-bulletin': 'bg-[linear-gradient(180deg,#e8f0e0_0%,#fbfff6_100%)]',
  'classified-market': 'bg-[linear-gradient(135deg,#f1f4ea_0%,#ffffff_50%,#eef6e4_100%)]',
  'sbm-curation': 'bg-[linear-gradient(180deg,#f8f5ff_0%,#ffffff_100%)]',
  'sbm-library': 'bg-[linear-gradient(190deg,#f3f5fa_0%,#ffffff_48%,#ebe7e2_100%)]',
} as const

export async function TaskListPage({ task, category }: { task: TaskKey; category?: string }) {
  if (TASK_LIST_PAGE_OVERRIDE_ENABLED) {
    return await TaskListPageOverride({ task, category })
  }

  const taskConfig = getTaskConfig(task)
  const posts = await fetchTaskPosts(task, 30)
  const normalizedCategory = category ? normalizeCategory(category) : 'all'
  const intro = taskIntroCopy[task]
  const baseUrl = SITE_CONFIG.baseUrl.replace(/\/$/, '')
  const schemaItems = posts.slice(0, 10).map((post, index) => ({
    '@type': 'ListItem',
    position: index + 1,
    url: `${baseUrl}${taskConfig?.route || '/posts'}/${post.slug}`,
    name: post.title,
  }))
  const { recipe } = getFactoryState()
  const layoutKey = recipe.taskLayouts[task as keyof typeof recipe.taskLayouts] || `${task}-${task === 'listing' ? 'directory' : 'editorial'}`
  const shellClass = variantShells[layoutKey as keyof typeof variantShells] || 'bg-background'
  const Icon = taskIcons[task] || LayoutGrid

  const isDark = ['image-masonry', 'image-portfolio', 'profile-creator'].includes(layoutKey)
  const isArticleLayout = layoutKey.startsWith('article')
  const isSbmLayout = layoutKey.startsWith('sbm')
  const ui = isDark
    ? {
        muted: 'text-slate-300',
        panel: 'border border-white/10 bg-white/6',
        soft: 'border border-white/10 bg-white/5',
        input: 'border-white/10 bg-white/6 text-white',
        button: 'bg-white text-slate-950 hover:bg-slate-200',
      }
    : isArticleLayout
      ? {
          muted: 'text-[color-mix(in_srgb,var(--ft-ink)_62%,#fff)]',
          panel: 'border border-[color-mix(in_srgb,var(--ft-burgundy-deep)_14%,transparent)] bg-[color-mix(in_srgb,#fff_92%,var(--ft-cream))]',
          soft: 'border border-[color-mix(in_srgb,var(--ft-burgundy-deep)_12%,transparent)] bg-[color-mix(in_srgb,var(--ft-cream)_28%,#fff)]',
          input: 'border border-[color-mix(in_srgb,var(--ft-burgundy-deep)_16%,transparent)] bg-white text-[var(--ft-ink)]',
          button: 'bg-[var(--ft-burgundy)] text-[var(--ft-cream)] hover:bg-[var(--ft-ember)]',
        }
      : isSbmLayout
        ? {
            muted: 'text-slate-600',
            panel: 'border border-slate-200/90 bg-white/95 shadow-[0_18px_48px_rgba(15,23,42,0.06)]',
            soft: 'border border-indigo-100 bg-indigo-50/60',
            input: 'border border-slate-200 bg-white text-slate-900',
            button: 'bg-slate-900 text-white hover:bg-slate-800',
          }
        : {
            muted: 'text-slate-600',
            panel: 'border border-slate-200 bg-white',
            soft: 'border border-slate-200 bg-slate-50',
            input: 'border border-slate-200 bg-white text-slate-950',
            button: 'bg-slate-950 text-white hover:bg-slate-800',
          }

  return (
    <div
      className={`min-h-screen ${shellClass} ${layoutKey === 'sbm-library' ? 'border-b border-[color-mix(in_srgb,var(--ft-burgundy-deep)_08%,transparent)]' : ''}`}
      data-ft-task-list={task}
    >
      <NavbarShell />
      <main className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        {task === 'listing' ? (
          <SchemaJsonLd
            data={[
              {
                '@context': 'https://schema.org',
                '@type': 'ItemList',
                name: 'Business Directory Listings',
                itemListElement: schemaItems,
              },
              {
                '@context': 'https://schema.org',
                '@type': 'LocalBusiness',
                name: SITE_CONFIG.name,
                url: `${baseUrl}/listings`,
                areaServed: 'Worldwide',
              },
            ]}
          />
        ) : null}
        {task === 'article' || task === 'classified' ? (
          <SchemaJsonLd
            data={{
              '@context': 'https://schema.org',
              '@type': 'CollectionPage',
              name: `${taskConfig?.label || task} | ${SITE_CONFIG.name}`,
              url: `${baseUrl}${taskConfig?.route || ''}`,
              hasPart: schemaItems,
            }}
          />
        ) : null}

        {layoutKey === 'listing-directory' || layoutKey === 'listing-showcase' ? (
          <section className="mb-12 grid gap-6 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
            <div className={`rounded-[2rem] p-7 shadow-[0_24px_70px_rgba(15,23,42,0.07)] ${ui.panel}`}>
              <div className="flex items-center gap-3 text-xs font-semibold uppercase tracking-[0.24em] opacity-70"><Icon className="h-4 w-4" /> {taskConfig?.label || task}</div>
              <h1 className="mt-4 text-4xl font-semibold tracking-[-0.04em] text-foreground">{taskConfig?.description || 'Latest posts'}</h1>
              <p className={`mt-4 max-w-2xl text-sm leading-7 ${ui.muted}`}>Built with a cleaner scan rhythm, stronger metadata grouping, and a structure designed for business discovery rather than editorial reading.</p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link href={taskConfig?.route || '#'} className={`inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold ${ui.button}`}>Explore results <ArrowRight className="h-4 w-4" /></Link>
                <Link href="/search" className={`inline-flex items-center gap-2 rounded-full px-5 py-3 text-sm font-semibold ${ui.soft}`}>Open search</Link>
              </div>
            </div>
            <form className={`grid gap-3 rounded-[2rem] p-6 shadow-[0_18px_50px_rgba(15,23,42,0.06)] ${ui.soft}`} action={taskConfig?.route || '#'}>
              <div>
                <label className={`text-xs uppercase tracking-[0.2em] ${ui.muted}`}>Category</label>
                <select name="category" defaultValue={normalizedCategory} className={`mt-2 h-11 w-full rounded-xl px-3 text-sm ${ui.input}`}>
                  <option value="all">All categories</option>
                  {CATEGORY_OPTIONS.map((item) => (
                    <option key={item.slug} value={item.slug}>{item.name}</option>
                  ))}
                </select>
              </div>
              <button type="submit" className={`h-11 rounded-xl text-sm font-medium ${ui.button}`}>Apply filters</button>
            </form>
          </section>
        ) : null}

        {layoutKey === 'article-editorial' || layoutKey === 'article-journal' ? (
          <section className="mb-14 grid gap-10 lg:grid-cols-[1.2fr_0.8fr] lg:items-end">
            <div className="lg:pb-2">
              <p className={`text-[11px] font-semibold uppercase tracking-[0.32em] ${ui.muted}`}>{taskConfig?.label || task}</p>
              <h1 className="mt-4 max-w-4xl font-[family-name:var(--font-display)] text-4xl font-semibold tracking-[-0.04em] text-foreground sm:text-5xl lg:text-[3.1rem] lg:leading-[1.05]">
                {taskConfig?.description || 'Latest posts'}
              </h1>
            </div>
            <div className={`rounded-sm p-6 sm:p-7 ${ui.panel}`}>
              <p className={`text-[11px] font-semibold uppercase tracking-[0.26em] ${ui.muted}`}>Desk filter</p>
              <p className={`mt-3 text-sm leading-7 ${ui.muted}`}>Jump by topic without losing the editorial frame.</p>
              <form className="mt-5 flex flex-col gap-3 sm:flex-row sm:items-center" action={taskConfig?.route || '#'}>
                <select name="category" defaultValue={normalizedCategory} className={`h-11 flex-1 rounded-sm px-3 text-sm ${ui.input}`}>
                  <option value="all">All categories</option>
                  {CATEGORY_OPTIONS.map((item) => (
                    <option key={item.slug} value={item.slug}>{item.name}</option>
                  ))}
                </select>
                <button type="submit" className={`h-11 rounded-sm px-5 text-sm font-semibold ${ui.button}`}>Apply</button>
              </form>
            </div>
          </section>
        ) : null}

        {layoutKey === 'image-masonry' || layoutKey === 'image-portfolio' ? (
          <section className="mb-12 grid gap-6 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
            <div>
              <div className={`inline-flex items-center gap-2 rounded-full px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.22em] ${ui.soft}`}>
                <Icon className="h-3.5 w-3.5" /> Visual feed
              </div>
              <h1 className="mt-5 text-5xl font-semibold tracking-[-0.05em]">{taskConfig?.description || 'Latest posts'}</h1>
              <p className={`mt-5 max-w-2xl text-sm leading-8 ${ui.muted}`}>This surface leans into stronger imagery, larger modules, and more expressive spacing so visual content feels materially different from reading and directory pages.</p>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className={`min-h-[220px] rounded-[2rem] ${ui.panel}`} />
              <div className={`min-h-[220px] rounded-[2rem] ${ui.soft}`} />
              <div className={`col-span-2 min-h-[120px] rounded-[2rem] ${ui.panel}`} />
            </div>
          </section>
        ) : null}

        {layoutKey === 'profile-creator' || layoutKey === 'profile-business' ? (
          <section className={`mb-12 rounded-[2.2rem] p-8 shadow-[0_24px_70px_rgba(15,23,42,0.1)] ${ui.panel}`}>
            <div className="grid gap-6 lg:grid-cols-[0.8fr_1.2fr] lg:items-center">
              <div className={`min-h-[240px] rounded-[2rem] ${ui.soft}`} />
              <div>
                <p className={`text-xs uppercase tracking-[0.3em] ${ui.muted}`}>{taskConfig?.label || task}</p>
                <h1 className="mt-3 text-4xl font-semibold tracking-[-0.05em] text-foreground">Profiles with stronger identity, trust, and reputation cues.</h1>
                <p className={`mt-5 max-w-2xl text-sm leading-8 ${ui.muted}`}>This layout prioritizes the person or business surface first, then lets the feed continue below without borrowing the same visual logic used by articles or listings.</p>
              </div>
            </div>
          </section>
        ) : null}

        {layoutKey === 'classified-bulletin' || layoutKey === 'classified-market' ? (
          <section className="mb-12 grid gap-4 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <div className={`rounded-[1.8rem] p-6 ${ui.panel}`}>
              <p className={`text-xs uppercase tracking-[0.3em] ${ui.muted}`}>{taskConfig?.label || task}</p>
              <h1 className="mt-3 text-4xl font-semibold tracking-[-0.05em] text-foreground">Fast-moving notices, offers, and responses in a compact board format.</h1>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-3">
              {['Quick to scan', 'Shorter response path', 'Clearer urgency cues'].map((item) => (
                <div key={item} className={`rounded-[1.5rem] p-5 ${ui.soft}`}>
                  <p className="text-sm font-semibold">{item}</p>
                </div>
              ))}
            </div>
          </section>
        ) : null}

        {layoutKey === 'sbm-curation' || layoutKey === 'sbm-library' ? (
          <section className="mb-14 border-b border-slate-200/80 pb-10">
            <div className="flex flex-col gap-8 lg:flex-row lg:items-start lg:justify-between">
              <div className="max-w-3xl">
                <p className="font-mono text-[11px] font-medium uppercase tracking-[0.28em] text-slate-500">{taskConfig?.label || task}</p>
                <h1 className="mt-3 text-3xl font-semibold tracking-[-0.03em] text-slate-950 sm:text-4xl">Reference shelf—not a social feed.</h1>
                <p className={`mt-4 max-w-2xl text-sm leading-7 text-slate-600`}>
                  Dense, text-forward rows with lighter chrome so links read like a working library instead of magazine spreads.
                </p>
              </div>
              <div className={`w-full max-w-md rounded-sm p-5 ${ui.panel}`}>
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-slate-500">Shelf filter</p>
                <form className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center" action={taskConfig?.route || '#'}>
                  <select name="category" defaultValue={normalizedCategory} className={`h-11 flex-1 rounded-sm px-3 text-sm ${ui.input}`}>
                    <option value="all">All categories</option>
                    {CATEGORY_OPTIONS.map((item) => (
                      <option key={item.slug} value={item.slug}>{item.name}</option>
                    ))}
                  </select>
                  <button type="submit" className={`h-11 rounded-sm px-4 text-sm font-semibold ${ui.button}`}>Apply</button>
                </form>
              </div>
            </div>
          </section>
        ) : null}

        {intro ? (
          <section className={`mb-12 rounded-[2rem] p-6 shadow-[0_18px_50px_rgba(15,23,42,0.06)] sm:p-8 ${ui.panel}`}>
            <h2 className="text-2xl font-semibold text-foreground">{intro.title}</h2>
            {intro.paragraphs.map((paragraph) => (
              <p key={paragraph.slice(0, 40)} className={`mt-4 text-sm leading-7 ${ui.muted}`}>{paragraph}</p>
            ))}
            {intro.links.length > 0 ? (
              <div className="mt-4 flex flex-wrap gap-4 text-sm">
                {intro.links.map((link) => (
                  <a key={link.href} href={link.href} className="font-semibold text-foreground hover:underline">
                    {link.label}
                  </a>
                ))}
              </div>
            ) : null}
          </section>
        ) : null}

        <TaskListClient task={task} initialPosts={posts} category={normalizedCategory} />
      </main>
      <Footer />
    </div>
  )
}
