"use client"

import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    getPaginationRowModel,
    useReactTable,
} from "@tanstack/react-table"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import TablePagination from "@/components/ui/table-pagination";
import { useState } from "react";

interface DataTableProps<TData, TValue> {
    columns: ColumnDef<TData, TValue>[];
    data: TData[];
    onDelete: (row: TData) => void;
    onEdit: (row: TData) => void;
}
export function DataTable<TData, TValue>({
    columns,
    data,
    onDelete,
    onEdit,
}: DataTableProps<TData, TValue>) {

    const [pagination, setPagination] = useState({
        pageIndex: 0,
        pageSize: 10,
    })

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        manualPagination: false,
        state: {
            pagination,
        },
        onPaginationChange: setPagination,
        pageCount: Math.ceil(data.length / pagination.pageSize),
    })

    const currentPage = table.getState().pagination.pageIndex + 1
    const pageSize = table.getState().pagination.pageSize
    const totalRows = table.getFilteredRowModel().rows.length
    const totalPages = Math.ceil(totalRows / pageSize)

    const canNextPage = table.getCanNextPage()
    const canPreviousPage = table.getCanPreviousPage()

    const goToFirstPage = () => table.setPageIndex(0)
    const goToLastPage = () => table.setPageIndex(totalPages - 1)

    return (
        <>
            <div className="space-y-2">
                <div className="rounded-md border h-full bg-muted/50 w-full">
                    <Table className="bg-muted/50">
                        <TableHeader>
                            {table.getHeaderGroups().map((headerGroup) => (
                                <TableRow key={headerGroup.id}>
                                    {headerGroup.headers.map((header) => (
                                        <TableHead key={header.id}>
                                            {header.isPlaceholder
                                                ? null
                                                : flexRender(header.column.columnDef.header, header.getContext())}
                                        </TableHead>
                                    ))}
                                </TableRow>
                            ))}
                        </TableHeader>
                        <TableBody>
                            {table.getRowModel().rows.length ? (
                                table.getRowModel().rows.map((row) => (
                                    <TableRow key={row.id} data-state={row.getIsSelected() && 'selected'}>
                                        {row.getVisibleCells().map((cell) => (
                                            <TableCell key={cell.id}>
                                                {flexRender(cell.column.columnDef.cell, {
                                                    ...cell.getContext(),
                                                    onDelete: () => onDelete(row.original),
                                                    onEdit: () => onEdit(row.original),
                                                })}
                                            </TableCell>
                                        ))}
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={columns.length} className="h-24 text-center">
                                        No results.
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
                <TablePagination
                    nextPage={table.nextPage}
                    previousPage={table.previousPage}
                    getCanPreviousPage={canPreviousPage}
                    getCanNextPage={canNextPage}
                    goToFirstPage={goToFirstPage}
                    goToLastPage={goToLastPage}
                    currentPage={currentPage}
                    totalPages={totalPages}
                    totalRows={totalRows}

                />

            </div>
        </>
    );
}
