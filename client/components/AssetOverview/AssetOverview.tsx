import { type Asset } from "@/types/asset"
import CreatorProfile from "../CreatorProfile/CreatorProfile";

type AssetOverviewProps = {
  asset: Asset | Record<string, never>;
}

export default function AssetOverview({asset}: AssetOverviewProps) {
  if (!asset || Object.keys(asset).length === 0) {
    return <p className="p-5">No asset data available.</p>;
  }

  return (
    <>
      <div className="px-5 pb-5 border-b border-neutral-800 ">
        <h2 className="text-xl font-bold mt-5">Overview</h2>
        <CreatorProfile creator={asset.creator} />

        <div className="mt-8">
          <h3 className="text-neutral-400">Brief Name</h3>
          <p className="text-white">{asset.deliverable.brief.name}</p>
        </div>

        <div className="mt-5 grid grid-cols-2 grid-rows-2">
          <h3 className="text-neutral-400">Fee</h3>
          <p className="text-white">{asset.deliverable?.fees ?? "-"}</p>
          
          <h3 className="text-neutral-400 col-start-2 -col-end-1 row-start-1">Deadline</h3>
          <p className="text-white col-start-2 -col-end-1 row-start-2">{asset.deliverable?.deadline ?? "-"}</p>
        </div>

        <div className="mt-8">
          <h3 className="text-neutral-400">Deliverable title</h3>
          <p className="text-white">{asset.deliverable.title}</p>
        </div>
      </div>
      
      <button className="px-5 py-5 cursor-pointer">
        <h2 className="text-xl font-bold">Caption & sound instructions</h2>
      </button>
    </>
  )
}