import { NextRequest, NextResponse } from 'next/server'
import { verifyAdminToken } from '@/lib/adminAuth'
import { getDeliveryConfig, saveDeliveryConfig, DeliveryConfig } from '@/lib/storage'

const ALLOWED_PRODUCT_IDS: Array<keyof DeliveryConfig> = ['estimation', 'priceguide', 'bundle']

export async function GET(request: NextRequest) {
  if (!verifyAdminToken(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }
  const config = await getDeliveryConfig()
  return NextResponse.json(config)
}

export async function POST(request: NextRequest) {
  if (!verifyAdminToken(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const body = await request.json()
  const { productId, sheetsUrl } = body as { productId: keyof DeliveryConfig; sheetsUrl: string }

  if (!ALLOWED_PRODUCT_IDS.includes(productId)) {
    return NextResponse.json({ error: 'Invalid product ID' }, { status: 400 })
  }

  if (sheetsUrl && !sheetsUrl.startsWith('https://docs.google.com/')) {
    return NextResponse.json({ error: 'Must be a Google Sheets URL' }, { status: 400 })
  }

  const config = await getDeliveryConfig()
  config[productId] = { sheetsUrl: sheetsUrl.trim() }
  await saveDeliveryConfig(config)

  return NextResponse.json({ ok: true })
}
