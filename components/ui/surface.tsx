import { cn } from "@/lib/utils";
import type { ComponentPropsWithoutRef } from "react";

const LEVEL_CLASSES = {
  0: "bg-transparent",
  1: "bg-surface-1 border border-hairline",
  2: "bg-surface-2 border border-hairline",
  3: "bg-surface-3 border border-hairline",
  4: "bg-surface-1 border border-brand-focus",
} as const;

type SurfaceLevel = keyof typeof LEVEL_CLASSES;

interface SurfaceProps extends ComponentPropsWithoutRef<"div"> {
  level?: SurfaceLevel;
}

export function Surface({ level = 1, className, ...props }: SurfaceProps) {
  return (
    <div
      className={cn("rounded-xl", LEVEL_CLASSES[level], className)}
      {...props}
    />
  );
}
