"use client";
import { IssueLayer } from "@/components/issue-layer";
import { Task } from "@/components/task";
import { useTaskStore } from "@/states/taskStorage";
import { Book, Columns2, Filter, FolderGit, Plus } from "lucide-react";
import { useState } from "react";

export default function Home() {
  const tasks = useTaskStore((state) => state.tasks);
  const [changedTasks, setChangedTasks] = useState(tasks);
  const [activeFilter, setActiveFilter] = useState<number | null>(null);

  function handleFilterProjects(filter: number) {
    if (activeFilter === filter) {
      // Если нажата уже активная кнопка, сбрасываем фильтр
      setChangedTasks(tasks);
      setActiveFilter(null);
    } else {
      // Если нажата другая кнопка, применяем новый фильтр
      setChangedTasks(tasks.filter((item) => item.project === filter));
      setActiveFilter(filter);
    }
  }

  return (
    <div className="h-full w-full">
      <div className="border-b h-[40px] flex items-center px-4 text-sm font-medium justify-between">
        <div className="flex items-center gap-x-1">
          <span className="pr-2">All tasks</span>
          <button
            onClick={() => handleFilterProjects(1)}
            className={`transition-all duration-200 ${
              activeFilter === 1 ? "bg-slate-100" : ""
            }`}
          >
            <IssueLayer icon={Book} title={"Personal"} />
          </button>
          <button
            onClick={() => handleFilterProjects(2)}
            className={`transition-all duration-200 ${
              activeFilter === 2 ? "bg-slate-100" : ""
            }`}
          >
            <IssueLayer icon={FolderGit} title={"Projects"} />
          </button>
        </div>
        <div className="flex items-center text-zinc-600">
          <button className="h-6 w-6 transition-all duration-200 hover:bg-slate-100 flex items-center justify-center rounded-[4px] hover:text-zinc-800">
            <Filter size={14} />
          </button>
          <div className="w-[1px] rounded-sm h-[18px] bg-zinc-300 mx-2" />
          <button className="h-6 w-6 transition-all duration-200 hover:bg-slate-100 flex items-center justify-center rounded-[4px] hover:text-zinc-800">
            <Columns2 size={16} />
          </button>
        </div>
      </div>
      {changedTasks.map(
        (item, index) => item.progress !== 3 && <Task key={index} item={item} />
      )}
    </div>
  );
}
