import Link from "next/link";
import React from "react";
import { twMerge } from "tailwind-merge";

import Asset from "../Asset/Asset";
import { type Asset as AssetType } from "@/app/types/asset";
import { StatusUrlParams } from "../StatusFilter/StatusFilter";

type VideoListProps = React.HTMLAttributes<HTMLDivElement> & {
  status?: StatusUrlParams;
  assets: Array<AssetType>;
};

export default async function AssetsList({
  status,
  assets,
  className = "",
  ...rest
}: VideoListProps) {
  const assetsFiltered = assets.filter((asset) => {
    if (status === "all") return true;
    return (
      !status || asset.status === status.toUpperCase().replaceAll("-", "_")
    );
  });

  if (assetsFiltered.length === 0) {
    return (
      <div
        className={twMerge(
          `w-full text-center py-20 text-md text-neutral-300 italic ${
            className || ""
          }`
        )}
      >
        No assets found.
      </div>
    );
  }

  if (status === "all") {
    return (
      <section
        className={twMerge(
          `grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-8 ${
            className || ""
          }`
        )}
      >
        {Object.keys(Object.groupBy(assets, (asset) => asset.status))
          .toSorted((a, b) => {
            return b.localeCompare(a);
          })
          .map((status) => {
            const assetsByStatus = assets.filter((a) => a.status === status);

            return (
              <div key={status} className="col-span-full">
                <h2 className="text-white font-semibold text-lg mb-2 capitalize">
                  {status.replaceAll("_", " ").toLocaleLowerCase()}
                </h2>
                <div className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-8">
                  {assetsByStatus.map((assetItem) => {
                    return (
                      <Link
                        key={assetItem.id}
                        href={`/asset/${assetItem.id}`}
                        className=""
                        data-slot="video-item"
                      >
                        <Asset asset={assetItem} />
                      </Link>
                    );
                  })}
                </div>
              </div>
            );
          })}
      </section>
    );
  }

  return (
    <section className={twMerge(`${className || ""}`)} {...rest}>
      <h2 className="col-span-full text-white font-semibold text-lg mb-2 capitalize">
        {status?.replaceAll("-", " ").toLocaleLowerCase()}
      </h2>
      <div
        className={`grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-8`}
      >
        {assetsFiltered.map((asset) => {
          return (
            <Link
              key={asset.id}
              href={`/asset/${asset.id}`}
              className=""
              data-slot="video-item"
            >
              <Asset asset={asset} />
            </Link>
          );
        })}
      </div>
    </section>
  );
}
