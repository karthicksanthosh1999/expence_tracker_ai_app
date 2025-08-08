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

const CategoryForm = () => {
  const {
    reset,
    register,
    control,
    formState: { errors },
  } = useForm();

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

  return (
    <Card>
      <CardHeader>
        <CardTitle>Add Category</CardTitle>
        <CardDescription>Add the cateogry form</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          <Label>Title : </Label>
          <Input placeholder="Enter the title" />
        </div>
        <div className="space-y-3">
          <Label>Type : </Label>
          <Controller
            name=""
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
    </Card>
  );
};

export default CategoryForm;
