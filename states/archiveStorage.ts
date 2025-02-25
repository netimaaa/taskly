import { TaskType } from "@/types/type";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface ArchivedTaskStore {
  archivedTasks: TaskType[];
  archiveTask: (task: TaskType) => void;
  unarchiveTask: (id: number) => void;
  removeArchivedTask: (id: number) => void;
  updateArchivedTaskProgress: (id: number, newProgress: number) => void;
}

export const useArchivedTaskStore = create<ArchivedTaskStore>()(
  persist(
    (set, get) => ({
      archivedTasks: [],
      archiveTask: (task) =>
        set((state) => ({
          archivedTasks: [...state.archivedTasks, task]
        })),
      unarchiveTask: (id) =>
        set((state) => ({
          archivedTasks: state.archivedTasks.filter((task) => task.id !== id)
        })),
      removeArchivedTask: (id) =>
        set((state) => ({
          archivedTasks: state.archivedTasks.filter((task) => task.id !== id)
        })),
      updateArchivedTaskProgress: (id, newProgress) =>
        set((state) => ({
          archivedTasks: state.archivedTasks.map((task) =>
            task.id === id ? { ...task, progress: newProgress } : task
          )
        }))
    }),
    { name: "archived-tasks-storage" }
  )
);
