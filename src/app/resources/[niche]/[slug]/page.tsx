import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'
import { PortableText } from 'next-sanity'
import type { PortableTextBlock } from 'next-sanity'
import { client } from '@/sanity/lib/client'
import { ARTICLE_BY_SLUG_QUERY, ALL_ARTICLE_SLUGS_QUERY } from '@/sanity/lib/queries'
import { urlFor } from '@/sanity/lib/image'

export const revalidate = 60

interface Props {
  params: Promise<{ niche: string; slug: string }>
}

interface Article {
  _id: string
  title: string
  slug: { current: string }
  niche: {
    _id: string
    name: string
    slug: { current: string }
    description: string | null
    icon: string | null
  }
  platform: {
    _id: string
    name: string
    slug: { current: string }
    description: string | null
  }
  problem: string
  metaDescription: string
  body: PortableTextBlock[]
  publishedAt: string
  seoKeywords: string[] | null
  links: Array<{
    _id: string
    title: string
    slug: { current: string }
    niche: { slug: { current: string } }
  }> | null
}

export async function generateStaticParams() {
  const slugs = await client.fetch<{ slug: string; niche: string }[]>(ALL_ARTICLE_SLUGS_QUERY)
  return slugs
    .filter((s) => s.niche && s.slug)
    .map((s) => ({ niche: String(s.niche), slug: String(s.slug) }))
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { niche, slug } = await params
  const article = await client.fetch<Article | null>(ARTICLE_BY_SLUG_QUERY, { niche, slug })
  if (!article) return {}

  return {
    title: `${article.title} — Auxon Growth`,
    description: article.metaDescription,
    keywords: article.seoKeywords ?? undefined,
    openGraph: {
      title: article.title,
      description: article.metaDescription,
      type: 'article',
      publishedTime: article.publishedAt,
    },
  }
}

/* ── Portable Text custom components ── */
const ptComponents = {
  types: {
    image: ({ value }: { value: { asset: { _ref: string }; alt?: string } }) => {
      if (!value?.asset?._ref) return null
      return (
        <figure className="my-8">
          <img
            src={urlFor(value).width(960).auto('format').url()}
            alt={value.alt ?? ''}
            className="w-full rounded-lg"
            loading="lazy"
          />
          {value.alt && (
            <figcaption className="mt-2 text-center text-sm text-white/40">{value.alt}</figcaption>
          )}
        </figure>
      )
    },
  },
  marks: {
    link: ({ children, value }: { children: React.ReactNode; value: { href: string } }) => (
      <a
        href={value.href}
        target={value.href.startsWith('http') ? '_blank' : undefined}
        rel={value.href.startsWith('http') ? 'noopener noreferrer' : undefined}
        className="text-[#00FFB3] underline underline-offset-2 hover:text-[#00FFB3]/80"
      >
        {children}
      </a>
    ),
  },
  block: {
    h2: ({ children }: { children?: React.ReactNode }) => (
      <h2 className="mb-4 mt-10 text-2xl font-bold text-white">{children}</h2>
    ),
    h3: ({ children }: { children?: React.ReactNode }) => (
      <h3 className="mb-3 mt-8 text-xl font-semibold text-white">{children}</h3>
    ),
    h4: ({ children }: { children?: React.ReactNode }) => (
      <h4 className="mb-2 mt-6 text-lg font-semibold text-white/90">{children}</h4>
    ),
    normal: ({ children }: { children?: React.ReactNode }) => (
      <p className="mb-4 leading-relaxed text-white/70">{children}</p>
    ),
    blockquote: ({ children }: { children?: React.ReactNode }) => (
      <blockquote className="my-6 border-l-2 border-[#00FFB3] pl-4 italic text-white/60">
        {children}
      </blockquote>
    ),
  },
}

export default async function ArticlePage({ params }: Props) {
  const { niche, slug } = await params
  const article = await client.fetch<Article | null>(ARTICLE_BY_SLUG_QUERY, { niche, slug })

  if (!article) notFound()

  const formattedDate = article.publishedAt
    ? new Date(article.publishedAt).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
      })
    : null

  return (
    <main className="min-h-screen bg-[#050A0A] text-white">
      {/* Breadcrumb */}
      <nav className="mx-auto max-w-3xl px-6 pt-8 text-sm text-white/40">
        <Link href="/" className="hover:text-[#00FFB3]">
          Auxon Growth
        </Link>
        <span className="mx-2">/</span>
        <Link href="/resources" className="hover:text-[#00FFB3]">
          Resources
        </Link>
        <span className="mx-2">/</span>
        <Link href={`/resources/${article.niche.slug.current}`} className="hover:text-[#00FFB3]">
          {article.niche.name}
        </Link>
        <span className="mx-2">/</span>
        <span className="text-white/60">{article.title}</span>
      </nav>

      {/* Article header */}
      <header className="mx-auto max-w-3xl px-6 pb-8 pt-12">
        <div className="mb-4 flex flex-wrap items-center gap-3 text-xs">
          <span className="rounded bg-[#00FFB3]/10 px-2 py-1 text-[#00FFB3]">
            {article.platform.name}
          </span>
          <span className="rounded bg-white/10 px-2 py-1 text-white/60">
            {article.niche.name}
          </span>
          <span className="rounded bg-white/10 px-2 py-1 text-white/60">{article.problem}</span>
        </div>
        <h1 className="text-3xl font-bold leading-tight md:text-4xl lg:text-5xl">
          {article.title}
        </h1>
        <p className="mt-4 text-lg text-white/50">{article.metaDescription}</p>
        {formattedDate && <p className="mt-4 text-sm text-white/30">{formattedDate}</p>}
      </header>

      <hr className="mx-auto max-w-3xl border-white/10" />

      {/* Body */}
      <article className="prose-invert mx-auto max-w-3xl px-6 py-12">
        {article.body ? (
          <PortableText value={article.body} components={ptComponents as any} />
        ) : (
          <p className="text-white/40">This article has no content yet.</p>
        )}
      </article>

      {/* Related articles */}
      {article.links && article.links.length > 0 && (
        <section className="mx-auto max-w-3xl border-t border-white/10 px-6 py-10">
          <p className="mb-6 text-xs font-semibold uppercase tracking-widest text-white/30">
            Related Resources
          </p>
          <div className="grid gap-4 sm:grid-cols-2">
            {article.links.map((link) => (
              <Link
                key={link._id}
                href={`/resources/${link.niche.slug.current}/${link.slug.current}`}
                className="group rounded-lg border border-white/10 bg-white/5 p-4 transition-colors hover:border-[#00FFB3]/40 hover:bg-[#00FFB3]/5"
              >
                <p className="mb-1 text-xs text-[#00FFB3]">
                  {link.niche.slug.current.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase())}
                </p>
                <p className="font-medium text-white/80 group-hover:text-white">{link.title}</p>
              </Link>
            ))}
          </div>
        </section>
      )}

      {/* Keywords footer */}
      {article.seoKeywords && article.seoKeywords.length > 0 && (
        <footer className="mx-auto max-w-3xl border-t border-white/10 px-6 py-8">
          <p className="mb-2 text-xs font-semibold uppercase tracking-widest text-white/30">
            Topics
          </p>
          <div className="flex flex-wrap gap-2">
            {article.seoKeywords.map((kw) => (
              <span
                key={kw}
                className="rounded-full border border-white/10 px-3 py-1 text-xs text-white/50"
              >
                {kw}
              </span>
            ))}
          </div>
        </footer>
      )}
    </main>
  )
}
