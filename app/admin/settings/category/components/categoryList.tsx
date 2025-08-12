import { ICategory } from "@/@types/categoryTypes";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import DataLoader from "@/components/ui/dataLoader";
import { Edit, Trash } from "lucide-react";
import React, { FC } from "react";

type TCategoryListType = {
  title: string;
  description: string;
  categoryList: ICategory[];
  loading: boolean;
  deleteModelClose: () => void;
  selectedId: string;
  setSelectedId: (id: string) => void;
};

const CategoryList: FC<TCategoryListType> = ({
  description,
  title,
  categoryList,
  loading,
  deleteModelClose,
  setSelectedId,
}) => {
  const handleIdSelect = (id) => {
    setSelectedId(id);
    deleteModelClose();
  };
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
          <div key={idx} className="space-y-2">
            <div className="flex items-center justify-between px-5">
              <p>{item.title ?? "N/A"}</p>
              <div className="space-x-2">
                <Button
                  className="cursor-pointer"
                  type="button"
                  variant={"outline"}
                  onClick={() => handleIdSelect(item?.id)}>
                  <Trash />
                </Button>
                <Button
                  className="cursor-pointer"
                  type="button"
                  variant={"outline"}>
                  <Edit />
                </Button>
              </div>
            </div>
            <hr className="" />
          </div>
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
