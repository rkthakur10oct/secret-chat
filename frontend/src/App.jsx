function App() {
  return (
    <main className="min-h-screen bg-slate-950 text-white">
      
      {/* Navigation */}
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-6 py-6">
        <div className="flex items-center gap-3">
          <div className="text-3xl">🕵️</div>

          <div>
            <h1 className="text-xl font-bold tracking-wide">
              SECRET CHAT
            </h1>

            <p className="text-xs text-slate-500">
              Trust nobody.
            </p>
          </div>
        </div>

        <button
          className="
            rounded-full
            border border-slate-700
            px-5 py-2
            text-sm font-medium
            text-slate-300
            transition
            hover:border-slate-500
            hover:bg-slate-800
            hover:text-white
          "
        >
          🏆 Leaderboard
        </button>
      </nav>


      {/* Hero Section */}
      <section className="relative mx-auto flex min-h-[80vh] max-w-6xl items-center justify-center px-6 text-center">

        {/* Background glow */}
        <div className="absolute left-1/2 top-1/2 -z-0 h-72 w-72 -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-600/10 blur-3xl" />


        <div className="relative z-10 max-w-3xl">

          {/* Detective Icon */}
          <div className="mb-8 text-7xl">
            🕵️
          </div>


          {/* Badge */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-slate-800 bg-slate-900 px-4 py-2 text-sm text-slate-400">
            <span className="h-2 w-2 animate-pulse rounded-full bg-green-400" />
            A mystery is waiting
          </div>


          {/* Main Heading */}
          <h2 className="text-5xl font-black tracking-tight sm:text-6xl md:text-7xl">
            CAN YOU FIND
            <span className="mt-2 block text-slate-300">
              THE IMPOSTER?
            </span>
          </h2>


          {/* Description */}
          <p className="mx-auto mt-7 max-w-2xl text-lg leading-8 text-slate-400">
            Someone is lying.
            Someone is hiding the truth.
            Read the secret conversations, follow the clues,
            and discover who is the imposter.
          </p>


          {/* CTA */}
          <button
            className="
              mt-10
              rounded-2xl
              bg-white
              px-8
              py-4
              text-lg
              font-bold
              text-slate-950
              shadow-xl
              transition
              duration-300
              hover:-translate-y-1
              hover:scale-105
              hover:bg-slate-200
              active:scale-95
            "
          >
            🔍 START INVESTIGATION
          </button>


          {/* Features */}
          <div className="mt-14 grid grid-cols-3 gap-4">

            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 backdrop-blur">
              <div className="text-3xl">💬</div>

              <p className="mt-3 font-semibold">
                Secret Chats
              </p>

              <p className="mt-1 text-xs text-slate-500">
                Read the clues
              </p>
            </div>


            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 backdrop-blur">
              <div className="text-3xl">🕵️</div>

              <p className="mt-3 font-semibold">
                Find Clues
              </p>

              <p className="mt-1 text-xs text-slate-500">
                Trust nobody
              </p>
            </div>


            <div className="rounded-2xl border border-slate-800 bg-slate-900/60 p-5 backdrop-blur">
              <div className="text-3xl">🏆</div>

              <p className="mt-3 font-semibold">
                Score Points
              </p>

              <p className="mt-1 text-xs text-slate-500">
                Become #1
              </p>
            </div>

          </div>

        </div>
      </section>


      {/* Footer */}
      <footer className="border-t border-slate-900 py-6 text-center text-sm text-slate-600">
        Secret Chat • Every message is a clue.
      </footer>

    </main>
  )
}

export default App