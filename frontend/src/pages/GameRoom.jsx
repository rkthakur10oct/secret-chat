import { useEffect, useState } from "react"
import api from "../services/api"


function GameRoom({ game, onBack }) {
  const [gameData, setGameData] = useState(null)
  const [selectedSuspect, setSelectedSuspect] = useState(null)

  const [loading, setLoading] = useState(true)
  const [error, setError] = useState("")
  const [submitting, setSubmitting] = useState(false)
  const [result, setResult] = useState(null)


  useEffect(() => {
    const fetchGame = async () => {
      try {
        const response = await api.get(`/games/${game.id}/`)
        setGameData(response.data)
      } catch (error) {
        console.error(error)

        setError(
          error.response?.data?.detail ||
          "Unable to load investigation."
        )
      } finally {
        setLoading(false)
      }
    }

    fetchGame()
  }, [game.id])


  const submitGuess = async () => {
    if (!selectedSuspect) {
      return
    }

    setSubmitting(true)
    setResult(null)

    try {
      const response = await api.post(
        `/games/${game.id}/guess/`,
        {
          suspect_id: selectedSuspect,
        }
      )

      setResult(response.data)

    } catch (error) {
      console.error(error)

      setResult({
        is_correct: false,
        message:
          error.response?.data?.detail ||
          "Something went wrong."
      })

    } finally {
      setSubmitting(false)
    }
  }


  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-950 text-white">

        <div className="text-center">

          <div className="animate-pulse text-6xl">
            🕵️
          </div>

          <p className="mt-4 text-slate-500">
            Opening classified files...
          </p>

        </div>

      </main>
    )
  }


  if (error) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-950 px-6 text-white">

        <div className="max-w-md rounded-3xl border border-red-900 bg-red-950/30 p-8 text-center">

          <div className="text-5xl">
            ⚠️
          </div>

          <h2 className="mt-4 text-2xl font-bold">
            Investigation unavailable
          </h2>

          <p className="mt-3 text-red-400">
            {error}
          </p>

          <button
            onClick={onBack}
            className="mt-6 rounded-xl bg-white px-6 py-3 font-bold text-slate-950"
          >
            ← Back to Lobby
          </button>

        </div>

      </main>
    )
  }


  const suspects = gameData?.suspects || []
  const messages = gameData?.messages || []


  return (
    <main className="min-h-screen bg-slate-950 text-white">

      {/* Navbar */}
      <nav className="border-b border-slate-900">

        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">

          <button
            onClick={onBack}
            className="text-sm text-slate-400 transition hover:text-white"
          >
            ← Back to cases
          </button>

          <div className="font-bold">
            🕵️ SECRET CHAT
          </div>

          <div className="text-xs uppercase tracking-widest text-slate-600">
            Classified
          </div>

        </div>

      </nav>


      <div className="mx-auto max-w-6xl px-6 py-10">

        {/* Case Header */}
        <section className="rounded-3xl border border-slate-800 bg-slate-900 p-8">

          <div className="flex flex-col justify-between gap-6 md:flex-row md:items-center">

            <div>

              <div className="mb-3 text-xs font-bold uppercase tracking-[0.3em] text-slate-500">
                Case #{gameData?.id}
              </div>

              <h1 className="text-4xl font-black">
                {gameData?.title}
              </h1>

              <p className="mt-4 max-w-2xl leading-7 text-slate-400">
                {gameData?.description}
              </p>

            </div>


            <div className="rounded-2xl border border-slate-700 bg-slate-950 px-6 py-4 text-center">

              <div className="text-3xl">
                🕐
              </div>

              <p className="mt-1 text-xs uppercase tracking-widest text-slate-500">
                Investigation
              </p>

            </div>

          </div>

        </section>


        {/* Investigation Grid */}
        <div className="mt-8 grid gap-8 lg:grid-cols-2">


          {/* Secret Chat */}
          <section className="rounded-3xl border border-slate-800 bg-slate-900">

            <div className="border-b border-slate-800 p-6">

              <div className="flex items-center gap-3">

                <div className="text-3xl">
                  💬
                </div>

                <div>

                  <h2 className="text-xl font-bold">
                    Secret Chat
                  </h2>

                  <p className="text-sm text-slate-500">
                    Read carefully. Someone is lying.
                  </p>

                </div>

              </div>

            </div>


            <div className="max-h-[500px] space-y-4 overflow-y-auto p-6">

              {messages.length === 0 ? (

                <div className="py-12 text-center text-slate-500">
                  No messages found.
                </div>

              ) : (

                messages.map((message) => (

                  <div
                    key={message.id}
                    className="rounded-2xl border border-slate-800 bg-slate-950 p-4"
                  >

                    <div className="flex items-center justify-between">

                      <span className="font-bold text-slate-200">
                        {message.sender_name ||
                          message.sender ||
                          "Unknown"}
                      </span>

                      <span className="text-xs text-slate-600">
                        🕵️
                      </span>

                    </div>

                    <p className="mt-2 leading-6 text-slate-400">
                      {message.content ||
                        message.text ||
                        message.message}
                    </p>

                  </div>

                ))

              )}

            </div>

          </section>


          {/* Suspects */}
          <section className="rounded-3xl border border-slate-800 bg-slate-900">

            <div className="border-b border-slate-800 p-6">

              <div className="flex items-center gap-3">

                <div className="text-3xl">
                  👥
                </div>

                <div>

                  <h2 className="text-xl font-bold">
                    Suspects
                  </h2>

                  <p className="text-sm text-slate-500">
                    One of them is the imposter.
                  </p>

                </div>

              </div>

            </div>


            <div className="space-y-4 p-6">

              {suspects.length === 0 ? (

                <div className="py-12 text-center text-slate-500">
                  No suspects found.
                </div>

              ) : (

                suspects.map((suspect) => {

                  const isSelected =
                    selectedSuspect === suspect.id

                  return (

                    <button
                      key={suspect.id}
                      onClick={() =>
                        setSelectedSuspect(suspect.id)
                      }
                      className={`w-full rounded-2xl border p-5 text-left transition ${
                        isSelected
                          ? "border-white bg-white text-slate-950"
                          : "border-slate-800 bg-slate-950 hover:border-slate-600"
                      }`}
                    >

                      <div className="flex items-center gap-4">

                        <div
                          className={`flex h-12 w-12 items-center justify-center rounded-full text-xl ${
                            isSelected
                              ? "bg-slate-950 text-white"
                              : "bg-slate-800"
                          }`}
                        >
                          🧑
                        </div>

                        <div>

                          <h3 className="font-bold">
                            {suspect.name}
                          </h3>

                          <p
                            className={`mt-1 text-sm ${
                              isSelected
                                ? "text-slate-600"
                                : "text-slate-500"
                            }`}
                          >
                            Suspect #{suspect.id}
                          </p>

                        </div>

                      </div>

                    </button>

                  )
                })

              )}


              {/* Guess */}
              {suspects.length > 0 && (

                <button
                  onClick={submitGuess}
                  disabled={!selectedSuspect || submitting}
                  className="mt-4 w-full rounded-2xl bg-white py-4 font-black text-slate-950 transition hover:bg-slate-200 disabled:cursor-not-allowed disabled:opacity-40"
                >
                  {submitting
                    ? "🔍 Checking..."
                    : "🎯 ACCUSE THIS SUSPECT"}
                </button>

              )}


              {/* Result */}
              {result && (

                <div
                  className={`mt-4 rounded-2xl border p-5 ${
                    result.is_correct
                      ? "border-green-900 bg-green-950/30"
                      : "border-red-900 bg-red-950/30"
                  }`}
                >

                  <div className="text-3xl">
                    {result.is_correct
                      ? "🎉"
                      : "😈"}
                  </div>

                  <p
                    className={`mt-2 font-bold ${
                      result.is_correct
                        ? "text-green-400"
                        : "text-red-400"
                    }`}
                  >
                    {result.message}
                  </p>

                  {result.points !== undefined && (
                    <p className="mt-2 text-sm text-slate-400">
                      +{result.points} points
                    </p>
                  )}

                </div>

              )}

            </div>

          </section>

        </div>

      </div>

    </main>
  )
}

export default GameRoom