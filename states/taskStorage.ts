import { TaskType, Comment } from "@/types/type";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface TaskStore {
  tasks: TaskType[];
  addTask: (task: Omit<TaskType, "id">) => void;
  removeTask: (id: number) => void;
  updateTaskProgress: (id: number, newProgress: number) => void;
  updateTaskInfo: (id: number, newInfo: TaskType) => void;
  addCommentToTask: (taskId: number, comment: Omit<Comment, "id">) => void;
  removeCommentFromTask: (taskId: number, commentId: number) => void;
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
        })),
      updateTaskInfo: (id, newInfo) =>
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === id ? { ...task, ...newInfo } : task
          )
        })),
      addCommentToTask: (taskId, comment) =>
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === taskId
              ? {
                  ...task,
                  comments: [
                    ...(task.comments || []),
                    { id: Date.now(), ...comment }
                  ]
                }
              : task
          )
        })),
      removeCommentFromTask: (taskId, commentId) =>
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === taskId
              ? {
                  ...task,
                  comments:
                    task.comments?.filter(
                      (comment) => comment.id !== commentId
                    ) || []
                }
              : task
          )
        }))
    }),
    { name: "tasks-storage" }
  )
);
