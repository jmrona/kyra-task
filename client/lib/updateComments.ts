import {type Comment } from "@/types/comment";

export const updateComments = async (assetId: number, comment: string): Promise<Comment> => {
  if(!assetId) {
    throw new Error("Asset ID is required to submit a comment");
  }

  if(!comment || comment.trim() === '') {
    throw new Error("Comment cannot be empty");
  }

  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/assets/${assetId}/comments`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ comment }),
  });

  if (!response.ok) {
    throw new Error("Failed to submit comment");
  }

  
  return response.json() as Promise<Comment>;
}