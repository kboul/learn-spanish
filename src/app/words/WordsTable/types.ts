import { Word } from "@prisma/client";
import { ReactNode } from "react";

type AddEditModalProps = "edit" | "add" | "";
type WordsTableProps = { Header?: ReactNode; Footer?: ReactNode; words?: Word[]; error?: string };

export type { AddEditModalProps, WordsTableProps };
