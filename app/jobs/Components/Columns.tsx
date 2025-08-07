'use client'
import { TJob } from "@/@types/jobTypes"
import { Button } from "@/components/ui/button";
import { ColumnDef } from "@tanstack/react-table"
import { Edit, Trash } from "lucide-react";

export const columns = (
    onEdit: (job: TJob) => void,
    onDelete: (job: TJob) => void
): ColumnDef<TJob>[] => [
        {
            accessorKey: "title",
            header: "Title",
        },
        {
            accessorKey: "jobType",
            header: "JobType",
        },
        {
            accessorKey: "qualification",
            header: "Qualification",
        },
        {
            accessorKey: "experience",
            header: "Experience"
        },
        {
            accessorKey: "salaryRange",
            header: "Salary Range"
        },
        {
            accessorKey: "createAt",
            header: " Created Date"
        },
        {
            id: "actions",
            header: "Actions",
            cell: ({ row }) => {

                const job = row.original;
                return (
                    <>
                        <div className="flex space-x-2">
                            <Button
                                variant="outline"
                                size="icon"
                                className="cursor-pointer hover:"
                                onClick={() => onEdit(job)}
                            >
                                <Edit />
                            </Button>
                            <Button
                                variant="destructive"
                                size="icon"
                                className="cursor-pointer hover:bg-red-500"
                                onClick={() => onDelete(job)}
                            >
                                <Trash />
                            </Button>
                        </div>
                    </>
                );
            },
        },
    ]