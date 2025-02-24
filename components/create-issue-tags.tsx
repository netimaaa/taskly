"use client";
import { LucideProps } from "lucide-react";
import React, { useState } from "react";

interface item {
  icon: React.FC<LucideProps>;
  title: string;
}

interface Props {
  className?: string;
  items: item[];
}

export const CreateIssueTags: React.FC<Props> = ({ className, items }) => {
  const [isOpen, setOpen] = useState<boolean>(false);
  const [activeIndex, setActiveIndex] = useState<number>(0);

  function handleActiveIndex(index: number) {
    if (index === activeIndex) {
      setActiveIndex(0);
    } else {
      setActiveIndex(index);
    }
    setOpen(false);
  }

  return (
    <div className="relative">
      <button
        onClick={() => setOpen(!isOpen)}
        className="flex gap-x-2 items-center text-sm px-2 py-[2px] transition-all duration-200 hover:bg-gray-50 border rounded-md"
      >
        {items.map(
          (item, index) =>
            index === activeIndex && (
              <div key={index} className="flex gap-x-2 items-center">
                <item.icon size={16} /> {item.title}
              </div>
            )
        )}
      </button>

      <div
        style={{
          visibility: isOpen ? "visible" : "hidden",
          transition: "opacity 0.3s ease, visibility 0.3s ease"
        }}
        className={`absolute top-10 left-1/2 -translate-x-1/2 w-fit h-fit bg-white flex flex-col gap-y-1 p-2 rounded-lg shadow-[0px_0px_8px_6px_rgba(0,_0,_0,_0.1)] ${
          isOpen ? "opacity-100" : "opacity-0"
        }`}
      >
        {items.map((item, index) => (
          <button
            key={index}
            className={`flex items-center gap-x-2 px-1 py-[2px] rounded-md transition-all duration-200 hover:bg-slate-100 ${
              index === 0 &&
              "rounded-b-none border-b hover:bg-transparent pb-[6px]"
            }`}
            onClick={() => handleActiveIndex(index)}
          >
            <item.icon size={16} /> {item.title}
          </button>
        ))}
      </div>
    </div>
  );
};
