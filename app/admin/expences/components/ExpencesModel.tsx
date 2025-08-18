"use client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { FC, useEffect } from "react";
import SelectInput from "@/components/ui/SelectInput";
import { useCreateExpence } from "@/app/hooks/useExpences";
import { expencesType } from "@/@types/expencesTypes";
import { useGetCategory } from "@/app/hooks/useCategory";
import { useGetBank } from "@/app/hooks/useBank";
import { expenceSchemaValidator } from "@/validation-schema/expence-validation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";

type modelOpenType = {
  handleModel: () => void;
  isModelOpen: boolean;
  singleExpence: expencesType;
};
export const ExpencesModel: FC<modelOpenType> = ({
  handleModel,
  isModelOpen,
}) => {
  const { data: category, mutate: getCategoryFunction } = useGetCategory();
  const { data: bank } = useGetBank();

  useEffect(() => {
    getCategoryFunction({ categoryType: "" });
  }, []);
  console.log(category);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(expenceSchemaValidator),
  });

  // HOOKS
  const { mutate: createExpenceMutation } = useCreateExpence();

  const onSubmit = (data: expencesType) => {
    const mutattionData: expencesType = {
      ...data,
      userId: "cmb5eq0fc0009vrncusitxwjj",
    };
    createExpenceMutation(mutattionData);
    reset();
    handleModel();
  };

  const handleClose = () => {
    handleModel();
    reset();
  };

  return (
    <>
      <Dialog open={isModelOpen} onOpenChange={handleModel}>
        <DialogContent className="bg-muted">
          <DialogHeader>Create Expences</DialogHeader>
          <Separator />
          <form onSubmit={handleSubmit(onSubmit)} className="p-5 space-y-4">
            <Label className="text-sm" htmlFor="subject">
              Amount:
            </Label>
            <Input {...register("amount")} placeholder="Amount" type="text" />
            {errors.amount && (
              <p className="text-sm">{errors.amount.message}</p>
            )}
            <Label className="text-sm" htmlFor="subject">
              Category:
            </Label>
            <SelectInput
              options={category?.response}
              {...register("category")}
              name={"category"}
            />
            {errors.category && (
              <p className="text-sm">{errors.category.message}</p>
            )}
            <Label className="text-sm" htmlFor="subject">
              Subject:
            </Label>
            <Input {...register("subject")} placeholder="Subject" type="text" />
            {errors.subject && (
              <p className="text-sm">{errors.subject.message}</p>
            )}
            <Label className="text-sm" htmlFor="subject">
              Bank Type:
            </Label>
            <SelectInput
              {...register("bankType")}
              options={bank}
              name={"bankType"}
            />
            {errors.bankType && (
              <p className="text-sm">{errors.bankType.message}</p>
            )}
            <Label className="text-sm" htmlFor="subject">
              Payment Date:
            </Label>
            <Input
              {...register("paymentDate")}
              type="date"
              className="max-w-lg"
            />
            {errors.paymentDate && (
              <p className="text-sm">{errors.paymentDate.message}</p>
            )}
            <Separator />
            <DialogFooter>
              <Button
                type="submit"
                variant="outline"
                size="sm"
                className="cursor-pointer">
                Create
              </Button>
              <Button
                type="submit"
                variant="destructive"
                size="sm"
                onClick={handleClose}
                className="cursor-pointer">
                Create
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
};
