import z from "zod";

export const commentSchema = z.object({
  assetId: z.number().int().positive(),
  message: z.string().trim().min(1, "Message cannot be empty").max(1000, "Message is too long"),
  isInternal: z.boolean().optional(),
  time: z.string().optional(),
  includeTime: z.boolean().optional(),
}).refine(
  (data) => {
    if (data.includeTime) {
      return data.time && data.time !== '' && data.time !== '00:00';
    }
    return true;
  },
  {
    message: "The time must be provided.",
    path: ["time"],
  }
);