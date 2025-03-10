"use client";
import React, { useState } from "react";
import { CreateIssueTags } from "./create-issue-tags";
import { Priority, Progress, Project, Tags } from "./mockData";
import { Paperclip } from "lucide-react";
import { useTaskStore } from "@/states/taskStorage";

interface Props {
  className?: string;
  onClose: () => void;
}

export const ModalCreateTask: React.FC<Props> = ({ className, onClose }) => {
  const [openMenuIndex, setOpenMenuIndex] = useState<number | null>(null);

  const [title, setTitle] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [progressIndex, setProgressIndex] = useState<number>(0);
  const [priorityIndex, setPriorityIndex] = useState<number>(0);
  const [projectIndex, setProjectIndex] = useState<number>(0);
  const [tagsIndices, setTagsIndices] = useState<number[]>([]);

  const addTask = useTaskStore((state) => state.addTask);
  const [resetKey, setResetKey] = useState<number>(0);

  const resetFields = () => {
    setTitle("");
    setDescription("");
    setProgressIndex(0);
    setPriorityIndex(0);
    setProjectIndex(0);
    setTagsIndices([]);
    setResetKey((prev) => prev + 1);
  };

  const handleCreate = () => {
    if (!title.trim()) return;
    addTask({
      title,
      description,
      progress: progressIndex,
      priority: priorityIndex,
      project: projectIndex,
      tags: tagsIndices,
      createdAt: new Date().toISOString()
    });

    resetFields();
    onClose();
  };

  return (
    <div className={`h-full w-full flex flex-col pt-8 pb-3 ` + className}>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        type="text"
        placeholder="Title..."
        className="text-4xl px-6 text-zinc-800 font-semibold w-full outline-none"
      />
      <textarea
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description..."
        className="resize-none px-6 w-full mt-4 text-lg text-zinc-600 h-[180px] outline-none"
      />
      <div className="flex px-6 gap-x-3 items-center my-3">
        <CreateIssueTags
          key={`progress-${resetKey}`}
          items={Progress}
          isOpen={openMenuIndex === 0}
          onToggle={() => setOpenMenuIndex(openMenuIndex === 0 ? null : 0)}
          onSelect={(value) => setProgressIndex(value as number)}
        />
        <CreateIssueTags
          key={`priority-${resetKey}`}
          items={Priority}
          isOpen={openMenuIndex === 1}
          onToggle={() => setOpenMenuIndex(openMenuIndex === 1 ? null : 1)}
          onSelect={(value) => setPriorityIndex(value as number)}
        />
        <CreateIssueTags
          key={`project-${resetKey}`}
          items={Project}
          isOpen={openMenuIndex === 2}
          onToggle={() => setOpenMenuIndex(openMenuIndex === 2 ? null : 2)}
          onSelect={(value) => setProjectIndex(value as number)}
        />
        <CreateIssueTags
          key={`tags-${resetKey}`}
          items={Tags}
          multipleChoice={true}
          isOpen={openMenuIndex === 3}
          onToggle={() => setOpenMenuIndex(openMenuIndex === 3 ? null : 3)}
          onSelect={(value) => setTagsIndices(value as number[])}
        />
      </div>
      <div className="flex px-6 pt-3 items-center justify-between mt-auto border-t">
        <button className="p-[10px] shadow-sm rounded-lg text-zinc-800 border transition-all duration-200 hover:bg-gray-100">
          <Paperclip size={20} />
        </button>
        <button
          onClick={handleCreate}
          className="px-4 shadow-sm py-2 rounded-lg text-zinc-800 border transition-all duration-200 hover:bg-gray-100"
        >
          Create
        </button>
      </div>
    </div>
  );
};
