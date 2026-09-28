"use client";

import { DumbbellIcon, UserIcon } from "@/components/ui/icons";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

const TABS = [
  { href: "/", label: "Workout", Icon: DumbbellIcon },
  { href: "/profile", label: "Profile", Icon: UserIcon },
] as const;

export function TabBar() {
  const pathname = usePathname();

  return (
    <nav className="fixed inset-x-0 bottom-6 flex justify-center">
      <ul className="flex gap-1 rounded-full border border-hairline-strong bg-surface-3 p-1.5">
        {TABS.map(({ href, label, Icon }) => {
          const isActive = pathname === href;
          return (
            <li key={href}>
              <Link
                href={href}
                aria-current={isActive ? "page" : undefined}
                className={cn(
                  "flex flex-col items-center gap-0.5 rounded-full px-6 py-2 text-caption-1 transition-opacity active:opacity-60",
                  isActive ? "bg-surface-4 text-brand" : "text-ink-muted",
                )}
              >
                <Icon />
                {label}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
