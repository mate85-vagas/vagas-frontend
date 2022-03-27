import React, { useEffect } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import Login from '../pages/Login'
import Register from '../pages/Register'
import JobList from '../pages/JobList'
import ProtectedRoute from '../components/Routes/ProtectedRoute'
import useAuth from '../hooks/useAuth'

function AppRoutes() {
  const { loadToken } = useAuth()

  useEffect(() => {
    loadToken()
  }, [])

  return (
    <Router>
      <Routes>
        <Route path="/" exact element={<JobList />} />
        <Route exact path="/login" element={<ProtectedRoute />}>
          <Route exact path="/login" element={<Login />} />
        </Route>
        <Route exact path="/register" element={<ProtectedRoute />}>
          <Route exact path="/register" element={<Register />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default AppRoutes
