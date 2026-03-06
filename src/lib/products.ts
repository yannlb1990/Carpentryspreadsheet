export const PRODUCTS = {
  estimation: {
    name: 'Carpentry Estimation 2026 (Spreadsheet + Guide)',
    price: 29.90,
    priceId: process.env.STRIPE_PRICE_ESTIMATION!,
    files: ['estimation.xlsx', 'guide.pdf'],
    description: 'Professional estimation spreadsheet + 12-page setup guide',
  },
  priceguide: {
    name: 'Australian Carpentry Pricing Guide 2026',
    price: 9.99,
    priceId: process.env.STRIPE_PRICE_PRICEGUIDE!,
    files: ['pricing_guide.pdf'],
    description: '19-chapter ebook with current Australian market rates',
  },
  bundle: {
    name: 'Complete Bundle — Save $4.90',
    price: 34.99,
    priceId: process.env.STRIPE_PRICE_BUNDLE!,
    files: ['estimation.xlsx', 'guide.pdf', 'pricing_guide.pdf'],
    description: 'Everything: estimation tool + pricing guide + setup guide',
  },
} as const

export type ProductId = keyof typeof PRODUCTS
