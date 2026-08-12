function Logo({ compact = false }) {
  return (
    <div className="flex items-center gap-3">
      <div className="flex h-11 w-11 items-center justify-center rounded-2xl border border-slate-800 bg-slate-900 text-2xl">
        🕵️
      </div>
      {!compact && (
        <div>
          <div className="font-black tracking-wide">SECRET CHAT</div>
          <div className="text-[10px] uppercase tracking-[0.25em] text-slate-600">
            Investigation Room
          </div>
        </div>
      )}
    </div>
  )
}

export default Logo