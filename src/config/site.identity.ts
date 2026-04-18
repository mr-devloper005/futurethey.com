export const siteIdentity = {
  code: process.env.NEXT_PUBLIC_SITE_CODE || 'ft7m4q8x2v',
  name: process.env.NEXT_PUBLIC_SITE_NAME || 'Future They',
  tagline: process.env.NEXT_PUBLIC_SITE_TAGLINE || 'Essays on what comes next—in work, culture, and everyday life',
  description:
    process.env.NEXT_PUBLIC_SITE_DESCRIPTION ||
    'Future They publishes slow, careful reads: reporting, essays, and field notes for people who still finish articles. We cover how cities change, how teams work, and how ideas travel—without the noise of a generic feed.',
  domain: process.env.NEXT_PUBLIC_SITE_DOMAIN || 'futurethey.com',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://futurethey.com',
  ogImage: process.env.NEXT_PUBLIC_SITE_OG_IMAGE || '/og-default.png',
  googleMapsEmbedApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_EMBED_API_KEY || 'AIzaSyBco7dIECu3rJWjP3J0MImnR_uxlbeqAe0',

} as const

export const defaultAuthorProfile = {
  name: siteIdentity.name,
  avatar: '/placeholder.svg?height=80&width=80',
} as const

