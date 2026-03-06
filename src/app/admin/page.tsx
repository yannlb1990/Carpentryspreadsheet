import { cookies } from 'next/headers'
import { makeAdminToken } from '@/lib/adminAuth'
import LoginForm from './LoginForm'
import Dashboard from './Dashboard'

function isAuthenticated(): boolean {
  const cookieStore = cookies()
  const token = cookieStore.get('admin_token')?.value
  const password = process.env.ADMIN_PASSWORD
  if (!password || !token) return false
  return token === makeAdminToken(password)
}

export default function AdminPage() {
  if (!isAuthenticated()) {
    return <LoginForm />
  }
  return <Dashboard />
}
