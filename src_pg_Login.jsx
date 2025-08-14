
import { useState } from 'react'

export default function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')

  async function submit(e) {
    e.preventDefault()
    setError('')
    const form = new URLSearchParams()
    form.append('username', email)
    form.append('password', password)
    const res = await fetch((import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000') + '/auth/token', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: form
    })
    if (!res.ok) {
      setError('Invalid credentials')
      return
    }
    const data = await res.json()
    localStorage.setItem('token', data.access_token)
    window.location.href = '/dashboard'
  }

  return (
    <div className="max-w-md mx-auto bg-white rounded-2xl p-6 shadow">
      <h1 className="text-2xl font-semibold mb-2">Welcome back</h1>
      <p className="text-sm text-gray-500 mb-4">Login with your email and password.</p>
      {error && <div className="text-red-600 text-sm mb-2">{error}</div>}
      <form onSubmit={submit} className="space-y-3">
        <input className="w-full border rounded-xl p-2" placeholder="Email" value={email} onChange={e=>setEmail(e.target.value)} />
        <input className="w-full border rounded-xl p-2" placeholder="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)} />
        <button className="w-full bg-gray-900 text-white rounded-xl p-2">Login</button>
      </form>
      <p className="text-xs text-gray-500 mt-3">Tip: Create a user at <code>/docs</code> on the API.</p>
    </div>
  )
}
