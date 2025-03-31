import { type Metrics } from "@/core/actions";

export function Metrics({ metrics, error }: { metrics?: Metrics; error?: string }) {
  if (error) return <div className="text-red-500">{error}</div>;
  if (metrics)
    return (
      <div className="flex flex-col">
        <div className="flex gap-1">
          Total words: <b>{metrics.totalWords}</b>
        </div>
        <div className="flex gap-4">
          <div className="flex gap-1">
            Learned: <b>{metrics.learnedWords}</b>
          </div>
          <div className="flex gap-1">
            Highlighted: <b>{metrics.highlightedWords}</b>
          </div>
        </div>
      </div>
    );
  return null;
}
