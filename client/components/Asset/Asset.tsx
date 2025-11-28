import { type Asset } from "@/types/asset";
import Badge from "../Badge/Badge";
import { CircleAlert, CircleCheck, CirclePause, CircleX, type Icon, IconNode, MessageSquare, Split } from "lucide-react";
import { getComments } from "@/lib/getComments";
import { getStatusBadge } from "@/lib/getStatusBadge";


export default async function Asset({asset}: {asset: Asset}) {
  const comments = await getComments(asset.id) || [];
  const statusBadge = getStatusBadge(asset.status);
  const IconComponent = statusBadge?.icon || CircleAlert;

  return (
    <article className="overflow-hidden rounded-md relative aspect-9/16 flex flex-col justify-between p-2">
      <img src={asset.thumbnailUrl} alt="video thumbnail" className="object-cover object-center aspect-9/16 scale-108 absolute inset-0 -z-1" />
      {statusBadge && <Badge variant={statusBadge.variant} className="flex py-0 items-center gap-1 text-[0.75rem] rounded-lg">
        <IconComponent width={13} fill="black" color="currentColor" className={statusBadge.iconClassName || "text-red-500"} /> 
        <span className="leading-0">{statusBadge.label}</span>
      </Badge>}
      <div className="p-3 rounded-md bg-neutral-950/90">
        <div className="flex gap-2 items-center">
          <img src={asset.creator.profilePictureUrl} alt={`${asset.creator.name} profile`} className="w-10 aspect-square rounded-full" />
          <p className="text-xs uppercase font-semibold">{asset.creator.name}</p>
        </div>
        
        <div className="mt-2 text-xs font-medium flex items-center gap-1">
          <Split width={15} color="white" fill="white"/>{asset.deliverable.title}
        </div>
        <div className="text-xs font-semibold flex items-center gap-1">
          <MessageSquare width={15} color="white" fill="white"/>{comments.length} comments
        </div>
      </div>
    </article>
  );
}