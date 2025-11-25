'use client';

import React from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import { twMerge as tw } from "tailwind-merge";

import Badge from "../Badge/Badge";

type StatusProps = React.HTMLAttributes<HTMLDivElement>;

const status = [
  { label: "All", slug: "all" },
  {
    label: "Awaiting asset",
    slug: "awaiting-asset",
    variant: "blue-400" as const,
  },
  {
    label: "Needs admin review",
    slug: "needs-admin-review",
    variant: "yellow" as const,
  },
  {
    label: "In brand review",
    slug: "in-brand-review",
    variant: "purple" as const,
  },
  {
    label: "Rejected (awaiting edits)",
    slug: "rejected-awaiting-edits",
    variant: "red-400" as const,
  },
  { label: "Approved", slug: "approved", variant: "green-400" as const },
];

export default function StatusFilter(props: StatusProps) {
  const searchParams = useSearchParams()
  const statusActive = searchParams.get("status") || "all"

  return (
    <nav className={tw(`flex items-center flex-wrap justify-center gap-2 bg-pill-bg p-[3px] text-sm font-semibold rounded-lg w-fit ms-auto me-0`, props.className || "")}>
      {status.map((element) => {
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
            {element.label}
          </Link>
        );
      })}
    </nav>
  );
}
