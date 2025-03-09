"use client";
import { LucideProps } from "lucide-react";
import React, { useEffect, useState } from "react";

interface Item {
  icon: React.FC<LucideProps>;
  color?: string;
  title: string;
}

interface Props {
  className?: string;
  items: Item[];
  multipleChoice?: boolean;
  isOpen: boolean;
  onToggle: () => void;
  onSelect: (value: number | number[]) => void;
  initial?: number[];
}

export const CreateIssueTags: React.FC<Props> = ({
  className,
  items,
  multipleChoice = false,
  isOpen,
  onSelect,
  onToggle,
  initial = []
}) => {
  const [selectedItems, setSelectedItems] = useState<number[]>(initial);

  useEffect(() => {
    setSelectedItems((prev) =>
      prev.join() === initial.join() ? prev : initial
    );
  }, [initial]);

  const handleItemClick = (index: number) => {
    setSelectedItems((prev) => {
      let newSelection;
      if (multipleChoice) {
        newSelection = prev.includes(index)
          ? prev.filter((i) => i !== index)
          : [...prev, index];
      } else {
        newSelection = prev.includes(index) ? [] : [index];
      }
      setTimeout(() => {
        onSelect(multipleChoice ? newSelection : newSelection[0] || 0);
      }, 0);
      return newSelection;
    });
  };

  const selectedCount = selectedItems.length;
  const firstSelectedItem =
    selectedCount > 0 ? items[selectedItems[0]] : items[0];

  return (
    <div className="relative">
      <div className="flex gap-x-2 items-center text-sm">
        <button
          onClick={onToggle}
          className="flex gap-x-2 items-center px-2 py-[2px] transition-all duration-200 hover:bg-gray-50 border rounded-md"
        >
          <firstSelectedItem.icon
            size={16}
            color={firstSelectedItem.color}
            {...(firstSelectedItem.color && { fill: firstSelectedItem.color })}
          />
          {firstSelectedItem.title}
          {selectedCount > 1 && ` + ${selectedCount - 1}`}
        </button>
      </div>

      <div
        onMouseLeave={onToggle}
        style={{
          visibility: isOpen ? "visible" : "hidden",
          transition: "opacity 0.3s ease, visibility 0.3s ease"
        }}
        className={`absolute top-10 left-1/2 -translate-x-1/2 w-fit h-fit bg-white flex flex-col gap-y-1 p-2 rounded-lg shadow-[0px_0px_6px_3px_rgba(0,_0,_0,_0.1)] ${
          isOpen ? "opacity-100" : "opacity-0"
        }`}
      >
        {items.map((item, index) => (
          <button
            key={index}
            className={`flex whitespace-nowrap items-center gap-x-2 px-1 py-[2px] rounded-md transition-all duration-200 hover:bg-slate-100 ${
              selectedItems.includes(index) ? "bg-slate-100" : ""
            }`}
            onClick={() => handleItemClick(index)}
          >
            <item.icon
              {...(item.color && { fill: item.color })}
              color={item.color}
              size={item.color ? 12 : 16}
            />
            {item.title}
          </button>
        ))}
      </div>
    </div>
  );
};
