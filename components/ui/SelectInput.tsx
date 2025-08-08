import { ICategory } from "@/@types/categoryTypes";
import React, { ChangeEvent, FC } from "react";
import { IBank } from "@/@types/bankTypes";
import { Select, SelectContent } from "./select";

export type Toption = {
  id: number;
  name: string;
  value: string;
};

export interface SelectInterface {
  options: Toption[];
  onchange?: (event: ChangeEvent<HTMLSelectElement>) => void;
  value?: string;
  name: string;
}

const SelectInput: FC<SelectInterface> = ({
  options,
  onchange,
  name,
  value,
  ...props
}) => {
  return (
    <Select
      className="border-2 w-full cursor-pointer max-w-lg p-2 border-gray-600 rounded-sm "
      onChange={onchange}
      {...props}
      name={name}
      value={value}>

      {options?.map((item) => (
        <
          value={item?.id}
          key={item?.id}
          className="bg-[#1F2C73] cursor-pointer">
          {item.name}
        </>
      ))}
    </Select>
  );
};

export default SelectInput;
