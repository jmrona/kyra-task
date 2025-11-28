'use client';

import { useState, useRef, useEffect } from "react";
import { type AssetStatus } from "@/types/asset";
import { getStatusBadge } from "@/lib/getStatusBadge";
import { CircleAlert } from "lucide-react";
import Badge from "../Badge/Badge";

type StatusDropdownProps = {
  currentStatus: AssetStatus;
  onStatusChange: (newStatus: AssetStatus) => void;
  disabled?: boolean;
};

const ALL_STATUSES: AssetStatus[] = [
  'APPROVED',
  'PENDING_ADMIN_REVIEW',
  'PENDING_BRAND_REVIEW',
  'REJECTED',
  'AWAITING_ASSET',
];

export default function StatusDropdown({ currentStatus, onStatusChange, disabled = false }: StatusDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen]);

  const handleStatusSelect = (status: AssetStatus) => {
    onStatusChange(status);
    setIsOpen(false);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        disabled={disabled}
        className="rounded-lg bg-linear-to-r from-blue-800 to-pink-700 px-3 py-1 text-white hover:opacity-90 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {disabled ? 'Updating...' : 'Edit Status'}
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-64 bg-neutral-900 border border-neutral-800 rounded-lg shadow-lg z-50 overflow-hidden">
          {ALL_STATUSES.map((status) => {
            const statusBadge = getStatusBadge(status);
            const IconComponent = statusBadge?.icon || CircleAlert;
            const isSelected = status === currentStatus;

            return (
              <button
                key={status}
                onClick={() => handleStatusSelect(status)}
                className={`w-full px-4 py-2 text-left hover:bg-neutral-800 transition-colors flex items-center gap-3 ${
                  isSelected ? 'bg-neutral-800' : ''
                }`}
              >
                {statusBadge && (
                  <Badge
                    variant={statusBadge.variant}
                    className="flex py-0 items-center gap-1 text-[0.75rem] rounded-lg"
                  >
                    <IconComponent
                      width={13}
                      fill="black"
                      color="currentColor"
                      className={statusBadge.iconClassName || "text-red-500"}
                    />
                    {statusBadge.label}
                  </Badge>
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
