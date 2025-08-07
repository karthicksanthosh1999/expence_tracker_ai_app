'use client'

import { SessionProvider } from "next-auth/react"
import { ReactNode } from "react";
import { Session } from 'next-auth';
import { redirect } from "next/navigation";

type Props = {
    children: ReactNode;
    session: Session;
};


const ProductedProviders = ({ children, session }: Props) => {
    if (!session) {
        // redirect('/')
        console.log("Session Error")
    }

    return (
        <SessionProvider session={session}>
            {children}
        </SessionProvider>
    )
}

export default ProductedProviders
