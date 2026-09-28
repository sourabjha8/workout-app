import { cn, formatDuration } from "@/lib/utils";

interface WorkoutStatsProps {
  elapsedSeconds: number;
  volumeKg: number;
  setCount: number;
}

export function WorkoutStats({
  elapsedSeconds,
  volumeKg,
  setCount,
}: WorkoutStatsProps) {
  const stats = [
    {
      label: "Duration",
      value: formatDuration(elapsedSeconds),
      className: "text-brand",
    },
    { label: "Volume", value: `${volumeKg} kg`, className: "text-ink" },
    { label: "Sets", value: String(setCount), className: "text-ink" },
  ];

  return (
    <dl className="grid grid-cols-3 gap-4 border-b border-hairline px-4 py-4">
      {stats.map(({ label, value, className }) => (
        <div key={label} className="flex flex-col gap-1">
          <dt className="text-footnote text-ink-subtle">{label}</dt>
          <dd className={cn("text-body tabular-nums", className)}>{value}</dd>
        </div>
      ))}
    </dl>
  );
}
