import { twMerge } from "tailwind-merge";

type TabContentProps = {
  children: React.ReactNode;
} & React.HTMLAttributes<HTMLDivElement>;

type TabItemProps = {
  children: React.ReactNode;
  isActive: boolean;
  [key: string]: any;
} & React.HTMLAttributes<HTMLDivElement>;

function TabContent({ children, className, ...rest }: TabContentProps) {
  return (
    <section className={className} {...rest}>
      {children}
    </section>
  );
}

function Item({children, isActive, className, ...rest}: TabItemProps) { {
  return (
    <article className={twMerge(isActive ? "block" : "hidden", className)} {...rest}>
      {children}
    </article>
  )
}}

export default Object.assign(TabContent, {
  Item,
});