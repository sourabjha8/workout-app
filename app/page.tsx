"use client";

export default function HomePage() {
  return (
    <main className="flex flex-1 flex-col items-center justify-center gap-2 px-6 text-center">
      <h1 className="text-title-2 text-ink">Workout Tracker</h1>
      <p className="text-subheadline text-ink-muted">No workouts logged yet.</p>
    </main>
  );
}
