export function Skeleton({ className = '' }: { className?: string }) {
  return <div className={`animate-pulse rounded-lg bg-ink/10 ${className}`} aria-hidden="true" />;
}

/**
 * Esqueleto de página para las secciones autenticadas: replica la estructura
 * de PlatformShell (sidebar lateral, header de página, métricas y listado)
 * mientras cargan los datos del servidor.
 */
export function PageSkeleton() {
  return (
    <div className="flex min-h-screen bg-canvas grain">
      <aside className="hidden w-64 flex-shrink-0 flex-col bg-ink/10 lg:flex" aria-hidden="true">
        <div className="border-b border-ink/10 px-5 py-6">
          <Skeleton className="h-6 w-32 bg-ink/15" />
          <Skeleton className="mt-3 h-3 w-20 bg-ink/15" />
        </div>
        <div className="flex-1 space-y-2 px-3 py-5">
          <Skeleton className="h-9 bg-ink/15" />
          <Skeleton className="h-9 bg-ink/15" />
          <Skeleton className="h-9 bg-ink/15" />
        </div>
        <div className="border-t border-ink/10 p-4">
          <Skeleton className="h-9 bg-ink/15" />
        </div>
      </aside>
      <div className="flex min-w-0 flex-1 flex-col">
        <div className="border-b border-line bg-surface/80 px-6 py-5 lg:px-10">
          <Skeleton className="h-3 w-24" />
          <Skeleton className="mt-2 h-8 w-72 max-w-full" />
          <Skeleton className="mt-2 h-4 w-96 max-w-full" />
        </div>
        <div className="flex-1 px-6 py-8 lg:px-10">
          <div className="grid gap-4 sm:grid-cols-3">
            <Skeleton className="h-28" />
            <Skeleton className="h-28" />
            <Skeleton className="h-28" />
          </div>
          <div className="mt-8 space-y-4">
            <Skeleton className="h-24" />
            <Skeleton className="h-24" />
            <Skeleton className="h-24" />
          </div>
        </div>
      </div>
    </div>
  );
}
