/* eslint-disable react/prop-types */
import React from 'react'
import { ToastContainer } from 'react-toastify'
import { AuthProvider } from '../../contexts/auth'
import { JobsProvider } from '../../contexts/jobs'
import 'react-toastify/dist/ReactToastify.css'
import 'react-dropdown/style.css'

function Provider({ children }) {
  return (
    <JobsProvider>
      <AuthProvider>
        {children}
        <ToastContainer />
      </AuthProvider>
    </JobsProvider>
  )
}

export default Provider
