import { NextRequest } from 'next/server'
import crypto from 'crypto'

export function makeAdminToken(password: string): string {
  return crypto
    .createHash('sha256')
    .update(password + 'carpentry-admin-v1')
    .digest('hex')
}

export function verifyAdminToken(request: NextRequest): boolean {
  const password = process.env.ADMIN_PASSWORD
  if (!password) return false
  const token = request.cookies.get('admin_token')?.value
  return token === makeAdminToken(password)
}
