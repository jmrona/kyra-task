
import z from "zod";
import { validations } from "../validations";
import { updateComments } from "@/lib/updateComments";
import { type Comment } from "@/types/comment";

export type FormState = {
  data: {
    assetId: number;
    message: string;
    isInternal: boolean;
    time: string;
    includeTime: boolean;
  },
  newComment: Comment | Record<string, never>;
  success: boolean;
  errors: Record<string, string[]>;
}

export const submitComment = async (prevState: FormState, data: FormData) => {
  const message = data.get('message') as string;
  const isInternal = data.get('isInternal') === 'on';
  const time = data.get('time') as string;
  const includeTime = data.get('includeTime') === 'on';

  const validatedMessage = validations.comment.safeParse({
    assetId: prevState.data.assetId,
    message,
    isInternal,
    time,
    includeTime,
  })

  if(!validatedMessage.success) {
    const validationErrors = z.flattenError(validatedMessage.error);

    return {
      success: false,
      errors: validationErrors.fieldErrors,
      newComment: {},
      data: {
        assetId: prevState.data.assetId,
        message,
        isInternal,
        time,
        includeTime,
      }
    }
  }

  try {
    const newComment = await updateComments(prevState.data.assetId, validatedMessage.data.message);
    
    return {
      success: true,
      errors: {},
      newComment,
      data: {
        assetId: prevState.data.assetId,
        message: '',
        isInternal: false,
        time: '00:00',
        includeTime: false,
      }
    }
  } catch (error) {
    return {
      success: false,
      newComment: {},
      errors: { message: ['Failed to submit comment. Please try again.'] },
      data: {
        assetId: prevState.data.assetId,
        message,
        isInternal,
        time,
        includeTime,
      }
    }
  }
}
