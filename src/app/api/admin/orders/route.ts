import { NextRequest, NextResponse } from 'next/server'
import { verifyAdminToken } from '@/lib/adminAuth'
import stripe from '@/lib/stripe'

export async function GET(request: NextRequest) {
  if (!verifyAdminToken(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  try {
    const sessions = await stripe.checkout.sessions.list({
      limit: 100,
      expand: ['data.customer_details'],
    })

    const orders = sessions.data
      .filter((s) => s.payment_status === 'paid')
      .map((s) => ({
        id: s.id,
        email: s.customer_details?.email ?? '—',
        name: s.customer_details?.name ?? '—',
        product: s.metadata?.productId ?? '—',
        amount: s.amount_total != null ? (s.amount_total / 100).toFixed(2) : '0.00',
        currency: (s.currency ?? 'aud').toUpperCase(),
        created: new Date(s.created * 1000).toISOString(),
      }))

    const totalRevenue = orders.reduce((sum, o) => sum + parseFloat(o.amount), 0)
    const totalOrders = orders.length

    return NextResponse.json({ orders, totalRevenue: totalRevenue.toFixed(2), totalOrders })
  } catch (error) {
    console.error('[admin/orders] Error fetching from Stripe:', error)
    return NextResponse.json({ error: 'Failed to fetch orders' }, { status: 500 })
  }
}
