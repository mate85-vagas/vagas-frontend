/* eslint-disable react/prop-types */
import React, { createContext, useState } from 'react'

const ProfilesContext = createContext({})

export function ProfilesProvider({ children }) {
  const [selectedProfile, setSelectedProfile] = useState()

  return (
    <ProfilesContext.Provider
      value={{
        selectedProfile,
        setSelectedProfile,
      }}
    >
      {children}
    </ProfilesContext.Provider>
  )
}

export default ProfilesContext
