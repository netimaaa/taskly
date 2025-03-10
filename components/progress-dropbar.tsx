import React, { useState } from "react";
import { Progress } from "./mockData";

interface Props {
  className?: string;
  iconIndex: number;
  onChange: (newProgress: number) => void;
  inSearch?: boolean;
}

export const ProgressDropbar: React.FC<Props> = ({
  className,
  iconIndex,
  onChange,
  inSearch
}) => {
  const ProgressIcon = Progress[iconIndex].icon;
  const [isOpen, setOpen] = useState<boolean>(false);
  const [prList, setPrList] = useState([]);

  function handleOpenMenu() {
    setOpen(!isOpen);
  }
  function handleSelectProgress(index: number) {
    onChange(index);
    setOpen(false);
  }

  return (
    <div className="relative">
      <button
        disabled={inSearch}
        onClick={handleOpenMenu}
        className={"flex items-center justify-center"}
      >
        <ProgressIcon size={14} />
      </button>
      <div
        onMouseLeave={() => setOpen(false)}
        style={{
          visibility: isOpen ? "visible" : "hidden",
          transition: "opacity 0.3s ease, visibility 0.3s ease"
        }}
        className={`absolute top-6 left-6 w-fit h-fit bg-white flex flex-col gap-y-1 p-2 rounded-lg transition-all duration-200 shadow-[0px_0px_6px_3px_rgba(0,_0,_0,_0.1)] ${
          isOpen ? "opacity-100" : "opacity-0"
        }`}
      >
        {Progress.map(
          (item, index) =>
            index > 0 && (
              <button
                onClick={() => handleSelectProgress(index)}
                key={index}
                className={`flex whitespace-nowrap items-center gap-x-2 px-1 py-[2px] rounded-md transition-all duration-200 hover:bg-slate-100 `}
              >
                <item.icon size={14} /> {item.title}
              </button>
            )
        )}
      </div>
    </div>
  );
};
