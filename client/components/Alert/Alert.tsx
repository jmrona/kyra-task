import { twMerge } from "tailwind-merge";

type AlertProps = {
  variant?: 'info' | 'success' | 'warning' | 'error';
  withBackground?: boolean;
  children: React.ReactNode;
  className?: string;
} & React.HTMLAttributes<HTMLDivElement>


export default function Alert ({variant = 'info', withBackground = true, children, className}: AlertProps) {
  const variantStyles = {
    info: withBackground ? 'p-4 rounded-lg border bg-blue-900 border-blue-800 text-blue-400' : 'p-1 text-blue-500',
    success: withBackground ? 'p-4 rounded-lg border bg-green-900 border-green-800 text-green-400' : 'p-1 text-green-500',
    warning: withBackground ? 'p-4 rounded-lg border bg-yellow-900 border-yellow-800 text-yellow-400' : 'p-1 text-yellow-500',
    error: withBackground ? 'p-4 rounded-lg border bg-red-900 border-red-800 text-red-400' : 'p-1 text-red-500',
  };

  return (
    <div className={twMerge(` ${variantStyles[variant]}`, className)} role="alert">
      {children}
    </div>
  );
}