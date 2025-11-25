import { ChevronLeftIcon } from "lucide-react";
import BreadCrumbs from "../BreadCrumbs/BreadCrumbs";
import Badge, { BadgeProps } from "../Badge/Badge";

type HeaderProps = {
  breadcrumbs: { label: string; href: string | null }[];
  children: React.ReactNode;
  showBreadcrumbs?: boolean;
  showBadges?: boolean;
  badges?: { variant: BadgeProps["variant"]; label: string }[];
}

export default function Header({breadcrumbs, children, showBreadcrumbs, showBadges, badges}: HeaderProps) {
  return (
    <header className="flex flex-col gap-3">
      {showBreadcrumbs && <BreadCrumbs history={breadcrumbs} />}

      <button className="flex gap-2 items-center cursor-pointer" aria-label="Go back">
        <ChevronLeftIcon className="text-gray-400" width={20} /> <h1 className="text-2xl font-black text-white">{children}</h1>
      </button>

      {showBadges &&<div className="flex gap-2">
        {badges?.map((badge, index) => (
          <Badge key={index} variant={badge.variant}>{badge.label}</Badge>
        ))}
      </div>}
    </header>
  )
}