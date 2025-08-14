
import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom'
import './index.css'
import App from './App'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Requests from './pages/Requests'
import Grievances from './pages/Grievances'

ReactDOM.createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<Navigate to="/dashboard" />} />
        <Route path="login" element={<Login />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="requests" element={<Requests />} />
        <Route path="grievances" element={<Grievances />} />
      </Route>
    </Routes>
  </BrowserRouter>
)
