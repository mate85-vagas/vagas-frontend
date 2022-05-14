import React, { useMemo } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import { useSearchObject } from '../../../hooks/url'

import useAuth from '../../../hooks/useAuth'

function ProtectedRoute() {
  const [search] = useSearchObject()
  const { isAuthenticated, isIdle } = useAuth()

  const hasCreateJob = useMemo(() => search.criarvaga === '1', [search])

  if (isIdle) return <div />

  return !isAuthenticated ? (
    <Outlet />
  ) : (
    <Navigate to={hasCreateJob ? '/formulariovaga/criar?home=1' : '/'} />
  )
}

export default ProtectedRoute
