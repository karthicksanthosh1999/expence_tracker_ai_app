import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import SelectInput, { Toption } from "@/components/ui/SelectInput";
import React from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { categorySchema } from "@/validation-schema/category-vlidation-schema";
import { ICategory } from "@/@types/categoryTypes";

const CategoryForm = () => {
  const {
    reset,
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({ resolver: zodResolver(categorySchema) });

  const options: Toption[] = [
    {
      id: 0,
      name: "Income",
      value: "Income",
    },
    {
      id: 1,
      name: "Expence",
      value: "Expence",
    },
  ];

  const handelCreateCategory = (data: ICategory) => {};

  return (
    <Card>
      <form onSubmit={handleSubmit(handelCreateCategory)}>
        <CardHeader>
          <CardTitle>Add Category</CardTitle>
          <CardDescription>Add the cateogry form</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            <Label>Title : </Label>
            <Input placeholder="Enter the title" {...register()} />
          </div>
          <div className="space-y-3">
            <Label>Type : </Label>
            <Controller
              name="categoryType"
              control={control}
              render={({ field }) => (
                <SelectInput
                  name={field.name}
                  onchange={field.onChange}
                  value={field.value}
                  options={options}
                />
              )}
            />
          </div>
        </CardContent>
        <CardFooter>
          <CardAction className="space-y-3 w-full">
            <Button size={"sm"} className="cursor-pointer w-full bg-primary">
              Create Category
            </Button>
            <Button
              size={"sm"}
              className="cursor-pointer w-full "
              variant={"destructive"}>
              Reset
            </Button>
          </CardAction>
        </CardFooter>
      </form>
    </Card>
  );
};

export default CategoryForm;
