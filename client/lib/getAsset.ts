import { cacheLife, cacheTag } from "next/cache";
import { type Asset } from "@/types/asset";

export const getAsset = async (assetId: number): Promise<Asset | Record<string, never>> => {
  'use cache';
  cacheTag('asset-', assetId.toString());
  cacheLife("seconds");
  
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/assets/${assetId}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })

  if(!response.ok) {
    throw new Error("Failed to fetch videos")
  }
  
  const data = await response.json() as Asset;
  
  return data ?? {};
}