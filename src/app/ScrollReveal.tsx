'use client'

import { useEffect } from 'react'

export default function ScrollReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('visible')
            observer.unobserve(e.target)
          }
        })
      },
      { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
    )

    // Observe all .reveal elements, with staggered delay for groups
    document.querySelectorAll<HTMLElement>('.reveal').forEach((el, i) => {
      const parent = el.closest('.problem-list, .proof-grid, .pricing-grid, .steps, .feature-list')
      if (parent) {
        const siblings = Array.from(parent.querySelectorAll<HTMLElement>('.reveal'))
        const idx = siblings.indexOf(el)
        el.style.transitionDelay = `${idx * 0.08}s`
      }
      observer.observe(el)
    })

    return () => observer.disconnect()
  }, [])

  return null
}
