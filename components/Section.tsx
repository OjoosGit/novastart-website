import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface SectionProps {
  children: ReactNode;
  className?: string;
  background?: "white" | "neutral";
}

export function Section({ children, className, background = "white" }: SectionProps) {
  return (
    <section
      className={cn(
        "py-12 md:py-20",
        background === "neutral" && "bg-neutral-50",
        background === "white" && "bg-white",
        className
      )}
    >
      {children}
    </section>
  );
}



