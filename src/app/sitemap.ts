import type { MetadataRoute } from 'next'
import { client } from '@/sanity/lib/client'
import { SITEMAP_ARTICLES_QUERY, ALL_NICHE_SLUGS_QUERY } from '@/sanity/lib/queries'

const BASE_URL = 'https://auxongrowth.com'

interface SitemapArticle {
  slug: string
  niche: string
  publishedAt: string | null
  _updatedAt: string
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticPages: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    { url: `${BASE_URL}/resources`, lastModified: new Date(), changeFrequency: 'daily', priority: 0.9 },
    { url: `${BASE_URL}/resources/peptides-compounding`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${BASE_URL}/resources/cbd-delta-hemp`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${BASE_URL}/resources/telehealth-medical`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${BASE_URL}/resources/nutraceuticals-weight-loss`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${BASE_URL}/resources/financial-crypto`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
    { url: `${BASE_URL}/resources/igaming-gambling`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.8 },
  ]

  // Try to fetch dynamic article pages from Sanity
  try {
    const [articles, nicheSlugs] = await Promise.all([
      client.fetch<SitemapArticle[]>(SITEMAP_ARTICLES_QUERY),
      client.fetch<{ slug: string }[]>(ALL_NICHE_SLUGS_QUERY),
    ])

    const nichePages: MetadataRoute.Sitemap = nicheSlugs
      .filter((n) => !['peptides-compounding', 'cbd-delta-hemp', 'telehealth-medical', 'nutraceuticals-weight-loss', 'financial-crypto', 'igaming-gambling'].includes(n.slug))
      .map((n) => ({
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
  } catch {
    // Fallback: return static pages only when Sanity is unavailable
    return staticPages
  }
}
