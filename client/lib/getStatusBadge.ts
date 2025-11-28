import { Asset } from "@/types/asset";
import { CircleAlert, CircleCheck, CirclePause, CircleX } from "lucide-react";

const STATUS_BADGE = {
  APPROVED: { variant: "approved" as const, label: "Final Approved" , icon: CircleCheck, iconClassName: "text-lime-300"},
  REJECTED: { variant: "red" as const, label: "Rejected", icon: CircleX, iconClassName: "text-red-300" },
  PENDING_BRAND_REVIEW: { variant: "purple" as const, label: "In Brand Review", icon: CircleAlert, iconClassName: "text-purple-900 fill-purple-500" },
  PENDING_ADMIN_REVIEW: { variant: "pending" as const, label: "Pending Admin Review", icon: CircleAlert, iconClassName: "text-yellow-950 fill-yellow-500" },
  AWAITING_ASSET: { variant: "blue" as const, label: "Awaiting Asset", icon: CirclePause, iconClassName: "text-blue-300" },
} as const;

export const getStatusBadge = (status: Asset["status"]): typeof STATUS_BADGE[keyof typeof STATUS_BADGE] | undefined => {
  return STATUS_BADGE[status as keyof typeof STATUS_BADGE];
}