"use client";

export default function HomePage() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-2 px-6 text-center">
      <h1 className="text-xl font-semibold text-foreground">Workout Tracker</h1>
      <p className="text-sm text-foreground/60">No workouts logged yet.</p>
    </main>
  );
}
