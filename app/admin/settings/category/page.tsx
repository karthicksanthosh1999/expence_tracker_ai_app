"use client";
import React from "react";
import Dashboard from "../../dashboard/page";
import CategoryForm from "./components/categoryForm";
import CategoryHeader from "./components/categoryHeader";
import CategoryList from "./components/categoryList";
import { useGetCategory } from "@/app/hooks/useCategory";
import { useForm } from "react-hook-form";

const page = () => {
  const { data: categoryData, isLoading: categoryGetLoading } =
    useGetCategory();

  return (
    <Dashboard>
      <CategoryHeader setSearchTerms={() => "sdf"} />
      <div className="w-[100%] flex gap-2 relative h-full">
        <div className="w-[30%] sticky top-0">
          <CategoryForm />
        </div>
        <div className="w-[70%] flex flex-col gap-2">
          <CategoryList
            title="Outcome List"
            description="Category List Here"
            categoryList={categoryData?.response ?? []}
            loading={categoryGetLoading}
          />
          <CategoryList
            title="Income List"
            description="Category List Here"
            categoryList={categoryData?.response ?? []}
            loading={categoryGetLoading}
          />
        </div>
      </div>
      <div className="w-[70%]"></div>
    </Dashboard>
  );
};

export default page;
