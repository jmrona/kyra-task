import {twMerge as tw} from "tailwind-merge"

const variantClasses = {
  red: "bg-cab-sav-900/50 text-cab-sav-200 border border-cab-sav-900/40",
  "red-400": "bg-cab-sav-400/40 text-cab-sav-100 border border-cab-sav-400/20",
  blue: "bg-blue-zodiac-800/50 text-blue-zodiac-100 border border-blue-zodiac-900/40",
  "blue-400": "bg-blue-zodiac-300/40 text-blue-zodiac-100 border border-blue-zodiac-300/20",
  yellow: "bg-yellow-600 text-yellow-900 border border-yellow-700/60",
  green: "bg-green-800 text-green-100",
  "green-400": "bg-green-300/40 text-green-100 border border-green-300/10",
  purple: "bg-purple-300/60 text-purple-900",
  approved: "bg-lime-300 text-lime-900 border border-lime-300/20",
  pending: "bg-yellow-950 text-yellow-500 border border-yellow-600/20",
} as const;

export type BadgeProps = {
  variant: keyof typeof variantClasses;
  children?: React.ReactNode;
} & React.HTMLAttributes<HTMLDivElement>;

export default function Badge({variant, className, children}: BadgeProps) {

  return (
    <div className={tw(`${variantClasses[variant]} inline-flex items-center rounded-md px-1.5 py-0.5 text-[0.6rem] font-bold w-fit ${className || ""} `)}>
      {children}
    </div>
  );
}