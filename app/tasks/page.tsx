"use client";
import { CreateIssueTags } from "@/components/create-issue-tags";
import { IssueLayer } from "@/components/issue-layer";
import { Tag } from "@/components/tag";
import { Task } from "@/components/task";
import { useTaskStore } from "@/states/taskStorage";
import {
  Book,
  Circle,
  Filter,
  FolderGit,
  Plus,
  Settings,
  Star,
  User,
  WifiHigh
} from "lucide-react";
import { useEffect } from "react";

export default function Home() {
  const tasks = useTaskStore((state) => state.tasks);
  // useEffect(() => {
  //   localStorage.clear();
  // }, []);
  return (
    <div className="h-full w-full">
      <div className="border-b h-[40px] flex items-center px-4 text-sm font-medium justify-between">
        <div className="flex items-center gap-x-1">
          <span className="pr-2">All tasks</span>
          <IssueLayer icon={Book} title={"Personal"} />
          <IssueLayer icon={FolderGit} title={"Projects"} />
        </div>
        <div className="flex items-center text-zinc-600">
          <button className="h-6 w-6 transition-all duration-200 hover:bg-slate-100 flex items-center justify-center rounded-[4px] hover:text-zinc-800">
            <Filter size={14} />
          </button>
          <div className="w-[1px] rounded-sm h-[18px] bg-zinc-300 mx-2" />
          <button className="h-6 w-6 transition-all duration-200 hover:bg-slate-100 flex items-center justify-center rounded-[4px] hover:text-zinc-800">
            <Plus size={16} />
          </button>
        </div>
      </div>
      {tasks.map((item, index) => (
        <Task key={index} item={item} />
      ))}
    </div>
  );
}
