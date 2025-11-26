export type Comment = {
  id: number;
  assetId: number;
  name: string;
  timestamp: string;
  comment: string;
};

export async function getComments(assetId: number): Promise<Comment[] | []> {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/assets/${assetId}/comments`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!response.ok) {
    throw new Error("Failed to fetch comments");
  }

  return response.json();
}