'use client'
import React from 'react'
import DashboardBar from '@/app/admin/dashboard/components/dashboardBar'
import { redirect } from 'next/navigation';
import { useSession } from 'next-auth/react';
import Dashboard from '../page';

const page = () => {
    const { data: session } = useSession();
    if (!session?.user?.name) {
        // redirect("dashboar ")
        console.log("dashboard main")
    }
    return (
        <Dashboard>
            <DashboardBar name={session?.user?.name ?? ""} />
        </Dashboard>
    )
}

export default page
