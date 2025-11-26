import { type Asset } from "@/lib/getAssets";
import Badge from "../Badge/Badge";
import { CircleAlert, CircleCheck, CirclePause, CircleX, type Icon, IconNode, MessageSquare, Split } from "lucide-react";
import { getComments } from "@/lib/getComments";


const STATUS_BADGE = {
  APPROVED: { variant: "approved" as const, label: "Final Approved" , icon: CircleCheck, iconClassName: "text-lime-300"},
  REJECTED_AWAITING_EDITS: { variant: "red" as const, label: "Rejected", icon: CircleX, iconClassName: "text-red-300" },
  IN_BRAND_REVIEW: { variant: "purple" as const, label: "In Brand Review", icon: CircleAlert, iconClassName: "text-purple-900 fill-purple-500" },
  PENDING_ADMIN_REVIEW: { variant: "pending" as const, label: "Pending Admin Review", icon: CircleAlert, iconClassName: "text-yellow-900 fill-yellow-500" },
  AWAITING_ASSET: { variant: "blue" as const, label: "Awaiting Asset", icon: CirclePause, iconClassName: "text-blue-300" },
}

export default async function Asset({asset}: {asset: Asset}) {
  const comments = await getComments(asset.id) || [];
  const statusBadge = STATUS_BADGE[asset.status as keyof typeof STATUS_BADGE] || { variant: "red" as const, label: asset.status };
  const IconComponent = statusBadge.icon || CircleAlert;

  return (
    <article className="overflow-hidden rounded-md relative aspect-9/16 flex flex-col justify-between p-2">
      <img src={asset.thumbnailUrl} alt="video thumbnail" className="object-cover object-center aspect-9/16 scale-108 absolute inset-0 -z-1" />
      <Badge variant={statusBadge.variant} className="flex py-0 items-center gap-1 text-[0.75rem] rounded-lg">
        <IconComponent width={13} fill="black" color="currentColor" className={statusBadge.iconClassName || "text-red-500"} /> 
        <span className="leading-0">{statusBadge.label}</span>
      </Badge>
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