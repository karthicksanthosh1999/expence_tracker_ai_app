"use client";
import React, { useState } from "react";
import Dashboard from "../../dashboard/page";
import BankHeader from "./components/bankHeader";
import BankList from "./components/bankList";
import AddbankModel from "./components/AddbankModel";
import { useCreateBank, useFetchBank, useGetBank } from "@/app/hooks/useBank";
import { useSession } from "next-auth/react";
import BankDetailsModel from "./components/bankDetailsModel";
import { IBank } from "@/@types/bankTypes";

const page = () => {
  const { data } = useSession();

  const [search, setSearch] = useState<string>("");
  const [createModel, setCreateModel] = useState<boolean>(false);
  const [deleteModel, setDeleteModel] = useState<boolean>(false);

  const { mutate: createBankMutation } = useCreateBank();
  const { data: getBankData, isLoading: getBankLoading } = useGetBank();
  const {
    data: getSingleBankData,
    mutate: getSingleBankMutation,
    isPending: getSingleBankIsLoading,
  } = useFetchBank();

  const handleSearch = (searchInput: string) => {
    setSearch(searchInput);
  };

  const handleCreateModel = () => {
    setCreateModel(!createModel);
  };

  const handleDeleteModel = () => {
    setDeleteModel(!deleteModel);
  };

  return (
    <Dashboard>
      <BankHeader setSearchTerms={handleSearch} />
      <BankList
        createModelClose={handleCreateModel}
        bankData={getBankData?.response ?? []}
        isLoading={getBankLoading}
        getSingleBankModelOpen={deleteModel}
        getSingleBankModelClose={handleDeleteModel}
        getSingleBank={getSingleBankMutation}
      />
      <AddbankModel
        modelClose={handleCreateModel}
        modelOpen={createModel}
        createBankFunction={createBankMutation}
        userId={data?.user?.id ?? ""}
      />
      <BankDetailsModel
        bankData={getSingleBankData?.response ?? null}
        modelClose={handleDeleteModel}
        modelOpen={deleteModel}
        isLoading={getSingleBankIsLoading}
      />
    </Dashboard>
  );
};

export default page;
