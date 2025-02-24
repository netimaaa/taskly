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
  const [progressIndex, setProgressIndex] = useState<number | 0>(0);
  const [priorityIndex, setPriorityIndex] = useState<number | 0>(0);
  const [projectIndex, setProjectIndex] = useState<number | 0>(0);
  const [tagsIndices, setTagsIndices] = useState<number[]>([]);

  const addTask = useTaskStore((state) => state.addTask);

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

    setTitle("");
    setDescription("");
    setProgressIndex(0);
    setPriorityIndex(0);
    setProjectIndex(0);
    setTagsIndices([]);

    onClose();
  };

  return (
    <div className={`h-full w-full flex flex-col ` + className}>
      <input
        onChange={(e) => setTitle(e.target.value)}
        type="text"
        placeholder="Title..."
        className="text-4xl px-6 text-zinc-800 font-semibold w-full outline-none"
      />
      <textarea
        onChange={(e) => setDescription(e.target.value)}
        name="desc"
        id="1"
        placeholder="Description..."
        className="resize-none px-6 w-full mt-4 text-lg text-zinc-600 h-[180px] outline-none"
      />
      <div className="flex px-6 gap-x-3 items-center mt-3">
        <CreateIssueTags
          items={Progress}
          isOpen={openMenuIndex === 0}
          onToggle={() => setOpenMenuIndex(openMenuIndex === 0 ? null : 0)}
          onSelect={(value) => setProgressIndex(value as number)}
        />
        <CreateIssueTags
          items={Priority}
          isOpen={openMenuIndex === 1}
          onToggle={() => setOpenMenuIndex(openMenuIndex === 1 ? null : 1)}
          onSelect={(value) => setPriorityIndex(value as number)}
        />
        <CreateIssueTags
          items={Project}
          isOpen={openMenuIndex === 2}
          onToggle={() => setOpenMenuIndex(openMenuIndex === 2 ? null : 2)}
          onSelect={(value) => setProjectIndex(value as number)}
        />
        <CreateIssueTags
          items={Tags}
          multipleChoice={true}
          isOpen={openMenuIndex === 3}
          onToggle={() => setOpenMenuIndex(openMenuIndex === 3 ? null : 3)}
          onSelect={(value) => setTagsIndices(value as number[])}
        />
      </div>
      <div className="flex px-6 pt-3 items-center justify-between mt-auto border-t">
        <button className="flex items-center gap-x-2 text-sm p-2 bg-zinc-800 rounded-md text-white justify-center transition-all duration-200 hover:bg-zinc-700">
          <Paperclip size={20} />
        </button>
        <button
          onClick={handleCreate}
          className="px-4 py-2 bg-zinc-800 rounded-lg text-white transition-all duration-200 hover:bg-zinc-700"
        >
          Create
        </button>
      </div>
    </div>
  );
};
