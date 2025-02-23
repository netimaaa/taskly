import {
  Bolt,
  Folder,
  Inbox,
  Package,
  Search,
  SquareCheck
} from "lucide-react";
import React from "react";
import Link from "next/link";

interface Props {
  className?: string;
}

const categories = [
  { title: "Search", icon: <Search size={20} />, ref: "/inbox" },
  { title: "Inbox", icon: <Inbox size={20} />, ref: "/inbox" },
  { title: "Tasks", icon: <SquareCheck size={20} />, ref: "/tasks" },
  { title: "Archived", icon: <Package size={20} />, ref: "/inbox" },
  { title: "Projects", icon: <Folder size={20} />, ref: "/inbox" }
];

export const SidebarCategories: React.FC<Props> = ({ className }) => {
  return (
    <ul className={`flex flex-col gap-y-[6px] mx-3 flex-1 ` + className}>
      {categories.map((item, index) => (
        <li key={index}>
          <Link
            href={item.ref}
            className="flex items-center text-sm py-1 px-1 rounded-[4px] text-zinc-600 group transition-all duration-200 hover:text-zinc-900 hover:bg-slate-200 font-medium gap-x-2 w-full"
          >
            <span className="transition-all duration-200 group-hover:translate-x-[2px]">
              {item.icon}
            </span>{" "}
            <span className="transition-all duration-200 group-hover:translate-x-[4px]">
              {item.title}
            </span>
          </Link>
        </li>
      ))}
      <button className="mt-auto mb-4 text-sm py-1 px-1 text-zinc-600 flex items-center gap-x-2 group transition-all duration-200 hover:bg-slate-200 hover:text-zinc-900 rounded-[4px]">
        <span className="transition-all duration-200 group-hover:translate-x-[2px]">
          <Bolt size={18} />
        </span>{" "}
        <span className="transition-all duration-200 group-hover:translate-x-[4px]">
          Settings
        </span>
      </button>
    </ul>
  );
};
