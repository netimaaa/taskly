import { ChevronUp, CircleCheckBig, PanelsTopLeft } from "lucide-react";
import React from "react";
import { SidebarAccount } from "./sidebar-account";
import { SidebarCategories } from "./sidebar-categories";

interface Props {
  className?: string;
}

export const Sidebar: React.FC<Props> = ({ className }) => {
  return (
    <div
      className={
        `w-[260px] rounded-r-2xl flex flex-col text-zinc-800 ` + className
      }
    >
      <SidebarAccount />
      <SidebarCategories className="mt-6" />
    </div>
  );
};
