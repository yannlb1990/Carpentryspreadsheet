'use client'

import { useState, useEffect } from 'react'
import BuyButton from '@/app/BuyButton'

/**
 * Sticky bottom bar that appears after the user scrolls past the hero section.
 * Provides a persistent buy CTA without interrupting the reading flow.
 */
export default function StickyBuyBar() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => {
      // Appear after 80% of viewport height — typically past the hero
      setVisible(window.scrollY > window.innerHeight * 0.8)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <div
      role="complementary"
      aria-label="Quick purchase bar"
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        right: 0,
        zIndex: 200,
        background: 'rgba(13,9,6,0.97)',
        borderTop: '1px solid rgba(196,154,43,0.22)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        padding: '12px 20px',
        transform: visible ? 'translateY(0)' : 'translateY(100%)',
        transition: 'transform 0.28s cubic-bezier(0.4,0,0.2,1)',
        willChange: 'transform',
      }}
    >
      <div
        style={{
          maxWidth: 1140,
          margin: '0 auto',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 16,
          flexWrap: 'wrap',
        }}
      >
        {/* Left: product info */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <div
            style={{
              width: 38,
              height: 38,
              borderRadius: 9,
              background: 'rgba(196,154,43,0.15)',
              border: '1px solid rgba(196,154,43,0.3)',
              display: 'grid',
              placeItems: 'center',
              flexShrink: 0,
            }}
          >
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
              <rect x="3" y="3" width="18" height="18" rx="2" stroke="#C49A2B" strokeWidth="1.8" />
              <path d="M3 9h18M9 9v12M9 15h12" stroke="#C49A2B" strokeWidth="1.8" strokeLinecap="round" />
            </svg>
          </div>
          <div>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#fff', lineHeight: 1.2 }}>
              Complete Bundle — Spreadsheet + Pricing Guide
            </div>
            <div style={{ fontSize: 12, color: 'rgba(255,255,255,0.38)', marginTop: 2 }}>
              One-time download · Excel &amp; Google Sheets · Instant access
            </div>
          </div>
        </div>

        {/* Right: price + button */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 14, flexShrink: 0 }}>
          <div style={{ textAlign: 'right' }}>
            <div
              style={{
                fontSize: 22,
                fontWeight: 900,
                color: '#fff',
                letterSpacing: '-0.5px',
                lineHeight: 1,
              }}
            >
              AU<span style={{ fontSize: 13, fontWeight: 700, verticalAlign: 'top', marginTop: 4, display: 'inline-block' }}>$</span>34.99
            </div>
            <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.28)', marginTop: 2 }}>
              saves $4.90 vs. separate
            </div>
          </div>
          <BuyButton
            productId="bundle"
            label="Buy Now →"
            className="btn-primary"
            style={{ padding: '11px 22px', fontSize: '0.875rem' }}
          />
        </div>
      </div>
    </div>
  )
}
