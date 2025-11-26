import { type Asset } from "@/app/types/asset";
import { cacheLife } from "next/cache";

export const getAssets = async (): Promise<Array<Asset>> => {
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