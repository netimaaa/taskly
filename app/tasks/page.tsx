import { CreateIssueTags } from "@/components/create-issue-tags";
import { IssueLayer } from "@/components/issue-layer";
import { Tag } from "@/components/tag";
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

export default function Home() {
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
      <div className="px-4 border-b h-[35px] flex justify-between gap-x-4 items-center text-sm font-medium group transition-all duration-200 hover:bg-gray-50">
        <div className="flex text-zinc-600 transition-all duration-200 group-hover:text-zinc-800 items-center gap-x-4">
          <Circle size={14} /> Do something smart{" "}
        </div>
        <div className="flex items-center gap-x-4 text-xs text-zinc-600">
          <Tag color={"#ef4444"} title={"Important"} />
          <Book size={14} />
          <WifiHigh size={16} />
          Feb 23
        </div>
      </div>
    </div>
  );
}
