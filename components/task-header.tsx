interface TaskHeaderProps {
  title: string;
  description: string;
  onTitleChange: (value: string) => void;
  onDescriptionChange: (value: string) => void;
}

export const TaskHeader: React.FC<TaskHeaderProps> = ({
  title,
  description,
  onTitleChange,
  onDescriptionChange
}) => {
  return (
    <div className="h-full w-full flex flex-col">
      <input
        value={title}
        onChange={(e) => onTitleChange(e.target.value)}
        type="text"
        placeholder="Title..."
        className="text-4xl px-6 text-zinc-800 font-semibold w-full outline-none"
      />
      <div className="px-6">
        <textarea
          value={description}
          onChange={(e) => onDescriptionChange(e.target.value)}
          placeholder="Description..."
          className="resize-none shadow-sm border p-2 rounded-[4px] w-full mt-4 text-lg text-zinc-600 h-[180px] outline-none"
        />
      </div>
    </div>
  );
};
