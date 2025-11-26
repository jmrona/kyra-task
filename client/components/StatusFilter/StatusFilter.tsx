'use client';

import React from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { twMerge as tw } from "tailwind-merge";

import Badge from "../Badge/Badge";

type StatusProps = React.HTMLAttributes<HTMLDivElement> & {
  assets: Array<any>;
};

const status = [
  { label: "All",
    slug: "all" as const,
  },
  {
    label: "Awaiting asset",
    slug: "awaiting-asset" as const,
    variant: "blue-400" as const,
  },
  {
    label: "Needs admin review",
    slug: "pending-admin-review" as const,
    variant: "yellow" as const,
  },
  {
    label: "In brand review",
    slug: "in-brand-review" as const,
    variant: "purple" as const,
  },
  {
    label: "Rejected (awaiting edits)",
    slug: "rejected-awaiting-edits" as const,
    variant: "red-400" as const,
  },
  { 
    label: "Approved", 
    slug: "approved" as const, 
    variant: "green-400" as const 
  },
];

export type StatusUrlParams = typeof status[number]["slug"];

export default function StatusFilter({assets, className = "", ...rest}: StatusProps) {
  const searchParams = useSearchParams()
  const statusActive = searchParams.get("status") || "all"
  
  return (
    <nav className={tw(`flex items-center flex-wrap justify-center gap-2 bg-pill-bg p-[3px] text-sm font-semibold rounded-lg w-fit ms-auto me-0`, className || "")} {...rest}>
      {status.map((element) => {
        const totalCount = element.slug === "all" 
          ? assets.length 
          : assets.filter(asset => asset.status === element.slug.toUpperCase().replaceAll("-", "_")).length;

        return (
          <Link
            key={element.slug}
            href={`?status=${element.slug}`}
            className={`rounded-md px-3 py-1 flex items-center gap-2 ${statusActive === element.slug ? "bg-pill-active-bg" : ""}`}
            replace
            scroll={true}
            data-slot="status-filter-link"
          >
            {element.variant && (
              <Badge
                variant={element.variant}
                className="aspect-square w-2 p-0 rounded-xs"
                data-slot="status-filter-badge"
              />
            )}{" "}
            {element.label} <span className="font-normal">{totalCount}</span>
          </Link>
        );
      })}
    </nav>
  );
}
