import { ICategory } from "@/@types/categoryTypes";
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
import DataLoader from "@/components/ui/dataLoader";
import React, { FC } from "react";

type TCategoryListType = {
  title: string;
  description: string;
  categoryList: ICategory[];
  loading: boolean;
};

const CategoryList: FC<TCategoryListType> = ({
  description,
  title,
  categoryList,
  loading,
}) => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>{title ?? "N/A"}</CardTitle>
        <CardDescription>{description ?? "N/A"}</CardDescription>
      </CardHeader>
      {loading ? (
        <CardContent className="h-[300px]">
          <DataLoader />
        </CardContent>
      ) : categoryList.length > 0 ? (
        categoryList &&
        categoryList?.map((item, idx) => (
          <CardContent className="h-[300px]">
            <div key={idx}>{item.title ?? "N/A"}</div>
          </CardContent>
        ))
      ) : (
        <CardContent className="h-[300px] flex items-center justify-center">
          <h1>No Data Found</h1>
        </CardContent>
      )}
    </Card>
  );
};

export default CategoryList;
