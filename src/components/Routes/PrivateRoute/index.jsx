import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

import useAuth from '../../../hooks/useAuth'

function PrivateRoute() {
  const { isAuthenticated, isIdle } = useAuth()

  if (isIdle) return <div />

  return isAuthenticated ? <Outlet /> : <Navigate to="/" />
}

export default PrivateRoute
