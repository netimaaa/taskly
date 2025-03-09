import { useState, useEffect } from "react";
import { CreateIssueTags } from "./create-issue-tags";
import { Progress, Priority, Project, Tags } from "./mockData";

interface TaskTagsProps {
  progressIndex: number;
  priorityIndex: number;
  projectIndex: number;
  tagsIndices: number[];
  onProgressChange: (value: number) => void;
  onPriorityChange: (value: number) => void;
  onProjectChange: (value: number) => void;
  onTagsChange: (value: number[]) => void;
}

export const TaskTags: React.FC<TaskTagsProps> = ({
  progressIndex,
  priorityIndex,
  projectIndex,
  tagsIndices,
  onProgressChange,
  onPriorityChange,
  onProjectChange,
  onTagsChange
}) => {
  const [openMenuIndex, setOpenMenuIndex] = useState<number | null>(null);

  const [currentProgressIndex, setCurrentProgressIndex] =
    useState(progressIndex);
  const [currentPriorityIndex, setCurrentPriorityIndex] =
    useState(priorityIndex);
  const [currentProjectIndex, setCurrentProjectIndex] = useState(projectIndex);
  const [currentTagsIndices, setCurrentTagsIndices] = useState(tagsIndices);

  useEffect(() => {
    setCurrentProgressIndex(progressIndex);
    console.log(1);
  }, [progressIndex]);

  useEffect(() => {
    setCurrentPriorityIndex(priorityIndex);
  }, [priorityIndex]);

  useEffect(() => {
    setCurrentProjectIndex(projectIndex);
  }, [projectIndex]);

  useEffect(() => {
    setCurrentTagsIndices(tagsIndices);
  }, [tagsIndices]);

  const handleSingleSelect =
    (setter: (value: number) => void) => (value: number | number[]) => {
      if (typeof value === "number") {
        setter(value);
      }
    };

  const handleMultipleSelect =
    (setter: (value: number[]) => void) => (value: number | number[]) => {
      if (Array.isArray(value)) {
        setter(value);
      }
    };

  return (
    <div className="flex px-6 gap-x-3 items-center mt-3">
      <CreateIssueTags
        key={`progress-${currentProgressIndex}`}
        items={Progress}
        isOpen={openMenuIndex === 0}
        onToggle={() => setOpenMenuIndex(openMenuIndex === 0 ? null : 0)}
        onSelect={handleSingleSelect(onProgressChange)}
        initial={[currentProgressIndex]}
      />
      <CreateIssueTags
        key={`priority-${currentPriorityIndex}`}
        items={Priority}
        isOpen={openMenuIndex === 1}
        onToggle={() => setOpenMenuIndex(openMenuIndex === 1 ? null : 1)}
        onSelect={handleSingleSelect(onPriorityChange)}
        initial={[currentPriorityIndex]}
      />
      <CreateIssueTags
        key={`project-${currentProjectIndex}`}
        items={Project}
        isOpen={openMenuIndex === 2}
        onToggle={() => setOpenMenuIndex(openMenuIndex === 2 ? null : 2)}
        onSelect={handleSingleSelect(onProjectChange)}
        initial={[currentProjectIndex]}
      />
      <CreateIssueTags
        key={`tags-${currentTagsIndices.join(",")}`}
        items={Tags}
        multipleChoice={true}
        isOpen={openMenuIndex === 3}
        onToggle={() => setOpenMenuIndex(openMenuIndex === 3 ? null : 3)}
        onSelect={handleMultipleSelect(onTagsChange)}
        initial={currentTagsIndices}
      />
    </div>
  );
};
