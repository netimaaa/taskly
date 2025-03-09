import { Paperclip, Trash2 } from "lucide-react";

interface TaskFooterProps {
  onSave: () => void;
  onDelete: () => void;
}

export const TaskFooter: React.FC<TaskFooterProps> = ({ onSave, onDelete }) => {
  return (
    <div className="flex px-6 pt-3 items-center justify-between mt-auto border-t">
      <button className="flex shadow-sm items-center gap-x-2 text-sm p-2 border rounded-md text-zinc-800 justify-center transition-all duration-200 hover:bg-gray-100">
        <Paperclip size={20} />
      </button>
      <div className="flex items-center gap-x-1">
        <button
          onClick={onDelete}
          className="p-[10px] shadow-sm rounded-lg text-zinc-800 border transition-all duration-200 hover:bg-gray-100"
        >
          <Trash2 size={16} />
        </button>
        <button
          onClick={onSave}
          className="px-4 shadow-sm py-2 rounded-lg text-zinc-800 border transition-all duration-200 hover:bg-gray-100"
        >
          Save
        </button>
      </div>
    </div>
  );
};
