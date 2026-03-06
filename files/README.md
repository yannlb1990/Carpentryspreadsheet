# /files — Protected Downloads

Place your actual product files here. This directory is served **only** via the
secure `/api/download` route, which validates payment before streaming.

**Do NOT put these files in `/public/`** — they would be publicly accessible.

## Required files

| Filename | Product |
|----------|---------|
| `estimation.xlsx` | Carpentry Estimation 2026 spreadsheet |
| `guide.pdf` | Quick-start guide (12 pages) |
| `pricing_guide.pdf` | Australian Carpentry Pricing Guide 2026 |

## Security

The download API enforces two guards:
1. The Stripe session must have `payment_status === 'paid'`
2. The requested filename must be in the session's `metadata.files` whitelist
   (prevents path traversal attacks like `../../etc/passwd`)
