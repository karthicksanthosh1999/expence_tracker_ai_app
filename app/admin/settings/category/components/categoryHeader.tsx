import React, { FC, useState } from "react";
import debounce from "lodash.debounce";
import { Input } from "@/components/ui/input";

type TModelOpenType = {
  setSearchTerms: (search: string) => string;
};

const CategoryHeader: FC<TModelOpenType> = ({ setSearchTerms }) => {
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
          Category
        </h1>
        <div className="space-x-3 flex">
          <Input
            type="search"
            placeholder="Search..."
            value={character}
            onChange={(e) => handleChange(e)}
          />
        </div>
      </div>
    </>
  );
};

export default CategoryHeader;
