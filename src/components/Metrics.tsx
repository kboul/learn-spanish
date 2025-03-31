import { type Metrics } from "@/core/actions";

import Badge from "./ui/Badge";

export function Metrics({ metrics, error }: { metrics?: Metrics; error?: string }) {
  if (error) return <div className="text-red-500">{error}</div>;
  if (metrics)
    return (
      <div className="flex gap-1 items-center">
        <Badge>{metrics.totalWords}</Badge>
        <Badge style={{ backgroundColor: "var(--learned)", color: "white" }}>{metrics.learnedWords}</Badge>
        <Badge color="yellow">{metrics.highlightedWords}</Badge>
      </div>
    );
  return null;
}
