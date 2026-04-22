import type { Metadata } from 'next'
import Link from 'next/link'
import { client } from '@/sanity/lib/client'
import { ALL_NICHES_QUERY, ALL_ARTICLES_QUERY } from '@/sanity/lib/queries'

export const revalidate = 60 // Revalidate every 60s so new niches/articles appear quickly

export const metadata: Metadata = {
  title: 'Resources — Auxon Growth',
  description:
    'Explore our library of high-performance advertising guides across every industry and platform. Proven strategies for businesses in high-risk verticals.',
}

interface Niche {
  _id: string
  name: string
  slug: { current: string }
  description: string | null
  icon: string | null
  articleCount: number
}

interface ArticleCard {
  _id: string
  title: string
  slug: { current: string }
  nicheSlug: string
  nicheName: string
  platformName: string
  problem: string
  metaDescription: string
  publishedAt: string
}

export default async function ResourcesHub() {
  const [niches, articles] = await Promise.all([
    client.fetch<Niche[]>(ALL_NICHES_QUERY),
    client.fetch<ArticleCard[]>(ALL_ARTICLES_QUERY, { start: 0, end: 12 }),
  ])

  return (
    <main className="min-h-screen bg-[#050A0A] text-white">
      {/* Header */}
      <section className="border-b border-white/10 px-6 py-20 text-center">
        <p className="mb-3 text-sm font-semibold uppercase tracking-widest text-[#00FFB3]">
          Resources
        </p>
        <h1 className="mx-auto max-w-3xl text-4xl font-bold leading-tight md:text-5xl">
          High-Performance Advertising Playbooks
        </h1>
        <p className="mx-auto mt-4 max-w-xl text-lg text-white/60">
          500+ guides covering every niche, platform, and pain point — built for businesses that
          refuse to play it safe.
        </p>
      </section>

      {/* Niches grid */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <h2 className="mb-8 text-2xl font-bold">Browse by Industry</h2>
        {niches.length === 0 ? (
          <p className="text-white/50">No niches published yet. Add content in the Studio.</p>
        ) : (
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {niches.map((n) => (
              <Link
                key={n._id}
                href={`/resources/${n.slug.current}`}
                className="group rounded-xl border border-white/10 bg-white/[0.03] p-6 transition hover:border-[#00FFB3]/40 hover:bg-white/[0.06]"
              >
                <h3 className="text-lg font-semibold group-hover:text-[#00FFB3]">{n.name}</h3>
                {n.description && (
                  <p className="mt-1 text-sm text-white/50 line-clamp-2">{n.description}</p>
                )}
                <span className="mt-3 inline-block text-xs text-[#00FFB3]">
                  {n.articleCount} article{n.articleCount !== 1 ? 's' : ''}
                </span>
              </Link>
            ))}
          </div>
        )}
      </section>

      {/* Latest articles */}
      <section className="mx-auto max-w-6xl px-6 pb-20">
        <h2 className="mb-8 text-2xl font-bold">Latest Articles</h2>
        {articles.length === 0 ? (
          <p className="text-white/50">No articles published yet. Add content in the Studio.</p>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {articles.map((a) => (
              <Link
                key={a._id}
                href={`/resources/${a.nicheSlug}/${a.slug.current}`}
                className="group flex flex-col rounded-xl border border-white/10 bg-white/[0.03] p-6 transition hover:border-[#00FFB3]/40 hover:bg-white/[0.06]"
              >
                <div className="mb-3 flex items-center gap-2 text-xs text-white/40">
                  <span className="rounded bg-[#00FFB3]/10 px-2 py-0.5 text-[#00FFB3]">
                    {a.platformName}
                  </span>
                  <span>{a.nicheName}</span>
                </div>
                <h3 className="text-lg font-semibold leading-snug group-hover:text-[#00FFB3]">
                  {a.title}
                </h3>
                <p className="mt-2 flex-1 text-sm text-white/50 line-clamp-3">
                  {a.metaDescription}
                </p>
                <span className="mt-4 text-xs text-[#00FFB3]">Read guide →</span>
              </Link>
            ))}
          </div>
        )}
      </section>
    </main>
  )
}
