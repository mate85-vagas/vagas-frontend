import axios from 'axios'

export const API_URL = process.env.REACT_APP_API || 'http://localhost:5000'

const api = axios.create({
  baseURL: API_URL,
})

export default api
