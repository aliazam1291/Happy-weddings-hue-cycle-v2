export default function Loading() {
  return (
    <div className="fixed inset-0 z-[9998] grid place-items-center bg-background text-foreground">
      <div className="flex flex-col items-center justify-center gap-5 px-6 py-8 text-center">
        <div className="font-display italic text-4xl tracking-[0.24em] md:text-5xl" style={{ color: 'hsl(var(--gold))' }}>
          HW
        </div>
        <div className="h-0.5 w-24 overflow-hidden rounded-full bg-[hsl(var(--gold) / 0.18)]">
          <div className="h-full w-full animate-pulse" style={{ backgroundColor: 'hsl(var(--gold))' }} />
        </div>
        <p className="max-w-xs text-sm leading-6 text-[hsl(var(--ink) / 0.7)]">
          Timeless · Intentional · Emotional
        </p>
      </div>
    </div>
  )
}
