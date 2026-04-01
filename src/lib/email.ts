/**
 * email.ts — Resend integration for transactional emails
 *
 * Requires: RESEND_API_KEY in environment
 * From domain: must be verified in Resend dashboard
 */

const FILE_LABELS: Record<string, string> = {
  'estimation.xlsx': 'Carpentry Estimation Spreadsheet (Excel)',
  'guide.pdf': 'Quick-Start Guide (PDF)',
  'pricing_guide.pdf': 'Australian Carpentry Pricing Guide (PDF)',
}

interface OrderEmailProps {
  to: string
  customerName: string
  productName: string
  sessionId: string
  files: string[]
  baseUrl: string
}

export async function sendOrderConfirmationEmail(props: OrderEmailProps): Promise<void> {
  const apiKey = process.env.RESEND_API_KEY
  if (!apiKey) {
    console.warn('[email] RESEND_API_KEY not set — skipping order confirmation email')
    return
  }

  const downloadUrl = `${props.baseUrl}/success?session_id=${props.sessionId}`

  const fileListHtml = props.files
    .map(
      (f) =>
        `<li style="margin-bottom:8px;">📄 <strong>${FILE_LABELS[f] ?? f}</strong></li>`,
    )
    .join('')

  const html = `
<!DOCTYPE html>
<html lang="en-AU">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Your CarpentryPro Download is Ready</title>
</head>
<body style="margin:0;padding:0;background:#FAF7F2;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;color:#1a1a1a;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#FAF7F2;padding:40px 20px;">
    <tr>
      <td align="center">
        <table width="100%" cellpadding="0" cellspacing="0" style="max-width:560px;background:#fff;border-radius:16px;border:1px solid #e7ddd0;overflow:hidden;">

          <!-- Header -->
          <tr>
            <td style="background:#2A1A0E;padding:28px 32px;">
              <span style="font-size:18px;font-weight:800;color:#C49A2B;letter-spacing:-0.3px;">CarpentryPro</span>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:32px;">

              <!-- Check icon -->
              <div style="text-align:center;margin-bottom:24px;">
                <div style="width:64px;height:64px;background:#1a9a4a;border-radius:50%;display:inline-flex;align-items:center;justify-content:center;margin:0 auto;">
                  <span style="color:#fff;font-size:28px;">✓</span>
                </div>
              </div>

              <h1 style="font-size:22px;font-weight:800;color:#1a1a1a;margin:0 0 8px;text-align:center;">
                Your download is ready, ${props.customerName}!
              </h1>
              <p style="font-size:15px;color:#666;margin:0 0 28px;text-align:center;line-height:1.6;">
                Payment confirmed. Click the button below to access your files.
              </p>

              <!-- CTA button -->
              <div style="text-align:center;margin-bottom:28px;">
                <a
                  href="${downloadUrl}"
                  style="display:inline-block;background:#C49A2B;color:#1a1a1a;font-weight:800;font-size:15px;padding:16px 32px;border-radius:10px;text-decoration:none;letter-spacing:-0.2px;"
                >
                  Download Your Files →
                </a>
              </div>

              <!-- Product summary -->
              <div style="background:#FAF7F2;border:1px solid #e7ddd0;border-radius:10px;padding:20px 22px;margin-bottom:24px;">
                <p style="font-size:12px;font-weight:700;color:#8A7A6E;text-transform:uppercase;letter-spacing:0.08em;margin:0 0 8px;">
                  You purchased
                </p>
                <p style="font-size:15px;font-weight:700;color:#1a1a1a;margin:0 0 14px;">${props.productName}</p>
                <p style="font-size:12px;font-weight:700;color:#8A7A6E;text-transform:uppercase;letter-spacing:0.08em;margin:0 0 8px;">
                  Files included
                </p>
                <ul style="margin:0;padding-left:18px;font-size:14px;color:#555;line-height:1.8;">
                  ${fileListHtml}
                </ul>
              </div>

              <!-- Getting started tips -->
              <div style="margin-bottom:24px;">
                <p style="font-size:13px;font-weight:700;color:#3D2B1F;text-transform:uppercase;letter-spacing:0.05em;margin:0 0 10px;">
                  Getting started
                </p>
                <ol style="margin:0;padding-left:18px;font-size:13px;color:#555;line-height:2;">
                  <li>Click the download button above and save files to a dedicated folder</li>
                  <li>Open <code style="background:#f0ebe4;padding:1px 5px;border-radius:3px;">estimation.xlsx</code> in Excel or upload to Google Drive</li>
                  <li>Read the Quick-Start Guide — takes under 15 minutes</li>
                  <li>Fill in the yellow cells and send your first accurate quote</li>
                </ol>
              </div>

              <!-- Support -->
              <p style="font-size:13px;color:#aaa;text-align:center;margin:0;">
                Questions? Reply to this email or contact
                <a href="mailto:support@carpentrypro.com.au" style="color:#C49A2B;text-decoration:none;">
                  support@carpentrypro.com.au
                </a>
              </p>

            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#FAF7F2;border-top:1px solid #e7ddd0;padding:20px 32px;text-align:center;">
              <p style="font-size:12px;color:#aaa;margin:0;line-height:1.6;">
                CarpentryPro · Professional tools for Australian tradies<br/>
                <a href="${props.baseUrl}/refund" style="color:#aaa;">Refund Policy</a> ·
                <a href="${props.baseUrl}/privacy" style="color:#aaa;">Privacy</a>
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
`

  const res = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${apiKey}`,
    },
    body: JSON.stringify({
      from: 'CarpentryPro <orders@carpentrypro.com.au>',
      reply_to: 'support@carpentrypro.com.au',
      to: props.to,
      subject: `Your CarpentryPro files are ready — ${props.productName}`,
      html,
    }),
  })

  if (!res.ok) {
    const body = await res.text()
    throw new Error(`Resend API error ${res.status}: ${body}`)
  }
}
