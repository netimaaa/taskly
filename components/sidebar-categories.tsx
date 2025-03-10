"use client";
import {
  Bolt,
  Folder,
  Inbox,
  Package,
  Search,
  SquareCheck,
  SquarePen
} from "lucide-react";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Modal } from "./modal";
import { ModalCreateTask } from "./modal-create-task";
import { ModalSearchTask } from "./modal-search-task";
import { ModalInfoTask } from "./modal-info-task";

interface Props {
  className?: string;
}

const categories = [
  { title: "Search", icon: <Search size={20} />, ref: "/inbox" },
  { title: "Inbox", icon: <Inbox size={20} />, ref: "/inbox" },
  { title: "Tasks", icon: <SquareCheck size={20} />, ref: "/tasks" },
  { title: "Archived", icon: <Package size={20} />, ref: "/archive" }
];

export const SidebarCategories: React.FC<Props> = ({ className }) => {
  const [isSearchOpen, setSearchOpen] = useState<boolean>(false);
  const [isTaskOpen, setTaskOpen] = useState<boolean>(false);
  const [selectedTaskId, setSelectedTaskId] = useState<number | null>(null);
  const [searchTitle, setSearchTitle] = useState<string>("");

  const handleCloseSearch = () => {
    setSearchOpen(false);
  };

  const handleOpenTask = (taskId: number) => {
    setSelectedTaskId(taskId);
    setTaskOpen(true);
    setTimeout(() => {
      setSearchOpen(false);
      setSearchTitle("");
    }, 800);
  };

  const handleCloseTask = () => {
    setTaskOpen(false);
    setSelectedTaskId(null);
    setSearchOpen(false);
  };

  return (
    <ul className={`flex flex-col gap-y-[6px] mx-3 flex-1 ` + className}>
      <Modal isOpen={isTaskOpen} setOpen={handleCloseTask}>
        <Modal.Content
          className={`pt-8 pb-3 h-full transition-all duration-300 ${
            isTaskOpen ? "visible" : "invisible"
          }`}
        >
          {selectedTaskId && (
            <ModalInfoTask onClose={handleCloseTask} itemId={selectedTaskId} />
          )}
        </Modal.Content>
      </Modal>
      {categories.map((item, index) =>
        index !== 0 ? (
          <li key={index}>
            <Link
              href={item.ref}
              className="flex items-center text-sm py-1 px-1 rounded-[4px] text-zinc-600 group transition-all duration-200 hover:text-zinc-900 hover:bg-slate-200 font-medium gap-x-2 w-full"
            >
              <span className="transition-all duration-200 group-hover:translate-x-[2px]">
                {item.icon}
              </span>{" "}
              <span className="transition-all duration-200 group-hover:translate-x-[4px]">
                {item.title}
              </span>
            </Link>
          </li>
        ) : (
          <li key={index}>
            <Modal isOpen={isSearchOpen && !isTaskOpen} setOpen={setSearchOpen}>
              <Modal.Trigger>
                <button
                  onClick={() => setSearchOpen(true)}
                  className="flex items-center text-sm py-1 px-1 rounded-[4px] text-zinc-600 group transition-all duration-200 hover:text-zinc-900 hover:bg-slate-200 font-medium gap-x-2 w-full"
                >
                  <span className="transition-all duration-200 group-hover:translate-x-[2px]">
                    {item.icon}
                  </span>{" "}
                  <span className="transition-all duration-200 group-hover:translate-x-[4px]">
                    {item.title}
                  </span>
                </button>
              </Modal.Trigger>

              <Modal.Content>
                <ModalSearchTask
                  onClose={handleCloseSearch}
                  onOpenTask={handleOpenTask}
                  searchTitle={searchTitle}
                  setSearchTitle={setSearchTitle}
                />
              </Modal.Content>
            </Modal>
          </li>
        )
      )}
      <button className="mt-auto mb-4 text-sm py-1 px-1 text-zinc-600 flex items-center gap-x-2 group transition-all duration-200 hover:bg-slate-200 hover:text-zinc-900 rounded-[4px]">
        <span className="transition-all duration-200 group-hover:translate-x-[2px]">
          <Bolt size={18} />
        </span>{" "}
        <span className="transition-all duration-200 group-hover:translate-x-[4px]">
          Settings
        </span>
      </button>
    </ul>
  );
};
