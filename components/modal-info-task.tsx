import { Comment, TaskType } from "@/types/type";
import React, { useEffect, useState } from "react";
import { CreateIssueTags } from "./create-issue-tags";
import { Priority, Progress, Project, Tags, Users } from "./mockData";
import { ChevronUp, Ellipsis, Paperclip, Reply, Trash2 } from "lucide-react";
import { useTaskStore } from "@/states/taskStorage";

interface Props {
  className?: string;
  item: TaskType;
  onClose: () => void;
}

export const ModalInfoTask: React.FC<Props> = ({
  className,
  item,
  onClose
}) => {
  const [openMenuIndex, setOpenMenuIndex] = useState<number | null>(null);

  const [title, setTitle] = useState<string>(item.title);
  const [description, setDescription] = useState<string>(item.description);
  const [progressIndex, setProgressIndex] = useState<number>(item.progress);
  const [priorityIndex, setPriorityIndex] = useState<number>(item.priority);
  const [projectIndex, setProjectIndex] = useState<number>(item.project);
  const [tagsIndices, setTagsIndices] = useState<number[]>(item.tags);

  const [commentContent, setCommentContent] = useState<string>("");
  const [replComment, setReplContent] = useState<number>(-1);

  const [resetKey, setResetKey] = useState<number>(0);

  const updateTask = useTaskStore((state) => state.updateTaskInfo);
  const removeTask = useTaskStore((state) => state.removeTask);

  const addComment = useTaskStore((state) => state.addCommentToTask);
  const removeComment = useTaskStore((state) => state.removeCommentFromTask);

  function handleAddComment() {
    if (!commentContent.trim()) return;
    addComment(item.id, {
      author: 0,
      content: commentContent,
      reply: replComment
    });
    setCommentContent("");
    setReplContent(-1);
  }

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

  function handleDelete(com: Comment) {
    if (com.id === replComment) {
      setReplContent(-1);
    }
    removeComment(item.id, com.id);
  }

  function handleRemove() {
    onClose();
    removeTask(item.id);
  }

  return (
    <div className={"h-full w-full flex flex-col " + className}>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        type="text"
        placeholder="Title..."
        className="text-4xl px-6 text-zinc-800 font-semibold w-full outline-none"
      />
      <div className="px-6">
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Description..."
          className="resize-none shadow-sm border p-2 rounded-[4px] w-full mt-4 text-lg text-zinc-600 h-[180px] outline-none"
        />
      </div>
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
      <div className="mt-8 px-6">
        <h1 className="text-3xl font-semibold pb-2 border-b">Comments</h1>
        <div
          style={{
            height:
              item.comments && item.comments.length > 0 ? "300px" : "100px"
          }}
          className={`py-3 transition-all duration-200 overflow-y-scroll flex flex-col gap-y-2`}
        >
          {item.comments && item.comments.length > 0 ? (
            item.comments.map((com, ind) => (
              <div
                key={ind}
                className="p-2 border rounded-[4px] h-fit flex flex-col shadow-sm transform animate-fade-in"
              >
                <div className="flex items-center justify-between">
                  <div className="flex gap-x-2 items-center mb-2">
                    <div className="h-6 w-6 rounded-full bg-green-600 flex items-center justify-center text-white font-medium">
                      T
                    </div>
                    {Users[com.author].name}
                    {com.reply >= 0 && (
                      <span className="ml-1 text-zinc-300 flex items-center gap-x-2">
                        <Reply className="rotate-180" size={16} />
                        {item.comments && item.comments[com.reply] && (
                          <p>{item.comments[com.reply].content}</p>
                        )}
                      </span>
                    )}
                  </div>
                  <div className="flex gap-x-1">
                    <button
                      onClick={() => setReplContent(ind)}
                      className="p-1 rounded-[4px] hover:bg-gray-100"
                    >
                      <Reply size={16} />
                    </button>
                    <button
                      onClick={() => handleDelete(com)}
                      className="p-1 rounded-[4px] hover:bg-gray-100"
                    >
                      <Ellipsis size={16} />
                    </button>
                  </div>
                </div>

                <div className="text-zinc-800 font-light text-sm break-words">
                  {com.content}
                </div>
              </div>
            ))
          ) : (
            <p className="my-auto text-zinc-400 font-light text-center">
              Task has no comments :(
            </p>
          )}
        </div>
        <div className="rounded-[4px] shadow-sm mb-3 mt-2 border">
          <textarea
            value={commentContent}
            onChange={(e) => setCommentContent(e.target.value)}
            placeholder="Some comment..."
            className="w-full h-[60px] overflow-hidden resize-none outline-none p-2 text-wrap font-light text-sm text-zinc-800"
          />
          <div
            style={{
              justifyContent: replComment === -1 ? "flex-end" : "space-between"
            }}
            className="flex items-center"
          >
            {replComment !== -1 &&
              item.comments &&
              item.comments[replComment] && (
                <button
                  onClick={() => setReplContent(-1)}
                  className="text-sm text-zinc-400 font-light px-2 flex gap-x-1 items-center transition-all duration-200 decoration-transparent hover:decoration-inherit line-through"
                >
                  <Reply className="rotate-180" size={16} />{" "}
                  {item.comments && item.comments[replComment].content}
                </button>
              )}
            <button
              onClick={handleAddComment}
              className="w-fit p-1 m-2 mt-1 border rounded-full transition-all duration-200 hover:bg-gray-100 hover:-rotate-90"
            >
              <ChevronUp size={16} />
            </button>
          </div>
        </div>
      </div>
      <div className="flex px-6 pt-3 items-center justify-between mt-auto border-t">
        <button className="flex shadow-sm items-center gap-x-2 text-sm p-2 border rounded-md text-zinc-800 justify-center transition-all duration-200 hover:bg-gray-100">
          <Paperclip size={20} />
        </button>
        <div className="flex items-center gap-x-1">
          <button
            onClick={handleRemove}
            className="p-[10px] shadow-sm rounded-lg text-zinc-800 border transition-all duration-200 hover:bg-gray-100"
          >
            <Trash2 size={16} />
          </button>
          <button
            onClick={handleUpdate}
            className="px-4 shadow-sm py-2 rounded-lg text-zinc-800 border transition-all duration-200 hover:bg-gray-100"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};
