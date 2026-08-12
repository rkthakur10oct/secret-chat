function Loading({ label = "Loading..." }) {
  return (
    <div className="flex min-h-[280px] items-center justify-center">
      <div className="text-center">
        <div className="animate-pulse text-5xl">🕵️</div>
        <p className="mt-4 text-sm text-slate-500">{label}</p>
      </div>
    </div>
  )
}

export default Loading