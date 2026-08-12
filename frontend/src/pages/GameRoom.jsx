import { useCallback, useEffect, useMemo, useState } from "react"
import api from "../services/api"
import Logo from "../components/Logo"
import Loading from "../components/Loading"
import ErrorBox from "../components/ErrorBox"

function GameRoom({ game, onBack, onResult }) {
  const [data, setData] = useState(null)
  const [selected, setSelected] = useState(null)
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState("")

  const loadGame = useCallback(async () => {
    try {
      setLoading(true)
      setError("")
      const response = await api.get(`/games/${game.id}/`)
      setData(response.data)
    } catch (err) {
      console.error(err)
      setError(err.response?.data?.detail || "Unable to load this case.")
    } finally {
      setLoading(false)
    }
  }, [game.id])

  useEffect(() => {
    loadGame()
  }, [loadGame])

  const suspects = useMemo(() => data?.suspects || [], [data])
  const messages = useMemo(
    () => [...(data?.messages || [])].sort((a, b) => (a.order ?? 0) - (b.order ?? 0)),
    [data]
  )

  const submitGuess = async () => {
    if (!selected) {
      setError("Select a suspect before submitting.")
      return
    }

    try {
      setSubmitting(true)
      setError("")
      const response = await api.post(`/games/${game.id}/guess/`, {
        suspect_id: selected,
      })
      onResult(response.data)
    } catch (err) {
      console.error(err)
      setError(err.response?.data?.detail || "Unable to submit your accusation.")
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) {
    return <main className="min-h-screen bg-slate-950 px-5"><Loading label="Opening the case file..." /></main>
  }

  if (error && !data) {
    return (
      <main className="min-h-screen bg-slate-950 px-5">
        <div className="mx-auto max-w-2xl py-16">
          <ErrorBox message={error} onRetry={loadGame} />
          <button onClick={onBack} className="mt-4 rounded-xl border border-slate-800 px-5 py-3 text-sm font-bold">
            ← Back to cases
          </button>
        </div>
      </main>
    )
  }

  return (
    <main className="min-h-screen bg-slate-950">
      <header className="sticky top-0 z-20 border-b border-slate-900 bg-slate-950/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
          <button onClick={onBack} className="text-sm font-bold text-slate-500 hover:text-white">← Back</button>
          <Logo compact />
          <span className="hidden text-xs font-bold uppercase tracking-widest text-slate-700 sm:block">Case #{game.id}</span>
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-5 py-8 sm:py-12">
        <div className="rounded-3xl border border-slate-800 bg-slate-900 p-6 sm:p-8">
          <div className="flex flex-wrap items-start justify-between gap-5">
            <div>
              <p className="text-xs font-black uppercase tracking-[0.3em] text-slate-600">Investigation</p>
              <h1 className="mt-3 text-3xl font-black sm:text-4xl">{data.title}</h1>
              <p className="mt-4 max-w-3xl leading-7 text-slate-500">{data.description}</p>
            </div>
            <span className="rounded-full border border-emerald-800 bg-emerald-950/30 px-4 py-2 text-xs font-black uppercase text-emerald-400">
              {data.difficulty || "CLASSIFIED"}
            </span>
          </div>
        </div>

        <div className="mt-6 grid gap-6 lg:grid-cols-[1.35fr_0.65fr]">
          <section className="rounded-3xl border border-slate-800 bg-slate-900 p-5 sm:p-7">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-black uppercase tracking-widest text-slate-600">Evidence</p>
                <h2 className="mt-1 text-2xl font-black">Conversation log</h2>
              </div>
              <span className="text-2xl">💬</span>
            </div>

            <div className="mt-7 space-y-4">
              {messages.length === 0 && (
                <div className="rounded-2xl border border-slate-800 p-8 text-center text-slate-600">
                  No conversation evidence found.
                </div>
              )}

              {messages.map((message) => (
                <div key={message.id} className="rounded-2xl border border-slate-800 bg-slate-950 p-5">
                  <div className="flex items-center justify-between gap-3">
                    <span className="font-black">{message.suspect || "Unknown"}</span>
                    <span className="text-xs text-slate-700">#{message.order ?? "-"}</span>
                  </div>
                  <p className="mt-3 leading-7 text-slate-400">{message.text}</p>
                </div>
              ))}
            </div>
          </section>

          <aside className="h-fit rounded-3xl border border-slate-800 bg-slate-900 p-5 sm:p-7 lg:sticky lg:top-24">
            <p className="text-xs font-black uppercase tracking-widest text-slate-600">Your decision</p>
            <h2 className="mt-1 text-2xl font-black">Who is lying?</h2>
            <p className="mt-3 text-sm leading-6 text-slate-500">
              Review every message before making your one accusation.
            </p>

            <div className="mt-6 space-y-3">
              {suspects.map((suspect) => {
                const active = selected === suspect.id
                return (
                  <button
                    key={suspect.id}
                    onClick={() => { setSelected(suspect.id); setError("") }}
                    className={`flex w-full items-center gap-3 rounded-2xl border p-4 text-left transition ${
                      active
                        ? "border-white bg-white text-slate-950"
                        : "border-slate-800 bg-slate-950 hover:border-slate-600"
                    }`}
                  >
                    <div className={`flex h-11 w-11 items-center justify-center rounded-xl text-xl ${active ? "bg-slate-200" : "bg-slate-800"}`}>
                      {suspect.avatar || "🧑"}
                    </div>
                    <div>
                      <div className="font-black">{suspect.name}</div>
                      <div className={`text-xs ${active ? "text-slate-500" : "text-slate-600"}`}>
                        Suspect #{suspect.id}
                      </div>
                    </div>
                    {active && <span className="ml-auto">✓</span>}
                  </button>
                )
              })}
            </div>

            {error && (
              <div className="mt-5 rounded-2xl border border-red-900 bg-red-950/20 p-4 text-sm text-red-400">
                {error}
              </div>
            )}

            <button
              onClick={submitGuess}
              disabled={!selected || submitting}
              className="mt-6 w-full rounded-2xl bg-white py-4 font-black text-slate-950 hover:bg-slate-200 disabled:opacity-40"
            >
              {submitting ? "CHECKING..." : "⚖️ ACCUSE SUSPECT"}
            </button>

            <p className="mt-4 text-center text-xs text-slate-700">
              One accusation per case.
            </p>
          </aside>
        </div>
      </section>
    </main>
  )
}

export default GameRoom