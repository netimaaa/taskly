"use client";
import { ChevronUp } from "lucide-react";
import React, { useState } from "react";

interface Props {
  className?: string;
}

const itemss = ["item 1", "item 2"];

export const SidebarRight: React.FC<Props> = ({ className }) => {
  const [width, setWidth] = useState(260);
  const minWidth = 260;
  const maxWidth = 450;

  const handleMouseDown = (e: React.MouseEvent) => {
    const startX = e.clientX;
    const startWidth = width;

    const onMouseMove = (event: MouseEvent) => {
      const newWidth = startWidth - (event.clientX - startX);
      if (newWidth >= minWidth && newWidth <= maxWidth) {
        setWidth(newWidth);
      }
    };

    const onMouseUp = () => {
      document.removeEventListener("mousemove", onMouseMove);
      document.removeEventListener("mouseup", onMouseUp);
    };

    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mouseup", onMouseUp);
  };

  return (
    <div
      style={{
        width: `${width}px`
      }}
      className={
        `border-l rounded-l-2xl flex flex-col text-zinc-800 relative ` +
        className
      }
    >
      <div
        className="absolute -left-1 top-0 h-full w-1 cursor-ew-resize bg-transparent transition-all"
        onMouseDown={handleMouseDown}
      />
      <div className="border-b">
        <button className="flex gap-x-2 items-center text-lg px-2 py-1 mx-2 my-3 w-fit rounded-[4px] transition-all duration-200 text-zinc-600 hover:text-zinc-800 hover:bg-slate-100">
          Latest activity <ChevronUp size={18} strokeWidth={1.8} />
        </button>
      </div>
    </div>
  );
};
