"use client";
import { Task } from "@/components/task";
import { useTaskStore } from "@/states/taskStorage";

export default function Home() {
  const tasks = useTaskStore((state) => state.tasks);
  return (
    <div className="h-full w-full">
      <div className="border-b h-[40px] flex items-center px-4 text-sm font-medium justify-between">
        <div className="flex items-center gap-x-1">Archive</div>
      </div>
      {tasks.map(
        (item, index) => item.progress === 3 && <Task key={index} item={item} />
      )}
    </div>
  );
}
