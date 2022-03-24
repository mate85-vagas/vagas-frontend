import { useContext } from 'react'
import AuthContext from '../contexts/auth'

const useAuth = () => {
  const authContext = useContext(AuthContext)

  if (!authContext) {
    throw new Error('useAuth only can be used within AuthProvider')
  }

  return authContext
}

export default useAuth
