import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

import useAuth from '../../../hooks/useAuth'

function ProtectedRoute() {
  const { isAuthenticated, isIdle } = useAuth()

  if (isIdle) return <div />

  return !isAuthenticated ? <Outlet /> : <Navigate to="/" />
}

export default ProtectedRoute
