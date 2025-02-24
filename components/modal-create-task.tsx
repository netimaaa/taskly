import {
  CircleDashed,
  WifiLow,
  Book,
  Tag,
  Paperclip,
  Plus,
  Settings,
  Star,
  User
} from "lucide-react";
import React from "react";
import { CreateIssueTags } from "./create-issue-tags";

interface Props {
  className?: string;
}
const items = [
  { icon: Plus, title: "Добавить" },
  { icon: Settings, title: "Настройки" },
  { icon: User, title: "Пользователь" },
  { icon: Star, title: "Избранное" }
];
export const ModalCreateTask: React.FC<Props> = ({ className }) => {
  return (
    <div className={`h-full w-full flex flex-col ` + className}>
      <input
        type="text"
        placeholder="Title..."
        className="text-4xl text-zinc-800 font-semibold w-full outline-none"
      />
      <textarea
        name="desc"
        id="1"
        placeholder="Description..."
        className="resize-none w-full mt-4 text-lg text-zinc-600 h-[180px] outline-none"
      />
      <div className="flex gap-x-3 items-center mt-3">
        <button className="flex gap-x-2 items-center text-sm px-2 py-[2px] transition-all duration-200 hover:bg-gray-50 border rounded-md">
          <CircleDashed size={16} />
          Progress
        </button>
        <button className="flex gap-x-2 items-center text-sm px-2 py-[2px] transition-all duration-200 hover:bg-gray-50 border rounded-md">
          <WifiLow size={16} />
          Priority
        </button>
        <button className="flex gap-x-2 items-center text-sm px-2 py-[2px] transition-all duration-200 hover:bg-gray-50 border rounded-md">
          <Book size={16} />
          Project
        </button>
        <button className="flex gap-x-2 items-center text-sm px-2 py-[2px] transition-all duration-200 hover:bg-gray-50 border rounded-md">
          <Tag size={16} />
          Tags
        </button>
        <CreateIssueTags items={items} />
      </div>
      <div className="flex items-center justify-between mt-auto">
        <button className="flex items-center gap-x-2 text-sm p-2 bg-zinc-800 rounded-md text-white justify-center transition-all duration-200 hover:bg-zinc-700">
          <Paperclip size={20} />
        </button>
        <button className="px-4 py-2 bg-zinc-800 rounded-lg text-white transition-all duration-200 hover:bg-zinc-700">
          Create
        </button>
      </div>
    </div>
  );
};
