import { cn } from "@/lib/utils";
import type { ComponentPropsWithoutRef } from "react";

const VARIANT_CLASSES = {
  primary: "bg-brand text-ink",
  secondary: "bg-surface-2 border border-hairline text-ink",
  ghost: "bg-transparent text-ink",
  danger: "bg-transparent text-danger",
} as const;

const SIZE_CLASSES = {
  md: "gap-3 px-4 py-3 text-callout",
  icon: "size-11",
} as const;

interface ButtonProps extends ComponentPropsWithoutRef<"button"> {
  variant?: keyof typeof VARIANT_CLASSES;
  size?: keyof typeof SIZE_CLASSES;
}

export function Button({
  variant = "secondary",
  size = "md",
  type = "button",
  className,
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(
        "flex shrink-0 items-center justify-center rounded-xl transition-opacity active:opacity-60",
        VARIANT_CLASSES[variant],
        SIZE_CLASSES[size],
        className,
      )}
      {...props}
    />
  );
}
