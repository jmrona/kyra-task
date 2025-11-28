import { type Comment } from "@/types/comment";

type MessageItemProps = {
  comment: Comment;
};

export default function MessageItem({ comment }: MessageItemProps) {
  const avatar = comment.name
    .split(" ")
    .slice(0, 2)
    .map((n) => n[0])
    .join("");

  const color = ((comment.id * 137.508) % 360).toFixed(0);


  if (!comment || Object.keys(comment).length === 0) {
    return null;
  }

  return (
    <div
      key={comment.id}
      className="grid grid-cols-[auto_1fr] grid-rows-[auto_1fr_auto] gap-3 items-center mb-5"
    >
      <span
        aria-label={`${comment.name} avatar`}
        className="w-8 h-8 text-sm rounded-full object-cover object-center flex items-center justify-center"
        style={{ backgroundColor: `hsl(${color}, 70%, 30%)` }}
      >
        {avatar}
      </span>
      <p className="text-md font-bold">{comment.name}</p>
      <p className="bg-neutral-900 rounded-3xl p-4 text-white col-start-2 -col-end-1 row-start-2 text-sm text-pretty">
        {comment.comment}
      </p>
      <small className="row-start-3 col-start-2 text-end text-neutral-700">
        {new Date(comment.timestamp).toLocaleString("en-GB", {
          month: "short",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
        })}
      </small>
    </div>
  );
}
