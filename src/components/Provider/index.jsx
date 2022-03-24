/* eslint-disable react/prop-types */
import React from 'react'
import { AuthProvider } from '../../contexts/auth'

function Provider({ children }) {
  return <AuthProvider>{children}</AuthProvider>
}

export default Provider
