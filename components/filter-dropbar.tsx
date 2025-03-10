import { Filter } from "lucide-react";
import React, { useEffect, useState, useRef } from "react";
import { Priority, Progress, Tags } from "./mockData";
import { FilterItem } from "@/types/type";

interface Props {
  className?: string;
  onFilterSelect: (filter: FilterItem) => void;
  selectedFilters: FilterItem[];
}

export const FilterDropbar: React.FC<Props> = ({
  className,
  onFilterSelect,
  selectedFilters
}) => {
  const [isOpen, setOpen] = useState<boolean>(false);
  const [filters, setFilters] = useState<FilterItem[]>([]);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [curFil, setCurFil] = useState<number[]>([]);

  useEffect(() => {
    setFilters([...Progress, ...Priority, ...Tags]);
    setCurFil([
      Priority.length - 1,
      Priority.length,
      Tags.length + Priority.length
    ]);
  }, []);

  function handleOpenMenu() {
    setOpen(!isOpen);
  }

  function handleSelectFilter(filter: FilterItem) {
    onFilterSelect(filter);
  }

  return (
    <div className="relative">
      <button
        ref={buttonRef}
        onClick={handleOpenMenu}
        className="h-6 w-6 transition-all duration-200 hover:bg-slate-100 flex items-center justify-center rounded-[4px] hover:text-zinc-800"
      >
        <Filter size={14} />
      </button>
      <div
        onMouseLeave={() => setOpen(false)}
        style={{
          visibility: isOpen ? "visible" : "hidden",
          transition: "opacity 0.3s ease, visibility 0.3s ease",
          left: buttonRef.current
            ? `calc(${buttonRef.current.offsetWidth / 2}px - 50%)`
            : "-50%"
        }}
        className={`absolute top-8 left-1/4 -translate-x-[75%] w-fit h-fit bg-white flex flex-col gap-y-1 p-2 rounded-lg transition-all duration-200 shadow-[0px_0px_6px_3px_rgba(0,_0,_0,_0.1)] ${
          isOpen ? "opacity-100" : "opacity-0"
        }`}
      >
        {filters.map(
          (item, index) =>
            !curFil.includes(index) && (
              <button
                onClick={() => handleSelectFilter(item)}
                key={index}
                className={`flex whitespace-nowrap items-center gap-x-2 px-1 py-[2px] rounded-md transition-all duration-200 hover:bg-slate-100 ${
                  selectedFilters.includes(item) ? "bg-slate-100" : "bg-white"
                } ${
                  curFil.includes(index + 1) && "border-b pb-1 rounded-b-none"
                }`}
              >
                {item.icon && (
                  <item.icon
                    {...(item.color && { fill: item.color })}
                    color={item.color}
                    size={item.color ? 12 : 16}
                  />
                )}{" "}
                {item.title}
              </button>
            )
        )}
      </div>
    </div>
  );
};
