import { ICategory } from "@/@types/categoryTypes";
import React, { ChangeEvent, FC } from "react";
import { IBank } from "@/@types/bankTypes";

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
    <select
      className="border-2 w-full cursor-pointer max-w-lg p-2 rounded-sm"
      onChange={onchange}
      {...props}
      name={name}
      value={value}>
      <option value="" className="cursor-pointer bg-[#1F2C73]">
        Select an option
      </option>
      {options?.map((item) => (
        <option
          value={item?.value}
          key={item?.id}
          className="bg-[#1F2C73] cursor-pointer">
          {item.name}
        </option>
      ))}
    </select>
  );
};

export default SelectInput;
