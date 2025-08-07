"use client";
import { useDeleteExpence, useGetAllExpences } from "@/app/hooks/useExpences";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { dateConverter } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { FC, useState } from "react";
import { FaEdit, FaTrash } from "react-icons/fa";
import { toast } from "sonner";
import DeleteModel from "@/components/ui/delete-model";
import Pagination from "@/components/ui/pagination";
import { Separator } from "@/components/ui/separator";
import UpdateModel from "./UpdateModel";
import Dashboard from "../../dashboard/page";

interface IExpencesTable {
  selectedId: string;
  setSelectedId: (id: string) => void;
  setIsCreateModelOpen: (isOpen: boolean) => void;
  isCreateModelOpen: boolean;
  searchTerms: string;
}

const ExpencesTable: FC<IExpencesTable> = ({
  selectedId,
  setSelectedId,
  setIsCreateModelOpen,
  searchTerms,
}) => {
  const [page, setPage] = useState<number>(1);
  const [limit, setLimit] = useState<number>(10);

  const { data: expences, isLoading } = useGetAllExpences({
    page,
    limit,
    search: searchTerms,
  });
  const deleteExpence = useDeleteExpence();
  const [isModelOpen, setIsModelOpen] = useState<boolean>(false);
  const [updateModelOpen, setIsUpdateModelOpen] = useState<boolean>(false);

  const handelDelete = () => {
    toast.success("Expences deleted successfully");
    deleteExpence.mutate(selectedId);
    setIsModelOpen(false);
  };

  const handleModel = (id: string) => {
    setIsModelOpen(!isModelOpen);
    setSelectedId(id);
  };

  const handleUpdateModel = async (id: string) => {
    setSelectedId(id);
    setIsUpdateModelOpen(true);
  };

  // PAGINATIONS
  const totalPages = expences?.pagination.totalPages ?? 1;
  const handleFirstPage = () => setPage(1);
  const handlePrev = () => setPage((pre) => Math.max(1, pre - 1));
  const handleNext = () => setPage((nex) => Math.min(totalPages, nex + 1));
  const handleLast = () => setPage(totalPages);

  return (
    <>
      <Card className="bg-cardBgColor border-2 border-gray-400/35 p-2 w-full rounded-lg px-5 shadow-xl">
        <CardContent className="h-[490px] overflow-auto">
          <Table className="overflow-auto w-full my-2">
            <TableHeader className="border-b">
              <TableRow>
                <TableHead className="text-sm font-semibold text-left text-tableHeaderTextColor py-5">
                  Subject
                </TableHead>
                <TableHead className="text-sm font-semibold text-left text-tableHeaderTextColor py-5">
                  Category
                </TableHead>
                <TableHead className="text-sm font-semibold text-left text-tableHeaderTextColor whitespace-nowrap py-5">
                  Bank Type
                </TableHead>
                <TableHead className="text-sm font-semibold text-left text-tableHeaderTextColor whitespace-nowrap py-5">
                  Date
                </TableHead>
                <TableHead className="text-sm font-semibold text-left text-tableHeaderTextColor py-5">
                  Amount
                </TableHead>
                <TableHead className="text-sm font-semibold text-end text-tableHeaderTextColor py-5">
                  Action
                </TableHead>
              </TableRow>
            </TableHeader>
            {isLoading ? (
              <TableRow className="flex flex-col space-y-3 animate-pulse">
                <TableCell className="space-y-2">
                  <Skeleton className="h-4 w-full bg-gray-600/70" />
                  <Skeleton className="h-4 w-full bg-gray-600/70" />
                </TableCell>
              </TableRow>
            ) : Array.isArray(expences?.data) && expences?.data?.length > 0 ? (
              <TableBody className="overflow-scroll">
                {expences?.data?.map((item) => (
                  <TableRow key={item.id} className="overflow-scroll">
                    <TableCell className="text-sm text-textColor py-1.5 text-left">
                      {item.subject}
                    </TableCell>
                    <TableCell className="text-sm text-textColor py-1.5 text-left">
                      {item?.categoryData?.title}
                    </TableCell>
                    <TableCell className="text-sm text-textColor py-1.5 text-left">
                      {item.bankData?.title}
                    </TableCell>
                    <TableCell className="text-sm text-textColor py-1.5 text-left">
                      {dateConverter(item.paymentDate)}
                    </TableCell>
                    <TableCell className="text-sm text-textColor py-1.5 text-left">
                      ₹{item.amount}
                    </TableCell>
                    <TableCell className="text-sm text-textColor py-1.5 text-right space-x-3">
                      <Button
                        type="button"
                        variant="outline"
                        className="cursor-pointer"
                        onClick={() => handleModel(item?.id ?? "")}>
                        <FaTrash />
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        className="cursor-pointer"
                        onClick={() => handleUpdateModel(item.id ?? "")}>
                        <FaEdit />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            ) : (
              <TableBody>
                <TableRow aria-colspan={4}>
                  <p className="text-headerColor">No data found</p>
                </TableRow>
              </TableBody>
            )}
          </Table>
        </CardContent>
        <Separator className="my-5" />
        <div>
          <Pagination
            page={page}
            totalPage={totalPages}
            limits={["5", "10", "50", "100", "500"]}
            handleFirstPage={handleFirstPage}
            handlePrev={handlePrev}
            handleNext={handleNext}
            handleLast={handleLast}
            setLimit={setLimit}
            limit={limit}
          />
        </div>
      </Card>

      <DeleteModel
        setIsModelOpen={setIsModelOpen}
        isModelOpen={isModelOpen}
        confirmDelete={handelDelete}
        title="Expences"
      />
      <UpdateModel
        isModelOpen={updateModelOpen}
        selectedId={selectedId}
        setIsModelOpen={setIsUpdateModelOpen}
      />
    </>
  );
};

export default ExpencesTable;
