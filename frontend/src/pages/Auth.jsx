import { useState } from "react"
import api from "../services/api"
import Logo from "../components/Logo"

function Auth({ onSuccess }) {
  const [mode, setMode] = useState("login")
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [email, setEmail] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const submit = async (event) => {
    event.preventDefault()
    setError("")

    if (!username.trim() || !password) {
      setError("Username and password are required.")
      return
    }

    try {
      setLoading(true)

      if (mode === "register") {
        await api.post("/auth/register/", {
          username: username.trim(),
          email: email.trim(),
          password,
        })
      }

      const response = await api.post("/auth/login/", {
        username: username.trim(),
        password,
      })

      localStorage.setItem("access_token", response.data.access)
      localStorage.setItem("refresh_token", response.data.refresh)
      onSuccess()
    } catch (err) {
      const data = err.response?.data
      if (typeof data === "object" && data) {
        const first = Object.values(data).flat?.()[0]
        setError(typeof first === "string" ? first : data.detail || "Request failed.")
      } else {
        setError("Unable to connect to the server.")
      }
    } finally {
      setLoading(false)
    }
  }

  const switchMode = () => {
    setMode(mode === "login" ? "register" : "login")
    setError("")
  }

  return (
    <main className="min-h-screen bg-slate-950">
      <div className="mx-auto flex min-h-screen max-w-6xl items-center justify-center px-5 py-10">
        <div className="grid w-full overflow-hidden rounded-[2rem] border border-slate-800 bg-slate-900 lg:grid-cols-2">
          <div className="hidden min-h-[650px] flex-col justify-between bg-slate-950 p-10 lg:flex">
            <Logo />
            <div>
              <div className="text-xs font-black uppercase tracking-[0.35em] text-slate-600">
                Classified
              </div>
              <h1 className="mt-5 text-6xl font-black leading-[1.05]">
                Trust
                <br />
                nobody.
              </h1>
              <p className="mt-6 max-w-md leading-7 text-slate-500">
                Investigate suspicious conversations, identify the imposter,
                and climb the detective leaderboard.
              </p>
            </div>
            <div className="text-xs text-slate-700">SECRET CHAT / CASE FILES</div>
          </div>

          <div className="flex items-center p-7 sm:p-12">
            <form onSubmit={submit} className="w-full">
              <div className="lg:hidden">
                <Logo />
              </div>

              <div className="mt-8 lg:mt-0">
                <p className="text-xs font-black uppercase tracking-[0.3em] text-slate-600">
                  {mode === "login" ? "Secure access" : "New detective"}
                </p>
                <h2 className="mt-3 text-4xl font-black">
                  {mode === "login" ? "Welcome back." : "Create account."}
                </h2>
                <p className="mt-3 text-slate-500">
                  {mode === "login"
                    ? "Enter your credentials to continue."
                    : "Join the investigation and start solving cases."}
                </p>
              </div>

              <div className="mt-8 space-y-5">
                <div>
                  <label className="text-sm font-bold">Username</label>
                  <input
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    placeholder="detective"
                    autoComplete="username"
                    className="mt-2 w-full rounded-2xl border border-slate-700 bg-slate-950 px-5 py-4 outline-none focus:border-slate-300"
                  />
                </div>

                {mode === "register" && (
                  <div>
                    <label className="text-sm font-bold">Email</label>
                    <input
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="you@example.com"
                      type="email"
                      autoComplete="email"
                      className="mt-2 w-full rounded-2xl border border-slate-700 bg-slate-950 px-5 py-4 outline-none focus:border-slate-300"
                    />
                  </div>
                )}

                <div>
                  <label className="text-sm font-bold">Password</label>
                  <input
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    type="password"
                    autoComplete={mode === "login" ? "current-password" : "new-password"}
                    className="mt-2 w-full rounded-2xl border border-slate-700 bg-slate-950 px-5 py-4 outline-none focus:border-slate-300"
                  />
                </div>
              </div>

              {error && (
                <div className="mt-5 rounded-2xl border border-red-900 bg-red-950/20 px-4 py-3 text-sm text-red-400">
                  {error}
                </div>
              )}

              <button
                disabled={loading}
                className="mt-7 w-full rounded-2xl bg-white py-4 font-black text-slate-950 hover:bg-slate-200 disabled:opacity-50"
              >
                {loading
                  ? "PLEASE WAIT..."
                  : mode === "login"
                    ? "🔐 LOGIN"
                    : "🕵️ CREATE ACCOUNT"}
              </button>

              <button
                type="button"
                onClick={switchMode}
                className="mt-5 w-full text-center text-sm font-bold text-slate-500 hover:text-white"
              >
                {mode === "login"
                  ? "New detective? Create an account"
                  : "Already registered? Login"}
              </button>
            </form>
          </div>
        </div>
      </div>
    </main>
  )
}

export default Auth