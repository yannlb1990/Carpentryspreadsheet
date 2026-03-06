import BuyButton from './BuyButton'
import ScrollReveal from './ScrollReveal'

/* ── JSON-LD STRUCTURED DATA ─────────────────────────────────────────────── */
const jsonLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': 'https://carpentrypro.com.au/#organization',
      name: 'CarpentryPro',
      url: 'https://carpentrypro.com.au',
      description: 'Professional estimation and pricing tools for Australian carpenters and tradies.',
      contactPoint: { '@type': 'ContactPoint', email: 'support@carpentrypro.com.au', contactType: 'customer support' },
      areaServed: 'AU',
    },
    {
      '@type': 'WebPage',
      '@id': 'https://carpentrypro.com.au/#webpage',
      url: 'https://carpentrypro.com.au',
      name: 'Carpentry Estimation Spreadsheet & Pricing Guide Australia 2026',
      description: 'Download Australia\'s professional carpentry estimation spreadsheet and pricing guide for QLD, NSW, VIC and WA tradies.',
      inLanguage: 'en-AU',
      isPartOf: { '@id': 'https://carpentrypro.com.au/#organization' },
    },
    {
      '@type': 'Product',
      name: 'Carpentry Estimation Spreadsheet 2026 — Australia',
      description: 'Professional 8-sheet Excel estimation spreadsheet with auto-calculating labour, materials, margins and invoice generator. Built for Australian carpenters.',
      sku: 'CP-ESTIMATION-2026',
      brand: { '@type': 'Brand', name: 'CarpentryPro' },
      offers: {
        '@type': 'Offer',
        price: '29.90',
        priceCurrency: 'AUD',
        availability: 'https://schema.org/InStock',
        priceValidUntil: '2026-12-31',
        seller: { '@type': 'Organization', name: 'CarpentryPro' },
      },
      audience: { '@type': 'Audience', audienceType: 'Carpenters, Tradies, Builders, Australia' },
    },
    {
      '@type': 'Product',
      name: 'Australian Carpentry Pricing Guide 2026',
      description: '19-chapter PDF pricing guide covering current 2026 carpentry labour rates across QLD, NSW, VIC and WA. Covers framing, fit-out, decking, stairs and commercial work.',
      sku: 'CP-PRICEGUIDE-2026',
      brand: { '@type': 'Brand', name: 'CarpentryPro' },
      offers: {
        '@type': 'Offer',
        price: '9.99',
        priceCurrency: 'AUD',
        availability: 'https://schema.org/InStock',
        priceValidUntil: '2026-12-31',
        seller: { '@type': 'Organization', name: 'CarpentryPro' },
      },
    },
    {
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'What is the average carpenter hourly rate in Australia in 2026?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Carpenter hourly rates in Australia range from $75 to $120 per hour in 2026, depending on state, trade level, and job type. NSW and VIC sit at the higher end ($90–$120/hr for experienced carpenters in Sydney and Melbourne), while QLD runs $65–$110/hr and WA averages $65–$100/hr. Finish carpenters and master carpenters can charge $120–$150/hr on specialist work. Our Australian Carpentry Pricing Guide 2026 includes full state-by-state rate tables.',
          },
        },
        {
          '@type': 'Question',
          name: 'What is the correct profit margin for a carpentry quote in Australia?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'A healthy profit margin for a carpentry business in Australia is 15–25% on every job. Many tradies confuse markup with margin — a 25% markup on cost equals only a 20% margin. The CarpentryPro estimation spreadsheet calculates both correctly and displays your margin percentage before you send the quote.',
          },
        },
        {
          '@type': 'Question',
          name: 'What should a professional carpentry quote include in Australia?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'A professional carpentry quote in Australia should include: labour (hours × hourly rate), materials with waste allowance (typically 8–12%), preliminary costs (site setup, safety, access), subcontractor costs with coordination margin, variations allowance, overhead recovery, and your profit margin. Our estimation spreadsheet calculates all of these automatically.',
          },
        },
        {
          '@type': 'Question',
          name: 'Does the CarpentryPro spreadsheet work with Google Sheets?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes. The estimation spreadsheet is delivered as an .xlsx file and is fully compatible with both Microsoft Excel (2016 and later) and Google Sheets. Simply upload to Google Drive and open — all formulas and calculations work without modification.',
          },
        },
        {
          '@type': 'Question',
          name: 'How do I price carpentry jobs correctly in Australia?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'To price carpentry jobs correctly in Australia: (1) calculate your labour hours at your local market rate, (2) cost all materials including a waste percentage, (3) add preliminary costs for site setup and safety, (4) include all subcontractor costs with a coordination margin, (5) apply overhead recovery, and (6) apply your profit margin. Our estimation spreadsheet handles all these calculations automatically.',
          },
        },
        {
          '@type': 'Question',
          name: 'What carpentry trades does the 2026 Pricing Guide cover?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'The Australian Carpentry Pricing Guide 2026 covers: framing and structural carpentry, residential fit-out (kitchens, built-ins, wardrobes), stairs and balustrades, decking and outdoor structures, commercial fit-out and shop fitting, and tender pricing. It includes state-by-state rate comparisons for QLD, NSW, VIC and WA.',
          },
        },
        {
          '@type': 'Question',
          name: 'How long does delivery take after purchase?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Delivery is instant. After Stripe confirms your payment, you are redirected to a secure download page. Your files are available for immediate download — no email, no waiting period, no account required.',
          },
        },
      ],
    },
  ],
}

/* ── SVG ICONS (no emoji) ────────────────────────────────────────────────── */
const IconCheck = () => (
  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
    <path d="M2.5 7L5.5 10L11.5 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

const IconShield = () => (
  <svg width="28" height="28" viewBox="0 0 24 24" fill="none" aria-hidden="true">
    <path d="M12 2L4 6v6c0 5.25 3.5 10.15 8 11.35C16.5 22.15 20 17.25 20 12V6L12 2z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round"/>
    <path d="M9 12l2 2 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

const IconArrow = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>
)

const IconDownload = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d="M8 2v8M5 7l3 3 3-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M2 12h12" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
)

/* ── PAGE ────────────────────────────────────────────────────────────────── */
export default function HomePage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <ScrollReveal />

      {/* ── NAVBAR ──────────────────────────────────────────────────────── */}
      <nav className="nav" role="navigation" aria-label="Main navigation">
        <div className="nav-inner">
          <a href="/" className="nav-logo-link" aria-label="CarpentryPro home">
            <div className="nav-wordmark">CarpentryPro</div>
          </a>
          <div className="nav-links">
            <a href="#problem">Why It Matters</a>
            <a href="#product">Features</a>
            <a href="#pricing">Pricing</a>
            <a href="#faq">FAQ</a>
          </div>
          <a href="#pricing" className="nav-cta">
            Get Instant Access <IconArrow />
          </a>
        </div>
      </nav>

      {/* ── HERO ────────────────────────────────────────────────────────── */}
      <header className="hero" role="banner">
        <div className="hero-glow" aria-hidden="true" />
        <div className="hero-grid wrap">
          <div>
            <div className="hero-badge">
              Australian Carpentry Tools — 2026 Edition
            </div>
            <h1 className="serif hero-h1">
              Professional Carpentry<br />
              <span className="gradient-text">Estimation &amp; Pricing</span><br />
              for Australian Tradies
            </h1>
            <p className="hero-sub">
              The only estimation spreadsheet and pricing guide built specifically
              for Australian carpenters. Quote accurately in under 15 minutes,
              protect your margin on every job, and win more tenders across
              QLD, NSW, VIC and WA.
            </p>
            <div className="hero-actions">
              <a href="#pricing" className="btn-primary">
                Download Now — From $9.99 <IconArrow />
              </a>
              <a href="#product" className="btn-secondary">
                See What&apos;s Inside
              </a>
            </div>
            <div className="hero-trust" role="list" aria-label="Key features">
              <div className="hero-trust-item" role="listitem">Instant download</div>
              <span className="trust-dot" aria-hidden="true" />
              <div className="hero-trust-item" role="listitem">One-time payment</div>
              <span className="trust-dot" aria-hidden="true" />
              <div className="hero-trust-item" role="listitem">Excel &amp; Google Sheets</div>
              <span className="trust-dot" aria-hidden="true" />
              <div className="hero-trust-item" role="listitem">2026 Australian rates</div>
            </div>
          </div>

          <div className="hero-visual" aria-hidden="true">
            <div className="product-card-mock">
              <div className="mock-header">
                <span className="mock-label">ESTIMATION SPREADSHEET — 2026</span>
                <span className="mock-badge">Live Preview</span>
              </div>
              <div className="mock-title serif">Kitchen Renovation — Sydney NSW</div>
              <div className="mock-sub">Quote #2026-047 · Calculated automatically</div>
              <div className="mock-sheets">
                {[
                  { name: 'Labour', w: '78%' },
                  { name: 'Materials', w: '62%' },
                  { name: 'Prelims', w: '45%' },
                  { name: 'Margin', w: '90%' },
                ].map(({ name, w }) => (
                  <div key={name} className="mock-sheet">
                    <div className="mock-sheet-name">{name}</div>
                    <div className="mock-bar-track">
                      <div className="mock-bar-fill" style={{ width: w }} />
                    </div>
                  </div>
                ))}
              </div>
              <div className="mock-price-row">
                <div>
                  <div className="mock-price-label">Total Quote Value</div>
                  <div className="mock-price-val">$24,850</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div className="mock-price-label">Protected Margin</div>
                  <div className="mock-margin-val">22.4%</div>
                </div>
              </div>
              <div className="mock-dl-row">
                <IconDownload />
                <span>Export Quote PDF</span>
              </div>
            </div>
            <div className="float-pill float-pill-1">
              <div className="pill-icon-wrap">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M8 1v6l3 3" stroke="#C49A2B" strokeWidth="1.5" strokeLinecap="round"/>
                  <circle cx="8" cy="8" r="6.5" stroke="#C49A2B" strokeWidth="1.5"/>
                </svg>
              </div>
              <div>
                <div className="pill-label">Quote completed in</div>
                <div className="pill-val">12 minutes</div>
              </div>
            </div>
            <div className="float-pill float-pill-2">
              <div className="pill-icon-wrap">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path d="M8 2v12M4 6l4-4 4 4" stroke="#1A5C20" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
              <div>
                <div className="pill-label">Margin recovered</div>
                <div className="pill-val">+$3,240</div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* ── STATS BAR ───────────────────────────────────────────────────── */}
      <div className="stats-bar" role="region" aria-label="Key statistics">
        <div className="stats-inner">
          {[
            { num: '$9.99', label: 'Pricing guide — one-time' },
            { num: '8',     label: 'Auto-linked spreadsheet tabs' },
            { num: '19',    label: 'Chapters of AU pricing data' },
            { num: '15 min',label: 'To your first accurate quote' },
          ].map(({ num, label }) => (
            <div key={label} className="stat-item">
              <div className="stat-num">{num}</div>
              <div className="stat-label">{label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* ── PROBLEM ─────────────────────────────────────────────────────── */}
      <section id="problem" className="problem-section" aria-labelledby="problem-heading">
        <div className="problem-grid wrap">
          <div>
            <span className="eyebrow">Why Most Carpentry Businesses Struggle</span>
            <h2 id="problem-heading" className="section-h2">
              Australian carpenters lose an average $18,400 per year to under-pricing
            </h2>
            <p className="section-p">
              Without a structured estimation system, every quote is a guess. Missed
              line items, outdated rates, and no contingency buffer mean the margin
              disappears before you finish the job.
            </p>
            <div className="problem-list" role="list">
              {[
                {
                  title: '3.5 hours wasted per quote',
                  desc: 'Manually rebuilding the same spreadsheet each time — hunting for material costs, recalculating rates, reformatting from scratch.',
                },
                {
                  title: 'Critical cost items missed every time',
                  desc: 'Consumables, fixings, travel, timber waste, site establishment and preliminary costs silently erode your margin job after job.',
                },
                {
                  title: 'Pricing blind across Australian states',
                  desc: 'Carpenter rates in Brisbane differ significantly from Sydney or Melbourne. Without current data, you risk pricing yourself out — or into a loss.',
                },
                {
                  title: 'Variations not captured or charged',
                  desc: 'Scope creep costs Australian tradies thousands annually. Without a formal variation tracking system, extra work is absorbed, not invoiced.',
                },
              ].map(({ title, desc }) => (
                <div key={title} className="problem-item reveal" role="listitem">
                  <div className="problem-icon-wrap" aria-hidden="true">
                    <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
                      <circle cx="9" cy="9" r="8" stroke="#B45309" strokeWidth="1.5"/>
                      <path d="M9 5v5M9 13v.5" stroke="#B45309" strokeWidth="1.5" strokeLinecap="round"/>
                    </svg>
                  </div>
                  <div>
                    <div className="problem-item-title">{title}</div>
                    <div className="problem-item-desc">{desc}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="reveal">
            <div className="cost-graphic" role="region" aria-label="Annual margin loss breakdown">
              <div className="cost-top">
                <div className="cost-top-label">Estimated annual margin lost — Australian carpenter</div>
                <div className="cost-top-val">$18,400</div>
                <div className="cost-top-sub">Based on ABS trade business data and MBAV industry surveys</div>
              </div>
              <div className="cost-bars">
                {[
                  { name: 'Under-charged labour hours',         val: '$6,100', w: '85%' },
                  { name: 'No contingency or prelim buffer',    val: '$4,100', w: '71%' },
                  { name: 'Missed consumables and fixings',     val: '$3,200', w: '62%' },
                  { name: 'Travel and site setup not charged',  val: '$2,800', w: '52%' },
                  { name: 'Variations absorbed, not invoiced',  val: '$2,200', w: '44%' },
                ].map(({ name, val, w }) => (
                  <div key={name} className="cost-bar-item">
                    <div className="cost-bar-row">
                      <span className="cost-bar-name">{name}</span>
                      <span className="cost-bar-pct">{val}</span>
                    </div>
                    <div className="cost-bar-track">
                      <div className="cost-bar-fill" style={{ width: w }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── PRODUCT SHOWCASE ────────────────────────────────────────────── */}
      <section id="product" className="showcase-section" aria-labelledby="product-heading">
        <div className="showcase-glow" aria-hidden="true" />
        <div className="wrap">
          <div className="showcase-header reveal">
            <span className="eyebrow">Inside the Estimation Spreadsheet</span>
            <h2 id="product-heading" className="section-h2">
              8 linked sheets. One complete, professional carpentry quote.
            </h2>
            <p className="section-p">
              Every figure auto-calculates. Change your hourly rate in Settings and
              every labour line updates instantly across the entire quote.
            </p>
          </div>

          <div className="features-grid">
            <div className="feature-list" role="list">
              {[
                {
                  title: 'Dashboard — Instant Quote Summary',
                  desc: 'See total cost, gross margin percentage, and job profitability in real time. Know before you send whether the job is worth taking.',
                },
                {
                  title: 'Labour — Rates by Trade Category',
                  desc: 'Set your hourly rates once for leading hand, carpenter, apprentice, and labourer. Apply automatically across all task types.',
                },
                {
                  title: 'Materials — Auto-Calculating with Waste',
                  desc: 'Enter quantities. The spreadsheet applies your timber waste percentage (typically 8–12%) and calculates material totals automatically.',
                },
                {
                  title: 'Preliminaries — Site Costs Accounted',
                  desc: 'Site establishment, safety compliance, hoarding, and access costs — line items most carpenters forget and absorb.',
                },
                {
                  title: 'Variations — Scope Change Tracker',
                  desc: 'Log every variation with description and value. Automatically adds to the contract total with a full paper trail for dispute protection.',
                },
                {
                  title: 'Invoice Generator — Branded PDF Output',
                  desc: 'Enter your ABN, business name, logo, and payment terms once. Generate a professional invoice PDF for any quote in one click.',
                },
              ].map(({ title, desc }, i) => (
                <div key={title} className={`feature-item reveal${i === 0 ? ' fi-active' : ''}`} role="listitem">
                  <div className="feature-num" aria-hidden="true">0{i + 1}</div>
                  <div>
                    <div className="feature-title">{title}</div>
                    <div className="feature-desc">{desc}</div>
                  </div>
                </div>
              ))}
            </div>

            <div className="feature-preview reveal" aria-label="Spreadsheet preview">
              <div className="preview-bar" aria-hidden="true">
                <div className="preview-dot" style={{ background: '#FF5F57' }} />
                <div className="preview-dot" style={{ background: '#FFBD2E' }} />
                <div className="preview-dot" style={{ background: '#28CA41' }} />
                <span className="preview-file">estimation.xlsx — Dashboard</span>
              </div>
              <div className="preview-content">
                <table className="preview-table">
                  <caption className="sr-only">Sample carpentry quote line items</caption>
                  <thead>
                    <tr>
                      <th scope="col">Line Item</th>
                      <th scope="col">Qty</th>
                      <th scope="col">Rate</th>
                      <th scope="col">Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      ['Leading Hand Labour',    '48 hrs',  '$95/hr',   '$4,560'],
                      ['Apprentice Labour',      '24 hrs',  '$38/hr',   '$912'],
                      ['Structural Timber',      '240 lm',  '$12.40/lm','$2,976'],
                      ['Waste Allowance (8%)',   '—',       '—',        '$238'],
                      ['Fixings & Consumables',  '—',       'allow.',   '$320'],
                      ['Preliminaries',          '—',       '5%',       '$490'],
                      ['Subcontractor (Plaster)','1',       '$2,200',   '$2,420'],
                    ].map(([item, qty, rate, total]) => (
                      <tr key={item}>
                        <td>{item}</td>
                        <td>{qty}</td>
                        <td>{rate}</td>
                        <td className="hi">{total}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
                <div className="preview-total" role="status">
                  <span className="preview-total-label">TOTAL QUOTE (incl. 22% margin)</span>
                  <span className="preview-total-val">$13,856</span>
                </div>
                <div className="preview-note">
                  All figures calculate automatically from your inputs
                </div>
              </div>
            </div>
          </div>

          {/* Pricing Guide feature block */}
          <div className="guide-feature reveal">
            <div className="guide-feature-left">
              <span className="eyebrow" style={{ marginBottom: 10 }}>Also Included in Bundle</span>
              <h3 className="guide-feature-title">
                Australian Carpentry Pricing Guide 2026 — 19 Chapters
              </h3>
              <p className="guide-feature-desc">
                The definitive reference for Australian carpentry labour rates. Updated with
                2025–2026 market data across Queensland, New South Wales, Victoria and
                Western Australia. Know exactly what the market pays before you price the next job.
              </p>
            </div>
            <div className="guide-chapters">
              <div className="guide-chapter-label">Key chapters include:</div>
              {[
                'How to calculate your 2026 hourly rate by state',
                'Framing and structural carpentry — current AU rates',
                'Residential fit-out pricing: kitchens, built-ins, stairs',
                'Decking and outdoor structures — material and labour matrix',
                'How to price commercial fit-out and shop fitting',
                'Winning tenders: how to price competitively without cutting margin',
              ].map(ch => (
                <div key={ch} className="guide-chapter-item">
                  <span className="guide-chapter-check" aria-hidden="true"><IconCheck /></span>
                  {ch}
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ────────────────────────────────────────────────── */}
      <section className="proof-section" aria-labelledby="proof-heading">
        <div className="wrap">
          <div style={{ textAlign: 'center' }} className="reveal">
            <span className="eyebrow">Verified Tradie Reviews</span>
            <h2 id="proof-heading" className="section-h2">
              Used by carpenters across Australia
            </h2>
          </div>
          <div className="proof-grid">
            {[
              {
                name: 'Matt B.',
                role: 'Residential Carpenter',
                location: 'Brisbane, QLD',
                dark: false,
                quote: 'I used to spend Sunday nights rebuilding quotes from scratch. Now I finish in 20 minutes and send something that looks completely professional. Won three jobs last month I would have under-priced before.',
              },
              {
                name: 'Steve H.',
                role: 'Carpentry Subcontractor',
                location: 'Sydney, NSW',
                dark: true,
                quote: 'The pricing guide alone is worth ten times what I paid. I had no reference point for Sydney decking rates. Read Chapter 12 and immediately adjusted my pricing. Recovered the cost on the first quote.',
              },
              {
                name: 'Dan L.',
                role: 'Fit-Out Carpenter',
                location: 'Melbourne, VIC',
                dark: false,
                quote: 'Downloaded Friday afternoon, sent my first proper quote Saturday morning. The invoice sheet looks more professional than anything I have produced before. Clients notice the difference.',
              },
            ].map(({ name, role, location, dark, quote }) => (
              <article key={name} className={`testimonial reveal${dark ? ' t-dark' : ''}`}>
                <div className="stars" aria-label="5 star review">&#9733;&#9733;&#9733;&#9733;&#9733;</div>
                <blockquote className="testimonial-text">&ldquo;{quote}&rdquo;</blockquote>
                <div className="testimonial-author">
                  <div className="author-avatar" aria-hidden="true">
                    {name.split(' ').map(n => n[0]).join('')}
                  </div>
                  <div>
                    <div className="author-name">{name}</div>
                    <div className="author-role">{role} &mdash; {location}</div>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── PRICING ─────────────────────────────────────────────────────── */}
      <section id="pricing" className="pricing-section" aria-labelledby="pricing-heading">
        <div className="wrap">
          <div className="pricing-header reveal">
            <span className="eyebrow">Download Options</span>
            <h2 id="pricing-heading" className="section-h2">
              Carpentry estimation tools — one-time price, yours forever
            </h2>
            <p className="section-p">
              No subscription, no annual renewal. Pay once and use on every job,
              every device, for as long as you run your business.
            </p>
          </div>

          <div className="pricing-grid">
            {/* Pricing Guide */}
            <div className="plan reveal">
              <div className="plan-name">Pricing Guide Only</div>
              <div className="plan-price">$9<span className="plan-cents">.99</span></div>
              <div className="plan-period">AUD &middot; one-time download</div>
              <div className="plan-divider" />
              <div className="plan-files">
                <div className="plan-file">
                  <div className="plan-check" aria-hidden="true"><IconCheck /></div>
                  <code>pricing_guide.pdf</code>
                  <span className="plan-file-desc">19-chapter reference guide</span>
                </div>
              </div>
              <div className="plan-features">
                {[
                  'Current 2026 carpentry rates across Australia',
                  'QLD, NSW, VIC and WA rate comparisons',
                  'Framing, fit-out, decking and stairs pricing',
                  'How to set your correct hourly rate by state',
                  'Commercial tender pricing strategies',
                ].map(f => (
                  <div key={f} className="plan-feat">
                    <span className="ok" aria-hidden="true"><IconCheck /></span> {f}
                  </div>
                ))}
              </div>
              <BuyButton productId="priceguide" label="Download Pricing Guide" className="plan-btn" />
            </div>

            {/* Estimation Tool — featured */}
            <div className="plan plan-featured reveal">
              <div className="plan-popular">Most Popular</div>
              <div className="plan-name">Estimation Spreadsheet</div>
              <div className="plan-price">$29<span className="plan-cents">.90</span></div>
              <div className="plan-period">AUD &middot; one-time download</div>
              <div className="plan-divider" style={{ background: 'rgba(255,255,255,.1)' }} />
              <div className="plan-files">
                {[
                  { file: 'estimation.xlsx', desc: '8-tab professional spreadsheet' },
                  { file: 'guide.pdf',       desc: '12-page quick-start guide' },
                ].map(({ file, desc }) => (
                  <div key={file} className="plan-file">
                    <div className="plan-check" aria-hidden="true"><IconCheck /></div>
                    <code>{file}</code>
                    <span className="plan-file-desc">{desc}</span>
                  </div>
                ))}
              </div>
              <div className="plan-features">
                {[
                  '8 linked tabs — fully auto-calculating',
                  'Labour, materials, prelims and margin built in',
                  'Timber waste percentage included',
                  'Variation tracking with paper trail',
                  'Branded invoice generator — export to PDF',
                  'Compatible with Excel 2016+ and Google Sheets',
                ].map(f => (
                  <div key={f} className="plan-feat">
                    <span className="ok" aria-hidden="true"><IconCheck /></span> {f}
                  </div>
                ))}
              </div>
              <BuyButton productId="estimation" label="Download Estimation Tool" className="plan-btn plan-btn-gold" />
            </div>

            {/* Bundle */}
            <div className="plan reveal">
              <div className="plan-name">Complete Bundle</div>
              <div className="plan-price">$34<span className="plan-cents">.99</span></div>
              <div className="plan-period" style={{ display: 'flex', alignItems: 'center', gap: 8, flexWrap: 'wrap' }}>
                <span className="plan-was">was $39.89</span>
                <span>AUD &middot; one-time</span>
              </div>
              <div className="plan-save">Save $4.90</div>
              <div className="plan-divider" />
              <div className="plan-files">
                {[
                  { file: 'estimation.xlsx', desc: '8-tab spreadsheet' },
                  { file: 'guide.pdf',       desc: 'Quick-start guide' },
                  { file: 'pricing_guide.pdf', desc: '19-chapter rate reference' },
                ].map(({ file, desc }) => (
                  <div key={file} className="plan-file">
                    <div className="plan-check" aria-hidden="true"><IconCheck /></div>
                    <code>{file}</code>
                    <span className="plan-file-desc">{desc}</span>
                  </div>
                ))}
              </div>
              <div className="plan-features">
                {[
                  'Everything in the Estimation Tool',
                  'Full 19-chapter Australian pricing reference',
                  'Know your costs and know the market',
                  'Best value for full-time operators',
                ].map(f => (
                  <div key={f} className="plan-feat">
                    <span className="ok" aria-hidden="true"><IconCheck /></span> {f}
                  </div>
                ))}
              </div>
              <BuyButton productId="bundle" label="Download Complete Bundle" className="plan-btn" />
            </div>
          </div>

          <div className="guarantee reveal" role="complementary" aria-label="Security guarantee">
            <div className="guarantee-icon" aria-hidden="true">
              <IconShield />
            </div>
            <p className="guarantee-text">
              <strong>Secure payment via Stripe.</strong> Your payment is processed by the
              same infrastructure used by Amazon, Shopify and millions of Australian businesses.
              We never see or store your card details. Files are available for immediate download
              the moment your payment is confirmed.
            </p>
          </div>
        </div>
      </section>

      {/* ── HOW IT WORKS ────────────────────────────────────────────────── */}
      <section className="how-section" aria-labelledby="how-heading">
        <div className="wrap-md">
          <div style={{ textAlign: 'center' }} className="reveal">
            <span className="eyebrow">Getting Started</span>
            <h2 id="how-heading" className="section-h2">
              From payment to your first quote in under 15 minutes
            </h2>
          </div>
          <div className="steps">
            {[
              {
                n: '1',
                title: 'Pay once, download immediately',
                desc: 'Stripe processes your payment and redirects you to a secure download page. Click to download your files directly — no account, no email confirmation, no waiting.',
              },
              {
                n: '2',
                title: 'Open in Excel or Google Sheets',
                desc: 'Open estimation.xlsx in Microsoft Excel or upload to Google Drive for Sheets. Enter your business name, ABN, hourly rates and markup in the Settings tab.',
              },
              {
                n: '3',
                title: 'Fill the yellow cells — quote goes out',
                desc: 'Enter your job-specific details in the highlighted input cells. Labour, materials, prelims and margin calculate automatically. Export your branded PDF and send.',
              },
            ].map(({ n, title, desc }) => (
              <div key={n} className="step-item reveal">
                <div className="step-num" aria-hidden="true">{n}</div>
                <h3 className="step-title">{title}</h3>
                <p className="step-desc">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ─────────────────────────────────────────────────────────── */}
      <section id="faq" className="faq-section" aria-labelledby="faq-heading">
        <div className="wrap">
          <div className="faq-grid">
            <div className="reveal">
              <span className="eyebrow">Common Questions</span>
              <h2 id="faq-heading" className="section-h2">
                Everything you need to know before you download
              </h2>
              <p className="section-p">
                Questions about compatibility, delivery, licensing or refunds —
                answered below. Still unsure? Email us directly.
              </p>
              <div className="faq-contact">
                <div className="faq-contact-icon" aria-hidden="true">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <rect x="2" y="4" width="16" height="12" rx="2" stroke="currentColor" strokeWidth="1.5"/>
                    <path d="M2 7l8 5 8-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
                  </svg>
                </div>
                <div>
                  <div className="faq-contact-label">Direct support</div>
                  <a href="mailto:support@carpentrypro.com.au" className="faq-contact-val">
                    support@carpentrypro.com.au
                  </a>
                </div>
              </div>
            </div>

            <div className="faq-items reveal">
              {[
                {
                  q: 'How much does a carpenter charge per hour in Australia in 2026?',
                  a: 'Carpenter hourly rates in Australia range from $75 to $120 per hour in 2026, depending on state, trade level, and job type. NSW and VIC sit at the higher end — experienced carpenters in Sydney and Melbourne typically charge $90–$120/hr. QLD rates run $75–$110/hr and WA averages $70–$100/hr for residential work. Specialist and finish carpenters can command $120–$150/hr. The 2026 Pricing Guide includes full state-by-state and trade-by-trade rate tables.',
                },
                {
                  q: 'What is the correct profit margin for a carpentry quote in Australia?',
                  a: 'A healthy profit margin for a carpentry business is 15–25% on every job. Many tradies confuse markup with margin — a 25% markup on cost is only a 20% margin. The estimation spreadsheet handles both calculations correctly and shows you both figures before you send any quote.',
                },
                {
                  q: 'What should a professional carpentry quote include?',
                  a: 'A professional carpentry quote should include: labour hours at your applicable rate, all material costs with an 8–12% waste allowance, preliminary costs for site establishment and safety compliance, subcontractor costs with your coordination margin, a contingency allowance for variations, overhead recovery, and your profit margin. The CarpentryPro spreadsheet calculates every component automatically.',
                },
                {
                  q: 'Does the spreadsheet work with Google Sheets as well as Excel?',
                  a: 'Yes. The file is delivered as .xlsx and is fully compatible with both Microsoft Excel (2016+) and Google Sheets. Upload it to Google Drive and open it — all formulas and conditional formatting work without any modification.',
                },
                {
                  q: 'How do I get my files after purchasing?',
                  a: 'Immediately after Stripe confirms your payment, you are redirected to a secure download page. Click each download button to save your files. There is no email to wait for, no account required, and no download link that expires. Delivery is instant.',
                },
                {
                  q: 'Does the pricing guide cover my state — QLD, NSW, VIC or WA?',
                  a: 'Yes. The Australian Carpentry Pricing Guide 2026 includes dedicated rate tables for Queensland, New South Wales, Victoria and Western Australia. The estimation spreadsheet is state-agnostic — enter your local rates in the Settings tab and it calculates accordingly for any market.',
                },
              ].map(({ q, a }) => (
                <details key={q} className="faq-item">
                  <summary>{q} <span className="faq-arrow" aria-hidden="true">&#9660;</span></summary>
                  <div className="faq-body">{a}</div>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── STATE RATES TABLE ───────────────────────────────────────────── */}
      <section className="states-section" aria-labelledby="states-heading">
        <div className="wrap-md">
          <div className="reveal" style={{ textAlign: 'center', marginBottom: 40 }}>
            <span className="eyebrow" style={{ color: 'var(--gold)' }}>2026 Market Reference</span>
            <h2 id="states-heading" className="section-h2">
              Carpenter labour rates by Australian state — 2026
            </h2>
            <p className="section-p" style={{ margin: '0 auto', maxWidth: 560 }}>
              Rates vary significantly across states. Use these as benchmarks when
              setting your hourly rate or pricing a tender. Full breakdowns by trade
              category are in the Pricing Guide.
            </p>
          </div>
          <div className="rates-table-wrap reveal">
            <table className="rates-table">
              <caption className="sr-only">Carpenter hourly rates by Australian state, 2026</caption>
              <thead>
                <tr>
                  <th scope="col">State</th>
                  <th scope="col">Residential Rate</th>
                  <th scope="col">Commercial Rate</th>
                  <th scope="col">Leading Hand</th>
                  <th scope="col">Market Trend</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { state: 'New South Wales', short: 'NSW', res: '$85–$120/hr', com: '$95–$130/hr', lh: '$115–$145/hr', trend: 'Rising', up: true },
                  { state: 'Victoria', short: 'VIC', res: '$80–$115/hr', com: '$90–$125/hr', lh: '$110–$140/hr', trend: 'Rising', up: true },
                  { state: 'Queensland', short: 'QLD', res: '$75–$110/hr', com: '$85–$120/hr', lh: '$100–$130/hr', trend: 'Rising', up: true },
                  { state: 'Western Australia', short: 'WA', res: '$70–$100/hr', com: '$80–$115/hr', lh: '$95–$125/hr', trend: 'Stable', up: false },
                  { state: 'South Australia', short: 'SA', res: '$70–$100/hr', com: '$78–$110/hr', lh: '$90–$120/hr', trend: 'Stable', up: false },
                ].map(({ state, short, res, com, lh, trend, up }) => (
                  <tr key={state}>
                    <td><strong>{state}</strong> <span className="state-short">({short})</span></td>
                    <td>{res}</td>
                    <td>{com}</td>
                    <td>{lh}</td>
                    <td className={up ? 'trend-up' : 'trend-stable'}>{up ? '&#8593; ' : ''}{trend}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <p className="rates-note">
              Rates are indicative market benchmarks sourced from MBAV, Airtasker and
              industry surveys. Actual rates vary by experience level, project complexity,
              and local demand. Full breakdowns by trade type are in the{' '}
              <a href="#pricing">2026 Pricing Guide</a>.
            </p>
          </div>
        </div>
      </section>

      {/* ── SEO CONTENT BLOCK ───────────────────────────────────────────── */}
      <section className="seo-content-section" aria-labelledby="seo-heading">
        <div className="wrap-md">
          <h2 id="seo-heading" className="seo-content-heading">
            Professional Carpentry Estimation for Australian Tradies
          </h2>
          <div className="seo-content-grid">
            <div>
              <h3>Carpentry Quoting Tools Built for the Australian Market</h3>
              <p>
                Most generic quoting tools are built for retail or office environments —
                not the specific cost structure of Australian carpentry and construction.
                CarpentryPro&apos;s estimation spreadsheet is built for the way
                Australian carpenters work: materials priced locally, labour rates
                that vary by state, and preliminary costs unique to construction sites
                across QLD, NSW, VIC and WA.
              </p>
              <p>
                Whether you run a sole trader carpentry business or manage a small crew,
                the system scales to your operation. Set your hourly rate, overhead
                percentage and default markup once in the Settings tab. Every new quote
                calculates from your baseline automatically — no more rebuilding from scratch.
              </p>
            </div>
            <div>
              <h3>How to Price Carpentry Jobs Correctly in Australia</h3>
              <p>
                Accurate carpentry quoting in Australia requires accounting for five
                components: labour at your current market rate, materials with an 8–12%
                waste allowance, preliminary costs for site setup and safety compliance,
                subcontractor costs including your coordination margin, and a profit
                margin of 15–25% on the total. Miss any one of these and the job
                costs you money.
              </p>
              <p>
                The CarpentryPro estimation spreadsheet calculates all five automatically.
                The Pricing Guide gives you the market context to know whether your
                rates are competitive across NSW, QLD, VIC and WA — so you can quote
                with confidence, not guesswork.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── FINAL CTA ───────────────────────────────────────────────────── */}
      <section className="cta-section" aria-labelledby="cta-heading">
        <span className="eyebrow">Download Today</span>
        <h2 id="cta-heading" className="section-h2 serif">
          Your next quote could be<br />your most profitable job yet
        </h2>
        <p className="section-p">
          For less than a single site visit, you get a professional estimation
          system and pricing reference that pays for itself on the first job.
          Used by carpenters across QLD, NSW, VIC and WA.
        </p>
        <div className="cta-actions">
          <BuyButton productId="bundle" label="Download Complete Bundle — $34.99" className="btn-light" />
          <a href="#pricing" className="btn-secondary">Compare All Options</a>
        </div>
        <p className="cta-note">
          One-time payment &middot; Instant download &middot; Excel &amp; Google Sheets compatible
        </p>
      </section>

      {/* ── FOOTER ──────────────────────────────────────────────────────── */}
      <footer className="site-footer" role="contentinfo">
        <div className="footer-inner">
          <div>
            <div className="footer-wordmark">CarpentryPro</div>
            <p className="footer-desc">
              Professional estimation and pricing tools for Australian carpenters and tradies.
              Serving QLD, NSW, VIC and WA.
            </p>
          </div>
          <div className="footer-right">
            <div className="footer-links">
              <a href="#pricing">Products</a>
              <a href="#faq">FAQ</a>
              <a href="mailto:support@carpentrypro.com.au">Support</a>
            </div>
            <p className="footer-copy">
              &copy; {new Date().getFullYear()} CarpentryPro. All rights reserved.
              ABN&nbsp;disclosed&nbsp;at&nbsp;checkout.
            </p>
          </div>
        </div>
      </footer>
    </>
  )
}
