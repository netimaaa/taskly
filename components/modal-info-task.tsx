import { TaskType } from "@/types/type";
import React, { useEffect, useState } from "react";
import { CreateIssueTags } from "./create-issue-tags";
import { Priority, Progress, Project, Tags } from "./mockData";

interface Props {
  className?: string;
  item: TaskType;
}

export const ModalInfoTask: React.FC<Props> = ({ className, item }) => {
  const [openMenuIndex, setOpenMenuIndex] = useState<number | null>(null);

  const [title, setTitle] = useState<string>(item.title);
  const [description, setDescription] = useState<string>(item.description);
  const [progressIndex, setProgressIndex] = useState<number>(item.progress);
  const [priorityIndex, setPriorityIndex] = useState<number>(item.priority);
  const [projectIndex, setProjectIndex] = useState<number>(item.project);
  const [tagsIndices, setTagsIndices] = useState<number[]>(item.tags);

  const [resetKey, setResetKey] = useState<number>(0);

  return (
    <div className={"" + className}>
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
      <div className="flex px-6 gap-x-3 items-center mt-3">
        <CreateIssueTags
          key={`progress-${resetKey}`}
          items={Progress}
          isOpen={openMenuIndex === 0}
          onToggle={() => setOpenMenuIndex(openMenuIndex === 0 ? null : 0)}
          onSelect={(value) => setProgressIndex(value as number)}
          initial={[progressIndex]}
        />
        <CreateIssueTags
          key={`priority-${resetKey}`}
          items={Priority}
          isOpen={openMenuIndex === 1}
          onToggle={() => setOpenMenuIndex(openMenuIndex === 1 ? null : 1)}
          onSelect={(value) => setPriorityIndex(value as number)}
          initial={[priorityIndex]}
        />
        <CreateIssueTags
          key={`project-${resetKey}`}
          items={Project}
          isOpen={openMenuIndex === 2}
          onToggle={() => setOpenMenuIndex(openMenuIndex === 2 ? null : 2)}
          onSelect={(value) => setProjectIndex(value as number)}
          initial={[projectIndex]}
        />
        <CreateIssueTags
          key={`tags-${resetKey}`}
          items={Tags}
          multipleChoice={true}
          isOpen={openMenuIndex === 3}
          onToggle={() => setOpenMenuIndex(openMenuIndex === 3 ? null : 3)}
          onSelect={(value) => setTagsIndices(value as number[])}
          initial={tagsIndices}
        />
      </div>
    </div>
  );
};
