"use client";

import { Button } from "@/components/ui/button";
import {
  CaretDownIcon,
  ClipboardIcon,
  FolderPlusIcon,
  SearchIcon,
} from "@/components/ui/icons";
import type { Routine } from "@/lib/types";
import { cn } from "@/lib/utils";
import { useRouter } from "next/navigation";
import { useId, useState } from "react";
import type { RoutinesStatus } from "../_hooks/use-routines";
import { RoutineCard } from "./routine-card";

interface RoutinesSectionProps {
  routines: Routine[];
  status: RoutinesStatus;
}

export function RoutinesSection({ routines, status }: RoutinesSectionProps) {
  const [isOpen, setIsOpen] = useState(true);
  const listId = useId();
  const router = useRouter();

  return (
    <section className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <h2 className="text-headline text-ink">Routines</h2>
        <Button
          variant="ghost"
          size="icon"
          aria-label="New folder"
          className="-mr-2"
        >
          <FolderPlusIcon />
        </Button>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <Button
          className="justify-start"
          onClick={() => router.push("/routines/new")}
        >
          <ClipboardIcon />
          New Routine
        </Button>
        <Button className="justify-start">
          <SearchIcon />
          Explore
        </Button>
      </div>

      <button
        type="button"
        aria-expanded={isOpen}
        aria-controls={listId}
        onClick={() => setIsOpen((open) => !open)}
        className="flex items-center gap-2 self-start py-2 text-callout text-ink-subtle transition-opacity active:opacity-60"
      >
        <CaretDownIcon
          className={cn("size-4 transition-transform", !isOpen && "-rotate-90")}
        />
        My Routines{status === "ready" && ` (${routines.length})`}
      </button>

      {isOpen && (
        <div id={listId} className="flex flex-col gap-4">
          {status === "error" && (
            <p className="text-footnote text-ink-subtle">
              Couldn't load routines.
            </p>
          )}
          {routines.map((routine) => (
            <RoutineCard key={routine.id} routine={routine} />
          ))}
        </div>
      )}
    </section>
  );
}
