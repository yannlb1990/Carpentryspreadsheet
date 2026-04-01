import type { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Privacy Policy',
  description: 'CarpentryPro privacy policy — how we collect and use your data.',
  robots: { index: false, follow: false },
}

export default function PrivacyPage() {
  return (
    <div style={s.page}>
      <div style={s.container}>
        <Link href="/" style={s.back}>← Back to CarpentryPro</Link>

        <h1 style={s.h1}>Privacy Policy</h1>
        <p style={s.meta}>Last updated: 1 April 2026</p>

        <Section title="1. Who We Are">
          <p>
            CarpentryPro (&ldquo;we&rdquo;, &ldquo;us&rdquo;, &ldquo;our&rdquo;) operates the website at
            carpentrypro.com.au and sells digital products for Australian carpenters and tradies.
            We are committed to protecting your personal information in accordance with the Australian
            Privacy Act 1988 (Cth) and the Australian Privacy Principles (APPs).
          </p>
        </Section>

        <Section title="2. Information We Collect">
          <p>When you make a purchase, Stripe collects and processes:</p>
          <ul style={s.list}>
            <li>Your name and email address (from Stripe Checkout)</li>
            <li>Payment card details (processed and stored by Stripe, not us)</li>
            <li>Your billing country (for tax purposes)</li>
          </ul>
          <p style={{ marginTop: 12 }}>
            We receive from Stripe: your name, email address, and the product purchased.
            We do not store payment card details.
          </p>
          <p style={{ marginTop: 12 }}>
            Our website may collect standard server logs (IP address, browser type, pages visited)
            for security and performance monitoring.
          </p>
        </Section>

        <Section title="3. How We Use Your Information">
          <ul style={s.list}>
            <li>To deliver your purchased files via a secure download link</li>
            <li>To send your order confirmation email</li>
            <li>To respond to support enquiries</li>
            <li>To comply with legal obligations (e.g. tax records)</li>
          </ul>
          <p style={{ marginTop: 12 }}>
            We do not sell your personal information to third parties. We do not use your
            email for unsolicited marketing.
          </p>
        </Section>

        <Section title="4. Third-Party Services">
          <p>We use the following third-party services:</p>
          <ul style={s.list}>
            <li>
              <strong>Stripe</strong> — payment processing. View{' '}
              <a href="https://stripe.com/au/privacy" target="_blank" rel="noopener noreferrer" style={s.link}>
                Stripe&apos;s Privacy Policy
              </a>
            </li>
            <li>
              <strong>Vercel</strong> — website hosting and infrastructure
            </li>
            <li>
              <strong>Resend</strong> — transactional email delivery
            </li>
          </ul>
        </Section>

        <Section title="5. Data Retention">
          <p>
            We retain your name and email address for 7 years to comply with Australian tax law
            (ATO record-keeping requirements for business transactions). You may request deletion of
            your personal data by contacting us; note that some data must be retained for legal compliance.
          </p>
        </Section>

        <Section title="6. Your Rights">
          <p>Under the Australian Privacy Act, you have the right to:</p>
          <ul style={s.list}>
            <li>Access the personal information we hold about you</li>
            <li>Request correction of inaccurate information</li>
            <li>Make a complaint about how we handle your information</li>
          </ul>
          <p style={{ marginTop: 12 }}>
            To exercise these rights, contact{' '}
            <a href="mailto:support@carpentrypro.com.au" style={s.link}>
              support@carpentrypro.com.au
            </a>
          </p>
        </Section>

        <Section title="7. Security">
          <p>
            We use industry-standard security measures including HTTPS encryption, secure file
            storage, and payment processing via PCI-DSS compliant Stripe. Download links are
            validated against paid Stripe sessions and are not publicly accessible.
          </p>
        </Section>

        <Section title="8. Cookies">
          <p>
            Our website uses minimal cookies required for site functionality. We do not use
            advertising cookies or tracking pixels. Stripe may set cookies during checkout
            for fraud prevention purposes.
          </p>
        </Section>

        <Section title="9. Contact">
          <p>
            For privacy enquiries or complaints, contact:{' '}
            <a href="mailto:support@carpentrypro.com.au" style={s.link}>
              support@carpentrypro.com.au
            </a>
            <br />
            If we do not resolve your complaint to your satisfaction, you may contact the
            Office of the Australian Information Commissioner (OAIC) at{' '}
            <a href="https://www.oaic.gov.au" target="_blank" rel="noopener noreferrer" style={s.link}>
              www.oaic.gov.au
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
