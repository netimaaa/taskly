import { Comment } from "@/types/type";
import React, { useEffect, useState } from "react";
import { useTaskStore } from "@/states/taskStorage";
import { TaskComments } from "./task-comments";
import { TaskFooter } from "./task-footer";
import { TaskHeader } from "./task-header";
import { TaskTags } from "./task-tags";

interface Props {
  className?: string;
  itemId: number;
  onClose: () => void;
}

export const ModalInfoTask: React.FC<Props> = ({
  className,
  itemId,
  onClose
}) => {
  const item = useTaskStore((state) =>
    state.tasks.find((i) => i.id === itemId)
  );

  if (!item) return null;

  const [title, setTitle] = useState<string>(item.title);
  const [description, setDescription] = useState<string>(item.description);
  const [progressIndex, setProgressIndex] = useState<number>(item.progress);
  const [priorityIndex, setPriorityIndex] = useState<number>(item.priority);
  const [projectIndex, setProjectIndex] = useState<number>(item.project);
  const [tagsIndices, setTagsIndices] = useState<number[]>(item.tags);

  const updateTask = useTaskStore((state) => state.updateTaskInfo);
  const removeTask = useTaskStore((state) => state.removeTask);
  const addComment = useTaskStore((state) => state.addCommentToTask);
  const removeComment = useTaskStore((state) => state.removeCommentFromTask);

  const handleUpdate = () => {
    if (!title.trim()) return;
    updateTask(item.id, {
      ...item,
      title,
      description,
      progress: progressIndex,
      priority: priorityIndex,
      project: projectIndex,
      tags: tagsIndices
    });
    onClose();
  };

  const handleRemove = () => {
    removeTask(item.id);
    onClose();
  };

  const handleAddComment = (content: string, replyTo?: number) => {
    addComment(item.id, {
      author: 0,
      content,
      reply: replyTo ?? -1
    });
  };

  const handleDeleteComment = (comment: Comment) => {
    removeComment(item.id, comment.id);
  };

  useEffect(() => {
    setProgressIndex(item.progress);
    console.log(2);
  }, [item.progress]);

  return (
    <div className={"h-full w-full flex flex-col " + className}>
      <TaskHeader
        title={title}
        description={description}
        onTitleChange={setTitle}
        onDescriptionChange={setDescription}
      />
      <TaskTags
        progressIndex={progressIndex}
        priorityIndex={priorityIndex}
        projectIndex={projectIndex}
        tagsIndices={tagsIndices}
        onProgressChange={setProgressIndex}
        onPriorityChange={setPriorityIndex}
        onProjectChange={setProjectIndex}
        onTagsChange={setTagsIndices}
      />
      <TaskComments
        comments={item.comments || []}
        onAddComment={handleAddComment}
        onDeleteComment={handleDeleteComment}
      />
      <TaskFooter onSave={handleUpdate} onDelete={handleRemove} />
    </div>
  );
};
