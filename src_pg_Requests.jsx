
import { useEffect, useState } from 'react'

export default function Requests() {
  const [items, setItems] = useState([])
  const [type, setType] = useState('leave')
  const [description, setDescription] = useState('')

  const token = localStorage.getItem('token')
  const base = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000'
  const headers = { 'Content-Type': 'application/json', Authorization: 'Bearer ' + token }

  async function load() {
    const res = await fetch(base + '/requests', { headers })
    const data = await res.json()
    setItems(data)
  }

  async function submit(e) {
    e.preventDefault()
    await fetch(base + '/requests', {
      method: 'POST',
      headers,
      body: JSON.stringify({ type, description })
    })
    setDescription('')
    load()
  }

  useEffect(() => { load() }, [])

  return (
    <div className="grid gap-4">
      <form onSubmit={submit} className="bg-white p-4 rounded-2xl shadow grid gap-3">
        <div className="flex gap-3">
          <select className="border rounded-xl p-2" value={type} onChange={e=>setType(e.target.value)}>
            <option value="leave">Leave</option>
            <option value="event">Event</option>
            <option value="resource">Resource</option>
          </select>
          <input className="flex-1 border rounded-xl p-2" placeholder="Describe your request..." value={description} onChange={e=>setDescription(e.target.value)} />
          <button className="px-3 py-2 bg-gray-900 text-white rounded-xl">Submit</button>
        </div>
      </form>

      <div className="bg-white rounded-2xl shadow">
        <table className="w-full text-left">
          <thead><tr><th className="p-3">ID</th><th>Type</th><th>Description</th><th>Status</th><th>Created</th></tr></thead>
          <tbody>
            {items.map(i => (
              <tr key={i.id} className="border-t">
                <td className="p-3">{i.id}</td>
                <td>{i.type}</td>
                <td>{i.description}</td>
                <td>{i.status}</td>
                <td>{new Date(i.created_at).toLocaleString()}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}
