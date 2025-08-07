"use client";
import SelectInput from "@/components/ui/SelectInput";
import { useGetBank } from "@/app/hooks/useBank";
import { useGetCategory } from "@/app/hooks/useCategory";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import React, { FC, useEffect, useState } from "react";
import { IoMdClose } from "react-icons/io";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { expenceSchemaValidator } from "@/validation-schema/expence-validation";
import { expencesType } from "@/@types/expencesTypes";
import { useUpdateExpence, useSingleExpence } from "@/app/hooks/useExpences";

type Props = {
  isModelOpen: boolean;
  setIsModelOpen: (open: boolean) => void;
  selectedId: string | null;
};

const UpdateModel: FC<Props> = ({
  isModelOpen,
  setIsModelOpen,
  selectedId,
}) => {
  const { data: category } = useGetCategory();
  const { data: bank } = useGetBank();
  const { mutate: updateExpenceMutation } = useUpdateExpence();
  const { mutate: fetchSingleMutation, data: singleExpence } =
    useSingleExpence();

  const {
    formState: { errors },
    handleSubmit,
    register,
    reset,
  } = useForm({ resolver: zodResolver(expenceSchemaValidator) });

  useEffect(() => {
    if (selectedId) {
      fetchSingleMutation(selectedId, {
        onSuccess: (data) => {
          if (!data?.responses) return;
          reset({
            amount: data.responses.amount,
            bankType: data.responses.bankType,
            category: data?.responses?.category,
            subject: data.responses.subject,
            paymentDate: data.responses.paymentDate,
          });
        },
      });
    }
  }, [selectedId]);

  const onSubmit = (data: expencesType) => {
    if (!selectedId) return;
    const mutationData: expencesType = {
      ...data,
      userId: "cmb5eq0fc0009vrncusitxwjj",
      paymentDate: new Date(data.paymentDate).toISOString(),
      id: selectedId,
    };
    updateExpenceMutation(mutationData);
    reset();
    setIsModelOpen(false);
  };
  const handleClose = () => {
    reset();
    setIsModelOpen(false);
  };
  return (
    <>
      {isModelOpen && (
        <div className="overflow-y-auto overflow-x-hidden fixed z-50 inset-0 flex justify-center items-center bg-black/50 bg-opacity-50">
          <div className="relative p-4 w-full max-w-xl">
            <div className="relative bg-cardBgColor rounded-lg shadow-lg">
              {/* Header */}
              <div className="flex items-center justify-between p-5 border-b rounded-t">
                <h3 className="text-xl font-semibold text-headerColor">
                  Update Expense
                </h3>
                <button
                  onClick={handleClose}
                  type="button"
                  className="text-gray-400 hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 flex items-center justify-center cursor-pointer">
                  <IoMdClose size={25} />
                </button>
              </div>

              {/* Body */}
              <form onSubmit={handleSubmit(onSubmit)} className="p-5 space-y-4">
                <Label className="text-sm" htmlFor="subject">
                  Amount:
                </Label>
                <Input
                  {...register("amount")}
                  placeholder="Amount"
                  type="text"
                />
                {errors.amount && (
                  <p className="text-red-500 text-sm">
                    {errors.amount.message}
                  </p>
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
                  <p className="text-red-500 text-sm">
                    {errors.category.message}
                  </p>
                )}
                <Label className="text-sm" htmlFor="subject">
                  Subject:
                </Label>
                <Input
                  {...register("subject")}
                  placeholder="Subject"
                  type="text"
                />
                {errors.subject && (
                  <p className="text-red-500 text-sm">
                    {errors.subject.message}
                  </p>
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
                  <p className="text-red-500 text-sm">
                    {errors.bankType.message}
                  </p>
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
                  <p className="text-red-500 text-sm">
                    {errors.paymentDate.message}
                  </p>
                )}
                {/* Footer */}
                <div className="flex justify-end p-5 border-t space-x-3">
                  <button
                    type="submit"
                    className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 text-sm font-medium">
                    Update
                  </button>
                  <button
                    onClick={() => setIsModelOpen(false)}
                    className="bg-white border border-gray-300 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-100 text-sm font-medium">
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default UpdateModel;
