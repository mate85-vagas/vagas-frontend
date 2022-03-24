/* eslint-disable react/prop-types */
import React, { createContext, useCallback, useMemo, useState } from 'react'
import api from '../../api'

export const AuthState = {
  AUTHENTICATED: 1,
  UNAUTHENTICATED: 2,
  IDLE: 3,
}

const AuthContext = createContext({})

const AUTH_TOKEN_KEY = '@vagas/token'

export function AuthProvider({ children }) {
  const [token, setToken] = useState()
  const [authState, setAuthState] = useState(AuthState.IDLE)

  const manageToken = () => {
    if (token === undefined) {
      setToken(undefined)
      setAuthState(AuthState.UNAUTHENTICATED)
      localStorage.removeItem(AUTH_TOKEN_KEY)
      return
    }

    setToken(token)
    setAuthState(AuthState.AUTHENTICATED)
    localStorage.setItem(AUTH_TOKEN_KEY, token)

    api.interceptors.request.use(
      (config) => {
        if (config?.headers?.Authorization !== undefined) return config

        return {
          ...config,
          headers: {
            Authorization: token,
          },
        }
      },
      (error) => Promise.reject(error)
    )
  }

  const login = useCallback(async (email, password) => {
    const response = await api.post('login', { email, password })

    const tokenFromResponse = response.data.authorization

    manageToken(tokenFromResponse)
  }, [])

  const register = useCallback(async (name, email, password) => {
    const response = await api.post('user', {
      name,
      email,
      password,
    })

    const tokenFromResponse = response.data.authorization

    manageToken(tokenFromResponse)
  }, [])

  const logout = useCallback(async () => {
    manageToken(undefined)
  }, [])

  const loadToken = useCallback(() => {
    const tokenLoaded = localStorage.getItem(AUTH_TOKEN_KEY)

    manageToken(tokenLoaded ?? undefined)
  }, [])

  const isAuthenticated = useMemo(
    () => authState === AuthState.AUTHENTICATED,
    [authState]
  )

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        token,
        state: authState,
        login,
        register,
        logout,
        loadToken,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export default AuthContext
