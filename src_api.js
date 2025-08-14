
const API_URL = import.meta.env.VITE_API_URL || 'http://127.0.0.1:8000';

export async function api(path, { method='GET', body, token } = {}) {
  const res = await fetch(`${API_URL}${path}`, {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  if (!res.ok) {
    const msg = await res.text();
    throw new Error(msg || 'Request failed');
  }
  return res.json();
}
