/* eslint-disable react/prop-types */
import React, { createContext, useCallback, useMemo, useState } from 'react'
import { toast } from 'react-toastify'
import api from '../api'
import { getWithExpiry, saveWithExpiry } from '../utils/object'

export const AuthState = {
  AUTHENTICATED: 1,
  UNAUTHENTICATED: 2,
  IDLE: 3,
}

const AuthContext = createContext({})

const AUTH_TOKEN_KEY = '@vagas/token'
const AUTH_USER_ID_KEY = '@vagas/user_id'

export function AuthProvider({ children }) {
  const [token, setToken] = useState()
  const [userId, setUserId] = useState()
  const [authState, setAuthState] = useState(AuthState.IDLE)

  const manageUser = (user) => {
    if (!user || user.token === undefined || user.id === undefined) {
      setToken(undefined)
      setUserId(undefined)
      setAuthState(AuthState.UNAUTHENTICATED)
      localStorage.removeItem(AUTH_TOKEN_KEY)
      localStorage.removeItem(AUTH_USER_ID_KEY)
      return
    }

    setToken(user.token)
    setUserId(user.id)
    setAuthState(AuthState.AUTHENTICATED)
    saveWithExpiry(AUTH_TOKEN_KEY, user.token, 7200000)
    saveWithExpiry(AUTH_USER_ID_KEY, user.id, 7200000)

    api.interceptors.request.use(
      (config) => {
        return {
          ...config,
          headers: {
            'x-access-token': getWithExpiry(AUTH_TOKEN_KEY),
          },
        }
      },
      (error) => Promise.reject(error)
    )
  }

  const login = useCallback(async (email, password) => {
    const response = await api.post('usuarios/login', { email, password })

    const tokenFromResponse = response.data.token

    if (!tokenFromResponse && response.data.message)
      toast.error(response.data.message)

    manageUser(response.data)

    return tokenFromResponse !== undefined
  }, [])

  const register = useCallback(async (name, email, password) => {
    const response = await api.post('usuarios', {
      name,
      email,
      password,
    })

    const tokenFromResponse = response.data.token

    if (!tokenFromResponse && response.data.message)
      toast.error(response.data.message)

    manageUser(response.data)

    return tokenFromResponse !== undefined
  }, [])

  const logout = useCallback(async () => {
    manageUser(undefined)
  }, [])

  const loadToken = useCallback(() => {
    const tokenLoaded = getWithExpiry(AUTH_TOKEN_KEY)
    const userIdLoaded = getWithExpiry(AUTH_USER_ID_KEY)

    manageUser({
      token: tokenLoaded ?? undefined,
      id: userIdLoaded ?? undefined,
    })
  }, [])

  const isAuthenticated = useMemo(
    () => authState === AuthState.AUTHENTICATED,
    [authState]
  )

  const isIdle = useMemo(() => authState === AuthState.IDLE, [authState])

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        isIdle,
        token,
        userId,
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
