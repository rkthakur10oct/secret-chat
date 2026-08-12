import axios from "axios"

export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ||
  "http://127.0.0.1:8000/api"

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: { "Content-Type": "application/json" },
})

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token")
  if (token) config.headers.Authorization = `Bearer ${token}`
  return config
})

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const request = error.config
    const refresh = localStorage.getItem("refresh_token")

    if (
      error.response?.status === 401 &&
      request &&
      !request._retry &&
      refresh &&
      !request.url?.includes("/auth/token/refresh/")
    ) {
      request._retry = true

      try {
        const response = await axios.post(
          `${API_BASE_URL}/auth/token/refresh/`,
          { refresh }
        )

        localStorage.setItem("access_token", response.data.access)
        request.headers.Authorization = `Bearer ${response.data.access}`

        return api(request)
      } catch (refreshError) {
        localStorage.removeItem("access_token")
        localStorage.removeItem("refresh_token")
        return Promise.reject(refreshError)
      }
    }

    return Promise.reject(error)
  }
)

export default api