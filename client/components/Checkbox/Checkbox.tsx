import React from "react";
import { Check } from "lucide-react";
import { twMerge } from "tailwind-merge";

type CheckboxProps = {
  children?: React.ReactNode;
  id: string;
  name: string;
  labelPosition?: 'left' | 'right';
  [key: string]: any;
} & React.HTMLAttributes<HTMLInputElement>

export default function Checkbox({children, id, name, labelPosition = 'right', className, ...rest}: CheckboxProps) {
  return (
     <label
      htmlFor={id}
      className={twMerge("text-sm text-neutral-500 cursor-pointer flex items-center gap-2 group", className)}
    >
      <input
        type="checkbox"
        id={id}
        name={name}
        className="peer/checkbox w-0 h-0"
        {...rest}
      />
      <span className="inline-flex peer-checked/checkbox:border-lime-300 peer-checked/checkbox:bg-lime-300 peer-focus/checkbox:ring-2 peer-focus/checkbox:ring-blue-600 peer-focus/checkbox:ring-offset-2 peer-focus/checkbox:ring-offset-neutral-900 border border-neutral-500 w-4 h-4 rounded-sm relative">
        <Check
          size={14}
          className="text-transpa rent group-[:has(input:checked)]:text-black"
          data-slot="icon"
        />
      </span>
      {children && <span className={`${labelPosition === "left" ? "order-first" : ""}`} data-slot="label">{children}</span>}
    </label>
  )
}