'use client'

import { useState, useEffect, useRef } from 'react'

interface FileStatus {
  'estimation.xlsx': boolean
  'guide.pdf': boolean
  'pricing_guide.pdf': boolean
}

interface Order {
  id: string
  email: string
  name: string
  product: string
  amount: string
  currency: string
  created: string
}

interface SheetConfig {
  estimation: { sheetsUrl: string }
  priceguide: { sheetsUrl: string }
  bundle: { sheetsUrl: string }
}

const FILE_LABELS: Record<string, { label: string; product: string }> = {
  'estimation.xlsx': { label: 'Estimation Spreadsheet', product: 'estimation + bundle' },
  'guide.pdf': { label: 'Quick-Start Guide (PDF)', product: 'estimation + bundle' },
  'pricing_guide.pdf': { label: 'Carpentry Pricing Guide (PDF)', product: 'priceguide + bundle' },
}

const PRODUCT_SHEET_LABELS: Array<{ id: keyof SheetConfig; label: string; hint: string }> = [
  {
    id: 'estimation',
    label: 'Estimation Tool ($29.90)',
    hint: 'Customers who buy the Estimation Tool will see this link.',
  },
  {
    id: 'bundle',
    label: 'Complete Bundle ($34.99)',
    hint: 'Customers who buy the Bundle will see this link. Usually the same as above.',
  },
]

export default function Dashboard() {
  const [fileStatus, setFileStatus] = useState<FileStatus | null>(null)
  const [sheetConfig, setSheetConfig] = useState<SheetConfig | null>(null)
  const [uploadStatus, setUploadStatus] = useState<Record<string, string>>({})
  const [sheetSaveStatus, setSheetSaveStatus] = useState<Record<string, string>>({})
  const [sheetInputs, setSheetInputs] = useState<Record<string, string>>({})
  const [orders, setOrders] = useState<Order[] | null>(null)
  const [ordersRevenue, setOrdersRevenue] = useState<string>('0.00')
  const [ordersLoading, setOrdersLoading] = useState(false)
  const inputRefs = useRef<Record<string, HTMLInputElement | null>>({})

  useEffect(() => {
    Promise.all([
      fetch('/api/admin/status').then((r) => r.json()),
      fetch('/api/admin/config').then((r) => r.json()),
    ]).then(([status, config]) => {
      setFileStatus(status.files)
      setSheetConfig(config)
      setSheetInputs({
        estimation: config.estimation?.sheetsUrl || '',
        priceguide: config.priceguide?.sheetsUrl || '',
        bundle: config.bundle?.sheetsUrl || '',
      })
    })

    // Load orders
    setOrdersLoading(true)
    fetch('/api/admin/orders')
      .then((r) => r.json())
      .then((data) => {
        setOrders(data.orders ?? [])
        setOrdersRevenue(data.totalRevenue ?? '0.00')
      })
      .finally(() => setOrdersLoading(false))
  }, [])

  async function handleUpload(filename: string) {
    const input = inputRefs.current[filename]
    if (!input?.files?.[0]) return

    const file = input.files[0]
    setUploadStatus((prev) => ({ ...prev, [filename]: 'uploading' }))

    const formData = new FormData()
    formData.append('file', file)
    formData.append('filename', filename)

    const res = await fetch('/api/admin/upload', { method: 'POST', body: formData })

    if (res.ok) {
      setUploadStatus((prev) => ({ ...prev, [filename]: 'done' }))
      setFileStatus((prev) => (prev ? { ...prev, [filename]: true } : prev))
      setTimeout(() => setUploadStatus((prev) => ({ ...prev, [filename]: '' })), 3000)
    } else {
      const data = await res.json()
      setUploadStatus((prev) => ({ ...prev, [filename]: 'error: ' + data.error }))
    }
    if (input) input.value = ''
  }

  async function handleSaveSheet(productId: keyof SheetConfig) {
    setSheetSaveStatus((prev) => ({ ...prev, [productId]: 'saving' }))

    const res = await fetch('/api/admin/config', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ productId, sheetsUrl: sheetInputs[productId] || '' }),
    })

    if (res.ok) {
      setSheetSaveStatus((prev) => ({ ...prev, [productId]: 'saved' }))
      setTimeout(() => setSheetSaveStatus((prev) => ({ ...prev, [productId]: '' })), 3000)
    } else {
      const data = await res.json()
      setSheetSaveStatus((prev) => ({ ...prev, [productId]: 'error: ' + data.error }))
    }
  }

  async function handleLogout() {
    await fetch('/api/admin/login', { method: 'DELETE' })
    window.location.reload()
  }

  return (
    <div style={styles.page}>
      <div style={styles.container}>
        {/* Header */}
        <div style={styles.header}>
          <div>
            <span style={styles.logo}>CarpentryPro</span>
            <span style={styles.badge}>Admin</span>
          </div>
          <button onClick={handleLogout} style={styles.logoutBtn}>
            Sign out
          </button>
        </div>

        {/* Section: Product Files */}
        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>Product Files</h2>
          <p style={styles.sectionDesc}>
            Upload your product files here. Each file is stored securely and only delivered to paying
            customers. Max 50 MB per file.
          </p>

          <div style={styles.fileList}>
            {Object.entries(FILE_LABELS).map(([filename, { label, product }]) => {
              const uploaded = fileStatus?.[filename as keyof FileStatus]
              const status = uploadStatus[filename]

              return (
                <div key={filename} style={styles.fileRow}>
                  <div style={styles.fileInfo}>
                    <div style={styles.fileName}>{label}</div>
                    <div style={styles.fileMeta}>
                      <code style={styles.code}>{filename}</code>
                      <span style={styles.productTag}>{product}</span>
                    </div>
                  </div>

                  <div style={styles.fileActions}>
                    <span style={{ ...styles.dot, backgroundColor: uploaded ? '#1a9a4a' : '#c0392b' }} />
                    <span style={{ color: uploaded ? '#1a9a4a' : '#c0392b', fontSize: '13px', fontWeight: 600 }}>
                      {uploaded ? 'Uploaded' : 'Missing'}
                    </span>

                    <label style={styles.uploadLabel}>
                      <input
                        type="file"
                        accept={filename.endsWith('.xlsx') ? '.xlsx,.xls' : '.pdf'}
                        ref={(el) => { inputRefs.current[filename] = el }}
                        onChange={() => handleUpload(filename)}
                        style={{ display: 'none' }}
                      />
                      {status === 'uploading' ? 'Uploading...' : uploaded ? 'Replace' : 'Upload file'}
                    </label>

                    {status && status !== 'uploading' && (
                      <span style={{ fontSize: '12px', color: status === 'done' ? '#1a9a4a' : '#c0392b' }}>
                        {status === 'done' ? 'Saved!' : status}
                      </span>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </section>

        {/* Section: Google Sheets */}
        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>Google Sheets Links (optional)</h2>
          <p style={styles.sectionDesc}>
            If you share your spreadsheet on Google Sheets, paste the link below. Customers will see an
            &ldquo;Open in Google Sheets&rdquo; button alongside the file download.
            <br />
            <strong>How to get the link:</strong> In Google Sheets → Share → &ldquo;Anyone with the link&rdquo; → Copy link.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {PRODUCT_SHEET_LABELS.map(({ id, label, hint }) => {
              const status = sheetSaveStatus[id]
              return (
                <div key={id} style={styles.sheetRow}>
                  <label style={styles.sheetLabel}>{label}</label>
                  <p style={styles.sheetHint}>{hint}</p>
                  <div style={styles.sheetInputRow}>
                    <input
                      type="url"
                      placeholder="https://docs.google.com/spreadsheets/d/..."
                      value={sheetInputs[id] || ''}
                      onChange={(e) => setSheetInputs((prev) => ({ ...prev, [id]: e.target.value }))}
                      style={styles.sheetInput}
                    />
                    <button onClick={() => handleSaveSheet(id)} style={styles.saveBtn}>
                      {status === 'saving' ? 'Saving...' : status === 'saved' ? 'Saved ✓' : 'Save'}
                    </button>
                  </div>
                  {status && !['saving', 'saved'].includes(status) && (
                    <p style={{ fontSize: '12px', color: '#c0392b', marginTop: '4px' }}>{status}</p>
                  )}
                </div>
              )
            })}
          </div>
        </section>

        {/* Section: Orders */}
        <section style={styles.section}>
          <h2 style={styles.sectionTitle}>Sales &amp; Orders</h2>
          <p style={styles.sectionDesc}>
            Paid orders from Stripe. Showing latest 100.
          </p>

          {/* Revenue summary */}
          <div style={{ display: 'flex', gap: 16, marginBottom: 20, flexWrap: 'wrap' }}>
            <div style={styles.statCard}>
              <div style={styles.statNum}>{orders?.length ?? '—'}</div>
              <div style={styles.statLabel}>Total Orders</div>
            </div>
            <div style={styles.statCard}>
              <div style={styles.statNum}>AU${ordersRevenue}</div>
              <div style={styles.statLabel}>Total Revenue</div>
            </div>
          </div>

          {ordersLoading ? (
            <p style={{ fontSize: 14, color: '#aaa' }}>Loading orders…</p>
          ) : !orders || orders.length === 0 ? (
            <p style={{ fontSize: 14, color: '#aaa' }}>No paid orders yet.</p>
          ) : (
            <div style={{ overflowX: 'auto' }}>
              <table style={styles.table}>
                <thead>
                  <tr>
                    <th style={styles.th}>Date</th>
                    <th style={styles.th}>Customer</th>
                    <th style={styles.th}>Email</th>
                    <th style={styles.th}>Product</th>
                    <th style={styles.th}>Amount</th>
                  </tr>
                </thead>
                <tbody>
                  {orders.map((o) => (
                    <tr key={o.id} style={{ borderBottom: '1px solid #f0ebe4' }}>
                      <td style={styles.td}>
                        {new Date(o.created).toLocaleDateString('en-AU', {
                          day: '2-digit', month: 'short', year: 'numeric',
                        })}
                      </td>
                      <td style={styles.td}>{o.name}</td>
                      <td style={styles.td}>{o.email}</td>
                      <td style={styles.td}>
                        <span style={styles.productPill}>{o.product}</span>
                      </td>
                      <td style={{ ...styles.td, fontWeight: 700, color: '#1a9a4a' }}>
                        {o.currency} ${o.amount}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>

        {/* Section: How it works */}
        <section style={{ ...styles.section, backgroundColor: '#f5f0ea', border: 'none' }}>
          <h2 style={styles.sectionTitle}>Customer delivery flow</h2>
          <ol style={styles.flowList}>
            <li>Customer clicks &ldquo;Buy&rdquo; → pays via Stripe</li>
            <li>Stripe redirects them to the secure download page</li>
            <li>They see download buttons for each file in their product</li>
            <li>If you set a Google Sheets link, they also see &ldquo;Open in Google Sheets&rdquo;</li>
            <li>Files are never public — each download link is tied to their paid session</li>
          </ol>
        </section>
      </div>
    </div>
  )
}

const styles: Record<string, React.CSSProperties> = {
  page: {
    minHeight: '100vh',
    backgroundColor: '#FAF6F0',
    padding: '32px 24px',
  },
  container: {
    maxWidth: '760px',
    margin: '0 auto',
    display: 'flex',
    flexDirection: 'column',
    gap: '24px',
  },
  header: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingBottom: '16px',
    borderBottom: '1px solid #e7ddd0',
  },
  logo: {
    fontWeight: 800,
    fontSize: '18px',
    color: '#4E342E',
    letterSpacing: '-0.3px',
    marginRight: '8px',
  },
  badge: {
    fontSize: '11px',
    fontWeight: 700,
    color: '#B18B2B',
    backgroundColor: '#f5edd8',
    padding: '2px 8px',
    borderRadius: '99px',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  },
  logoutBtn: {
    fontSize: '13px',
    color: '#777',
    background: 'none',
    border: '1px solid #d4c9bc',
    borderRadius: '6px',
    padding: '6px 14px',
    cursor: 'pointer',
    fontFamily: 'inherit',
  },
  section: {
    backgroundColor: '#fff',
    border: '1px solid #e7ddd0',
    borderRadius: '16px',
    padding: '28px',
  },
  sectionTitle: {
    fontSize: '17px',
    fontWeight: 700,
    color: '#1a1a1a',
    margin: '0 0 6px',
  },
  sectionDesc: {
    fontSize: '14px',
    color: '#666',
    margin: '0 0 24px',
    lineHeight: 1.6,
  },
  fileList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '12px',
  },
  fileRow: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: '14px 16px',
    backgroundColor: '#FAF6F0',
    borderRadius: '10px',
    gap: '16px',
    flexWrap: 'wrap',
  },
  fileInfo: {
    flex: 1,
    minWidth: '180px',
  },
  fileName: {
    fontWeight: 600,
    fontSize: '14px',
    color: '#1a1a1a',
    marginBottom: '4px',
  },
  fileMeta: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    flexWrap: 'wrap',
  },
  code: {
    fontSize: '12px',
    color: '#555',
    backgroundColor: '#e8e0d6',
    padding: '2px 6px',
    borderRadius: '4px',
    fontFamily: 'monospace',
  },
  productTag: {
    fontSize: '11px',
    color: '#888',
  },
  fileActions: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    flexWrap: 'wrap',
  },
  dot: {
    width: '8px',
    height: '8px',
    borderRadius: '50%',
    flexShrink: 0,
    display: 'inline-block',
  },
  uploadLabel: {
    fontSize: '13px',
    fontWeight: 600,
    color: '#4E342E',
    backgroundColor: '#fff',
    border: '1.5px solid #4E342E',
    borderRadius: '6px',
    padding: '6px 14px',
    cursor: 'pointer',
  },
  sheetRow: {
    backgroundColor: '#FAF6F0',
    borderRadius: '10px',
    padding: '16px',
  },
  sheetLabel: {
    fontWeight: 600,
    fontSize: '14px',
    color: '#1a1a1a',
    display: 'block',
    marginBottom: '4px',
  },
  sheetHint: {
    fontSize: '13px',
    color: '#888',
    margin: '0 0 10px',
  },
  sheetInputRow: {
    display: 'flex',
    gap: '8px',
  },
  sheetInput: {
    flex: 1,
    padding: '10px 12px',
    fontSize: '13px',
    border: '1.5px solid #d4c9bc',
    borderRadius: '8px',
    outline: 'none',
    fontFamily: 'inherit',
    minWidth: 0,
  },
  saveBtn: {
    padding: '10px 18px',
    backgroundColor: '#B18B2B',
    color: '#fff',
    fontWeight: 700,
    fontSize: '13px',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontFamily: 'inherit',
    whiteSpace: 'nowrap',
  },
  flowList: {
    margin: '12px 0 0',
    paddingLeft: '20px',
    fontSize: '14px',
    color: '#555',
    lineHeight: 2,
  },
  statCard: {
    background: '#FAF6F0',
    border: '1px solid #e7ddd0',
    borderRadius: 10,
    padding: '16px 24px',
    minWidth: 140,
  },
  statNum: {
    fontSize: 22,
    fontWeight: 800,
    color: '#2A1A0E',
    letterSpacing: '-0.5px',
  },
  statLabel: {
    fontSize: 12,
    color: '#888',
    marginTop: 3,
    fontWeight: 500,
  },
  table: {
    width: '100%',
    borderCollapse: 'collapse' as const,
    fontSize: 13,
  },
  th: {
    textAlign: 'left' as const,
    padding: '8px 12px',
    fontSize: 11,
    fontWeight: 700,
    textTransform: 'uppercase' as const,
    letterSpacing: '0.07em',
    color: '#888',
    borderBottom: '2px solid #e7ddd0',
    whiteSpace: 'nowrap' as const,
  },
  td: {
    padding: '10px 12px',
    color: '#333',
    verticalAlign: 'middle' as const,
    fontSize: 13,
  },
  productPill: {
    display: 'inline-block',
    background: '#f5edd8',
    color: '#B18B2B',
    fontSize: 11,
    fontWeight: 700,
    padding: '2px 8px',
    borderRadius: 99,
  },
}
