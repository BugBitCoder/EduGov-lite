
import { Outlet, Link, useNavigate } from 'react-router-dom'
import { useEffect, useState } from 'react'

export default function App() {
  const navigate = useNavigate()
  const [token, setToken] = useState(localStorage.getItem('token'))
  const [me, setMe] = useState(null)

  useEffect(() => {
    if (!token) return
    fetch((import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000') + '/users/me', {
      headers: { Authorization: 'Bearer ' + token }
    }).then(r => r.json()).then(setMe).catch(() => {})
  }, [token])

  function logout() {
    localStorage.removeItem('token')
    setToken(null)
    navigate('/login')
  }

  return (
    <div className="min-h-screen">
      <nav className="bg-white shadow sticky top-0 z-10">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="font-bold">EduGov Lite</span>
            <Link to="/dashboard" className="hover:underline">Dashboard</Link>
            <Link to="/requests" className="hover:underline">Requests</Link>
            <Link to="/grievances" className="hover:underline">Grievances</Link>
          </div>
          <div className="flex items-center gap-3">
            {me && <span className="text-sm text-gray-600">{me.full_name} • {me.role}</span>}
            {token ? (
              <button onClick={logout} className="px-3 py-1 rounded-xl bg-gray-900 text-white">Logout</button>
            ) : (
              <Link to="/login" className="px-3 py-1 rounded-xl bg-gray-900 text-white">Login</Link>
            )}
          </div>
        </div>
      </nav>
      <main className="max-w-5xl mx-auto p-4">
        <Outlet />
      </main>
    </div>
  )
}
