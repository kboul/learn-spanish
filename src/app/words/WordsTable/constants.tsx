import { Word } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";

import { getBadgeVariant } from "./utils";
import { Badge } from "@/components";

const headers = [{ name: "🇪🇸 Spanish" }, { name: "🇬🇧 English" }, { name: "🇬🇷 Greek" }, { name: "Class" }, { name: "" }];

const columns: ColumnDef<Word>[] = [
  { accessorKey: "spanish", header: "🇪🇸 Spanish" },
  { accessorKey: "english", header: "🇬🇧 English" },
  { accessorKey: "greek", header: "🇬🇷 Greek" },
  {
    accessorKey: "class",
    header: "Class",
    cell: ({ row }) => <Badge variant={getBadgeVariant(row.original.class)}>{row.original.class}</Badge>
  }
];

export { headers, columns };
