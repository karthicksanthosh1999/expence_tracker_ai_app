'use client';
import { AppSidebar } from "@/components/app-sidebar"
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb"
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/ui/modToggle"
import { Separator } from "@/components/ui/separator"
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { setUser } from "@/slices/userSlices";
import { signOut, useSession } from "next-auth/react"
import { ReactNode, useEffect } from "react";
import { useDispatch } from "react-redux";

export default function Dashboard({ children }: { children: ReactNode }) {

  const dispatch = useDispatch()

  const { data: session } = useSession()
  useEffect(() => {
    if (session?.user) {
      dispatch(
        setUser({
          id: (session.user as any).id,
          name: session.user.name,
          email: session.user.email,
          image: session.user.image,
        })

      )
    }

    if (session?.user?.id) {
      localStorage.setItem('user', JSON.stringify(session.user));
    }

  }, [dispatch, session])

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-16 shrink-0 items-center justify-between gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
          <div className="flex items-center gap-2 px-4">
            <SidebarTrigger className="-ml-1 cursor-pointer" />
            <Separator
              orientation="vertical"
              className="mr-2 data-[orientation=vertical]:h-4"
            />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className="hidden md:block">
                  <BreadcrumbLink href="#">
                    Home
                  </BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className="hidden md:block" />
                <BreadcrumbItem>
                  <BreadcrumbPage>Dashboard</BreadcrumbPage>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
            <ModeToggle />
            <Button type="button" variant='destructive' className="bg-red-500 cursor-pointer" onClick={() => signOut({ callbackUrl: "/" })}>SignOut</Button>
          </div>
        </header>
        <div className="flex flex-1 flex-col gap-4 p-4 pt-0">
          {children}
        </div>
      </SidebarInset>
    </SidebarProvider>
  )
}
