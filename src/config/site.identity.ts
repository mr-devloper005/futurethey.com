export const siteIdentity = {
  code: process.env.NEXT_PUBLIC_SITE_CODE || 'ft7m4q8x2v',
  name: process.env.NEXT_PUBLIC_SITE_NAME || 'Future They',
  tagline: process.env.NEXT_PUBLIC_SITE_TAGLINE || 'Forward-looking stories and commentary',
  description:
    process.env.NEXT_PUBLIC_SITE_DESCRIPTION ||
    'A clean editorial site for future-focused articles, stories, and perspective pieces.',
  domain: process.env.NEXT_PUBLIC_SITE_DOMAIN || 'futurethey.com',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'https://futurethey.com',
  ogImage: process.env.NEXT_PUBLIC_SITE_OG_IMAGE || '/og-default.png',
  googleMapsEmbedApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_EMBED_API_KEY || 'AIzaSyBco7dIECu3rJWjP3J0MImnR_uxlbeqAe0',

} as const

export const defaultAuthorProfile = {
  name: siteIdentity.name,
  avatar: '/placeholder.svg?height=80&width=80',
} as const

