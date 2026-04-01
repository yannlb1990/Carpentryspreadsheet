import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Terms of Service',
  description: 'CarpentryPro terms of service for digital product purchases.',
  robots: { index: false, follow: false },
}

export default function TermsPage() {
  return (
    <div style={s.page}>
      <div style={s.container}>
        <Link href="/" style={s.back}>← Back to CarpentryPro</Link>

        <h1 style={s.h1}>Terms of Service</h1>
        <p style={s.meta}>Last updated: 1 April 2026</p>

        <Section title="1. Agreement">
          <p>
            By purchasing from CarpentryPro (&ldquo;we&rdquo;, &ldquo;us&rdquo;, &ldquo;our&rdquo;) you agree to
            these Terms of Service. If you do not agree, do not complete your purchase.
          </p>
        </Section>

        <Section title="2. Products">
          <p>
            Our products are digital files (Microsoft Excel spreadsheets and PDF documents) delivered
            by instant download. Product descriptions are accurate to the best of our knowledge.
            We reserve the right to update product content and pricing without notice.
          </p>
        </Section>

        <Section title="3. Licence">
          <p>
            Upon purchase, you receive a non-exclusive, non-transferable, personal-use licence to use
            the downloaded files for your own business operations. You may not:
          </p>
          <ul style={s.list}>
            <li>Resell, redistribute, or sublicence the files</li>
            <li>Share the files publicly or with third parties outside your immediate business</li>
            <li>Remove or alter any copyright notices or branding</li>
            <li>Use the files to create competing products</li>
          </ul>
        </Section>

        <Section title="4. Payment">
          <p>
            Payments are processed securely by Stripe. We do not store your payment card details.
            Prices are displayed in Australian Dollars (AUD) and include GST where applicable.
          </p>
        </Section>

        <Section title="5. Delivery">
          <p>
            Files are delivered immediately after payment confirmation via a secure download page.
            If you experience any delivery issues, contact us at{' '}
            <a href="mailto:support@carpentrypro.com.au" style={s.link}>
              support@carpentrypro.com.au
            </a>{' '}
            and we will re-send your download link within 24 hours.
          </p>
        </Section>

        <Section title="6. Refunds">
          <p>
            Please review our{' '}
            <Link href="/refund" style={s.link}>Refund Policy</Link>. We offer a 30-day satisfaction
            guarantee on all products in accordance with Australian Consumer Law.
          </p>
        </Section>

        <Section title="7. Intellectual Property">
          <p>
            All content, files, and intellectual property remain the property of CarpentryPro.
            Purchase of a product does not transfer ownership of the underlying intellectual property.
          </p>
        </Section>

        <Section title="8. Limitation of Liability">
          <p>
            Our products are tools intended to assist with estimation and pricing. They do not
            constitute professional financial, legal, or licensing advice. We are not liable for
            decisions made using our products. To the maximum extent permitted by Australian law,
            our liability is limited to the amount you paid for the relevant product.
          </p>
        </Section>

        <Section title="9. Australian Consumer Law">
          <p>
            Nothing in these terms limits your rights under the Australian Consumer Law. Our products
            come with guarantees that cannot be excluded under the Australian Consumer Law. You are
            entitled to a replacement or refund for a major failure and compensation for any other
            foreseeable loss or damage.
          </p>
        </Section>

        <Section title="10. Contact">
          <p>
            For any questions regarding these terms, contact us at:{' '}
            <a href="mailto:support@carpentrypro.com.au" style={s.link}>
              support@carpentrypro.com.au
            </a>
          </p>
        </Section>
      </div>
    </div>
  )
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section style={{ marginBottom: 32 }}>
      <h2 style={s.h2}>{title}</h2>
      <div style={s.body}>{children}</div>
    </section>
  )
}

const s: Record<string, React.CSSProperties> = {
  page: { minHeight: '100vh', background: '#FAF7F2', padding: '48px 24px 80px' },
  container: { maxWidth: 720, margin: '0 auto' },
  back: { display: 'inline-block', fontSize: 13, color: '#B18B2B', textDecoration: 'none', marginBottom: 32, fontWeight: 600 },
  h1: { fontSize: 32, fontWeight: 800, color: '#2A1A0E', margin: '0 0 6px', letterSpacing: '-0.5px' },
  meta: { fontSize: 13, color: '#aaa', margin: '0 0 40px' },
  h2: { fontSize: 16, fontWeight: 700, color: '#3D2B1F', margin: '0 0 10px' },
  body: { fontSize: 14, color: '#555', lineHeight: 1.8 },
  list: { paddingLeft: 20, margin: '8px 0 0', lineHeight: 2 },
  link: { color: '#B18B2B', textDecoration: 'none', fontWeight: 600 },
}
