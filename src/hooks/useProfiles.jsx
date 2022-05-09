import { useContext } from 'react'
import ProfilesContext from '../contexts/profiles'

const useProfiles = () => {
  const profileContext = useContext(ProfilesContext)

  if (!profileContext) {
    throw new Error('useProfiles only can be used within ProfilesProvider')
  }

  return profileContext
}

export default useProfiles
