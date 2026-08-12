function GameCard({ game, onPlay }) {
  const difficultyStyles = {
    EASY: "text-green-400 bg-green-400/10 border-green-400/20",
    MEDIUM: "text-yellow-400 bg-yellow-400/10 border-yellow-400/20",
    HARD: "text-red-400 bg-red-400/10 border-red-400/20",
  }

  const difficultyClass =
    difficultyStyles[game.difficulty] ||
    "text-slate-400 bg-slate-400/10 border-slate-400/20"

  return (
    <article className="group rounded-3xl border border-slate-800 bg-slate-900/70 p-6 transition duration-300 hover:-translate-y-1 hover:border-slate-600 hover:bg-slate-900">

      {/* Icon */}
      <div className="mb-6 flex items-start justify-between">

        <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-slate-800 text-3xl">
          🕵️
        </div>

        <span
          className={`rounded-full border px-3 py-1 text-xs font-bold ${difficultyClass}`}
        >
          {game.difficulty}
        </span>

      </div>


      {/* Content */}
      <h3 className="text-2xl font-bold text-white">
        {game.title}
      </h3>

      <p className="mt-3 min-h-16 text-sm leading-6 text-slate-400">
        {game.description}
      </p>


      {/* Button */}
      <button
        onClick={() => onPlay(game)}
        className="mt-6 w-full rounded-xl bg-white py-3 font-bold text-slate-950 transition duration-300 group-hover:bg-slate-200"
      >
        🔍 Investigate
      </button>

    </article>
  )
}

export default GameCard