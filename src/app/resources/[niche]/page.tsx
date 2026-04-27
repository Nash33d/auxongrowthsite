import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { client } from '@/sanity/lib/client'
import {
  ARTICLES_BY_NICHE_QUERY,
  NICHE_BY_SLUG_QUERY,
  ALL_NICHE_SLUGS_QUERY,
} from '@/sanity/lib/queries'

export const revalidate = 60

interface Props {
  params: Promise<{ niche: string }>
}

interface Niche {
  _id: string
  name: string
  slug: { current: string }
  description: string | null
  icon: string | null
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

export async function generateStaticParams() {
  const slugs = await client.fetch<{ slug: string }[]>(ALL_NICHE_SLUGS_QUERY)
  return slugs.map((s) => ({ niche: s.slug }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { niche: nicheSlug } = await params
  const niche = await client.fetch<Niche | null>(NICHE_BY_SLUG_QUERY, { niche: nicheSlug })
  if (!niche) return {}

  return {
    title: `${niche.name} Advertising Guides — Auxon Growth`,
    description:
      niche.description ??
      `Expert advertising strategies and guides for the ${niche.name} industry.`,
  }
}

export default async function NichePage({ params }: Props) {
  const { niche: nicheSlug } = await params
  const [niche, articles] = await Promise.all([
    client.fetch<Niche | null>(NICHE_BY_SLUG_QUERY, { niche: nicheSlug }),
    client.fetch<ArticleCard[]>(ARTICLES_BY_NICHE_QUERY, { niche: nicheSlug }),
  ])

  if (!niche) notFound()

  return (
    <main className="min-h-screen bg-[#050A0A] text-white">
      {/* Hero */}
      <section className="border-b border-white/10 px-6 py-20 text-center">
        <div className="flex items-center justify-center gap-4 text-sm">
          <Link
            href="/"
            className="text-white/40 hover:text-[#00FFB3] transition-colors"
          >
            Auxon Growth
          </Link>
          <span className="text-white/20">/</span>
          <Link
            href="/resources"
            className="text-[#00FFB3] hover:underline"
          >
            Resources
          </Link>
          <span className="text-white/20">/</span>
          <span className="text-white/60">{niche.name}</span>
        </div>
        <h1 className="mx-auto max-w-3xl text-4xl font-bold leading-tight md:text-5xl">
          {niche.name}
        </h1>
        {niche.description && (
          <p className="mx-auto mt-4 max-w-xl text-lg text-white/60">{niche.description}</p>
        )}
      </section>

      {/* Articles */}
      <section className="mx-auto max-w-6xl px-6 py-16">
        <h2 className="mb-8 text-xl font-bold text-white/80">
          {articles.length} article{articles.length !== 1 ? 's' : ''}
        </h2>
        {articles.length === 0 ? (
          <p className="text-white/50">No articles in this niche yet.</p>
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
