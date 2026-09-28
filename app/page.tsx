"use client";

import { Button } from "@/components/ui/button";
import { ChevronDownIcon, PlusIcon } from "@/components/ui/icons";
import { RoutinesSection } from "./_components/routines-section";
import { TabBar } from "./_components/tab-bar";
import { useRoutines } from "./_hooks/use-routines";

export default function HomePage() {
  const { routines, status } = useRoutines();

  return (
    <>
      <main className="flex flex-1 flex-col gap-6 px-4 pt-4 pb-32">
        <header className="flex items-center gap-1">
          <h1 className="text-title-1 font-semibold text-ink">Workout</h1>
          <Button variant="ghost" size="icon" aria-label="Switch view">
            <ChevronDownIcon className="size-6 rounded-full bg-surface-3 p-1" />
          </Button>
        </header>

        <Button className="justify-start">
          <PlusIcon />
          Start Empty Workout
        </Button>

        <RoutinesSection routines={routines} status={status} />
      </main>
      <TabBar />
    </>
  );
}
