import { useEffect, useState } from "react"

import Login from "./pages/Login"
import api from "./services/api"


function App() {
  const [showLogin, setShowLogin] = useState(false)
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)


  useEffect(() => {
    const token = localStorage.getItem("access_token")

    if (!token) {
      setLoading(false)
      return
    }

    api
      .get("/auth/me/")
      .then((response) => {
        setUser(response.data)
      })
      .catch(() => {
        localStorage.removeItem("access_token")
        localStorage.removeItem("refresh_token")
        setUser(null)
      })
      .finally(() => {
        setLoading(false)
      })
  }, [])


  const handleLogout = () => {
    localStorage.removeItem("access_token")
    localStorage.removeItem("refresh_token")

    setUser(null)
  }


  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-950 text-white">
        <div className="text-center">
          <div className="text-5xl">🕵️</div>

          <p className="mt-4 text-slate-400">
            Checking your identity...
          </p>
        </div>
      </main>
    )
  }


  if (showLogin && !user) {
    return (
      <Login
        onLogin={(loggedInUser) => {
          setUser(loggedInUser)
          setShowLogin(false)
        }}
      />
    )
  }


  return (
    <main className="min-h-screen bg-slate-950 text-white">

      {/* Navbar */}
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6">

        <div className="flex items-center gap-3">

          <div className="text-3xl">
            🕵️
          </div>

          <div>
            <h1 className="text-xl font-bold">
              SECRET CHAT
            </h1>

            <p className="text-xs text-slate-500">
              Trust nobody.
            </p>
          </div>

        </div>


        <div className="flex items-center gap-3">

          {user ? (
            <>
              <span className="hidden text-sm text-slate-400 sm:block">
                👋 {user.username}
              </span>

              <button
                onClick={handleLogout}
                className="rounded-full border border-slate-700 px-5 py-2 text-sm text-slate-300 transition hover:bg-slate-800 hover:text-white"
              >
                Logout
              </button>
            </>
          ) : (
            <button
              onClick={() => setShowLogin(true)}
              className="rounded-full border border-slate-700 px-5 py-2 text-sm text-slate-300 transition hover:bg-slate-800 hover:text-white"
            >
              🔐 Login
            </button>
          )}

        </div>

      </nav>


      {/* Hero */}
      <section className="flex min-h-[80vh] items-center justify-center px-6 text-center">

        <div className="max-w-3xl">

          <div className="mb-8 text-7xl">
            🕵️
          </div>


          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-slate-800 bg-slate-900 px-4 py-2 text-sm text-slate-400">

            <span className="h-2 w-2 animate-pulse rounded-full bg-green-400" />

            {user
              ? `Agent ${user.username} is online`
              : "A mystery is waiting"}

          </div>


          <h2 className="text-5xl font-black sm:text-6xl">

            CAN YOU FIND

            <span className="mt-2 block text-slate-300">
              THE IMPOSTER?
            </span>

          </h2>


          <p className="mx-auto mt-7 max-w-2xl text-lg leading-8 text-slate-400">

            Someone is lying.
            Someone is hiding the truth.
            Read the secret conversations and discover
            who is the imposter.

          </p>


          <button
            className="mt-10 rounded-2xl bg-white px-8 py-4 text-lg font-bold text-slate-950 transition hover:-translate-y-1 hover:bg-slate-200"
          >
            🔍 START INVESTIGATION
          </button>

        </div>

      </section>

    </main>
  )
}


export default App