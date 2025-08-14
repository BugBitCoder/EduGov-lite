
# EduGov Lite — E‑Governance Hackathon App

An end‑to‑end **e‑governance platform for academic institutions** built for hackathons. 
Includes **FastAPI + SQLite + JWT auth** on the backend, and **React + Vite + Tailwind** on the frontend.

## Features (MVP)
- Role‑based access: `student`, `faculty`, `admin`
- Auth: Register/Login (JWT)
- **Requests**: submit approvals (leave/event), status workflow
- **Grievances**: file, assign, resolve with comments
- **Announcements**: create/read
- Analytics widgets on dashboard

---

## Quick Start

### 1) Backend
```bash
cd backend
python -m venv .venv && source .venv/bin/activate  # Windows: .venv\Scripts\activate
pip install -r requirements.txt
uvicorn app:app --reload
```
Server runs on `http://127.0.0.1:8000` with docs at `/docs`.

### 2) Frontend
```bash
cd ../frontend
npm install
npm run dev
```
Frontend runs on `http://127.0.0.1:5173` (Vite default).

---

## Default Admin
After first run, you can create an admin via `/docs` (register with role `admin`) and then login.

---

## Env Notes
- Change `SECRET_KEY` in `backend/auth.py` for production.
- CORS is open to localhost during dev.

---

## Roadmap (Stretch)
- File uploads on tickets
- Email/Push notifications
- Department-level analytics
- Optional on-chain credential hash registry
