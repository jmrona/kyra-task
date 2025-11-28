import { type AssetStatus, type Asset } from "@/types/asset";

export const updateAssetStatus = async (
  assetId: number,
  status: AssetStatus
): Promise<Asset> => {
  if (!assetId) {
    throw new Error("Asset ID is required to update status");
  }

  if (!status) {
    throw new Error("Status is required");
  }

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/api/assets/${assetId}`,
    {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status }),
    }
  );

  if (!response.ok) {
    const error = await response.json().catch(() => ({}));
    throw new Error(error.statusMessage || "Failed to update asset status");
  }

  return response.json() as Promise<Asset>;
};
