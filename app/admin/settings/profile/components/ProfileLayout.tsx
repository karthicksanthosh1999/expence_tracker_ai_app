'use client'

import React, { useEffect } from 'react';
import unknownUser from '@/public/unknown_user.jpg'
import { useSession } from 'next-auth/react';
import { Separator } from '@/components/ui/separator';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { useGetSingleUserHook } from '@/app/hooks/userhooks';
import DataLoader from '@/components/ui/dataLoader';
import { dateConverter } from '@/lib/utils';
import { TUser } from '@/@types/userTypes';

const ProfileLayout = () => {

    // SESSION CALL
    const { data: session } = useSession();
    const {
        mutate: getSingleUserMutation,
        isPending: getSinglUserMutationLoading,
        data: getSingleUserMutationData,
    } = useGetSingleUserHook();

    // Store session user to localStorage
    useEffect(() => {
        if (session?.user?.id) {
            getSingleUserMutation(session.user.id);
            localStorage.setItem("user", JSON.stringify(session.user));
        }
    }, [session?.user?.id]);

    // Retrieve from localStorage on reload
    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            try {
                const userPresistData = JSON.parse(storedUser) as TUser;
                if (userPresistData?.id) {
                    getSingleUserMutation(userPresistData.id);
                }
            } catch (err) {
                console.error("Failed to parse localStorage user", err);
            }
        }
    }, []);

    return (
        <div className='bg-muted/50 p-3'>
            {
                getSinglUserMutationLoading ? (
                    <div className="h-screen">
                        <DataLoader />
                    </div>
                ) : (
                    <>
                        {/* IMAGE SECTION */}
                        <div className='flex flex-wrap items-center justify-start gap-5'>
                            <img src={session?.user?.image ?? unknownUser.src} alt="profile" className='h-[125px] w-[125px] rounded-lg' loading='lazy' />
                            <div>
                                <h3 className='text-base font-medium'>Profile Photo</h3>
                                <p className='text-xs font-normal'>Recommended image size is 40px x 40px</p>
                            </div>
                        </div>
                        <Separator className='my-5' />
                        <div className="">
                            <div className='grid md:grid-cols-2 grid-cols-1 gap-5 md:mt-5 mt-2'>
                                <div className='space-y-3 w-full'>
                                    <Label>First Name</Label>
                                    <Input type='text' value={getSingleUserMutationData?.response?.name ?? "N/A"} disabled />
                                </div>
                                <div className='space-y-3 w-full'>
                                    <Label>Email</Label>
                                    <Input type='text' value={getSingleUserMutationData?.response?.email ?? "N/A"} disabled />
                                </div>
                            </div>
                            <div className='grid md:grid-cols-2 grid-cols-1 gap-5 md:mt-5 mt-2'>
                                <div className='space-y-3 w-full'>
                                    <Label>Created At</Label>
                                    <Input
                                        type="text"
                                        value={
                                            getSingleUserMutationData?.response?.createdAt
                                                ? dateConverter(getSingleUserMutationData.response.createdAt)
                                                : ""
                                        }
                                        disabled
                                    />

                                </div>
                            </div>
                        </div>
                    </>
                )
            }
        </div >
    )
}

export default ProfileLayout;
