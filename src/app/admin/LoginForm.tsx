'use client'

import { useState } from 'react'

export default function LoginForm() {
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError('')
    setLoading(true)

    const res = await fetch('/api/admin/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ password }),
    })

    if (res.ok) {
      window.location.reload()
    } else {
      const data = await res.json()
      setError(data.error || 'Incorrect password')
    }
    setLoading(false)
  }

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <div style={styles.logo}>CarpentryPro</div>
        <h1 style={styles.heading}>Admin Access</h1>
        <p style={styles.sub}>Enter your admin password to manage product files and delivery settings.</p>

        <form onSubmit={handleSubmit}>
          <input
            type="password"
            placeholder="Admin password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={styles.input}
          />
          {error && <p style={styles.error}>{error}</p>}
          <button type="submit" disabled={loading} style={styles.btn}>
            {loading ? 'Verifying...' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  )
}

const styles: Record<string, React.CSSProperties> = {
  page: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FAF6F0',
    padding: '24px',
  },
  card: {
    backgroundColor: '#fff',
    border: '1px solid #e7ddd0',
    borderRadius: '16px',
    padding: '40px',
    width: '100%',
    maxWidth: '400px',
  },
  logo: {
    fontWeight: 800,
    fontSize: '18px',
    color: '#4E342E',
    marginBottom: '24px',
    letterSpacing: '-0.3px',
  },
  heading: {
    fontSize: '22px',
    fontWeight: 700,
    color: '#1a1a1a',
    margin: '0 0 8px',
  },
  sub: {
    fontSize: '14px',
    color: '#777',
    margin: '0 0 28px',
    lineHeight: 1.5,
  },
  input: {
    width: '100%',
    padding: '12px 14px',
    fontSize: '15px',
    border: '1.5px solid #d4c9bc',
    borderRadius: '8px',
    outline: 'none',
    boxSizing: 'border-box',
    marginBottom: '12px',
    fontFamily: 'inherit',
  },
  error: {
    color: '#c0392b',
    fontSize: '13px',
    margin: '0 0 12px',
  },
  btn: {
    width: '100%',
    padding: '13px',
    backgroundColor: '#4E342E',
    color: '#fff',
    fontWeight: 700,
    fontSize: '15px',
    border: 'none',
    borderRadius: '8px',
    cursor: 'pointer',
    fontFamily: 'inherit',
  },
}
