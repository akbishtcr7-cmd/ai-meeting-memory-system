import { Routes, Route, Navigate } from 'react-router-dom'
import MainLayout from '../layouts/MainLayout'
import AuthLayout from '../layouts/AuthLayout'
import DashboardLayout from '../layouts/DashboardLayout'
import ProtectedRoute from './ProtectedRoute'
import AdminRoute from './AdminRoute'

import Home from '../pages/Home'
import Login from '../pages/Login'
import Register from '../pages/Register'
import ForgotPasswordPage from '../pages/ForgotPasswordPage'
import Dashboard from '../pages/Dashboard'
import Meetings from '../pages/Meetings'
import MeetingDetailsPage from '../pages/MeetingDetailsPage'
import AIAssistant from '../pages/AIAssistant'
import Profile from '../pages/Profile'
import Admin from '../pages/Admin'
import NotFound from '../pages/NotFound'

export default function AppRoutes() {
  return (
    <Routes>
      {/* Public */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
      </Route>

      {/* Auth */}
      <Route element={<AuthLayout />}>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      </Route>

      {/* Protected */}
      <Route element={<ProtectedRoute />}>
        <Route element={<DashboardLayout />}>
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/meetings" element={<Meetings />} />
          <Route path="/meetings/:id" element={<MeetingDetailsPage />} />
          <Route path="/ai-assistant" element={<AIAssistant />} />
          <Route path="/profile" element={<Profile />} />
        </Route>
      </Route>

      {/* Admin */}
      <Route element={<AdminRoute />}>
        <Route element={<DashboardLayout />}>
          <Route path="/admin" element={<Admin />} />
        </Route>
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}
