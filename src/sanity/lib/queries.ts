import { defineQuery } from 'next-sanity'

// ── All articles (paginated) ─────────────────────────────────────────
export const ALL_ARTICLES_QUERY = defineQuery(`
  *[_type == "article"] | order(publishedAt desc) [$start...$end] {
    _id,
    title,
    slug,
    "nicheSlug": niche->slug.current,
    "nicheName": niche->name,
    "platformName": platform->name,
    problem,
    metaDescription,
    publishedAt,
    seoKeywords
  }
`)

// ── Single article by niche slug + article slug ──────────────────────
export const ARTICLE_BY_SLUG_QUERY = defineQuery(`
  *[_type == "article" && slug.current == $slug && niche->slug.current == $niche][0] {
    _id,
    title,
    slug,
    niche->{
      _id,
      name,
      slug,
      description,
      icon
    },
    platform->{
      _id,
      name,
      slug,
      description
    },
    problem,
    metaDescription,
    body,
    publishedAt,
    seoKeywords
  }
`)

// ── Articles by niche ────────────────────────────────────────────────
export const ARTICLES_BY_NICHE_QUERY = defineQuery(`
  *[_type == "article" && niche->slug.current == $niche] | order(publishedAt desc) {
    _id,
    title,
    slug,
    "nicheSlug": niche->slug.current,
    "nicheName": niche->name,
    "platformName": platform->name,
    problem,
    metaDescription,
    publishedAt,
    seoKeywords
  }
`)

// ── Niche by slug ────────────────────────────────────────────────────
export const NICHE_BY_SLUG_QUERY = defineQuery(`
  *[_type == "niche" && slug.current == $niche][0] {
    _id,
    name,
    slug,
    description,
    icon
  }
`)

// ── All niches ───────────────────────────────────────────────────────
export const ALL_NICHES_QUERY = defineQuery(`
  *[_type == "niche"] | order(name asc) {
    _id,
    name,
    slug,
    description,
    icon,
    "articleCount": count(*[_type == "article" && references(^._id)])
  }
`)

// ── All platforms ────────────────────────────────────────────────────
export const ALL_PLATFORMS_QUERY = defineQuery(`
  *[_type == "platform"] | order(name asc) {
    _id,
    name,
    slug,
    description
  }
`)

// ── All slugs for static generation ──────────────────────────────────
export const ALL_ARTICLE_SLUGS_QUERY = defineQuery(`
  *[_type == "article"] {
    "slug": slug.current,
    "niche": niche->slug.current
  }
`)

// ── All niche slugs for static generation ────────────────────────────
export const ALL_NICHE_SLUGS_QUERY = defineQuery(`
  *[_type == "niche"] {
    "slug": slug.current
  }
`)

// ── Sitemap: all articles with dates ─────────────────────────────────
export const SITEMAP_ARTICLES_QUERY = defineQuery(`
  *[_type == "article"] {
    "slug": slug.current,
    "niche": niche->slug.current,
    publishedAt,
    _updatedAt
  }
`)
