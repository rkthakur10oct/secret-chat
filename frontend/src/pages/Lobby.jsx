import { useCallback, useEffect, useState } from "react"
import api from "../services/api"
import Logo from "../components/Logo"
import Loading from "../components/Loading"
import ErrorBox from "../components/ErrorBox"

function Lobby({ onSelectGame, onLeaderboard, onLogout }) {
  const [games, setGames] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  const loadGames = useCallback(async () => {
    try {
      setLoading(true)
      setError("")
      const response = await api.get("/games/")
      setGames(Array.isArray(response.data) ? response.data : response.data.results || [])
    } catch (err) {
      console.error(err)
      setError(err.response?.data?.detail || "Unable to load investigations.")
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    loadGames()
  }, [loadGames])

  return (
    <main className="min-h-screen bg-slate-950">
      <header className="border-b border-slate-900">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5">
          <Logo />
          <div className="flex gap-2 sm:gap-3">
            <button onClick={onLeaderboard} className="rounded-xl border border-slate-800 px-3 py-2 text-sm font-bold hover:bg-slate-900 sm:px-4">
              🏆 <span className="hidden sm:inline">Leaderboard</span>
            </button>
            <button onClick={onLogout} className="rounded-xl border border-slate-800 px-3 py-2 text-sm font-bold hover:bg-slate-900 sm:px-4">
              Logout
            </button>
          </div>
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-5 py-12 sm:py-16">
        <div className="max-w-3xl">
          <p className="text-xs font-black uppercase tracking-[0.35em] text-slate-600">Case selection</p>
          <h1 className="mt-5 text-5xl font-black leading-tight sm:text-6xl">
            Choose your
            <br />
            <span className="text-slate-600">investigation.</span>
          </h1>
          <p className="mt-6 max-w-2xl text-base leading-8 text-slate-500 sm:text-lg">
            Read the evidence. Study the conversations. Find the person who is lying.
          </p>
        </div>

        <div className="mt-12">
          {loading && <Loading label="Loading classified cases..." />}
          {!loading && error && <ErrorBox message={error} onRetry={loadGames} />}

          {!loading && !error && games.length === 0 && (
            <div className="rounded-3xl border border-slate-800 bg-slate-900 p-12 text-center">
              <div className="text-6xl">📁</div>
              <h2 className="mt-5 text-2xl font-black">No cases available</h2>
              <p className="mt-2 text-slate-500">Ask the admin to create a game.</p>
            </div>
          )}

          {!loading && !error && games.length > 0 && (
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {games.map((game) => (
                <article key={game.id} className="rounded-3xl border border-slate-800 bg-slate-900 p-7 transition hover:-translate-y-1 hover:border-slate-600">
                  <div className="flex items-center justify-between">
                    <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-800 text-3xl">🕵️</div>
                    <span className="rounded-full border border-emerald-800 bg-emerald-950/30 px-3 py-1 text-xs font-black uppercase text-emerald-400">
                      {game.difficulty || "CASE"}
                    </span>
                  </div>
                  <h2 className="mt-7 text-2xl font-black">{game.title}</h2>
                  <p className="mt-4 min-h-24 leading-7 text-slate-500">{game.description}</p>
                  <button onClick={() => onSelectGame(game)} className="mt-7 w-full rounded-2xl bg-white py-4 font-black text-slate-950 hover:bg-slate-200">
                    🔎 INVESTIGATE
                  </button>
                </article>
              ))}
            </div>
          )}
        </div>
      </section>
    </main>
  )
}

export default Lobby