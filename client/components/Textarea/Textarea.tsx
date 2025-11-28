import { twMerge } from "tailwind-merge";

type TextareaProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label?: string;
};

export default function Textarea({ label, value, className, id, ...rest }: TextareaProps) {
  return (
    <div className={twMerge("flex flex-col gap-1", className)}>
      {label && (
        <label
          htmlFor={id}
          className="w-full mb-0 text-neutral-500"
        >
          {label}
        </label>
      )}
      <textarea
        readOnly={rest.readOnly ?? false}
        id={id}
        className="w-full p-3 rounded-xl bg-neutral-900 border border-neutral-800 focus:outline-none focus:ring-2 focus:ring-blue-600 text-neutral-400 resize-none field-sizing-content"
        value={value}
        {...rest}
        data-slot="textarea"
      />
    </div>
  );
}
