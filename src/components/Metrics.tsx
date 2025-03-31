import { type Metrics } from "@/core/actions";

import Badge from "./ui/Badge";

export function Metrics({ metrics, error }: { metrics?: Metrics; error?: string }) {
  if (error) return <div className="text-red-500">{error}</div>;
  if (metrics)
    return (
      <div className="flex gap-2 items-center">
        <Badge size="sm">{metrics.totalWords}</Badge>
        <Badge size="sm" style={{ backgroundColor: "var(--learned)", color: "white" }}>
          {metrics.learnedWords}
        </Badge>
        <Badge color="yellow" size="sm">
          {metrics.highlightedWords}
        </Badge>
      </div>
    );
  return null;
}
