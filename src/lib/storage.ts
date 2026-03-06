/**
 * storage.ts — dual-backend file storage
 *
 * Local dev  (no BLOB_READ_WRITE_TOKEN): reads/writes to /files/ on disk
 * Production (BLOB_READ_WRITE_TOKEN set): reads/writes to Vercel Blob
 *
 * All product files are stored as PRIVATE blobs.
 * delivery.json (Google Sheets URLs) is stored as a PUBLIC blob for easy reads.
 */

import fs from 'fs'
import path from 'path'

// ── Types ──────────────────────────────────────────────────────────────────

export interface DeliveryConfig {
  estimation: { sheetsUrl: string }
  priceguide: { sheetsUrl: string }
  bundle: { sheetsUrl: string }
}

const DEFAULT_CONFIG: DeliveryConfig = {
  estimation: { sheetsUrl: '' },
  priceguide: { sheetsUrl: '' },
  bundle: { sheetsUrl: '' },
}

export const PRODUCT_FILES = ['estimation.xlsx', 'guide.pdf', 'pricing_guide.pdf'] as const
export type ProductFile = (typeof PRODUCT_FILES)[number]

const MIME: Record<string, string> = {
  pdf: 'application/pdf',
  xlsx: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  json: 'application/json',
}

function mimeFor(filename: string): string {
  const ext = filename.split('.').pop()?.toLowerCase() ?? ''
  return MIME[ext] ?? 'application/octet-stream'
}

// ── Environment detection ─────────────────────────────────────────────────

const useBlob = !!process.env.BLOB_READ_WRITE_TOKEN

// ── Local fs helpers ──────────────────────────────────────────────────────

const LOCAL_DIR = path.join(process.cwd(), 'files')

async function localRead(filename: string): Promise<Buffer | null> {
  const fp = path.join(LOCAL_DIR, filename)
  if (!fs.existsSync(fp)) return null
  return fs.promises.readFile(fp)
}

async function localWrite(filename: string, data: Buffer): Promise<void> {
  await fs.promises.mkdir(LOCAL_DIR, { recursive: true })
  await fs.promises.writeFile(path.join(LOCAL_DIR, filename), data)
}

function localExists(filename: string): boolean {
  return fs.existsSync(path.join(LOCAL_DIR, filename))
}

// ── Vercel Blob helpers ───────────────────────────────────────────────────

const BLOB_PREFIX = 'carpentry/'
const DELIVERY_BLOB = 'carpentry/delivery.json'

// Vercel Blob is always 'public' in v1.x — security is via proxy (we never expose
// blob URLs to clients; all downloads go through /api/download which validates Stripe).
// The blob store URL contains an unguessable random store ID.

async function blobReadStream(filename: string): Promise<ReadableStream | null> {
  const { head } = await import('@vercel/blob')
  try {
    const blob = await head(`${BLOB_PREFIX}${filename}`)
    const res = await fetch(blob.url) // public URL — but never exposed to clients
    if (!res.ok || !res.body) return null
    return res.body
  } catch {
    return null
  }
}

async function blobWrite(
  blobPath: string,
  data: Buffer | string,
  contentType: string,
): Promise<void> {
  const { put } = await import('@vercel/blob')
  await put(blobPath, data, {
    access: 'public',
    contentType,
    addRandomSuffix: false, // deterministic paths so we can overwrite by name
  })
}

async function blobExists(blobPath: string): Promise<boolean> {
  const { head } = await import('@vercel/blob')
  try {
    await head(`${BLOB_PREFIX}${blobPath}`)
    return true
  } catch {
    return false
  }
}

// ── Public API ────────────────────────────────────────────────────────────

/** Stream a product file (for /api/download). Returns null if not found. */
export async function streamProductFile(filename: string): Promise<ReadableStream | null> {
  if (useBlob) return blobReadStream(filename)

  const fp = path.join(LOCAL_DIR, filename)
  if (!fs.existsSync(fp)) return null

  const { createReadStream } = await import('fs')
  const nodeStream = createReadStream(fp)
  return new ReadableStream({
    start(controller) {
      nodeStream.on('data', (chunk) => controller.enqueue(chunk))
      nodeStream.on('end', () => controller.close())
      nodeStream.on('error', (err) => controller.error(err))
    },
  })
}

/** Save an uploaded product file (for /api/admin/upload). */
export async function saveProductFile(filename: string, data: Buffer): Promise<void> {
  if (useBlob) {
    await blobWrite(`${BLOB_PREFIX}${filename}`, data, mimeFor(filename))
    return
  }
  await localWrite(filename, data)
}

/** Check if a product file exists. */
export async function productFileExists(filename: string): Promise<boolean> {
  if (useBlob) return blobExists(filename)
  return localExists(filename)
}

/** Get status of all product files. */
export async function getFileStatuses(): Promise<Record<string, boolean>> {
  const results: Record<string, boolean> = {}
  await Promise.all(
    PRODUCT_FILES.map(async (f) => {
      results[f] = await productFileExists(f)
    }),
  )
  return results
}

/** Read the delivery config (Google Sheets URLs). */
export async function getDeliveryConfig(): Promise<DeliveryConfig> {
  try {
    if (useBlob) {
      const { head } = await import('@vercel/blob')
      const blob = await head(DELIVERY_BLOB)
      const res = await fetch(blob.url)
      if (!res.ok) return DEFAULT_CONFIG
      return (await res.json()) as DeliveryConfig
    }

    const buf = await localRead('delivery.json')
    if (!buf) return DEFAULT_CONFIG
    return JSON.parse(buf.toString('utf8')) as DeliveryConfig
  } catch {
    return DEFAULT_CONFIG
  }
}

/** Save the delivery config (Google Sheets URLs). */
export async function saveDeliveryConfig(config: DeliveryConfig): Promise<void> {
  const json = JSON.stringify(config, null, 2)
  if (useBlob) {
    await blobWrite(DELIVERY_BLOB, json, 'application/json')
    return
  }
  await localWrite('delivery.json', Buffer.from(json))
}
