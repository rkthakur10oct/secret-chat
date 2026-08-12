import { useEffect, useState } from "react"

import Login from "./pages/Login"
import Lobby from "./pages/Lobby"
import GameRoom from "./pages/GameRoom"
import api from "./services/api"


function App() {
  // --------------------------------------------------
  // STATE
  // --------------------------------------------------

  const [user, setUser] = useState(null)

  const [page, setPage] = useState("home")

  const [selectedGame, setSelectedGame] = useState(null)

  const [loading, setLoading] = useState(true)


  // --------------------------------------------------
  // CHECK EXISTING LOGIN SESSION
  // --------------------------------------------------

  useEffect(() => {
    const token = localStorage.getItem("access_token")

    // No token = user is not logged in
    if (!token) {
      setLoading(false)
      return
    }


    // Token exists → ask backend who is logged in
    api
      .get("/auth/me/")
      .then((response) => {
        setUser(response.data)
      })
      .catch((error) => {
        console.error("Session check failed:", error)

        // Invalid/expired token
        localStorage.removeItem("access_token")
        localStorage.removeItem("refresh_token")

        setUser(null)
      })
      .finally(() => {
        setLoading(false)
      })

  }, [])


  // --------------------------------------------------
  // LOGIN
  // --------------------------------------------------

  const handleLogin = (loggedInUser) => {
    console.log("Logged in user:", loggedInUser)

    setUser(loggedInUser)

    // After login → open game lobby
    setPage("lobby")
  }


  // --------------------------------------------------
  // LOGOUT
  // --------------------------------------------------

  const handleLogout = () => {
    console.log("Logging out...")

    localStorage.removeItem("access_token")
    localStorage.removeItem("refresh_token")

    setUser(null)

    setSelectedGame(null)

    setPage("home")
  }


  // --------------------------------------------------
  // START INVESTIGATION
  // --------------------------------------------------

  const startInvestigation = () => {

    if (user) {
      // Already logged in
      setPage("lobby")
    } else {
      // Not logged in
      setPage("login")
    }

  }


  // --------------------------------------------------
  // SELECT GAME
  // --------------------------------------------------

  const handleSelectGame = (game) => {

    console.log("Selected game:", game)

    // Store selected game
    setSelectedGame(game)

    // Open investigation room
    setPage("game")
  }


  // --------------------------------------------------
  // BACK TO LOBBY
  // --------------------------------------------------

  const handleBackToLobby = () => {

    console.log("Returning to lobby...")

    setSelectedGame(null)

    setPage("lobby")
  }


  // --------------------------------------------------
  // LOADING SCREEN
  // --------------------------------------------------

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-950 text-white">

        <div className="text-center">

          <div className="animate-pulse text-6xl">
            🕵️
          </div>

          <p className="mt-4 text-slate-500">
            Checking your identity...
          </p>

        </div>

      </main>
    )
  }


  // --------------------------------------------------
  // LOGIN PAGE
  // --------------------------------------------------

  if (page === "login" && !user) {
    return (
      <Login
        onLogin={handleLogin}
      />
    )
  }


  // --------------------------------------------------
  // GAME / INVESTIGATION ROOM
  // --------------------------------------------------

  if (page === "game" && user && selectedGame) {
    return (
      <GameRoom
        game={selectedGame}
        onBack={handleBackToLobby}
      />
    )
  }


  // --------------------------------------------------
  // GAME LOBBY
  // --------------------------------------------------

  if (page === "lobby" && user) {
    return (
      <Lobby
        onSelectGame={handleSelectGame}
        onLogout={handleLogout}
      />
    )
  }


  // --------------------------------------------------
  // HOME PAGE
  // --------------------------------------------------

  return (
    <main className="min-h-screen bg-slate-950 text-white">


      {/* ================================================
          NAVBAR
      ================================================= */}

      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6">

        {/* Logo */}

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


        {/* Navbar actions */}

        <div className="flex items-center gap-3">

          {user ? (

            <>
              {/* Username */}

              <span className="hidden text-sm text-slate-400 sm:block">

                👋 {user.username}

              </span>


              {/* Logout */}

              <button
                onClick={handleLogout}
                className="rounded-full border border-slate-700 px-5 py-2 text-sm text-slate-300 transition hover:bg-slate-800 hover:text-white"
              >
                Logout
              </button>

            </>

          ) : (

            <button
              onClick={() => setPage("login")}
              className="rounded-full border border-slate-700 px-5 py-2 text-sm text-slate-300 transition hover:bg-slate-800 hover:text-white"
            >
              🔐 Login
            </button>

          )}

        </div>

      </nav>



      {/* ================================================
          HERO SECTION
      ================================================= */}

      <section className="flex min-h-[80vh] items-center justify-center px-6 text-center">

        <div className="max-w-4xl">


          {/* Detective icon */}

          <div className="mb-8 text-7xl">
            🕵️
          </div>


          {/* Status */}

          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-slate-800 bg-slate-900 px-4 py-2 text-sm text-slate-400">

            <span className="h-2 w-2 animate-pulse rounded-full bg-green-400" />

            {user
              ? `Agent ${user.username} is online`
              : "A mystery is waiting"}

          </div>


          {/* Main heading */}

          <h2 className="text-5xl font-black sm:text-6xl md:text-7xl">

            CAN YOU FIND

            <span className="mt-2 block text-slate-300">
              THE IMPOSTER?
            </span>

          </h2>


          {/* Description */}

          <p className="mx-auto mt-7 max-w-2xl text-lg leading-8 text-slate-400">

            Someone is lying.

            <br />

            Someone is hiding the truth.

            <br />

            Read the secret conversations and discover
            who is the imposter.

          </p>


          {/* Start button */}

          <button
            onClick={startInvestigation}
            className="mt-10 rounded-2xl bg-white px-8 py-4 text-lg font-bold text-slate-950 transition duration-300 hover:-translate-y-1 hover:bg-slate-200 active:scale-95"
          >

            🔍 START INVESTIGATION

          </button>


          {/* Logged in message */}

          {user && (

            <p className="mt-5 text-sm text-slate-600">

              Welcome back, Agent {user.username}.

            </p>

          )}

        </div>

      </section>


    </main>
  )
}


export default App