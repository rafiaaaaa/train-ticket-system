import { cn } from "@/lib/utils";

type SectionProps = {
  children: React.ReactNode;
  className?: string;
  as?: "section" | "div";
};

export function Section({ children, className, as = "section" }: SectionProps) {
  const Component = as;

  return (
    <Component className={cn("relative w-full px-4", className)}>
      {children}
    </Component>
  );
}
