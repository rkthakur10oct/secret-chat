import { useState } from "react"
import api from "../services/api"

function Login({ onLogin }) {
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")

  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (event) => {
    event.preventDefault()

    setError("")
    setLoading(true)

    try {
      const response = await api.post("/auth/login/", {
        username,
        password,
      })

      const { access, refresh } = response.data

      localStorage.setItem("access_token", access)
      localStorage.setItem("refresh_token", refresh)

      const meResponse = await api.get("/auth/me/")

      onLogin(meResponse.data)

    } catch (error) {
      if (error.response?.status === 401) {
        setError("Invalid username or password.")
      } else {
        setError(
          error.response?.data?.detail ||
          "Something went wrong. Please try again."
        )
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-950 px-6 text-white">

      <div className="w-full max-w-md">

        {/* Header */}
        <div className="mb-8 text-center">

          <div className="text-6xl">
            🕵️
          </div>

          <h1 className="mt-4 text-4xl font-black">
            Welcome Back
          </h1>

          <p className="mt-2 text-slate-400">
            Continue your investigation.
          </p>

        </div>


        {/* Login Card */}
        <form
          onSubmit={handleSubmit}
          className="rounded-3xl border border-slate-800 bg-slate-900 p-8 shadow-2xl"
        >

          {/* Username */}
          <label className="mb-2 block text-sm font-medium text-slate-300">
            Username
          </label>

          <input
            type="text"
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            placeholder="Enter username"
            required
            disabled={loading}
            className="mb-5 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition focus:border-slate-400 disabled:opacity-50"
          />


          {/* Password */}
          <label className="mb-2 block text-sm font-medium text-slate-300">
            Password
          </label>

          <input
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            placeholder="Enter password"
            required
            disabled={loading}
            className="mb-6 w-full rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-white outline-none transition focus:border-slate-400 disabled:opacity-50"
          />


          {/* Error */}
          {error && (
            <div className="mb-4 rounded-xl border border-red-900 bg-red-950/40 p-3 text-sm text-red-400">
              ❌ {error}
            </div>
          )}


          {/* Login Button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full rounded-xl bg-white py-3 font-bold text-slate-950 transition hover:bg-slate-200 disabled:cursor-not-allowed disabled:opacity-50"
          >
            {loading ? "🔄 Logging in..." : "🔐 LOGIN"}
          </button>

        </form>

      </div>

    </main>
  )
}

export default Login