import { TaskType } from "@/types/type";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface TaskStore {
  tasks: TaskType[];
  addTask: (task: Omit<TaskType, "id">) => void;
  removeTask: (id: number) => void;
  updateTaskProgress: (id: number, newProgress: number) => void;
}

export const useTaskStore = create<TaskStore>()(
  persist(
    (set, get) => ({
      tasks: [],
      addTask: (task) =>
        set((state) => ({
          tasks: [...state.tasks, { id: Date.now(), ...task }]
        })),
      removeTask: (id) =>
        set((state) => ({
          tasks: state.tasks.filter((task) => task.id !== id)
        })),
      updateTaskProgress: (id, newProgress) =>
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === id ? { ...task, progress: newProgress } : task
          )
        }))
    }),
    { name: "tasks-storage" }
  )
);
