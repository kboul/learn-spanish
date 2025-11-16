import { Word } from "@prisma/client";
import { BadgeVariant } from "@/components/ui/badge";

const getBadgeVariant = (wordClass: Word["class"]): BadgeVariant["variant"] => {
  const mapping = {
    NOUN: "blue",
    VERB: "green",
    ADJECTIVE: "lime",
    ADVERB: "amber",
    PHRASE: "purple",
    PRONOUN: "red",
    PREPOSITION: "purple",
    CONJUNCTION: "emerald",
    INTERJECTION: "default"
  } as const;
  return mapping[wordClass];
};

export { getBadgeVariant };
