import { useTaskStore } from "@/states/taskStorage";
import React, { useState, useMemo } from "react";
import { Task } from "./task";
import { Modal } from "./modal";
import { ModalInfoTask } from "./modal-info-task";

interface Props {
  className?: string;
  onClose?: () => void;
  onOpenTask?: (taskId: number) => void;
  searchTitle: string;
  setSearchTitle: (value: string) => void;
}

export const ModalSearchTask: React.FC<Props> = ({
  className,
  onClose,
  onOpenTask,
  searchTitle,
  setSearchTitle
}) => {
  const tasks = useTaskStore((state) => state.tasks);

  const searchElements = useMemo(() => {
    if (!searchTitle.trim()) return [];
    return tasks.filter((task) =>
      task.title.trim().toLowerCase().includes(searchTitle.trim().toLowerCase())
    );
  }, [searchTitle, tasks]);

  return (
    <div className={`py-3 px-2 ${className}`}>
      <input
        value={searchTitle}
        onChange={(e) => setSearchTitle(e.target.value)}
        type="text"
        placeholder="Search some task..."
        className="rounded-md w-full outline-none text-zinc-800 font-medium px-4"
      />
      <div
        className={`mt-2 overflow-hidden transition-all duration-300 relative`}
        style={{
          height:
            searchElements.length > 0
              ? `${Math.min(searchElements.length, 20) * 35}px`
              : "0px",
          opacity: searchElements.length > 0 ? 1 : 0,
          overflowY: searchElements.length > 20 ? "auto" : "hidden",
          position: searchElements.length > 0 ? "relative" : "absolute",
          visibility: searchElements.length > 0 ? "visible" : "hidden"
        }}
      >
        {searchElements.map((item) => (
          <Task
            item={item}
            key={item.id}
            className="border-none bg-white rounded-md"
            onOpenTask={onOpenTask}
          />
        ))}
      </div>
    </div>
  );
};
