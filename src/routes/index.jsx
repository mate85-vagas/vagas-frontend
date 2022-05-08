import React, { useEffect } from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'

import Login from '../pages/Login'
import Register from '../pages/Register'
import JobList from '../pages/JobList'
import ProtectedRoute from '../components/Routes/ProtectedRoute'
import PrivateRoute from '../components/Routes/PrivateRoute'
import JobDetails from '../pages/JobDetails'
import useAuth from '../hooks/useAuth'
import EditData from '../pages/EditData'
import ViewProfile from '../pages/ViewProfile'
import JobForm from '../pages/JobForm'
import ProfilesList from '../pages/ProfilesList'
import MyJob from '../pages/MyJobs'

function AppRoutes() {
  const { loadToken, isIdle } = useAuth()

  useEffect(() => {
    loadToken()
  }, [])

  if (isIdle) return <div />

  return (
    <Router>
      <Routes>
        <Route path="/" exact element={<JobList />} />
        <Route path="/vagas/:id" exact element={<JobDetails />} />
        <Route path="/verperfil/:id" exact element={<ViewProfile />} />

        <Route path="/perfis" exact element={<ProfilesList />} />

        <Route exact path="/login" element={<ProtectedRoute />}>
          <Route exact path="/login" element={<Login />} />
        </Route>

        <Route exact path="/register" element={<ProtectedRoute />}>
          <Route exact path="/register" element={<Register />} />
        </Route>

        <Route exact path="/editardados" element={<PrivateRoute />}>
          <Route exact path="/editardados" element={<EditData />} />
        </Route>

        <Route
          exact
          path="/formulariovaga/:type/:id"
          element={<PrivateRoute />}
        >
          <Route exact path="/formulariovaga/:type/:id" element={<JobForm />} />
        </Route>

        <Route exact path="/formulariovaga/:type" element={<PrivateRoute />}>
          <Route exact path="/formulariovaga/:type" element={<JobForm />} />
        </Route>

        <Route exact path="/minhasvagas" element={<PrivateRoute />}>
          <Route exact path="/minhasvagas" element={<MyJob />} />
        </Route>
      </Routes>
    </Router>
  )
}

export default AppRoutes
