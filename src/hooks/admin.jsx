/* eslint-disable import/prefer-default-export */
import { toast } from 'react-toastify'
import api from '../api'

export const useAdminRoutes = () => {
  const sendInvite = async (email) => {
    const response = await api.post(`/usuarios/convite`, { email })

    if (response.data.message) {
      if (response.data.error) toast.error(response.data.message)
      else toast.success(response.data.message)
    }
  }

  return { sendInvite }
}
