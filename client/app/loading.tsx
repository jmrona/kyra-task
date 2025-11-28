import AssetsListSkeleton from "@/components/AssetsList/AssetsListSkeleton";

export default function Loading() {
  return (
    <main className="min-h-screen px-3 py-3 md:px-6 md:py-6 max-w-6xl mx-auto">
      <header className="h-16 bg-black flex items-center justify-center">
        <div className="h-8 bg-neutral-800 rounded animate-pulse w-1/4"></div>
      </header>
      <section className="grow w-full py-12">
        <div className="h-8 bg-neutral-800 rounded animate-pulse w-9/12 ms-auto"></div>
        <AssetsListSkeleton />
      </section>
    </main>
  );
}