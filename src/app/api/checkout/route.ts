import { NextRequest, NextResponse } from 'next/server'
import stripe from '@/lib/stripe'
import { PRODUCTS, ProductId } from '@/lib/products'
import { getDeliveryConfig } from '@/lib/storage'
import { isRateLimited, getClientIp } from '@/lib/rateLimit'

export async function POST(request: NextRequest) {
  // Rate limit: 10 checkout sessions per IP per 15 minutes
  const ip = getClientIp(request)
  if (isRateLimited(`checkout:${ip}`, { limit: 10, windowMs: 15 * 60 * 1000 })) {
    return NextResponse.json({ error: 'Too many requests. Please try again later.' }, { status: 429 })
  }

  try {
    const body = await request.json()
    const { productId } = body as { productId: ProductId }

    if (!productId || !(productId in PRODUCTS)) {
      return NextResponse.json({ error: 'Invalid product ID' }, { status: 400 })
    }

    const product = PRODUCTS[productId]
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'

    // Read Google Sheets URL from delivery config (if set by admin)
    const config = await getDeliveryConfig()
    const sheetsUrl = config[productId]?.sheetsUrl || ''

    const session = await stripe.checkout.sessions.create({
      mode: 'payment',
      line_items: [{ price: product.priceId, quantity: 1 }],
      metadata: {
        productId,
        files: product.files.join(','),
        ...(sheetsUrl ? { sheetsUrl } : {}),
      },
      customer_creation: 'always',
      success_url: `${baseUrl}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${baseUrl}/#pricing`,
    })

    return NextResponse.json({ url: session.url })
  } catch (error) {
    console.error('Checkout error:', error)
    return NextResponse.json({ error: 'Failed to create checkout session' }, { status: 500 })
  }
}
