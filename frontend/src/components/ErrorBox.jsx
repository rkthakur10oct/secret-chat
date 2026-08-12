function ErrorBox({ message, onRetry }) {
  return (
    <div className="rounded-3xl border border-red-900/70 bg-red-950/20 p-6">
      <div className="font-black text-red-300">⚠️ Something went wrong</div>
      <p className="mt-2 text-sm leading-6 text-red-400">{message}</p>
      {onRetry && (
        <button
          onClick={onRetry}
          className="mt-5 rounded-xl bg-white px-5 py-2.5 text-sm font-black text-slate-950"
        >
          Try again
        </button>
      )}
    </div>
  )
}

export default ErrorBox