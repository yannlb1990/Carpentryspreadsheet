# CarpentryPro — Digital Product Shop

Sell carpentry estimation spreadsheets and PDFs via Stripe Checkout.
Customers pay → redirected to a secure download page → download their files instantly.

**Stack**: Next.js 14 (App Router) · Stripe Checkout · Vercel Blob · TypeScript

---

## Local Development Setup

### 1. Clone & install
```bash
git clone https://github.com/yannlb1990/Carpentryspreadsheet.git
cd Carpentryspreadsheet
npm install
```

### 2. Configure environment variables
```bash
cp .env.local.example .env.local
```
Open `.env.local` and fill in:

| Variable | Where to get it |
|----------|----------------|
| `ADMIN_PASSWORD` | Choose a strong password — used to log in to `/admin` |
| `STRIPE_SECRET_KEY` | Stripe Dashboard → Developers → API keys |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Same page |
| `STRIPE_PRICE_ESTIMATION` | Create product in Stripe → copy Price ID |
| `STRIPE_PRICE_PRICEGUIDE` | Create product in Stripe → copy Price ID |
| `STRIPE_PRICE_BUNDLE` | Create product in Stripe → copy Price ID |
| `NEXT_PUBLIC_BASE_URL` | `http://localhost:3002` for local dev |

### 3. Set up Stripe products
Go to Stripe Dashboard → Products → Add product:

| Product | Price | Currency |
|---------|-------|----------|
| Carpentry Estimation 2026 | $29.90 | AUD |
| Carpentry Pricing Guide 2026 | $9.99 | AUD |
| Complete Bundle | $34.99 | AUD |

Copy each **Price ID** (starts with `price_`) into `.env.local`.

### 4. Add your product files (local dev only)
Place your files in the `/files` directory (gitignored — never committed):
```
files/
├── estimation.xlsx
├── guide.pdf
└── pricing_guide.pdf
```
In production, upload via the `/admin` panel instead.

### 5. Start dev server
```bash
npm run dev -- --port 3002
```
Open http://localhost:3002

---

## Production Deployment (Vercel)

### Step 1 — Connect GitHub to Vercel
1. Go to vercel.com → **Add New → Project**
2. Import `yannlb1990/Carpentryspreadsheet` from GitHub
3. Framework preset: **Next.js** (auto-detected)
4. Click **Deploy** — first deploy may fail (no env vars yet, that's OK)

### Step 2 — Set environment variables in Vercel
Go to **Project → Settings → Environment Variables** and add:

| Variable | Value |
|----------|-------|
| `ADMIN_PASSWORD` | Your chosen password |
| `STRIPE_SECRET_KEY` | `sk_live_...` (live key for production) |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | `pk_live_...` |
| `STRIPE_PRICE_ESTIMATION` | `price_...` |
| `STRIPE_PRICE_PRICEGUIDE` | `price_...` |
| `STRIPE_PRICE_BUNDLE` | `price_...` |
| `NEXT_PUBLIC_BASE_URL` | `https://your-domain.com` |

### Step 3 — Enable Vercel Blob storage
1. Go to **Project → Storage → Connect Store → Blob → Create New**
2. Name it (e.g., `carpentrypro-files`)
3. Click **Create** — Vercel automatically adds `BLOB_READ_WRITE_TOKEN` to your env vars
4. Redeploy: **Deployments → ... → Redeploy**

### Step 4 — Upload your product files via Admin
1. Go to `https://your-domain.com/admin`
2. Log in with your `ADMIN_PASSWORD`
3. Upload `estimation.xlsx`, `guide.pdf`, `pricing_guide.pdf`
4. Optionally paste your Google Sheets link so customers can open the spreadsheet in browser

### Step 5 — Test the full flow
Use Stripe test card: `4242 4242 4242 4242` · Expiry: `12/34` · CVC: `123`
1. Click Buy on the landing page
2. Complete Stripe Checkout
3. Redirect to `/success` → download buttons appear
4. Click download → file streams correctly

### Step 6 — Go live
Switch Stripe to **Live mode**, update `STRIPE_SECRET_KEY` and `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` in Vercel, redeploy.

---

## Project Structure

```
src/
├── app/
│   ├── page.tsx              Landing page (all sections)
│   ├── admin/                Password-protected admin panel
│   │   ├── page.tsx            Auth check (server component)
│   │   ├── LoginForm.tsx       Password form
│   │   └── Dashboard.tsx       File upload + Google Sheets config
│   ├── success/              Post-payment download page
│   │   ├── page.tsx
│   │   └── DownloadButton.tsx
│   └── api/
│       ├── checkout/         POST: create Stripe session
│       ├── download/         GET: validate payment → stream file
│       └── admin/
│           ├── login/        POST: set auth cookie | DELETE: logout
│           ├── upload/       POST: save file to storage
│           ├── status/       GET: which files exist
│           └── config/       GET/POST: Google Sheets URLs
├── lib/
│   ├── products.ts           Product catalog
│   ├── stripe.ts             Lazy Stripe singleton
│   ├── adminAuth.ts          Cookie token verification
│   └── storage.ts            Storage abstraction (local fs vs Vercel Blob)
└── files/                   Local dev only — product files (gitignored)
    └── delivery.json         Google Sheets URLs config
```

---

## Security Model

| Threat | Mitigation |
|--------|-----------|
| Download without paying | Every `/api/download` validates `session.payment_status === 'paid'` |
| Path traversal | `path.basename()` + whitelist from Stripe metadata |
| Unauthorized admin | SHA-256 hashed cookie, 8-hour expiry |
| Blob URL exposure | Downloads proxied through API — raw URLs never sent to browser |
| Secrets in git | `.env*.local` and product files (`*.pdf`, `*.xlsx`) are gitignored |

---

## Support

support@carpentrypro.com.au
