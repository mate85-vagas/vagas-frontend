// /* eslint-disable import/prefer-default-export */
// import { useEffect, useState } from 'react'
// import { toast } from 'react-toastify'
// import api from '../api'

// export const useGetProfileById = (id) => {
//   const [profile, setProfile] = useState()

//   useEffect(async () => {
//     if (!id) return
//     const response = await api.get(`/perfis/${id}`)

//     if (!response.data.job || !response.data.user) {
//       toast.error(response.data.message)
//       return
//     }

//     setJob(response.data.job)
//     setUser(response.data.user)
//   }, [id])

//   return { job, user }
// }
