export default function Loading() {
  return (
    <div className="bg-[#111013] min-h-screen">
      {/* Left Panel Skeleton */}
      <div className="h-16 bg-black flex items-center justify-center">
        <div className="h-8 bg-neutral-800 rounded animate-pulse w-1/4"></div>
      </div>
      <section className="max-w-8xl min-h-[calc(100dvh-65px)] mx-auto grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-3">
        <div className="p-5 space-y-4">
          <div className="flex justify-center gap-7 max-h-[600px] px-5 py-8">
            <div className="aspect-9/16 w-[300px] bg-neutral-800 rounded-3xl animate-pulse"></div>
            <div className="aspect-9/16 w-[300px] bg-neutral-800 rounded-3xl animate-pulse"></div>
          </div>
          <div className="space-y-4">
            <div className="h-20 bg-neutral-800 rounded-xl animate-pulse"></div>
            <div className="h-32 bg-neutral-800 rounded-xl animate-pulse"></div>
          </div>
        </div>

        {/* Right Panel Skeleton */}
        <div className="border-l border-neutral-800 p-5">
          <div className="h-full bg-neutral-900 rounded animate-pulse"></div>
        </div>
      </section>
    </div>
  );
}