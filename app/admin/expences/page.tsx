"use client";
import React, { useCallback, useEffect, useState } from "react";
import ExpencesHeader from "./components/ExpencesHeader";
import { ExpencesModel } from "./components/ExpencesModel";
import {
  useGetAllExpencesFilter,
  useSingleExpence,
} from "@/app/hooks/useExpences";
import ExpenceFilter from "./components/ExpenceFilter";
import Dashboard from "../dashboard/page";
import { ExpenceDataTable } from "./components/Expence-Data-Table";
import { ExpenceColumns } from "./components/ExpenceColumns";

const page = () => {
  const [isModelOpen, setIsModelOpen] = useState<boolean>(false);
  const [selectedId, setSelectedId] = useState<string>("");
  const [searchTerms, setSearchTerms] = useState<string>("");
  const [filterModel, setFilterModel] = useState<boolean>(false);

  const {
    mutate: expencesMutatoinFunction,
    isPending: expenceLoading,
    data: expenceData,
  } = useGetAllExpencesFilter();

  const { data: singleExpence } = useSingleExpence();
  useEffect(() => {
    expencesMutatoinFunction();
  }, []);
  const handleModelOpen = () => {
    setIsModelOpen(isModelOpen ? false : true);
  };

  const handleFilterModel = useCallback(() => {
    setFilterModel(!filterModel);
  }, [filterModel]);

  return (
    <Dashboard>
      {/* EXPENCE MODEL */}
      <ExpencesModel
        handleModel={handleModelOpen}
        isModelOpen={isModelOpen}
        singleExpence={singleExpence}
      />
      {/* EXPENCE HEADER */}
      <ExpencesHeader
        handleModel={handleModelOpen}
        searchTerms={searchTerms}
        setSearchTerms={setSearchTerms}
        filterModelClose={handleFilterModel}
        filterModelOpen={filterModel}
      />
      {/* EXPENCES TABLE */}
      {/* <ExpencesTable
        selectedId={selectedId}
        setSelectedId={setSelectedId}
        isCreateModelOpen={isModelOpen}
        setIsCreateModelOpen={setIsModelOpen}
        searchTerms={searchTerms}
        setSearchTerms={setSearchTerms}
      /> */}
      <ExpenceFilter modelClose={handleFilterModel} modelOpne={filterModel} />
      <div className="container mx-auto">
        <ExpenceDataTable
          columns={ExpenceColumns}
          data={expenceData?.data ?? []}
        />
      </div>
    </Dashboard>
  );
};

export default page;
