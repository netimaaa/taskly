import { Book, LucideProps } from "lucide-react";
import React from "react";

interface Props {
  className?: string;
  icon: React.FC<LucideProps>;
  title: string;
}

export const IssueLayer: React.FC<Props> = ({
  className,
  icon: Icon,
  title
}) => {
  return (
    <div className="px-2 py-1 border rounded-md text-xs flex gap-x-2 items-center transition-all duration-300 text-zinc-700 hover:text-zinc-900 hover:bg-gray-100">
      <Icon size={14} />
      {title}
    </div>
  );
};
