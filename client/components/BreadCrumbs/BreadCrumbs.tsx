import Link from "next/link";
import { ChevronRight } from "lucide-react";
import React from "react";


type BreadcrumbsProps = {
  history: Record<"label" | "href", string | null>[];
};
export default function BreadCrumbs({history}: BreadcrumbsProps) {
  return (
    <nav className="text-sm flex items-center gap-2">
      {history.map((crumb, index) => (
        <React.Fragment key={index}>
          {index > 0 && <ChevronRight className="h-4 w-4" />}
          {crumb.href ? (
            <Link href={crumb.href} className="font-medium text-[0.8rem]">{crumb.label}</Link>
          ) : (
            <span className="font-black">{crumb.label}</span>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
}
