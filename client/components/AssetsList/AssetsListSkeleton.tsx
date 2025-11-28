export default function AssetsListSkeleton() {
  return (
    <div className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-8 mt-10">
      {Array.from({ length: 6 }).map((_, i) => (
        <div key={i} className="aspect-9/16 bg-neutral-800 animate-pulse rounded-2xl" />
      ))}
    </div>
  )
}