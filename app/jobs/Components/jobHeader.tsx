'use client'
import React, { FC, memo } from 'react';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Button } from '@/components/ui/button';

type TJobHeaderProps = {
    setCrateJobModel: () => void
}

const JobHeader: FC<TJobHeaderProps> = ({ setCrateJobModel }) => {

    return (
        <div className='flex justify-between p-3 border-2 border-gray/30 bg-muted/50 rounded-lg mb-5'>
            <h1 className='font-semibold text-xl'>Job List</h1>
            <div className='flex gap-5 flex-wrap'>
                <Select>
                    <SelectTrigger className="w-[180px] cursor-pointer">
                        <SelectValue placeholder="Role" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem className='cursor-pointer' value="light">Software</SelectItem>
                        <SelectItem className='cursor-pointer' value="dark">Sales</SelectItem>
                        <SelectItem className='cursor-pointer' value="system">Marketing</SelectItem>
                    </SelectContent>
                </Select>
                <div>
                    <Button className='cursor-pointer' onClick={() => setCrateJobModel()}>Add Job</Button>
                </div>
            </div>
        </div>
    )
}

export default memo(JobHeader)
