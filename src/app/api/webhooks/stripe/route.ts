/**
 * Stripe webhook endpoint
 *
 * Handles: checkout.session.completed
 * - Sends order confirmation email via Resend (backup delivery if redirect fails)
 *
 * Setup:
 * 1. Add STRIPE_WEBHOOK_SECRET to .env.local (get from Stripe Dashboard → Webhooks)
 * 2. Register this endpoint in Stripe: POST /api/webhooks/stripe
 * 3. Select event: checkout.session.completed
 */

import { NextRequest, NextResponse } from 'next/server'
import type Stripe from 'stripe'
import stripeLib from '@/lib/stripe'
import { sendOrderConfirmationEmail } from '@/lib/email'
import { PRODUCTS } from '@/lib/products'

// Raw body is required for signature verification — disable body parsing
export const runtime = 'nodejs'

const PRODUCT_NAMES: Record<string, string> = Object.fromEntries(
  Object.entries(PRODUCTS).map(([id, p]) => [id, p.name]),
)

export async function POST(request: NextRequest) {
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET
  if (!webhookSecret) {
    console.error('[webhook] STRIPE_WEBHOOK_SECRET not configured')
    return NextResponse.json({ error: 'Webhook not configured' }, { status: 500 })
  }

  const body = await request.text()
  const signature = request.headers.get('stripe-signature')

  if (!signature) {
    return NextResponse.json({ error: 'Missing stripe-signature header' }, { status: 400 })
  }

  let event: Stripe.Event
  try {
    event = stripeLib.webhooks.constructEvent(body, signature, webhookSecret)
  } catch (err) {
    console.error('[webhook] Signature verification failed:', err)
    return NextResponse.json({ error: 'Invalid webhook signature' }, { status: 400 })
  }

  // Handle completed checkout
  if (event.type === 'checkout.session.completed') {
    const session = event.data.object as Stripe.Checkout.Session

    if (session.payment_status === 'paid') {
      const email = session.customer_details?.email
      const name = session.customer_details?.name || 'there'
      const productId = session.metadata?.productId ?? ''
      const files = session.metadata?.files?.split(',').map((f) => f.trim()).filter(Boolean) ?? []
      const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://carpentrypro.com.au'

      if (email) {
        try {
          await sendOrderConfirmationEmail({
            to: email,
            customerName: name,
            productName: PRODUCT_NAMES[productId] ?? 'Your Purchase',
            sessionId: session.id,
            files,
            baseUrl,
          })
          console.log(`[webhook] Confirmation email sent to ${email} for session ${session.id}`)
        } catch (err) {
          // Log but don't fail the webhook — Stripe will retry on 5xx
          console.error('[webhook] Failed to send confirmation email:', err)
        }
      } else {
        console.warn(`[webhook] No customer email for session ${session.id}`)
      }
    }
  }

  return NextResponse.json({ received: true })
}
