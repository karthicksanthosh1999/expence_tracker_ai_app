import { IBank } from "@/@types/bankTypes";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import DataLoader from "@/components/ui/dataLoader";
import React, { FC } from "react";
import { FaPiggyBank } from "react-icons/fa";

type TBankList = {
  createModelClose: () => void;
  isLoading: boolean;
  getSingleBankModelClose: () => void;
  bankData: IBank[];
  getSingleBank: (id: string) => void;
};

const BankList: FC<TBankList> = ({
  createModelClose,
  bankData,
  isLoading,
  getSingleBankModelClose,
  getSingleBank,
}) => {
  const handleBankDetailsModel = (id: string) => {
    console.log(id);
    getSingleBankModelClose();
    getSingleBank(id);
  };
  return (
    <Card>
      <CardContent>
        <CardHeader>Bank Accounts</CardHeader>
        <hr />
        <div>
          {isLoading ? (
            <DataLoader />
          ) : (
            bankData &&
            bankData.map((item, idx) => (
              <div
                className="flex gap-5 justify-between items-center p-5"
                key={idx}>
                <div className="flex gap-5 items-center justify-center">
                  <FaPiggyBank size={30} />
                  <div>
                    <h4 className="text-lg text-white">
                      {item.title ?? "N/A"}
                    </h4>
                    <p className="text-xs text-gray-400">
                      Account No: {item.accountNo ?? "N/A"}
                    </p>
                  </div>
                </div>
                <div>
                  <Button
                    size={"sm"}
                    type="button"
                    variant={"outline"}
                    onClick={() => handleBankDetailsModel(item.id ?? "")}>
                    Manage
                  </Button>
                </div>
              </div>
            ))
          )}
          <hr />
        </div>
        <CardFooter>
          <CardAction>
            <Button
              size={"sm"}
              type="button"
              variant={"destructive"}
              onClick={createModelClose}>
              Add Bank
            </Button>
          </CardAction>
        </CardFooter>
      </CardContent>
    </Card>
  );
};

export default BankList;
