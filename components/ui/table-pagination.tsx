import React, { FC, memo } from 'react'
import { Button } from './button'

type TTablePaginationProps = {
    previousPage: () => void,
    nextPage: () => void,
    getCanNextPage: boolean,
    getCanPreviousPage: boolean,
    totalPages: number,
    currentPage: number,
    goToLastPage: () => void,
    goToFirstPage: () => void,
    totalRows: number
}

const TablePagination: FC<TTablePaginationProps> = ({ nextPage, previousPage, getCanNextPage, getCanPreviousPage, goToFirstPage, goToLastPage, currentPage, totalPages, totalRows }) => {
    return (
        <>
            <div className='flex items-center flex-wrap justify-between p-3 bg-muted/50 rounded-lg border-2 border-muted'>
                <div>
                    Page {currentPage} of {totalPages} Total Rows: {totalRows}
                </div>
                <div className='space-x-5 '>
                    <Button
                        className='cursor-pointer'
                        variant="outline"
                        size="sm"
                        onClick={() => previousPage()}
                        disabled={!getCanPreviousPage}
                    >
                        Previous
                    </Button>
                    <Button
                        className='cursor-pointer'
                        variant="outline"
                        size="sm"
                        onClick={() => nextPage()}
                        disabled={!getCanNextPage}
                    >
                        Next
                    </Button>
                </div>
            </div>
        </>
    )
}

export default memo(TablePagination)
