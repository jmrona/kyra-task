import { ArrowUpRightIcon, Link } from "lucide-react";
import { twMerge } from "tailwind-merge";

type FieldProps = {
  iconLeft?: React.ReactNode;
  iconRight?: React.ReactNode;
  label: string;
  value: string;
  id: string;
  type: "text" | "number" | "email" | "password" | "url" | "tel" | "date";
  readOnly?: boolean;
} & React.HTMLAttributes<HTMLInputElement>;

export default function Field ({
  iconLeft, 
  iconRight,
  label,
  value,
  id,
  type = "text",
  readOnly = false,
  className,
  ...rest
}: FieldProps) {

  return (
    <div className={twMerge("flex flex-col gap-1", className)}>
      <label htmlFor={id} className="w-full mb-0 text-neutral-500">
        {label}
      </label>
      <div className="relative">
        {iconLeft && iconLeft}
        <input
          type={type}
          readOnly={readOnly}
          id={id}
          className="w-full ps-12 p-3 pe-12 rounded-xl bg-neutral-900 border border-neutral-800 focus:outline-none focus:ring-2 focus:ring-blue-600 text-neutral-400"
          value={value}
          data-slot="input"
          {...rest}
        />
        {iconRight && iconRight}
      </div>
    </div>
  )
}