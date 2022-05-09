/* eslint-disable react/prop-types */
import React from 'react'
import { ToastContainer } from 'react-toastify'
import { AuthProvider } from '../../contexts/auth'
import { ProfilesProvider } from '../../contexts/profiles'
import 'react-toastify/dist/ReactToastify.css'
import 'react-dropdown/style.css'

function Provider({ children }) {
  return (
    <AuthProvider>
      <ProfilesProvider>
        {children}
        <ToastContainer />
      </ProfilesProvider>
    </AuthProvider>
  )
}

export default Provider
