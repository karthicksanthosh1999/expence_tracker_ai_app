'use client';

import { FC, memo, useState } from 'react';
import RichEditer from '@/components/ui/RichEditer';
import { Label } from '@/components/ui/label';
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import { jobValidation } from '@/validation-schema/jobs-validation';
import z from 'zod';
import { useCreateJobHooks } from '@/app/hooks/jobsHook';
import { Button } from '@/components/ui/button';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import LoadingButton from '@/components/ui/loading-btn';
import { Separator } from '@/components/ui/separator';


type TJobsFormProps = {
    createJobModel: boolean,
    setCreateJobModel: () => void
}

const JobsForm: FC<TJobsFormProps> = ({ createJobModel, setCreateJobModel }) => {
    const [responsibilities, setResponsibilities] = useState<string>('');
    const [requiredSkills, setRequiredSkills] = useState<string>('');

    const { isPending: jobsIsLoading, mutate: jobMutation } = useCreateJobHooks()

    const {
        register,
        reset,
        handleSubmit,
        formState: { errors },
    } = useForm<z.infer<typeof jobValidation>>({
        resolver: zodResolver(jobValidation),
    });

    const onSubmit = async (data: z.infer<typeof jobValidation>) => {
        const formData = new FormData();
        formData.append('title', data.title);
        formData.append('jobType', data.jobType);
        formData.append('qualification', data.qualification);
        formData.append('salaryRange', data.salaryRange);
        formData.append('experience', data.experience);
        formData.append('responsibilities', responsibilities);
        formData.append('requiredSkills', requiredSkills);
        jobMutation(formData)
        reset()
        setCreateJobModel()
        // 👇 Properly log formData contents
        for (const [key, value] of formData.entries()) {
            console.log(`${key}:`, value);
        }
    };

    return (
        <>
            <Dialog open={createJobModel} onOpenChange={setCreateJobModel} >
                <DialogContent className=' max-h-[1500px]'>
                    <DialogHeader>
                        <DialogTitle>Create Job</DialogTitle>
                    </DialogHeader>
                    <Separator />
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                        <div className='space-y-1'>
                            <div className='space-y-4'>
                                <Label>Title</Label>
                                <Input placeholder='Next.JS Developer' type="text" {...register('title')} />
                            </div>
                            {errors.title && <p className="text-red-500 text-xs">{errors.title.message}</p>}
                        </div>

                        <div className='space-y-1'>
                            <div className='space-y-4'>
                                <Label>Job Type</Label>
                                <Input placeholder='Full-Time' type="text" {...register('jobType')} />
                            </div>
                            {errors.jobType && <p className="text-red-500 text-xs">{errors.jobType.message}</p>}
                        </div>

                        <div className='space-y-1'>
                            <div className='space-y-4'>
                                <Label>Salary Range</Label>
                                <Input placeholder='30k - 1L' type="text" {...register('salaryRange')} />
                            </div>
                            {errors.salaryRange && <p className="text-red-500 text-xs">{errors.salaryRange.message}</p>}
                        </div>

                        <div className='space-y-1'>
                            <div className='space-y-4'>
                                <Label>Qualification</Label>
                                <Input placeholder='B.E Mechanical Engineering' type="text" {...register('qualification')} />
                            </div>
                            {errors.qualification && <p className="text-red-500 text-xs">{errors.qualification.message}</p>}
                        </div>
                        <div className='space-y-1'>
                            <div className='space-y-4'>
                                <Label>Experience</Label>
                                <Input placeholder='1 to 5 Years' type="text" {...register('experience')} />
                            </div>
                            {errors.experience && <p className="text-red-500 text-xs">{errors.experience?.message}</p>}
                        </div>

                        <div className='space-y-1'>
                            <div className='space-y-4'>
                                <Label>Responsibilities</Label>
                                <RichEditer content={responsibilities} onChange={setResponsibilities} />
                            </div>
                        </div>

                        <div>
                            <div className='space-y-4'>
                                <Label>Required Skills</Label>
                                <RichEditer content={requiredSkills} onChange={setRequiredSkills} />
                            </div>
                        </div>
                        <Separator />
                        <DialogFooter>
                            <Button type="submit" variant="outline" className="cursor-pointer">
                                {
                                    jobsIsLoading ? (
                                        <>
                                            <LoadingButton />
                                        </>
                                    ) : (
                                        <p> Submit</p>
                                    )
                                }
                            </Button>
                            <DialogClose asChild>
                                <Button type="button" onClick={setCreateJobModel} variant='destructive' className="cursor-pointer">
                                    Close
                                </Button>
                            </DialogClose>
                        </DialogFooter>
                    </form>
                </DialogContent>
            </Dialog >
        </>
    );
}

export default memo(JobsForm);
