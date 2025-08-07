"use client";

import { expencesType } from "@/@types/expencesTypes";
import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown } from "lucide-react";

export const ExpenceColumns: ColumnDef<expencesType>[] = [
  {
    accessorKey: "subject",
    header: "Subject",
  },
  {
    accessorKey: "category",
    header: "Category",
  },
  {
    accessorKey: "bankType",
    header: "Bank Type",
  },
  {
    accessorKey: "paymentDate",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          className="cursor-pointer"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
          Email
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
  },
  {
    accessorKey: "amount",
    header: "Amount",
  },
  {
    header: "Action",
  },
];
