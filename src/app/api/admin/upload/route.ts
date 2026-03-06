import { NextRequest, NextResponse } from 'next/server'
import { verifyAdminToken } from '@/lib/adminAuth'
import { saveProductFile, PRODUCT_FILES } from '@/lib/storage'

const MAX_SIZE_BYTES = 50 * 1024 * 1024 // 50 MB

export async function POST(request: NextRequest) {
  if (!verifyAdminToken(request)) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  const formData = await request.formData()
  const file = formData.get('file') as File | null
  const filename = formData.get('filename') as string | null

  if (!file || !filename) {
    return NextResponse.json({ error: 'Missing file or filename' }, { status: 400 })
  }

  if (!(PRODUCT_FILES as readonly string[]).includes(filename)) {
    return NextResponse.json({ error: 'Filename not in allowed list' }, { status: 400 })
  }

  if (file.size > MAX_SIZE_BYTES) {
    return NextResponse.json({ error: 'File too large (max 50 MB)' }, { status: 400 })
  }

  const bytes = await file.arrayBuffer()
  await saveProductFile(filename, Buffer.from(bytes))

  return NextResponse.json({ ok: true, filename, size: file.size })
}
