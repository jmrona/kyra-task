"use client";

import { useActionState, useEffect } from "react";
import { useParams } from "next/navigation";
import { twMerge } from "tailwind-merge";
import { ArrowUp } from "lucide-react";

import { type Comment } from "@/types/comment";
import { actions } from "@/app/actions";
import Alert from "../Alert/Alert";
import Textarea from "../Textarea/Textarea";
import Checkbox from "../Checkbox/Checkbox";

const INITIAL_STATE = {
  data: {
    assetId: 0,
    message: "",
    isInternal: false,
    time: "00:00",
    includeTime: false,
  },
  success: false,
  newComment: {},
  errors: {} as Record<string, string[]>,
};

type ChatFormProps = {
  onCommentAdded: (newComment: Comment) => void;
};

export default function ChatForm({ onCommentAdded }: ChatFormProps) {
  const params = useParams<{ id: string }>()
  const [state, formAction, pending] = useActionState(actions.asset.submitComment, {...INITIAL_STATE, data: {...INITIAL_STATE.data, assetId: Number(params.id) }});

  useEffect(() => {
    if(state.success && state.newComment && Object.keys(state.newComment).length > 0) {
      onCommentAdded(state.newComment as Comment);
    }
  }, [state.success, state.newComment, onCommentAdded]);

  return (
    <form action={formAction} className="border-t bg-[#111013] border-neutral-800 p-3 flex flex-col items-center gap-3">
      {state.errors && Object.keys(state.errors).length > 0 && (
        Object.keys(state.errors).map((key) => (
          state.errors[key].map((errorMessage, index) => (
            <Alert key={`${key}-error-${index}`} variant="error" withBackground={false} className="w-full p-0 italic text-sm mt-1">
              {errorMessage}
            </Alert>
          ))
        ))
      )}

      <div className="relative w-full">
        <Textarea 
          className={twMerge("**:data-[slot='textarea']:w-full **:data-[slot='textarea']:p-3 **:data-[slot='textarea']:pe-12 rounded-xl  **:data-[slot='textarea']:min-h-12 **:data-[slot='textarea']:overflow-y-hidden **:data-[slot='textarea']:max-h-50", 
            state.errors.message && "**:data-[slot='textarea']:border-red-500 **:data-[slot='textarea']:focus:ring-red-500")
          }
          aria-invalid={!!state.errors.message}
          aria-describedby={state.errors.message ? "message-error" : undefined}
          placeholder="Type your message..."
          name="message"
          defaultValue={state.data.message}
        />
        <button
          disabled={pending}
          aria-label="Send message"
          type="submit"
          className="absolute right-1 top-1/2 -translate-y-1/2 text-white p-3 cursor-pointer"
        >
          <ArrowUp size={18} className="group-disabled:opacity-35"/>
        </button>
      </div>

      <div className="flex justify-between items-center w-full">
         <Checkbox 
          id="timestamp"
          name="includeTime"
          defaultChecked={state.data.includeTime}
        >
          <input type="time" name="time" defaultValue={state.data.time} className="[&::-webkit-calendar-picker-indicator]:hidden" />
        </Checkbox>
        
        <Checkbox 
          id="internal-message"
          name="isInternal"
          defaultChecked={state.data.isInternal}
        >
          Internal message
        </Checkbox>
      </div>
    </form>
  );
}
