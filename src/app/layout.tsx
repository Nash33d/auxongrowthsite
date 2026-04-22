import type { Metadata } from 'next'
import './globals.css'
import { Analytics } from '@vercel/analytics/next'

export const metadata: Metadata = {
  title: 'Auxon Growth - High-Risk Advertising Experts',
  description: 'We run ads nobody else will touch. Exosomes, CBD, Nutraceuticals, Telehealth, Financial offers, Gambling.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className="font-sans antialiased">
        {children}
        <footer className="border-t border-white/10 bg-[#050A0A] px-6 py-12 text-white/50">
          <div className="mx-auto max-w-6xl">
            <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
              <div>
                <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-[#00FFB3]">Resources</p>
                <ul className="space-y-2 text-sm">
                  <li><a href="/resources" className="hover:text-[#00FFB3] transition">All Guides</a></li>
                  <li><a href="/resources/peptides-compounding" className="hover:text-[#00FFB3] transition">Peptides & Compounding</a></li>
                  <li><a href="/resources/cbd-delta-hemp" className="hover:text-[#00FFB3] transition">CBD & Hemp</a></li>
                  <li><a href="/resources/telehealth-medical" className="hover:text-[#00FFB3] transition">Telehealth & Medical</a></li>
                  <li><a href="/resources/igaming-gambling" className="hover:text-[#00FFB3] transition">iGaming & Gambling</a></li>
                  <li><a href="/resources/nutraceuticals-weight-loss" className="hover:text-[#00FFB3] transition">Nutraceuticals</a></li>
                </ul>
              </div>
              <div>
                <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-[#00FFB3]">Services</p>
                <ul className="space-y-2 text-sm">
                  <li><a href="/#services" className="hover:text-[#00FFB3] transition">Meta Ads</a></li>
                  <li><a href="/#services" className="hover:text-[#00FFB3] transition">Google Ads</a></li>
                  <li><a href="/#services" className="hover:text-[#00FFB3] transition">TikTok Ads</a></li>
                  <li><a href="/#services" className="hover:text-[#00FFB3] transition">Taboola / Outbrain</a></li>
                </ul>
              </div>
              <div>
                <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-[#00FFB3]">Company</p>
                <ul className="space-y-2 text-sm">
                  <li><a href="/" className="hover:text-[#00FFB3] transition">Home</a></li>
                  <li><a href="/studio" className="hover:text-[#00FFB3] transition">CMS Studio</a></li>
                </ul>
              </div>
              <div>
                <p className="mb-4 text-sm font-semibold uppercase tracking-widest text-[#00FFB3]">Get Help</p>
                <ul className="space-y-2 text-sm">
                  <li><a href="https://calendly.com/custodio-2/30min" target="_blank" className="hover:text-[#00FFB3] transition">Book a Strategy Call</a></li>
                  <li><a href="mailto:custodio@auxongrowth.com" className="hover:text-[#00FFB3] transition">custodio@auxongrowth.com</a></li>
                </ul>
              </div>
            </div>
            <div className="mt-12 border-t border-white/10 pt-8 text-center text-xs text-white/30">
              &copy; {new Date().getFullYear()} Auxon Growth. All rights reserved.
            </div>
          </div>
        </footer>
        <Analytics />
      </body>
    </html>
  )
}
