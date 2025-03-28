import { Word } from "@prisma/client";

export function Metrics({ words }: { words?: Word[] }) {
  if (words)
    return (
      <div className="flex flex-col">
        <div className="flex gap-1">
          Total words: <b>{words.length}</b>
        </div>
        <div className="flex gap-4">
          <div className="flex gap-1">
            Learned: <b>{words.filter((word) => word.learned).length}</b>
          </div>
          <div className="flex gap-1">
            Highlighted: <b>{words.filter((word) => word.highlight).length}</b>
          </div>
        </div>
      </div>
    );
  return null;
}
