import React from "react";

interface Props {
  className?: string;
  color: string;
  title: string;
}

export const Tag: React.FC<Props> = ({ className, color, title }) => {
  return (
    <div className="px-2 py-[2px] rounded-lg border transition-all duration-200 hover:bg-gray-100 cursor-default flex items-center gap-x-2">
      <div
        style={{ backgroundColor: color }}
        className={`w-2 h-2 rounded-full`}
      />
      {title}
    </div>
  );
};
