'use client'

import { useMemo, useState } from 'react'
import dynamic from 'next/dynamic'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Search, Menu, X, User, FileText, Building2, LayoutGrid, Tag, Image as ImageIcon, ChevronRight, Sparkles, MapPin, Plus, Bookmark } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useAuth } from '@/lib/auth-context'
import { SITE_CONFIG, type TaskKey } from '@/lib/site-config'
import { cn } from '@/lib/utils'
import { getFactoryState } from '@/design/factory/get-factory-state'
import { NAVBAR_OVERRIDE_ENABLED, NavbarOverride } from '@/overrides/navbar'

const NavbarAuthControls = dynamic(() => import('@/components/shared/navbar-auth-controls').then((mod) => mod.NavbarAuthControls), {
  ssr: false,
  loading: () => null,
})

const taskIcons: Record<TaskKey, any> = {
  article: FileText,
  listing: Building2,
  sbm: Bookmark,
  classified: Tag,
  image: ImageIcon,
  profile: User,
  social: LayoutGrid,
  pdf: FileText,
  org: Building2,
  comment: FileText,
}

const variantClasses = {
  'compact-bar': {
    shell: 'border-b border-slate-200/80 bg-white/88 text-slate-950 backdrop-blur-xl',
    logo: 'rounded-2xl border border-slate-200 bg-white shadow-sm',
    active: 'bg-slate-950 text-white',
    idle: 'text-slate-600 hover:bg-slate-100 hover:text-slate-950',
    cta: 'rounded-full bg-slate-950 text-white hover:bg-slate-800',
    mobile: 'border-t border-slate-200/70 bg-white/95',
  },
  'editorial-bar': {
    shell: 'border-b border-[color-mix(in_srgb,var(--ft-burgundy-deep)_22%,transparent)] bg-[color-mix(in_srgb,var(--ft-cream)_78%,#fff)]/95 text-[var(--ft-ink)] backdrop-blur-xl',
    logo: 'rounded-sm border border-[color-mix(in_srgb,var(--ft-burgundy-deep)_25%,transparent)] bg-[var(--ft-cream)]/90 shadow-[0_1px_0_rgba(94,0,6,0.06)]',
    active: 'bg-[var(--ft-burgundy-deep)] text-[var(--ft-cream)]',
    idle: 'text-[color-mix(in_srgb,var(--ft-ink)_72%,#fff)] hover:bg-[color-mix(in_srgb,var(--ft-cream)_55%,#fff)] hover:text-[var(--ft-ink)]',
    cta: 'rounded-sm bg-[var(--ft-burgundy)] text-[var(--ft-cream)] shadow-[0_10px_28px_rgba(94,0,6,0.22)] hover:bg-[var(--ft-ember)]',
    mobile: 'border-t border-[color-mix(in_srgb,var(--ft-burgundy-deep)_18%,transparent)] bg-[color-mix(in_srgb,var(--ft-cream)_88%,#fff)]',
  },
  'floating-bar': {
    shell: 'border-b border-transparent bg-transparent text-white',
    logo: 'rounded-[1.35rem] border border-white/12 bg-white/8 shadow-[0_16px_48px_rgba(15,23,42,0.22)] backdrop-blur',
    active: 'bg-[#8df0c8] text-[#07111f]',
    idle: 'text-slate-200 hover:bg-white/10 hover:text-white',
    cta: 'rounded-full bg-[#8df0c8] text-[#07111f] hover:bg-[#77dfb8]',
    mobile: 'border-t border-white/10 bg-[#09101d]/96',
  },
  'utility-bar': {
    shell: 'border-b border-[#d7deca] bg-[#f4f6ef]/94 text-[#1f2617] backdrop-blur-xl',
    logo: 'rounded-xl border border-[#d7deca] bg-white shadow-sm',
    active: 'bg-[#1f2617] text-[#edf5dc]',
    idle: 'text-[#56604b] hover:bg-[#e7edd9] hover:text-[#1f2617]',
    cta: 'rounded-lg bg-[#1f2617] text-[#edf5dc] hover:bg-[#2f3a24]',
    mobile: 'border-t border-[#d7deca] bg-[#f4f6ef]',
  },
} as const

const directoryPalette = {
  'directory-clean': {
    shell: 'border-b border-slate-200 bg-white/94 text-slate-950 shadow-[0_1px_0_rgba(15,23,42,0.04)] backdrop-blur-xl',
    logo: 'rounded-2xl border border-slate-200 bg-slate-50',
    nav: 'text-slate-600 hover:text-slate-950',
    search: 'border border-slate-200 bg-slate-50 text-slate-600',
    cta: 'bg-slate-950 text-white hover:bg-slate-800',
    post: 'border border-slate-200 bg-white text-slate-950 hover:bg-slate-50',
    mobile: 'border-t border-slate-200 bg-white',
  },
  'market-utility': {
    shell: 'border-b border-[#d7deca] bg-[#f4f6ef]/96 text-[#1f2617] shadow-[0_1px_0_rgba(64,76,34,0.06)] backdrop-blur-xl',
    logo: 'rounded-xl border border-[#d7deca] bg-white',
    nav: 'text-[#56604b] hover:text-[#1f2617]',
    search: 'border border-[#d7deca] bg-white text-[#56604b]',
    cta: 'bg-[#1f2617] text-[#edf5dc] hover:bg-[#2f3a24]',
    post: 'border border-[#d7deca] bg-white text-[#1f2617] hover:bg-[#eef2e4]',
    mobile: 'border-t border-[#d7deca] bg-[#f4f6ef]',
  },
} as const

export function Navbar() {
  if (NAVBAR_OVERRIDE_ENABLED) {
    return <NavbarOverride />
  }

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()
  const { isAuthenticated } = useAuth()
  const { recipe } = getFactoryState()

  const navigation = useMemo(() => {
    const base = SITE_CONFIG.tasks.filter((task) => task.enabled && task.key !== 'profile')
    if (recipe.navbar === 'editorial-bar') {
      const primaryOnly = base.filter((task) => task.key === recipe.primaryTask)
      return primaryOnly.length ? primaryOnly : base
    }
    if (recipe.secondaryTask) {
      const allowed = new Set<TaskKey>([recipe.primaryTask as TaskKey, recipe.secondaryTask as TaskKey])
      const narrowed = base.filter((task) => allowed.has(task.key))
      return narrowed.length ? narrowed : base
    }
    return base
  }, [recipe.primaryTask, recipe.secondaryTask, recipe.navbar])
  const primaryNavigation = navigation.slice(0, 5)
  const mobileNavigation = navigation.map((task) => ({
    name: task.label,
    href: task.route,
    icon: taskIcons[task.key] || LayoutGrid,
  }))
  const primaryTask = SITE_CONFIG.tasks.find((task) => task.key === recipe.primaryTask && task.enabled) || primaryNavigation[0]
  const isDirectoryProduct = recipe.homeLayout === 'listing-home' || recipe.homeLayout === 'classified-home'

  if (isDirectoryProduct) {
    const palette = directoryPalette[(recipe.brandPack === 'market-utility' ? 'market-utility' : 'directory-clean') as keyof typeof directoryPalette]

    return (
      <header className={cn('sticky top-0 z-50 w-full', palette.shell)}>
        <nav className="mx-auto flex h-20 max-w-7xl items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
          <div className="flex min-w-0 items-center gap-4">
            <Link href="/" className="flex shrink-0 items-center gap-3">
              <div className={cn('flex h-14 max-w-[260px] items-center justify-center overflow-hidden px-2 py-1.5', palette.logo)}>
                <img src="/favicon.png?v=20260418" alt={`${SITE_CONFIG.name} logo`} width="260" height="64" className="h-full w-auto max-h-12 object-contain object-left" />
              </div>
              <div className="min-w-0 hidden sm:block">
                <span className="block truncate text-xl font-semibold">{SITE_CONFIG.name}</span>
              </div>
            </Link>

            <div className="hidden items-center gap-5 xl:flex">
              {primaryNavigation.slice(0, 4).map((task) => {
                const isActive = pathname.startsWith(task.route)
                return (
                  <Link key={task.key} href={task.route} className={cn('text-sm font-semibold transition-colors', isActive ? 'text-foreground' : palette.nav)}>
                    {task.label}
                  </Link>
                )
              })}
            </div>
          </div>

          <div className="hidden min-w-0 flex-1 items-center justify-center lg:flex">
            <div className={cn('flex w-full max-w-xl items-center gap-3 rounded-full px-4 py-3', palette.search)}>
              <Search className="h-4 w-4" />
              <span className="text-sm">Find businesses, spaces, and local services</span>
              <div className="ml-auto hidden items-center gap-1 text-xs opacity-75 md:flex">
                <MapPin className="h-3.5 w-3.5" />
                Local discovery
              </div>
            </div>
          </div>

          <div className="flex shrink-0 items-center gap-2 sm:gap-3">
            {primaryTask ? (
              <Link href={primaryTask.route} className="hidden items-center gap-2 rounded-full border border-current/10 px-3 py-2 text-xs font-semibold uppercase tracking-[0.18em] opacity-75 md:inline-flex">
                <Sparkles className="h-3.5 w-3.5" />
                {primaryTask.label}
              </Link>
            ) : null}

            {isAuthenticated ? (
              <NavbarAuthControls />
            ) : (
              <div className="hidden items-center gap-2 md:flex">
                <Button variant="ghost" size="sm" asChild className="rounded-full px-4">
                  <Link href="/login">Sign In</Link>
                </Button>
                <Button size="sm" asChild className={cn('rounded-full', palette.cta)}>
                  <Link href="/register">
                    <Plus className="mr-1 h-4 w-4" />
                    Add Listing
                  </Link>
                </Button>
              </div>
            )}

            <Button variant="ghost" size="icon" className="rounded-full lg:hidden" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
              {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
          </div>
        </nav>

        {isMobileMenuOpen && (
          <div className={palette.mobile}>
            <div className="space-y-2 px-4 py-4">
              <div className={cn('mb-3 flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-medium', palette.search)}>
                <Search className="h-4 w-4" />
                Find businesses, spaces, and services
              </div>
              {mobileNavigation.map((item) => {
                const isActive = pathname.startsWith(item.href)
                return (
                  <Link key={item.name} href={item.href} onClick={() => setIsMobileMenuOpen(false)} className={cn('flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold transition-colors', isActive ? 'bg-foreground text-background' : palette.post)}>
                    <item.icon className="h-5 w-5" />
                    {item.name}
                  </Link>
                )
              })}
            </div>
          </div>
        )}
      </header>
    )
  }

  const style = variantClasses[recipe.navbar]
  const isFloating = recipe.navbar === 'floating-bar'
  const isEditorial = recipe.navbar === 'editorial-bar'
  const isUtility = recipe.navbar === 'utility-bar'

  return (
    <header className={cn('sticky top-0 z-50 w-full', style.shell)}>
      <nav
        className={cn(
          'mx-auto flex max-w-7xl items-center justify-between gap-3 px-4 sm:px-6 lg:px-8',
          isFloating ? 'h-24 pt-4' : isEditorial ? 'min-h-[5.25rem] py-2 sm:min-h-[5.75rem] sm:py-2.5' : 'h-20',
        )}
      >
        <div className="flex min-w-0 flex-1 items-center gap-4 lg:gap-7">
          <Link
            href="/"
            className={cn(
              'flex shrink-0 items-center whitespace-nowrap pr-2',
              isEditorial ? 'group min-w-0 gap-3 sm:gap-4 transition-[opacity,transform] duration-300 hover:opacity-[0.96] active:scale-[0.99]' : 'gap-3',
            )}
          >
            {isEditorial ? (
              <>
                <div className="relative shrink-0">
                  <div
                    className="rounded-lg bg-gradient-to-br from-[#5e0006] via-[#9b0f06] to-[#d53e0f] p-px shadow-[0_12px_40px_-8px_rgba(94,0,6,0.38),0_2px_8px_-2px_rgba(213,62,15,0.25)] ring-1 ring-[color-mix(in_srgb,#fff_35%,transparent)]"
                    aria-hidden
                  >
                    <div className="flex h-12 items-center rounded-[calc(0.5rem-1px)] bg-[linear-gradient(168deg,#fffefb_0%,#faf3ea_45%,#f3e8da_100%)] px-2.5 py-1.5 shadow-[inset_0_1px_0_rgba(255,255,255,0.92)] sm:h-14 sm:px-3 sm:py-2 lg:h-[3.75rem]">
                      <img
                        src="/favicon.png?v=20260418"
                        alt=""
                        width={280}
                        height={64}
                        className="h-9 w-auto max-w-[190px] object-contain object-left sm:h-11 sm:max-w-[240px] lg:h-[2.85rem] lg:max-w-[280px]"
                        aria-hidden
                      />
                    </div>
                  </div>
                </div>
                <div
                  className="hidden h-11 w-px shrink-0 bg-gradient-to-b from-transparent via-[color-mix(in_srgb,var(--ft-burgundy-deep)_28%,transparent)] to-transparent sm:h-12 lg:h-14 sm:block"
                  aria-hidden
                />
                <div className="min-w-0">
                  <span className="block truncate bg-gradient-to-r from-[#5e0006] via-[#9b0f06] to-[#7a0a08] bg-clip-text font-[family-name:var(--font-display)] text-[1.35rem] font-semibold leading-[1.1] tracking-[-0.03em] text-transparent sm:text-[1.55rem] lg:text-[1.7rem]">
                    {SITE_CONFIG.name}
                  </span>
                </div>
              </>
            ) : (
              <>
                <div className={cn('flex h-14 max-w-[280px] shrink-0 items-center justify-center overflow-hidden px-2 py-1.5', style.logo)}>
                  <img
                    src="/favicon.png?v=20260418"
                    alt={`${SITE_CONFIG.name}`}
                    width={280}
                    height={64}
                    className="h-full w-auto max-h-12 object-contain object-left"
                  />
                </div>
                <div className="min-w-0 hidden sm:block">
                  <span className="block truncate text-xl font-semibold">{SITE_CONFIG.name}</span>
                </div>
              </>
            )}
          </Link>

          {isEditorial ? (
            <div className="hidden min-w-0 flex-1 items-center justify-end gap-1 xl:flex">
              {primaryNavigation.map((task) => {
                const isActive = pathname.startsWith(task.route)
                return (
                  <Link
                    key={task.key}
                    href={task.route}
                    className={cn(
                      'rounded-sm px-3 py-2 text-[13px] font-semibold tracking-[0.04em] transition-colors duration-200',
                      isActive ? style.active : style.idle,
                    )}
                  >
                    {task.label}
                  </Link>
                )
              })}
            </div>
          ) : isFloating ? (
            <div className="hidden min-w-0 flex-1 items-center gap-2 xl:flex">
              {primaryNavigation.map((task) => {
                const Icon = taskIcons[task.key] || LayoutGrid
                const isActive = pathname.startsWith(task.route)
                return (
                  <Link key={task.key} href={task.route} className={cn('flex items-center gap-2 rounded-full px-4 py-2 text-sm font-semibold transition-colors', isActive ? style.active : style.idle)}>
                    <Icon className="h-4 w-4" />
                    <span>{task.label}</span>
                  </Link>
                )
              })}
            </div>
          ) : isUtility ? (
            <div className="hidden min-w-0 flex-1 items-center gap-2 xl:flex">
              {primaryNavigation.map((task) => {
                const isActive = pathname.startsWith(task.route)
                return (
                  <Link key={task.key} href={task.route} className={cn('rounded-lg px-3 py-2 text-sm font-semibold transition-colors', isActive ? style.active : style.idle)}>
                    {task.label}
                  </Link>
                )
              })}
            </div>
          ) : (
            <div className="hidden min-w-0 flex-1 items-center gap-1 overflow-hidden xl:flex">
              {primaryNavigation.map((task) => {
                const Icon = taskIcons[task.key] || LayoutGrid
                const isActive = pathname.startsWith(task.route)
                return (
                  <Link key={task.key} href={task.route} className={cn('flex items-center gap-2 rounded-full px-3 py-2 text-sm font-semibold transition-colors whitespace-nowrap', isActive ? style.active : style.idle)}>
                    <Icon className="h-4 w-4" />
                    <span>{task.label}</span>
                  </Link>
                )
              })}
            </div>
          )}
        </div>

        <div className="flex shrink-0 items-center gap-2 sm:gap-3">
          {primaryTask && (recipe.navbar === 'utility-bar' || recipe.navbar === 'floating-bar') ? (
            <Link href={primaryTask.route} className="hidden items-center gap-2 rounded-full border border-current/10 px-3 py-2 text-xs font-semibold uppercase tracking-[0.16em] opacity-80 md:inline-flex">
              <Sparkles className="h-3.5 w-3.5" />
              {primaryTask.label}
            </Link>
          ) : null}

          {!isEditorial ? (
            <Button variant="ghost" size="icon" asChild className="hidden rounded-full md:flex">
              <Link href="/search">
                <Search className="h-5 w-5" />
                <span className="sr-only">Search</span>
              </Link>
            </Button>
          ) : null}

          {isAuthenticated ? (
            <NavbarAuthControls />
          ) : (
            <div className="hidden items-center gap-2 md:flex">
              <Button variant="ghost" size="sm" asChild className="rounded-full px-4">
                <Link href="/login">Sign In</Link>
              </Button>
              <Button size="sm" asChild className={style.cta}>
                <Link href="/register">{isEditorial ? 'Start writing' : isUtility ? 'Post Now' : 'Get Started'}</Link>
              </Button>
            </div>
          )}

          <Button variant="ghost" size="icon" className="rounded-full lg:hidden" onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            {isMobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </nav>

      {isFloating && primaryTask ? (
        <div className="mx-auto hidden max-w-7xl px-4 pb-3 sm:px-6 lg:block lg:px-8">
          <Link href={primaryTask.route} className="inline-flex items-center gap-2 rounded-full border border-white/12 bg-white/8 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-slate-200 backdrop-blur hover:bg-white/12">
            Featured surface
            <span>{primaryTask.label}</span>
            <ChevronRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      ) : null}

      {isMobileMenuOpen && (
        <div className={style.mobile}>
          <div className="space-y-2 px-4 py-4">
            {!isEditorial ? (
              <Link href="/search?master=1" onClick={() => setIsMobileMenuOpen(false)} className="mb-3 flex items-center gap-3 rounded-sm border border-border bg-card px-4 py-3 text-sm font-semibold text-muted-foreground">
                <Search className="h-4 w-4" />
                Search every format
              </Link>
            ) : null}
            {mobileNavigation.map((item) => {
              const isActive = pathname.startsWith(item.href)
              return (
                <Link key={item.name} href={item.href} onClick={() => setIsMobileMenuOpen(false)} className={cn('flex items-center gap-3 rounded-2xl px-4 py-3 text-sm font-semibold transition-colors', isActive ? style.active : style.idle)}>
                  <item.icon className="h-5 w-5" />
                  {item.name}
                </Link>
              )
            })}
          </div>
        </div>
      )}
    </header>
  )
}
