import { Button } from "@/components/ui/button";
import { ChevronDownIcon } from "@/components/ui/icons";
import Link from "next/link";

export function WorkoutHeader() {
  return (
    <header className="sticky top-0 flex items-center gap-3 border-b border-hairline bg-canvas px-4 py-3">
      <Link
        href="/"
        aria-label="Close workout"
        className="flex size-11 shrink-0 items-center justify-center rounded-full border border-hairline-strong transition-opacity active:opacity-60"
      >
        <ChevronDownIcon />
      </Link>
      <h1 className="flex-1 truncate text-headline text-ink">Log Workout</h1>
      <Button variant="primary" className="rounded-full">
        Finish
      </Button>
    </header>
  );
}
