
import { useEffect, useState } from 'react'

export default function Grievances() {
  const [items, setItems] = useState([])
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')

  const token = localStorage.getItem('token')
  const base = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000'
  const headers = { 'Content-Type': 'application/json', Authorization: 'Bearer ' + token }

  async function load() {
    const res = await fetch(base + '/grievances', { headers })
    const data = await res.json()
    setItems(data)
  }

  async function submit(e) {
    e.preventDefault()
    await fetch(base + '/grievances', {
      method: 'POST',
      headers,
      body: JSON.stringify({ title, description })
    })
    setTitle(''); setDescription('')
    load()
  }

  useEffect(() => { load() }, [])

  return (
    <div className="grid gap-4">
      <form onSubmit={submit} className="bg-white p-4 rounded-2xl shadow grid gap-3">
        <div className="flex gap-3">
          <input className="w-48 border rounded-xl p-2" placeholder="Title" value={title} onChange={e=>setTitle(e.target.value)} />
          <input className="flex-1 border rounded-xl p-2" placeholder="Describe the issue..." value={description} onChange={e=>setDescription(e.target.value)} />
          <button className="px-3 py-2 bg-gray-900 text-white rounded-xl">File</button>
        </div>
      </form>

      <div className="bg-white rounded-2xl shadow">
        <table className="w-full text-left">
          <thead><tr><th className="p-3">ID</th><th>Title</th><th>Status</th><th>Assignee</th><th>Created</th></tr></thead>
          <tbody>
            {items.map(i => (
              <tr key={i.id} className="border-t">
                <td className="p-3">{i.id}</td>
                <td>{i.title}</td>
                <td>{i.status}</td>
                <td>{i.assignee ?? '-'}</td>
                <td>{new Date(i.created_at).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
