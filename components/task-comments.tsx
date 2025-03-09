import { ChevronUp, Ellipsis, Reply } from "lucide-react";
import { useState } from "react";
import { Users } from "./mockData";
import { Comment } from "../types/type";

interface TaskCommentsProps {
  comments: Comment[];
  onAddComment: (content: string, replyTo?: number) => void;
  onDeleteComment: (comment: Comment) => void;
}

export const TaskComments: React.FC<TaskCommentsProps> = ({
  comments,
  onAddComment,
  onDeleteComment
}) => {
  const [commentContent, setCommentContent] = useState<string>("");
  const [replComment, setReplContent] = useState<number>(-1);

  const handleAddComment = () => {
    if (!commentContent.trim()) return;
    onAddComment(commentContent, replComment);
    setCommentContent("");
    setReplContent(-1);
  };

  return (
    <div className="mt-8 px-6">
      <h1 className="text-3xl font-semibold pb-2 border-b">Comments</h1>
      <div
        style={{
          height: comments.length > 0 ? "300px" : "100px"
        }}
        className={`py-3 transition-all duration-200 overflow-y-scroll flex flex-col gap-y-2`}
      >
        {comments.length > 0 ? (
          comments.map((com, ind) => (
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
                      {comments[com.reply] && (
                        <p>{comments[com.reply].content}</p>
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
                    onClick={() => onDeleteComment(com)}
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
          {replComment !== -1 && comments[replComment] && (
            <button
              onClick={() => setReplContent(-1)}
              className="text-sm text-zinc-400 font-light px-2 flex gap-x-1 items-center transition-all duration-200 decoration-transparent hover:decoration-inherit line-through"
            >
              <Reply className="rotate-180" size={16} />{" "}
              {comments[replComment].content}
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
  );
};
