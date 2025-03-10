import { Circle, Book, WifiHigh } from "lucide-react";
import React, { CSSProperties, useState, useEffect } from "react";
import { TaskType } from "../types/type";
import { Priority, Progress, Project, Tags } from "./mockData";
import { Tag } from "./tag";
import { ProgressDropbar } from "./progress-dropbar";
import { useTaskStore } from "@/states/taskStorage";
import { Modal } from "./modal";
import { ModalInfoTask } from "./modal-info-task";

interface Props {
  className?: string;
  item: TaskType;
  onOpenTask?: (taskId: number) => void;
  inSearch?: boolean;
}

export const Task: React.FC<Props> = ({
  className,
  item,
  onOpenTask,
  inSearch
}) => {
  const { updateTaskProgress } = useTaskStore();
  const formatDate = (isoDate: string): string => {
    const date = new Date(isoDate);
    return new Intl.DateTimeFormat("en-GB", {
      month: "short",
      day: "2-digit"
    }).format(date);
  };

  const [currentProgress, setCurrentProgress] = useState(item.progress);

  useEffect(() => {
    setCurrentProgress(item.progress);
    console.log(2);
  }, [item.progress]);

  const handleProgressChange = (newProgress: number) => {
    updateTaskProgress(item.id, newProgress);
    setCurrentProgress(newProgress);
  };

  const [isOpen, setOpen] = useState<boolean>(false);

  const handleClose = () => {
    setOpen(false);
  };

  const handleTaskClick = () => {
    if (onOpenTask) {
      onOpenTask(item.id);
    } else {
      setOpen(true);
    }
  };

  return (
    <div
      className={
        `px-4 cursor-default border-b h-[35px] flex justify-between gap-x-4 items-center text-sm font-medium group transition-all duration-500 hover:bg-gray-50 ` +
        className
      }
    >
      <div className="flex text-zinc-600 transition-all duration-200 group-hover:text-zinc-800 items-center gap-x-4">
        <ProgressDropbar
          onChange={handleProgressChange}
          iconIndex={currentProgress}
          inSearch={inSearch}
        />{" "}
        <Modal isOpen={isOpen} setOpen={setOpen}>
          <Modal.Trigger>
            <button onClick={handleTaskClick}>{item.title}</button>{" "}
          </Modal.Trigger>
          <Modal.Content className="">
            <ModalInfoTask onClose={handleClose} itemId={item.id} />
          </Modal.Content>
        </Modal>
      </div>
      <div className="flex items-center gap-x-4 text-xs text-zinc-600">
        {item.tags.length > 0 ? (
          <Tag item={Tags[item.tags[0]]} multiple={item.tags.length} />
        ) : (
          ""
        )}
        {item.project > 0 && <Tag item={Project[item.project]} />}
        {item.priority > 0 && <Tag item={Priority[item.priority]} />}
        <p className="text-xs font-medium text-zinc-600">
          {formatDate(item.createdAt)}
        </p>
      </div>
    </div>
  );
};
