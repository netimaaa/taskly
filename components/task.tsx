import { Circle, Book, WifiHigh } from "lucide-react";
import React from "react";
import { TaskType } from "../types/type";
import { Priority, Progress, Project, Tags } from "./mockData";
import { Tag } from "./tag";

interface Props {
  className?: string;
  item: TaskType;
}

export const Task: React.FC<Props> = ({ className, item }) => {
  const formatDate = (isoDate: string): string => {
    const date = new Date(isoDate);
    return new Intl.DateTimeFormat("en-GB", {
      month: "short",
      day: "2-digit"
    }).format(date);
  };
  const ItemIcon = Progress[item.progress].icon;
  return (
    <div className="px-4 cursor-default border-b h-[35px] flex justify-between gap-x-4 items-center text-sm font-medium group transition-all duration-200 hover:bg-gray-50">
      <div className="flex text-zinc-600 transition-all duration-200 group-hover:text-zinc-800 items-center gap-x-4">
        {<ItemIcon size={14} />} {item.title}{" "}
      </div>
      <div className="flex items-center gap-x-4 text-xs text-zinc-600">
        {item.tags.length > 0 ? (
          <Tag item={Tags[item.tags[0]]} multiple={item.tags.length} />
        ) : (
          ""
        )}
        <Tag item={Project[item.project]} />
        <Tag item={Priority[item.priority]} />
        <p className="text-xs font-medium text-zinc-600">
          {formatDate(item.createdAt)}
        </p>
      </div>
    </div>
  );
};
