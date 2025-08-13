import { IBank } from "@/@types/bankTypes";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { bankSchema } from "@/validation-schema/bank-validation-schema";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { FC } from "react";
import { useForm } from "react-hook-form";

type TAddBankModel = {
  userId: string;
  modelOpen: boolean;
  createBankFunction: (data: IBank) => void;
  modelClose: () => void;
};

const AddbankModel: FC<TAddBankModel> = ({
  modelOpen,
  modelClose,
  userId,
  createBankFunction,
}) => {
  const {
    formState: { errors },
    register,
    reset,
    handleSubmit,
  } = useForm({ resolver: zodResolver(bankSchema) });

  const handleFormSubmit = (data: IBank) => {
    console.log({ ...data, userId });
    createBankFunction({ ...data, userId });
    modelClose();
    reset();
  };

  return (
    <Dialog open={modelOpen} onOpenChange={modelClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add Your Bank</DialogTitle>
          <DialogDescription>Add Your Bank Here</DialogDescription>
        </DialogHeader>
        <hr />
        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label>Title</Label>
              <Input
                type="text"
                placeholder="Bank Name"
                {...register("title")}
              />
              {errors.title && (
                <p className="text-xs">{errors.title.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label>Account No</Label>
              <Input
                type="text"
                placeholder="Account Number"
                {...register("accountNo")}
              />
              {errors.accountNo && (
                <p className="text-xs">{errors.accountNo.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label>IFCODE</Label>
              <Input type="text" placeholder="IFCODE" {...register("ifcode")} />
              {errors.ifcode && (
                <p className="text-xs">{errors.ifcode.message}</p>
              )}
            </div>
            <div className="space-y-2">
              <Label>Location</Label>
              <Input
                type="text"
                placeholder="Location"
                {...register("location")}
              />
              {errors.location && (
                <p className="text-xs">{errors.location.message}</p>
              )}
            </div>
          </div>
          <hr className="py-2" />
          <DialogFooter>
            <Button type="submit" variant={"destructive"}>
              Add Bank
            </Button>
            <Button type="button" variant={"outline"} onClick={modelClose}>
              Cancel
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default AddbankModel;
