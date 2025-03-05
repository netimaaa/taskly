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
  { icon: CircleDashed, title: "Progress" },
  { icon: Circle, title: "To do" },
  { icon: CircleDot, title: "In progress" },
  { icon: CircleCheckBig, title: "Finished" }
];
export const Priority = [
  { icon: WifiLow, title: "Priority" },
  { icon: WifiLow, title: "Low" },
  { icon: WifiHigh, title: "Medium" },
  { icon: Wifi, title: "High" }
];
export const Project = [
  { icon: LibraryBig, title: "Project" },
  { icon: Book, title: "Personal" },
  { icon: FolderGit, title: "Altera" }
];
export const Tags = [
  { icon: Tag, title: "Tags" },
  { icon: Circle, color: "#3b82f6", title: "Improvement" },
  { icon: Circle, color: "#ef4444", title: "Bug" },
  { icon: Circle, color: "#22c55e", title: "Feature" }
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
