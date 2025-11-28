import { ChevronLeftIcon } from "lucide-react";
import BreadCrumbs from "../BreadCrumbs/BreadCrumbs";
import Badge, { BadgeProps } from "../Badge/Badge";
import { twMerge } from "tailwind-merge";

type HeaderProps = {
  breadcrumbs?: { label: string; href: string | null }[];
  children: React.ReactNode;
  showBreadcrumbs?: boolean;
  showBadges?: boolean;
  badges?: { variant: BadgeProps["variant"]; label: string }[];
} & React.HTMLAttributes<HTMLDivElement>;

export default function Header({breadcrumbs, children, showBreadcrumbs, showBadges, badges, className}: HeaderProps) {
  return (
    <header className={twMerge("flex flex-col gap-3", className)}>
      {(showBreadcrumbs && breadcrumbs) && <BreadCrumbs history={breadcrumbs} />}

      <div className="flex gap-2 items-center grow" data-slot="content">
        {children}
      </div>

      {showBadges &&<div className="flex gap-2">
        {badges?.map((badge, index) => (
          <Badge key={index} variant={badge.variant}>{badge.label}</Badge>
        ))}
      </div>}
    </header>
  )
}