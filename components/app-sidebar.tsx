"use client";

import * as React from "react";
import {
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  GalleryVerticalEnd,
  Settings2,
  SquareTerminal,
} from "lucide-react";

import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import { TeamSwitcher } from "@/components/team-switcher";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from "@/components/ui/sidebar";
import { useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import uknownUser from "@/public/unknown_user.jpg";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { data: session } = useSession();
  if (!session?.user) {
    console.log("side bar not Auth");
  }

  React.useEffect(() => {}, []);

  const data = {
    teams: [
      {
        name: "JK",
        logo: GalleryVerticalEnd,
        plan: "Enterprise",
      },
      {
        name: "Acme Corp.",
        logo: AudioWaveform,
        plan: "Startup",
      },
      {
        name: "Evil Corp.",
        logo: Command,
        plan: "Free",
      },
    ],
    navMain: [
      {
        title: "Expences",
        url: "#",
        icon: SquareTerminal,
        isActive: true,
        items: [
          {
            title: "Expences",
            url: "/admin/expences",
          },
          {
            title: "Upcomming Expences",
            url: "#",
          },
          {
            title: "Settings",
            url: "#",
          },
        ],
      },
      {
        title: "JK-Bot",
        url: "#",
        icon: Bot,
      },
      {
        title: "Projects",
        url: "#",
        icon: BookOpen,
        items: [
          {
            title: "Projects List",
            url: "#",
          },
          {
            title: "Get Started",
            url: "#",
          },
          {
            title: "Tutorials",
            url: "#",
          },
          {
            title: "Changelog",
            url: "#",
          },
        ],
      },
      {
        title: "Settings",
        url: "#",
        icon: Settings2,
        items: [
          {
            title: "Account",
            url: "/admin/settings/profile",
          },
          {
            title: "Banks",
            url: "/admin/settings/bank",
          },
          {
            title: "Category",
            url: "/admin/settings/category",
          },
          {
            title: "Limits",
            url: "#",
          },
        ],
      },
    ],
  };

  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
      </SidebarContent>
      <SidebarFooter>
        <NavUser
          user={{
            email: session?.user?.email ?? "",
            image: session?.user?.image ?? uknownUser,
            name: session?.user?.name ?? "UNKNOWN",
          }}
        />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
