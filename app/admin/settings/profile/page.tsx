'use client'
import React, { Suspense, useState } from 'react'
import Dashboard from '@/app/admin/dashboard/page';
import ProfileLayout from './components/ProfileLayout';
import ProfileBar from './components/profileBar';
import UpdateUserModel from './components/UpdateUserModel';
import PageLoading from '@/components/ui/PageLoading';

const Profile = () => {

    const [updateModelOpen, setUpdateModelOpen] = useState<boolean>(false)

    return (
        <Dashboard>
            <ProfileBar />
            <Suspense fallback={<PageLoading />}>
                <ProfileLayout />
            </Suspense>
            <UpdateUserModel />
        </Dashboard>
    )
}

export default Profile;
