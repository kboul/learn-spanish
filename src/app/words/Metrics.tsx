import { Badge } from "@/components";

import { type Metrics } from "./actions";

type MetricsProps = { metrics?: Metrics; error?: string };

export function Metrics({ metrics, error }: MetricsProps) {
  if (error) return <div className="text-red-500">{error}</div>;
  if (metrics)
    return (
      <div className="flex gap-2 items-center">
        <Badge className="!text-white !bg-gray-800" size="sm" title="Total words">
          {metrics.totalWords}
        </Badge>
        <Badge className="learned" size="sm" title="Learned words">
          {metrics.learnedWords}
        </Badge>
        <Badge className="highlight" size="sm" title="Highlighted words">
          {metrics.highlightedWords}
        </Badge>
      </div>
    );
  return null;
}
