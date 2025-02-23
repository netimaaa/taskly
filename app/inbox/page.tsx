import { Inbox, SlidersHorizontal } from "lucide-react";

export default function Home() {
  return (
    <>
      <div className="w-[400px] border-r">
        <div className="h-[40px] border-b p-2 px-4 text-zinc-800 text-sm font-medium flex items-center justify-between">
          Inbox
          <button className="w-6 h-6 flex items-center justify-center rounded-sm transition-all duration-200 hover:bg-slate-200">
            <SlidersHorizontal size={16} strokeWidth={2.2} />
          </button>
        </div>
      </div>
      <div className="h-full flex-1 relative">
        <div className="flex flex-col justify-center items-center h-full text-sm font-medium text-zinc-700">
          <Inbox size={256} strokeWidth={0.3} />
          No notifications ;(
        </div>
      </div>
    </>
  );
}
