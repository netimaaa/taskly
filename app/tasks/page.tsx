"use client";
import { FilterDropbar } from "@/components/filter-dropbar";
import { IssueLayer } from "@/components/issue-layer";
import { Task } from "@/components/task";
import { useTaskStore } from "@/states/taskStorage";
import { Book, Columns2, FolderGit } from "lucide-react";
import { useEffect, useState } from "react";
import { FilterItem } from "@/types/type";

export default function Home() {
  const tasks = useTaskStore((state) => state.tasks);
  const [changedTasks, setChangedTasks] = useState(tasks);
  const [activeFilter, setActiveFilter] = useState<number | null>(null);
  const [isOpen, setOpen] = useState<boolean>(false);
  const [selectedFilters, setSelectedFilters] = useState<FilterItem[]>([]);

  const applyFilters = () => {
    let filteredTasks = tasks;

    if (activeFilter !== null) {
      filteredTasks = filteredTasks.filter(
        (item) => item.project === activeFilter
      );
    }

    if (selectedFilters.length > 0) {
      const progressFilters = selectedFilters.filter(
        (filter) => filter.id >= 0 && filter.id <= 3
      );
      const priorityFilters = selectedFilters.filter(
        (filter) => filter.id >= 5 && filter.id <= 7
      );
      const tagFilters = selectedFilters.filter((filter) => filter.id >= 9);

      filteredTasks = filteredTasks.filter((task) => {
        const matchesProgress =
          progressFilters.length === 0 ||
          progressFilters.some((filter) => task.progress === filter.id);

        const matchesPriority =
          priorityFilters.length === 0 ||
          priorityFilters.some((filter) => task.priority === filter.id - 4);

        const matchesTags =
          tagFilters.length === 0 ||
          tagFilters.some((filter) => task.tags.includes(filter.id - 8));

        return matchesProgress && matchesPriority && matchesTags;
      });
    }

    setChangedTasks(filteredTasks);
  };

  const handleFilterProjects = (filter: number) => {
    if (activeFilter === filter) {
      setActiveFilter(null);
    } else {
      setActiveFilter(filter);
    }
  };

  const handleFilterSelect = (filter: FilterItem) => {
    const isFilterSelected = selectedFilters.some((f) => f.id === filter.id);
    if (isFilterSelected) {
      setSelectedFilters(selectedFilters.filter((f) => f.id !== filter.id));
    } else {
      setSelectedFilters([...selectedFilters, filter]);
    }
  };

  useEffect(() => {
    applyFilters();
  }, [selectedFilters, activeFilter, tasks]);

  return (
    <div className="h-full w-full flex">
      <div className="flex-1">
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
            <FilterDropbar
              selectedFilters={selectedFilters}
              onFilterSelect={handleFilterSelect}
            />
            <div className="w-[1px] rounded-sm h-[18px] bg-zinc-300 mx-2" />
            <button
              onClick={() => setOpen(!isOpen)}
              className="h-6 w-6 transition-all duration-200 hover:bg-slate-100 flex items-center justify-center rounded-[4px] hover:text-zinc-800"
            >
              <Columns2 size={16} />
            </button>
          </div>
        </div>
        {changedTasks.map(
          (item, index) =>
            item.progress !== 3 && <Task key={index} item={item} />
        )}
      </div>
      <div
        style={{
          width: isOpen ? "300px" : "0"
        }}
        className={`transition-all duration-300 ${isOpen && "border-l"}`}
      ></div>
    </div>
  );
}
