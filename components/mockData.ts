"use client";
import { useTaskStore } from "@/states/taskStorage";
import {
  Book,
  Circle,
  CircleCheckBig,
  CircleDashed,
  CircleDot,
  FolderGit,
  LibraryBig,
  Tag,
  Wifi,
  WifiHigh,
  WifiLow
} from "lucide-react";
export const Progress = [
  { id: 0, icon: CircleDashed, title: "Progress" },
  { id: 1, icon: Circle, title: "To do" },
  { id: 2, icon: CircleDot, title: "In progress" },
  { id: 3, icon: CircleCheckBig, title: "Finished" }
];

export const Priority = [
  { id: 4, icon: WifiLow, title: "Priority" },
  { id: 5, icon: WifiLow, title: "Low" },
  { id: 6, icon: WifiHigh, title: "Medium" },
  { id: 7, icon: Wifi, title: "High" }
];

export const Tags = [
  { id: 8, icon: Tag, title: "Tags" },
  { id: 9, icon: Circle, color: "#3b82f6", title: "Improvement" },
  { id: 10, icon: Circle, color: "#ef4444", title: "Bug" },
  { id: 11, icon: Circle, color: "#22c55e", title: "Feature" }
];
export const Project = [
  { icon: LibraryBig, title: "Project" },
  { icon: Book, title: "Personal" },
  { icon: FolderGit, title: "Altera" }
];

const tasks = useTaskStore.getState().tasks;
export const Users = [
  {
    id: 1800,
    name: "netimaaa",
    avatar: "",
    tasks: tasks
  },
  {
    id: 1801,
    name: "netimaaa1",
    avatar: "",
    tasks: tasks
  }
];
