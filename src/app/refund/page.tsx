import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Refund Policy',
  description: 'CarpentryPro 30-day satisfaction guarantee and refund policy.',
  robots: { index: true, follow: true },
}

export default function RefundPage() {
  return (
    <div style={s.page}>
      <div style={s.container}>
        <Link href="/" style={s.back}>← Back to CarpentryPro</Link>

        <h1 style={s.h1}>Refund Policy</h1>
        <p style={s.meta}>Last updated: 1 April 2026</p>

        {/* Guarantee banner */}
        <div style={s.banner}>
          <div style={s.bannerIcon}>🛡️</div>
          <div>
            <div style={s.bannerTitle}>30-Day Satisfaction Guarantee</div>
            <div style={s.bannerDesc}>
              If you&apos;re not satisfied with your purchase for any reason, contact us within
              30 days of purchase and we will issue a full refund — no questions asked.
            </div>
          </div>
        </div>

        <Section title="Our Policy">
          <p>
            We stand behind our products. CarpentryPro offers a <strong>30-day money-back guarantee</strong>{' '}
            on all purchases. If you are not satisfied for any reason — whether the product
            doesn&apos;t meet your needs, doesn&apos;t work with your software, or you simply
            changed your mind — we will refund you in full.
          </p>
        </Section>

        <Section title="How to Request a Refund">
          <ol style={s.list}>
            <li>
              Email us at{' '}
              <a href="mailto:support@carpentrypro.com.au" style={s.link}>
                support@carpentrypro.com.au
              </a>{' '}
              within 30 days of your purchase
            </li>
            <li>Include your order email address or Stripe receipt</li>
            <li>
              Briefly describe what didn&apos;t work for you (optional but helps us improve)
            </li>
          </ol>
          <p style={{ marginTop: 12 }}>
            We aim to process all refund requests within 2 business days. Refunds are returned
            to the original payment method via Stripe and may take 5–10 business days to appear
            on your statement depending on your bank.
          </p>
        </Section>

        <Section title="Australian Consumer Law">
          <p>
            Our products and guarantees comply with Australian Consumer Law (ACL). Under the ACL,
            you are entitled to:
          </p>
          <ul style={s.list}>
            <li>A refund or replacement for a major failure</li>
            <li>Compensation for any other reasonably foreseeable loss</li>
            <li>Have the product repaired or replaced if it fails to be of acceptable quality</li>
          </ul>
          <p style={{ marginTop: 12 }}>
            Nothing in this policy limits or excludes your rights under the ACL.
          </p>
        </Section>

        <Section title="Contact">
          <p>
            For refund requests or any support, email:{' '}
            <a href="mailto:support@carpentrypro.com.au" style={s.link}>
              support@carpentrypro.com.au
            </a>
            <br />
            We respond to all enquiries within 1 business day (AEST).
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
  meta: { fontSize: 13, color: '#aaa', margin: '0 0 32px' },
  banner: {
    display: 'flex', gap: 18, background: '#fff', border: '1.5px solid #C49A2B',
    borderRadius: 14, padding: '22px 24px', marginBottom: 36,
    boxShadow: '0 4px 18px rgba(196,154,43,.12)',
  },
  bannerIcon: { fontSize: 28, flexShrink: 0 },
  bannerTitle: { fontSize: 17, fontWeight: 800, color: '#2A1A0E', marginBottom: 6 },
  bannerDesc: { fontSize: 14, color: '#555', lineHeight: 1.7 },
  h2: { fontSize: 16, fontWeight: 700, color: '#3D2B1F', margin: '0 0 10px' },
  body: { fontSize: 14, color: '#555', lineHeight: 1.8 },
  list: { paddingLeft: 20, margin: '8px 0 0', lineHeight: 2.2 },
  link: { color: '#B18B2B', textDecoration: 'none', fontWeight: 600 },
}
