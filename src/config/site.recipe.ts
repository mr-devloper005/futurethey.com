import type { SiteRecipe } from '@/design/factory/recipe-types'

export const SITE_RECIPE: SiteRecipe = {
  productFamily: 'editorial',
  themePack: 'medium-journal',
  homepageTemplate: 'article-home',
  navbarTemplate: 'editorial-bar',
  footerTemplate: 'editorial-footer',
  motionPack: 'editorial-soft',
  primaryTask: 'article',
  secondaryTask: 'sbm',
  enabledTasks: ['article', 'sbm'],
  taskTemplates: {
    article: 'article-journal',
    sbm: 'sbm-library',
  },
  manualOverrides: {
    navbar: false,
    footer: false,
    homePage: false,
    taskListPage: false,
    taskDetailPage: false,
    taskCard: false,
    contactPage: false,
    loginPage: false,
    registerPage: false,
  },
}


