import React, { FC } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { IBank } from "@/@types/bankTypes";
import DataLoader from "@/components/ui/dataLoader";

type TBankDetailModel = {
  bankData: IBank;
  modelOpen: boolean;
  modelClose: () => void;
  isLoading: boolean;
};

const BankDetailsModel: FC<TBankDetailModel> = ({
  bankData,
  modelClose,
  modelOpen,
  isLoading,
}) => {
  return (
    <Dialog open={modelOpen} onOpenChange={modelClose}>
      {isLoading ? (
        <DialogContent>
          <DataLoader />
        </DialogContent>
      ) : (
        bankData && (
          <DialogContent>
            <DialogHeader>Bank Details</DialogHeader>
            <hr />
            <div>
              <h1>Title : {bankData?.title ?? "N/A"}</h1>
              <h3>Account : {bankData?.accountNo ?? "N//A"}</h3>
              <h3>IFCODE : {bankData?.ifcode ?? "N//A"}</h3>
              <h3>Location: {bankData?.location ?? "N//A"}</h3>
            </div>
            <hr />
            <DialogFooter>
              <Button
                type="submit"
                variant={"destructive"}
                onClick={modelClose}>
                Close
              </Button>
              <Button type="button" variant={"outline"} onClick={modelClose}>
                Delete
              </Button>
            </DialogFooter>
          </DialogContent>
        )
      )}
    </Dialog>
  );
};

export default BankDetailsModel;
