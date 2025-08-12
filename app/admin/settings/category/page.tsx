"use client";
import React, { useCallback, useEffect, useState } from "react";
import Dashboard from "../../dashboard/page";
import CategoryForm from "./components/categoryForm";
import CategoryHeader from "./components/categoryHeader";
import CategoryList from "./components/categoryList";
import {
  useBudgetCreate,
  useDeleteCategory,
  useGetCategory,
} from "@/app/hooks/useCategory";
import { useSession } from "next-auth/react";
import { ICategory } from "@/@types/categoryTypes";
import DeleteModel from "@/components/ui/delete-model";

const page = () => {
  const { data } = useSession();
  const [incomeData, setIncomeData] = useState<ICategory[] | null>(null);
  const [expenceData, setExpenceData] = useState<ICategory[]>([]);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [deleteCategoryModel, setDeleteCategoryModel] =
    useState<boolean>(false);

  const {
    data: categoryFilterData,
    isPending: categoryGetLoading,
    mutate: categoryFilterMutation,
  } = useGetCategory();
  const {
    mutate: createCategoryMutation,
    isPending: categoryCreateLoading,
    data: categoryCreateData,
  } = useBudgetCreate();
  const {
    mutate: categoryDeleteMutation,
    isPending: categoryDeleteIsLoading,
    data: categoryDeleteData,
  } = useDeleteCategory();
  useEffect(() => {
    categoryFilterMutation("");
  }, []);

  const handleDeleteFunction = useCallback(() => {
    setDeleteCategoryModel(!deleteCategoryModel);
  }, [deleteCategoryModel]);

  const confirmDeleteFunction = useCallback(
    (id: string) => {
      categoryDeleteMutation(id);
    },
    [deleteCategoryModel]
  );

  useEffect(() => {
    if (categoryFilterData?.response) {
      setExpenceData(
        categoryFilterData.response.filter(
          (item) => item.categoryType === "Expence"
        )
      );
      setIncomeData(
        categoryFilterData.response.filter(
          (item) => item.categoryType === "Income"
        )
      );
    }
  }, [categoryFilterData]);

  return (
    <Dashboard>
      <CategoryHeader setSearchTerms={() => "sdf"} />
      <div className="w-[100%] flex gap-2 relative h-full">
        <div className="w-[30%] sticky top-0">
          <CategoryForm
            userId={data?.user.id ?? ""}
            handleCreateCategoryFunciton={createCategoryMutation}
          />
        </div>
        <div className="w-[70%] flex flex-col gap-2">
          <CategoryList
            selectedId={selectedId ?? ""}
            setSelectedId={setSelectedId}
            title="Outcome List"
            description="Category List Here"
            categoryList={incomeData ?? []}
            loading={categoryGetLoading}
            deleteModelClose={handleDeleteFunction}
          />
          <CategoryList
            selectedId={selectedId ?? ""}
            setSelectedId={setSelectedId}
            title="Income List"
            description="Category List Here"
            categoryList={expenceData ?? []}
            loading={categoryGetLoading}
            deleteModelClose={handleDeleteFunction}
          />
        </div>
      </div>
      <DeleteModel
        isLoading={categoryDeleteIsLoading}
        deleteModelClose={handleDeleteFunction}
        deleteModelOpen={deleteCategoryModel}
        confirmDelete={confirmDeleteFunction}
      />
    </Dashboard>
  );
};

export default page;
