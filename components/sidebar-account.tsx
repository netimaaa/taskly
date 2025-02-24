"use client";
import {
  Book,
  ChevronUp,
  CircleDashed,
  PanelsTopLeft,
  Paperclip,
  SquarePen,
  Tag,
  WifiLow
} from "lucide-react";
import React, { useRef, useState } from "react";
import { Modal } from "./modal";
import { ModalCreateTask } from "./modal-create-task";

interface Props {
  className?: string;
}

export const SidebarAccount: React.FC<Props> = ({ className }) => {
  const [isOpen, setOpen] = useState<boolean>(false);

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div className="flex items-center justify-between pb-3 px-4 mt-4">
      <div className="flex items-center gap-x-2">
        <div className="text-sm font-medium flex items-center gap-x-[8px]">
          <div className="h-5 w-5 flex items-center text-white font-bold justify-center bg-orange-500 rounded-sm">
            NE
          </div>
          <div>netimaaa</div>
        </div>
        <ChevronUp strokeWidth={2} size={14} />
      </div>

      <Modal isOpen={isOpen} setOpen={setOpen}>
        <Modal.Trigger>
          <button
            onClick={() => setOpen(true)}
            className="p-1 bg-white rounded-[4px] transition-all duration-200 hover:text-zinc-800 shadow-[0px_0px_12px_-1px_rgba(0,_0,_0,_0.1)] hover:shadow-[0px_0px_12px_2px_rgba(0,_0,_0,_0.1)] text-zinc-600"
          >
            <SquarePen strokeWidth={1.6} size={18} />
          </button>
        </Modal.Trigger>

        <Modal.Content className="pt-8 pb-3 h-full">
          <ModalCreateTask onClose={handleClose} />
        </Modal.Content>
      </Modal>
    </div>
  );
};
