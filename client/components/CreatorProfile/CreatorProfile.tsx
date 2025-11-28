import { type Asset } from "@/types/asset";

type CreatorProfileProps = {
  creator: Asset["creator"];
}

export default function CreatorProfile({creator}: CreatorProfileProps) {
  if (!creator || Object.keys(creator).length === 0) {
    return null
  }

  return (
    <div className="grid grid-cols-[auto_1fr] grid-rows-2 gap-x-4 mt-8">
      <img src={creator.profilePictureUrl} alt={`${creator.name} profile`} className="w-16 row-span-2 aspect-square rounded-lg" />
      <p className="text-lg text-neutral-400 capitalize font-semibold">{creator.handle}</p>
      <p className="text-lg font-semibold">{creator.name}</p>
    </div>
  )
}