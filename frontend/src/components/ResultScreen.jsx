function ResultScreen({ result, onClose, onLeaderboard }) {
  const correct = result?.is_correct === true
  const points = Number(result?.points ?? 0)

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/90 p-5 backdrop-blur-md">
      <div className="w-full max-w-lg rounded-[2rem] border border-slate-800 bg-slate-900 p-8 text-center shadow-2xl sm:p-10">
        <div className="text-7xl">{correct ? "🎉" : "😈"}</div>

        <p className={`mt-6 text-xs font-black uppercase tracking-[0.3em] ${
          correct ? "text-emerald-400" : "text-red-400"
        }`}>
          {correct ? "Case solved" : "Wrong accusation"}
        </p>

        <h2 className="mt-3 text-4xl font-black">
          {correct ? "Excellent Detective!" : "The Imposter Escaped"}
        </h2>

        <p className="mt-5 leading-7 text-slate-400">
          {result?.message || "Your investigation has been recorded."}
        </p>

        <div className="mx-auto mt-7 max-w-xs rounded-3xl border border-slate-800 bg-slate-950 p-6">
          <div className="text-xs font-bold uppercase tracking-widest text-slate-600">
            Score
          </div>
          <div className={`mt-2 text-5xl font-black ${
            points >= 0 ? "text-emerald-400" : "text-red-400"
          }`}>
            {points > 0 ? `+${points}` : points}
          </div>
          <div className="mt-1 text-xs text-slate-600">points</div>
        </div>

        {result?.suspect && (
          <div className="mt-5 text-sm text-slate-500">
            You accused <span className="font-bold text-slate-200">{result.suspect}</span>
          </div>
        )}

        <div className="mt-8 grid gap-3 sm:grid-cols-2">
          <button
            onClick={onClose}
            className="rounded-2xl border border-slate-700 py-3.5 font-bold hover:bg-slate-800"
          >
            ← Back
          </button>
          <button
            onClick={onLeaderboard}
            className="rounded-2xl bg-white py-3.5 font-black text-slate-950 hover:bg-slate-200"
          >
            🏆 Leaderboard
          </button>
        </div>
      </div>
    </div>
  )
}

export default ResultScreen