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

type TBankDetailModel = {
  bankData: IBank;
  modelOpen: boolean;
  modelClose: () => void;
};

const BankDetailsMode: FC<TBankDetailModel> = ({
  bankData,
  modelClose,
  modelOpen,
}) => {
  return (
    <Dialog open={modelOpen} onOpenChange={modelClose}>
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
          <Button type="submit" variant={"destructive"}>
            Close
          </Button>
          <Button type="button" variant={"outline"} onClick={modelClose}>
            Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default BankDetailsMode;
