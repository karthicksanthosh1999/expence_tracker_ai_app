import React, { FC } from "react";
import { RxTrackNext, RxTrackPrevious } from "react-icons/rx";
import { GrCaretNext, GrCaretPrevious } from "react-icons/gr";

interface IPagination {
  page: number;
  totalPage: number;
  limits: string[];
  handleFirstPage: () => void;
  handlePrev: () => void;
  handleNext: () => void;
  handleLast: () => void;
  setLimit: (limit: number) => void;
  limit: number;
}

const Pagination: FC<IPagination> = ({
  page,
  totalPage,
  limits,
  handleFirstPage,
  handleLast,
  handleNext,
  handlePrev,
  setLimit,
  limit,
}) => {
  const handleLimit = (value: number) => {
    setLimit(value);
  };

  return (
    <>
      <div className="flex justify-between flex-wrap">
        <div>
          Page {page} of {totalPage}
        </div>

        {/* DROPDOWN */}
        <div className="flex gap-5 flex-wrap">
          <div className="flex items-center gap-5">
            <p className="">Limit</p>
            <select
              value={limit}
              onChange={(e) => handleLimit(Number(e.target.value))}
              className="cursor-pointer p-1 border-2 border-gray-700 rounded-md bg-cardBgColor">
              {limits.map((item) => (
                <option value={item} key={item}>
                  {item}
                </option>
              ))}
            </select>
          </div>
          {/* PAGINATION */}
          <div>
            <button
              onClick={() => handleFirstPage()}
              disabled={page === 1}
              className={`border-2 p-1.5 text-headerColor rounded-sm ${
                page === 1 ? "cursor-not-allowed" : "cursor-pointer"
              } `}>
              <RxTrackPrevious
                size={20}
                className={`${
                  page === 1 ? "dark:text-gray-600" : "dark:text-gray-100"
                }`}
              />
            </button>
            <button
              onClick={() => handlePrev()}
              disabled={page === 1}
              className={`border-2 p-1.5 text-headerColor rounded-sm ${
                page === 1 ? "cursor-not-allowed" : "cursor-pointer"
              } `}>
              <GrCaretPrevious
                size={20}
                className={`${
                  page === 1 ? "dark:text-gray-600" : "dark:text-gray-100"
                }`}
              />
            </button>
            <button
              onClick={handleNext}
              disabled={page === totalPage}
              className={`border-2 p-1.5 text-headerColor rounded-sm ${
                page === totalPage ? "cursor-not-allowed" : "cursor-pointer"
              } `}>
              <GrCaretNext
                size={20}
                className={`${
                  page === totalPage
                    ? "dark:text-gray-600"
                    : "dark:text-gray-100"
                }`}
              />
            </button>
            <button
              onClick={handleLast}
              disabled={page === totalPage}
              className={`border-2 p-1.5 text-headerColor rounded-sm ${
                page === totalPage ? "cursor-not-allowed" : "cursor-pointer"
              } `}>
              <RxTrackNext
                size={20}
                className={`${
                  page === totalPage
                    ? "dark:text-gray-600"
                    : "dark:text-gray-100"
                }`}
              />
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Pagination;
