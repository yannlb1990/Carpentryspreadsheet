import { NextRequest, NextResponse } from 'next/server'
import path from 'path'
import stripe from '@/lib/stripe'
import { streamProductFile } from '@/lib/storage'
import { isRateLimited, getClientIp } from '@/lib/rateLimit'

const MIME_TYPES: Record<string, string> = {
  pdf: 'application/pdf',
  xlsx: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
}

/** Download links expire 72 hours after the Stripe session was created */
const DOWNLOAD_EXPIRY_MS = 72 * 60 * 60 * 1000

export async function GET(request: NextRequest) {
  // Rate limit: 20 downloads per IP per hour
  const ip = getClientIp(request)
  if (isRateLimited(`download:${ip}`, { limit: 20, windowMs: 60 * 60 * 1000 })) {
    return NextResponse.json({ error: 'Too many requests. Please try again later.' }, { status: 429 })
  }

  const { searchParams } = new URL(request.url)
  const sessionId = searchParams.get('session_id')
  const file = searchParams.get('file')

  if (!sessionId || !file) {
    return NextResponse.json({ error: 'Missing parameters' }, { status: 400 })
  }

  // Validate Stripe session
  let session
  try {
    session = await stripe.checkout.sessions.retrieve(sessionId)
  } catch {
    return NextResponse.json({ error: 'Invalid session' }, { status: 403 })
  }

  // Guard: must be paid
  if (session.payment_status !== 'paid') {
    return NextResponse.json({ error: 'Payment not confirmed' }, { status: 403 })
  }

  // Guard: download link expires after 72 hours
  const sessionAgeMs = Date.now() - session.created * 1000
  if (sessionAgeMs > DOWNLOAD_EXPIRY_MS) {
    return NextResponse.json(
      {
        error: 'Download link expired. Please contact support@carpentrypro.com.au to receive a new link.',
      },
      { status: 410 },
    )
  }

  // Guard: file must be in the session's whitelist (set at checkout time)
  const allowedFiles = (session.metadata?.files ?? '').split(',').map((f) => f.trim())
  if (!allowedFiles.includes(file)) {
    return NextResponse.json({ error: 'File not included in this purchase' }, { status: 403 })
  }

  // Guard: strip any path components — only basename allowed (path traversal prevention)
  const basename = path.basename(file)
  if (basename !== file) {
    return NextResponse.json({ error: 'Invalid file name' }, { status: 403 })
  }

  const ext = basename.split('.').pop()?.toLowerCase() ?? ''
  const contentType = MIME_TYPES[ext] ?? 'application/octet-stream'

  // Stream from storage (local fs or Vercel Blob depending on environment)
  const stream = await streamProductFile(basename)
  if (!stream) {
    return NextResponse.json({ error: 'File not found on server' }, { status: 404 })
  }

  return new NextResponse(stream, {
    headers: {
      'Content-Type': contentType,
      'Content-Disposition': `attachment; filename="${basename}"`,
      'Cache-Control': 'no-store, no-cache, private',
      'X-Content-Type-Options': 'nosniff',
    },
  })
}
