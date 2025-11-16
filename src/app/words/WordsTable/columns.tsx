import { Word } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";

import { WordActions } from "./WordActions";
import { Badge } from "@/components";
import { getBadgeVariant } from "./utils";

const columns: ColumnDef<Word>[] = [
  { accessorKey: "spanish", header: "🇪🇸 Spanish" },
  { accessorKey: "english", header: "🇬🇧 English" },
  { accessorKey: "greek", header: "🇬🇷 Greek" },
  {
    accessorKey: "class",
    header: "Class",
    cell: ({ row }) => <Badge variant={getBadgeVariant(row.original.class)}>{row.original.class}</Badge>
  },
  {
    id: "actions",
    cell: ({ row }) => <WordActions row={row.original} />
  }
];

export { columns };
