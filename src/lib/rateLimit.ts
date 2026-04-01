/**
 * Simple in-memory rate limiter.
 *
 * Works best-effort on Vercel serverless (each warm instance tracks its own window).
 * For strict rate limiting in production, replace with Upstash Redis.
 */

interface RateLimitEntry {
  count: number
  resetAt: number
}

const store = new Map<string, RateLimitEntry>()

interface RateLimitOptions {
  /** Max requests allowed in the window */
  limit: number
  /** Window duration in milliseconds */
  windowMs: number
}

/**
 * Returns true if the request should be blocked (rate limit exceeded).
 */
export function isRateLimited(key: string, options: RateLimitOptions): boolean {
  const now = Date.now()
  const entry = store.get(key)

  if (!entry || now > entry.resetAt) {
    // First request or window expired — start fresh
    store.set(key, { count: 1, resetAt: now + options.windowMs })
    return false
  }

  entry.count++
  if (entry.count > options.limit) {
    return true
  }

  return false
}

/** Extract IP address from Next.js request headers */
export function getClientIp(request: Request): string {
  const xff = request.headers.get('x-forwarded-for')
  if (xff) return xff.split(',')[0].trim()
  return request.headers.get('x-real-ip') ?? 'unknown'
}
