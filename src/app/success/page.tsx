import { redirect } from 'next/navigation'
import stripe from '@/lib/stripe'
import { PRODUCTS } from '@/lib/products'
import DownloadButton from './DownloadButton'

interface Props {
  searchParams: { session_id?: string }
}

export default async function SuccessPage({ searchParams }: Props) {
  const sessionId = searchParams.session_id

  if (!sessionId) {
    redirect('/')
  }

  let session
  try {
    session = await stripe.checkout.sessions.retrieve(sessionId)
  } catch {
    return <ErrorState message="We couldn't find your order. Please contact support." />
  }

  if (session.payment_status !== 'paid') {
    return (
      <ErrorState message="Your payment has not been confirmed yet. Please wait a moment and refresh, or contact support." />
    )
  }

  const productId = session.metadata?.productId as keyof typeof PRODUCTS | undefined
  const files = session.metadata?.files?.split(',').map((f) => f.trim()).filter(Boolean) ?? []
  const sheetsUrl = session.metadata?.sheetsUrl || ''
  const productName = productId ? PRODUCTS[productId]?.name : 'Your Purchase'

  const hasSpreadsheet = files.some((f) => f.endsWith('.xlsx'))

  return (
    <div style={pageStyles.page}>
      <div style={pageStyles.container}>
        {/* Success header */}
        <div style={pageStyles.successHeader}>
          <div style={pageStyles.checkCircle}>
            <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
              <path d="M8 16.5L13.5 22L24 11" stroke="white" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>
          <h1 style={pageStyles.heading}>Payment Confirmed</h1>
          <p style={pageStyles.sub}>
            Thank you for your purchase. Your files are ready below.
          </p>
        </div>

        {/* Product card */}
        <div style={pageStyles.card}>
          <div style={pageStyles.cardHeader}>
            <span style={pageStyles.productLabel}>{productName}</span>
            <span style={pageStyles.paidBadge}>Paid</span>
          </div>

          <p style={pageStyles.cardDesc}>
            Click each button to download your files. Save them to a dedicated folder on your device.
          </p>

          <div style={pageStyles.fileList}>
            {files.map((file) => (
              <DownloadButton key={file} sessionId={sessionId} file={file} />
            ))}
          </div>

          {/* Google Sheets button */}
          {sheetsUrl && hasSpreadsheet && (
            <div style={pageStyles.sheetsBanner}>
              <div style={pageStyles.sheetsInfo}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" style={{ flexShrink: 0 }}>
                  <rect x="3" y="3" width="18" height="18" rx="2" stroke="#0f9d58" strokeWidth="1.8" />
                  <path d="M3 9h18M3 15h18M9 9v9" stroke="#0f9d58" strokeWidth="1.8" />
                </svg>
                <div>
                  <div style={pageStyles.sheetsTitle}>Open in Google Sheets</div>
                  <div style={pageStyles.sheetsHint}>
                    Work directly in your browser — no Excel required
                  </div>
                </div>
              </div>
              <a
                href={sheetsUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={pageStyles.sheetsBtn}
              >
                Open Sheets →
              </a>
            </div>
          )}
        </div>

        {/* Getting started tips */}
        <div style={pageStyles.tips}>
          <div style={pageStyles.tipsTitle}>Getting started</div>
          <ul style={pageStyles.tipsList}>
            <li>Save files to a dedicated project folder on your computer</li>
            {hasSpreadsheet && (
              <li>
                Open <code style={pageStyles.code}>estimation.xlsx</code> in Excel or Google Sheets
              </li>
            )}
            {files.includes('guide.pdf') && (
              <li>
                Read <code style={pageStyles.code}>guide.pdf</code> first — takes under 15 minutes
              </li>
            )}
            <li>Fill in the yellow cells and send your first accurate quote</li>
          </ul>
        </div>

        <div style={pageStyles.support}>
          Questions?{' '}
          <a href="mailto:support@carpentrypro.com.au" style={{ color: '#B18B2B' }}>
            support@carpentrypro.com.au
          </a>
        </div>
      </div>
    </div>
  )
}

function ErrorState({ message }: { message: string }) {
  return (
    <div style={pageStyles.page}>
      <div style={{ ...pageStyles.container, textAlign: 'center' }}>
        <svg width="48" height="48" viewBox="0 0 48 48" fill="none" style={{ margin: '0 auto 16px' }}>
          <circle cx="24" cy="24" r="22" stroke="#c0392b" strokeWidth="2" />
          <path d="M24 14v12M24 32v2" stroke="#c0392b" strokeWidth="2.5" strokeLinecap="round" />
        </svg>
        <h1 style={{ fontSize: '22px', fontWeight: 700, color: '#4E342E', margin: '0 0 12px' }}>
          Something went wrong
        </h1>
        <p style={{ color: '#666', marginBottom: '24px', lineHeight: 1.6 }}>{message}</p>
        <a
          href="mailto:support@carpentrypro.com.au"
          style={{
            display: 'inline-block',
            backgroundColor: '#B18B2B',
            color: '#fff',
            fontWeight: 700,
            padding: '12px 24px',
            borderRadius: '8px',
            textDecoration: 'none',
          }}
        >
          Contact Support
        </a>
      </div>
    </div>
  )
}

const pageStyles: Record<string, React.CSSProperties> = {
  page: {
    minHeight: '100vh',
    backgroundColor: '#FAF6F0',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '32px 24px',
  },
  container: {
    width: '100%',
    maxWidth: '480px',
    display: 'flex',
    flexDirection: 'column',
    gap: '20px',
  },
  successHeader: {
    textAlign: 'center',
  },
  checkCircle: {
    width: '64px',
    height: '64px',
    backgroundColor: '#1a9a4a',
    borderRadius: '50%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto 20px',
  },
  heading: {
    fontSize: '26px',
    fontWeight: 800,
    color: '#1a1a1a',
    margin: '0 0 8px',
    letterSpacing: '-0.5px',
  },
  sub: {
    fontSize: '15px',
    color: '#777',
    margin: 0,
  },
  card: {
    backgroundColor: '#fff',
    border: '1px solid #e7ddd0',
    borderRadius: '16px',
    padding: '24px',
  },
  cardHeader: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: '8px',
  },
  productLabel: {
    fontWeight: 700,
    fontSize: '15px',
    color: '#1a1a1a',
  },
  paidBadge: {
    fontSize: '11px',
    fontWeight: 700,
    color: '#1a9a4a',
    backgroundColor: '#e8f7ef',
    padding: '3px 9px',
    borderRadius: '99px',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  },
  cardDesc: {
    fontSize: '13px',
    color: '#888',
    margin: '0 0 16px',
    lineHeight: 1.5,
  },
  fileList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  sheetsBanner: {
    marginTop: '16px',
    backgroundColor: '#f0fbf5',
    border: '1px solid #b2dfcc',
    borderRadius: '10px',
    padding: '14px 16px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '12px',
    flexWrap: 'wrap',
  },
  sheetsInfo: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    flex: 1,
    minWidth: '180px',
  },
  sheetsTitle: {
    fontWeight: 600,
    fontSize: '13px',
    color: '#0f9d58',
  },
  sheetsHint: {
    fontSize: '12px',
    color: '#666',
    marginTop: '2px',
  },
  sheetsBtn: {
    display: 'inline-block',
    backgroundColor: '#0f9d58',
    color: '#fff',
    fontWeight: 700,
    fontSize: '13px',
    padding: '8px 16px',
    borderRadius: '7px',
    textDecoration: 'none',
    whiteSpace: 'nowrap',
  },
  tips: {
    backgroundColor: '#fff',
    border: '1px solid #e7ddd0',
    borderRadius: '12px',
    padding: '20px 24px',
  },
  tipsTitle: {
    fontWeight: 700,
    fontSize: '13px',
    color: '#4E342E',
    marginBottom: '10px',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  },
  tipsList: {
    margin: 0,
    paddingLeft: '18px',
    fontSize: '13px',
    color: '#555',
    lineHeight: 2,
  },
  code: {
    fontSize: '12px',
    backgroundColor: '#f0ebe4',
    padding: '1px 5px',
    borderRadius: '3px',
    fontFamily: 'monospace',
  },
  support: {
    textAlign: 'center',
    fontSize: '13px',
    color: '#aaa',
  },
}
