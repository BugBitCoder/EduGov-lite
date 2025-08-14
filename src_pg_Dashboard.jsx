
import { useEffect, useState } from 'react'

function Card({ title, value }) {
  return (
    <div className="bg-white p-4 rounded-2xl shadow">
      <div className="text-sm text-gray-500">{title}</div>
      <div className="text-2xl font-semibold">{value}</div>
    </div>
  )
}

export default function Dashboard() {
  const [stats, setStats] = useState({ requests: 0, grievances: 0, announcements: 0 })
  const token = localStorage.getItem('token')

  useEffect(() => {
    async function load() {
      try {
        const base = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000'
        const headers = { Authorization: 'Bearer ' + token }
        const [r1, r2, r3] = await Promise.all([
          fetch(base + '/requests', { headers }),
          fetch(base + '/grievances', { headers }),
          fetch(base + '/announcements'),
        ])
        const [reqs, grvs, anns] = await Promise.all([r1.json(), r2.json(), r3.json()])
        setStats({ requests: reqs.length, grievances: grvs.length, announcements: anns.length })
      } catch {}
    }
    if (token) load()
  }, [token])

  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      <Card title="My Requests / All" value={stats.requests} />
      <Card title="My Grievances / All" value={stats.grievances} />
      <Card title="Announcements" value={stats.announcements} />
    </div>
  )
}
