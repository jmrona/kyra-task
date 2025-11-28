'use client';

import { useState } from "react";
import { type Asset, type AssetStatus } from "@/types/asset";
import Badge from "../Badge/Badge";
import { getStatusBadge } from "@/lib/getStatusBadge";
import { ArrowUpRightIcon, CircleAlert, Link } from "lucide-react";
import Field from "../Field/Field";
import Textarea from "../Textarea/Textarea";
import StatusDropdown from "../StatusDropdown/StatusDropdown";
import { updateAssetStatus } from "@/lib/updateAssetStatus";
import { set } from "zod";
import { twMerge } from "tailwind-merge";
import Alert from "../Alert/Alert";

type AssetDetailsProps = {
  asset: Asset | Record<string, never>;
};

export default function AssetDetails({ asset }: AssetDetailsProps) {
  const [currentStatus, setCurrentStatus] = useState<AssetStatus>(asset.status);
  const [isUpdating, setIsUpdating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [copySuccess, setCopySuccess] = useState<boolean | null>(null);

  const statusBadge = getStatusBadge(currentStatus);
  const IconComponent = statusBadge?.icon || CircleAlert;

  const handleStatusChange = async (newStatus: AssetStatus) => {
    setIsUpdating(true);
    setError(null);
    
    try {
      await updateAssetStatus(asset.id, newStatus);
      setCurrentStatus(newStatus);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update status');
      console.error('Error updating status:', err);
    } finally {
      setIsUpdating(false);
    }
  };

  const handleCopyUrl = (e) => {
    try {
      if(e.target.value.trim() === '') return;

      if (navigator.clipboard) {
        navigator.clipboard.writeText(asset.soundUrl).catch((err) => {
          console.error('Failed to copy URL:', err);
        });
      } else {
        const textArea = document.createElement('textarea');
        textArea.value = asset.soundUrl;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
      }
      setCopySuccess(true);
      setTimeout(() => setCopySuccess(null), 2000);
    } catch (err) {
      console.error('Failed to copy URL:', err);
      setCopySuccess(false);
      setTimeout(() => setCopySuccess(null), 2000);
    }
  }

  return (
    <article className="flex flex-col justify-start grow px-5 pt-5 pb-15 h-fill">
      <header className="flex items-center justify-end h-fit w-full gap-4">
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

        <StatusDropdown 
          currentStatus={currentStatus} 
          onStatusChange={handleStatusChange}
          disabled={isUpdating}
        />
      </header>

      {error && (
        <div className="mt-4 p-3 bg-red-900/20 border border-red-500 rounded-lg text-red-400 text-sm">
          {error}
        </div>
      )}

      <div className="flex justify-center gap-7 max-h-[600px] px-5 py-8">
        <div className="flex flex-1/2 flex-col max-w-[300px]">
          <div className="rounded-3xl aspect-9/16 overflow-hidden">
            <video
              src={asset.assetUrl}
              controls
              preload="auto"
              className="aspect-9/16 h-full w-full object-cover object-center"
            >
              Your browser does not support the video tag.
            </video>
          </div>
          <p className="mt-3 text-center text-neutral-400 text-lg">Video</p>
        </div>
        <div className="flex flex-1/2 flex-col max-w-[300px]">
          <div className="relative rounded-3xl aspect-9/16 overflow-hidden">
            <img
              src={asset.thumbnailUrl}
              alt="video thumbnail"
              className="object-cover object-center aspect-9/16 scale-108 absolute inset-0"
            />
          </div>
          <p className="mt-3 text-center text-neutral-400 text-lg">Thumbnail</p>
        </div>
      </div>

      <div className="flex flex-col gap-5 relative">
        {copySuccess === true ? (
          <Alert variant="success" withBackground={false} className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-2 text-sm">
            URL copied to clipboard!
          </Alert>
        ) : copySuccess === false ? (
          <Alert variant="error" withBackground={false} className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-2 text-sm">
            Failed to copy URL.
          </Alert>
        ) : null}

        <Field
          label="Sound used"
          id="sound-used"
          value={asset.soundUrl}
          type="url"
          readOnly={true}
          onClick={handleCopyUrl}
          className={twMerge(
            copySuccess === true && "[&_[data-slot='input']]:border-green-500 [&_[data-slot='input']]:focus:ring-green-500",
            copySuccess === false && "[&_[data-slot='input']]:border-red-500 [&_[data-slot='input']]:focus:ring-red-500"
          )}          
          iconLeft={
            <Link
              size={18}
              className="absolute left-3 top-1/2 -translate-y-1/2 text-neutral-500"
            />
          }
          iconRight={
            <ArrowUpRightIcon
              size={18}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral-500"
            />
          }
        />

        <Textarea
          label="Creator's Caption"
          value={asset.caption}
          readOnly={true}
          id="creator-caption"
        />
      </div>
    </article>
  );
}
