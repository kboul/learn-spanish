import { type Metrics } from "@/core/actions";

import { Badge } from "@/components";

export function Metrics({ metrics, error }: { metrics?: Metrics; error?: string }) {
  if (error) return <div className="text-red-500">{error}</div>;
  if (metrics)
    return (
      <div className="flex gap-2 items-center">
        <Badge size="sm">{metrics.totalWords}</Badge>
        <Badge className="text-white bg-[var(--learned)]" size="sm">
          {metrics.learnedWords}
        </Badge>
        <Badge color="yellow" size="sm">
          {metrics.highlightedWords}
        </Badge>
      </div>
    );
  return null;
}
