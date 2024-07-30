import { cn } from "@/libs/utils";
import { HTMLAttributes } from "react";


export const PageLayout = ({
  className,
  children,
}: HTMLAttributes<HTMLElement>) => {
  return (
    <main
      className={cn(
        "relative flex min-h-screen flex-col bg-background",
        className
      )}
    >
      {children}
    </main>
  );
};
