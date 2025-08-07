import React, { FC, useState } from "react";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";

import { Filter, Plus } from "lucide-react";
import debounce from "lodash.debounce";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

type TModelOpenType = {
  handleModel: () => void;
  searchTerms: string;
  setSearchTerms: (search: string) => string;
  filterModelOpen: boolean;
  filterModelClose: () => void;
};

const ExpencesHeader: FC<TModelOpenType> = ({
  handleModel,
  setSearchTerms,
  filterModelClose,
  filterModelOpen,
}) => {
  const [character, setCharacters] = useState<string>("");
  const debouncedSearch = debounce(async (criteria) => {
    setCharacters(await setSearchTerms(criteria));
  }, 1000);

  async function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    debouncedSearch(e.target.value);
  }
  return (
    <>
      <div className="flex items-center justify-between bg-muted/50 p-2 rounded-lg border-2">
        <h1 className="text-lg font-semibold text-tableHeaderTextColor py-2">
          Expences
        </h1>
        <div className="space-x-3 flex">
          <Input
            type="search"
            placeholder="Search..."
            value={character}
            onChange={(e) => handleChange(e)}
          />
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="outline"
                size={"icon"}
                className="cursor-pointer"
                onClick={handleModel}>
                <Plus />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom">
              <p>Add Expences</p>
            </TooltipContent>
          </Tooltip>
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                onClick={filterModelClose}
                variant="outline"
                size={"icon"}
                className="cursor-pointer">
                <Filter />
              </Button>
            </TooltipTrigger>
            <TooltipContent side="bottom">
              <p>Filter</p>
            </TooltipContent>
          </Tooltip>
        </div>
      </div>
    </>
  );
};

export default ExpencesHeader;
