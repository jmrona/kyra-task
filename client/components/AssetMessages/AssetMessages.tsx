'use client';

import React, { useEffect } from "react";
import { type Comment } from "@/types/comment";
import MessageItem from "./MessageItem";
import ChatForm from "./ChatForm";

type AssetMessagesProps = {
  comments: Comment[];
};

export default function AssetMessages({ comments: initialComments }: AssetMessagesProps) {
  const [comments, setComments] = React.useState<Comment[]>(initialComments);
  const chatHistoryRef = React.useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (chatHistoryRef.current) {
      chatHistoryRef.current.scrollTop = chatHistoryRef.current.scrollHeight;
    }
  }, [comments]);
  
  const handleNewComment = (newComment: Comment) => {
    setComments((prevComments) => [...prevComments, newComment]);
  }

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <div className="flex-1 p-5 overflow-y-auto flex flex-col-reverse dark-scrollbar md:overscroll-contain" ref={chatHistoryRef}>
        {comments
          .toSorted(
            (a, b) =>
              new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
          )
          .map((comment, index) => {
            return <MessageItem key={comment.id} comment={comment} />;
          })}
      </div>
      <div className="shrink-0">
        <ChatForm onCommentAdded={handleNewComment} />
      </div>
    </div>
  );
}
