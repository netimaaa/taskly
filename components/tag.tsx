import { LucideProps } from "lucide-react";
import React from "react";

interface itemTag {
  icon: React.FC<LucideProps>;
  color?: string;
  title: string;
}

interface Props {
  className?: string;
  item: itemTag;
  multiple?: number;
}

export const Tag: React.FC<Props> = ({ className, item, multiple }) => {
  const ItemIcon = item.icon;
  return (
    <div className={`flex gap-x-2 items-center text-sm ` + className}>
      <div className="flex gap-x-2 items-center px-2 py-[2px] transition-all duration-200 hover:bg-gray-50 border rounded-md">
        <ItemIcon
          color={item.color}
          {...(item.color && { fill: item.color })}
          size={14}
        />{" "}
        {item.title} {multiple && multiple > 1 && `+ ${multiple - 1}`}
      </div>
    </div>
  );
};
