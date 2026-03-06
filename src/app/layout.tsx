import type { Metadata } from 'next'
import { Inter, Playfair_Display } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' })
const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  weight: ['700', '800', '900'],
})

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://carpentrypro.com.au'

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: {
    default: 'Carpentry Estimation Spreadsheet Australia 2026 — Quote Accurately | CarpentryPro',
    template: '%s | CarpentryPro',
  },
  description:
    'Professional carpentry estimation spreadsheet and pricing guide for Australian tradies. 2026 labour rates for NSW, QLD, VIC & WA. Quote accurately in 15 minutes. One-time download from $9.99.',
  keywords: [
    'carpentry estimation spreadsheet australia',
    'carpentry pricing guide australia 2026',
    'carpenter quote template australia',
    'carpentry cost per m2 australia',
    'carpenter hourly rate australia 2026',
    'how to price carpentry work australia',
    'carpentry labour rates australia',
    'tradie quoting software australia',
    'carpentry quote template excel',
    'carpentry estimation software australia',
    'carpenter rates nsw qld vic wa',
    'how to estimate carpentry jobs',
    'tradie quote template australia',
    'carpentry business tools australia',
  ],
  authors: [{ name: 'CarpentryPro', url: BASE_URL }],
  creator: 'CarpentryPro',
  publisher: 'CarpentryPro',
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, 'max-image-preview': 'large' },
  },
  openGraph: {
    type: 'website',
    locale: 'en_AU',
    url: BASE_URL,
    siteName: 'CarpentryPro',
    title: 'Carpentry Estimation Spreadsheet & Pricing Guide Australia 2026',
    description:
      "Stop under-quoting. Australia's #1 carpentry estimation tool — accurate quotes in 15 minutes, built for QLD, NSW, VIC & WA tradies.",
    images: [{ url: '/og-image.jpg', width: 1200, height: 630, alt: 'CarpentryPro Estimation Tool 2026' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Carpentry Estimation Spreadsheet & Pricing Guide Australia 2026',
    description: "Australia's professional carpentry quoting system. One-time download from $9.99.",
  },
  alternates: { canonical: BASE_URL },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-AU" className={`${inter.variable} ${playfair.variable}`}>
      <body style={{ fontFamily: 'var(--font-inter), sans-serif' }}>{children}</body>
    </html>
  )
}
