import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import Login from '../pages/Login'
import Register from '../pages/Register'
import JobList from '../pages/JobList'
import ProtectedRoute from '../components/Routes/ProtectedRoute'

function AppRoutes() {
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
