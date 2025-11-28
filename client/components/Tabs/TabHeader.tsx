import Link from 'next/link';
import React from 'react'
import { twMerge } from 'tailwind-merge';


type TabHeaderProps = {
  children: React.ReactNode;
} & React.HTMLAttributes<HTMLDivElement>;

type TabItemProps = {
  children: React.ReactNode;
  isActive: boolean;
  scroll?: boolean;
  [key: string]: any;
} & React.AnchorHTMLAttributes<HTMLAnchorElement>;

function TabHeader({ children, className, ...rest }: TabHeaderProps) {
  return (
    <nav className={twMerge("flex gap-5 pt-5 px-5 w-full border-b border-neutral-800", className)} {...rest}>
      {children}
    </nav>
  );
}

function Item({children, isActive, scroll, className, ...rest}: TabItemProps) {
  return (
    <Link 
      href={"?tab=overview"} 
      scroll={scroll ?? false}
      className={twMerge(isActive ? "text-lime-300 underline underline-offset-5 decoration-2" : "text-neutral-400", className)}
      {...rest}
    >
      {children}
    </Link>
  )
}

export default Object.assign(TabHeader, {
  Item,
});
