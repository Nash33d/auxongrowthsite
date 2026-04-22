import type { MetadataRoute } from 'next'
import { client } from '@/sanity/lib/client'
import { SITEMAP_ARTICLES_QUERY, ALL_NICHE_SLUGS_QUERY } from '@/sanity/lib/queries'

const BASE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://auxongrowth.com'

interface SitemapArticle {
  slug: string
  niche: string
  publishedAt: string | null
  _updatedAt: string
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [articles, nicheSlugs] = await Promise.all([
    client.fetch<SitemapArticle[]>(SITEMAP_ARTICLES_QUERY),
    client.fetch<{ slug: string }[]>(ALL_NICHE_SLUGS_QUERY),
  ])

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${BASE_URL}/resources`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
  ]

  const nichePages: MetadataRoute.Sitemap = nicheSlugs.map((n) => ({
    url: `${BASE_URL}/resources/${n.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  const articlePages: MetadataRoute.Sitemap = articles.map((a) => ({
    url: `${BASE_URL}/resources/${a.niche}/${a.slug}`,
    lastModified: new Date(a._updatedAt),
    changeFrequency: 'monthly' as const,
    priority: 0.7,
  }))

  return [...staticPages, ...nichePages, ...articlePages]
}
