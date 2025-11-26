import { cacheLife } from "next/cache";

export type AssetStatus = 
  | 'APPROVED' 
  | 'PENDING_ADMIN_REVIEW' 
  | 'IN_BRAND_REVIEW'
  | 'REJECTED'
  | 'AWAITING_ASSET';
  
export type Brief = {
  id: number;
  title: string;
};

export type Asset = {
  id: number;
  creator: {
    id: number;
    handle: string;
    name: string;
    profilePictureUrl: string;
  };
  assetUrl: string;
  thumbnailUrl: string;
  caption: string;
  soundUrl: string;
  status: AssetStatus;
  deliverable: {
    id: number;
    brief: Brief;
    title: string;
    deadline: string | null;
    submissionOrigin: string;
    fees: number | null;
  };
};

export const getAssets = async (status?: AssetStatus): Promise<Array<Asset>> => {
  'use cache';
  cacheLife("seconds");
  
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/assets`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  })

  if(!response.ok) {
    throw new Error("Failed to fetch videos")
  }
  
  const data = await response.json() as Array<Asset>;
  
  return data;
}