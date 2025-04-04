import { Badge } from "@/components";

import { type Metrics } from "./actions";

export function Metrics({ metrics, error }: { metrics?: Metrics; error?: string }) {
  if (error) return <div className="text-red-500">{error}</div>;
  if (metrics)
    return (
      <div className="flex gap-2 items-center">
        <Badge className="!text-white !bg-gray-800" size="sm">
          {metrics.totalWords}
        </Badge>
        <Badge className="!text-white !bg-[var(--learned)]" size="sm">
          {metrics.learnedWords}
        </Badge>
        <Badge className="!bg-yellow-100 !text-yellow-800" size="sm">
          {metrics.highlightedWords}
        </Badge>
      </div>
    );
  return null;
}
