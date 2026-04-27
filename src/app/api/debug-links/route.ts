import { NextResponse } from 'next/server'
import { client } from '@/sanity/lib/client'
import { ARTICLE_BY_SLUG_QUERY } from '@/sanity/lib/queries'

export const dynamic = 'force-dynamic'

export async function GET() {
  const data = await client.fetch(ARTICLE_BY_SLUG_QUERY, {
    niche: 'peptides-compounding',
    slug: 'peptide-ads-rejected-meta',
  })
  return NextResponse.json({
    hasLinks: !!(data?.links),
    linksCount: data?.links?.length ?? 0,
    links: data?.links ?? [],
  })
}
