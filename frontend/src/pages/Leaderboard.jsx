import { useCallback, useEffect, useState } from "react"
import api from "../services/api"
import Logo from "../components/Logo"
import Loading from "../components/Loading"
import ErrorBox from "../components/ErrorBox"

function Leaderboard({ onBack }) {
  const [players, setPlayers] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")

  const load = useCallback(async () => {
    try {
      setLoading(true)
      setError("")
      const response = await api.get("/games/leaderboard/")
      setPlayers(Array.isArray(response.data) ? response.data : response.data.results || [])
    } catch (err) {
      console.error(err)
      setError(err.response?.data?.detail || "Unable to load leaderboard.")
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { load() }, [load])

  return (
    <main className="min-h-screen bg-slate-950">
      <header className="border-b border-slate-900">
        <div className="mx-auto flex max-w-5xl items-center justify-between px-5 py-5">
          <button onClick={onBack} className="text-sm font-bold text-slate-500 hover:text-white">← Back</button>
          <Logo compact />
          <span className="text-xs uppercase tracking-widest text-slate-700">Rankings</span>
        </div>
      </header>

      <section className="mx-auto max-w-4xl px-5 py-12">
        <div className="text-center">
          <div className="text-7xl">🏆</div>
          <p className="mt-5 text-xs font-black uppercase tracking-[0.35em] text-slate-600">Detective rankings</p>
          <h1 className="mt-3 text-5xl font-black">Leaderboard</h1>
          <p className="mx-auto mt-4 max-w-xl leading-7 text-slate-500">
            The detectives who solved the most cases.
          </p>
        </div>

        <div className="mt-12">
          {loading && <Loading label="Calculating rankings..." />}
          {!loading && error && <ErrorBox message={error} onRetry={load} />}

          {!loading && !error && players.length === 0 && (
            <div className="rounded-3xl border border-slate-800 bg-slate-900 p-12 text-center">
              <div className="text-6xl">🔍</div>
              <h2 className="mt-4 text-xl font-black">No scores yet</h2>
              <p className="mt-2 text-slate-500">Solve a case to enter the board.</p>
            </div>
          )}

          {!loading && !error && players.length > 0 && (
            <>
              <div className="grid gap-4 sm:grid-cols-3">
                {players.slice(0, 3).map((player, index) => (
                  <div key={`${player.username}-${index}`} className={`rounded-3xl border p-6 text-center ${
                    index === 0
                      ? "border-yellow-700/40 bg-yellow-400/5"
                      : "border-slate-800 bg-slate-900"
                  }`}>
                    <div className="text-5xl">{["🥇", "🥈", "🥉"][index]}</div>
                    <div className="mt-4 font-black">{player.username}</div>
                    <div className="mt-2 text-3xl font-black">{player.points}</div>
                    <div className="text-xs text-slate-600">points</div>
                  </div>
                ))}
              </div>

              <div className="mt-6 space-y-3">
                {players.map((player, index) => (
                  <div key={`${player.username}-${index}`} className="flex items-center justify-between rounded-2xl border border-slate-800 bg-slate-900 p-5">
                    <div className="flex items-center gap-4">
                      <div className="w-10 text-center font-black text-slate-500">
                        {index < 3 ? ["🥇", "🥈", "🥉"][index] : `#${index + 1}`}
                      </div>
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-800">🧑</div>
                      <span className="font-bold">{player.username}</span>
                    </div>
                    <div className="text-right">
                      <div className="font-black">{player.points}</div>
                      <div className="text-xs text-slate-600">points</div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>
      </section>
    </main>
  )
}

export default Leaderboard