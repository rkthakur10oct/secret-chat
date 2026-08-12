import { useEffect, useState } from "react"

import api from "../services/api"
import GameCard from "../components/GameCard"


function Lobby({ onSelectGame, onLogout }) {
  const [games, setGames] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")


  useEffect(() => {
    const fetchGames = async () => {
      try {
        const response = await api.get("/games/")
        setGames(response.data)
      } catch (error) {
        console.error(error)

        setError(
          error.response?.data?.detail ||
          "Unable to load investigations."
        )
      } finally {
        setLoading(false)
      }
    }

    fetchGames()
  }, [])


  return (
    <main className="min-h-screen bg-slate-950 text-white">

      {/* Navbar */}
      <nav className="border-b border-slate-900">

        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">

          <div className="flex items-center gap-3">

            <div className="text-3xl">
              🕵️
            </div>

            <div>
              <h1 className="font-bold">
                SECRET CHAT
              </h1>

              <p className="text-xs text-slate-500">
                Investigation Room
              </p>
            </div>

          </div>


          <button
            onClick={onLogout}
            className="rounded-full border border-slate-700 px-4 py-2 text-sm text-slate-300 transition hover:bg-slate-800 hover:text-white"
          >
            Logout
          </button>

        </div>

      </nav>


      {/* Header */}
      <section className="mx-auto max-w-6xl px-6 py-14">

        <div className="max-w-2xl">

          <div className="mb-4 text-sm font-semibold uppercase tracking-widest text-slate-500">
            Classified
          </div>

          <h2 className="text-4xl font-black sm:text-5xl">
            Choose your
            <span className="block text-slate-400">
              investigation.
            </span>
          </h2>

          <p className="mt-5 text-slate-400">
            Read the evidence. Study the conversations.
            Find the person who is lying.
          </p>

        </div>


        {/* Loading */}
        {loading && (
          <div className="flex min-h-64 items-center justify-center">

            <div className="text-center">

              <div className="text-5xl">
                🕵️
              </div>

              <p className="mt-4 text-slate-500">
                Searching for mysteries...
              </p>

            </div>

          </div>
        )}


        {/* Error */}
        {!loading && error && (
          <div className="mt-10 rounded-2xl border border-red-900 bg-red-950/30 p-5 text-red-400">
            ❌ {error}
          </div>
        )}


        {/* Empty */}
        {!loading && !error && games.length === 0 && (
          <div className="mt-10 rounded-3xl border border-slate-800 bg-slate-900 p-10 text-center">

            <div className="text-5xl">
              🔍
            </div>

            <h3 className="mt-4 text-xl font-bold">
              No mysteries available
            </h3>

            <p className="mt-2 text-slate-500">
              Check back later for new investigations.
            </p>

          </div>
        )}


        {/* Games */}
        {!loading && !error && games.length > 0 && (
          <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">

            {games.map((game) => (
              <GameCard
                key={game.id}
                game={game}
                onPlay={onSelectGame}
              />
            ))}

          </div>
        )}

      </section>

    </main>
  )
}

export default Lobby